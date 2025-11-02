import Carrito from "../models/Carrito.js";
import Producto from "../models/Productos.js";

/**
 * Obtiene el carrito de un usuario con los productos poblados
 * @param {string} idUsuario - ID del usuario
 * @returns {Object} Carrito con productos y total
 */
export const obtenerCarritoUsuarioService = async (idUsuario) => {
  try {
    const carrito = await Carrito.findOne({ usuario: idUsuario }).populate(
      "productos.idProducto"
    );

    if (!carrito) {
      return { productos: [], total: 0 };
    }

    const productosConDetalles = carrito.productos
      .filter((item) => item.idProducto) 
      .map((item) => {
        const producto =
          typeof item.idProducto === "object" ? item.idProducto : null;

        if (!producto) {
          return {
            _id: item._id.toString(),
            idProducto: item.idProducto?.toString() || null,
            nombre: "Producto no disponible",
            precio: 0,
            cantidad: item.cantidad,
            subtotal: 0,
            imagenes: [],
          };
        }

        return {
          _id: item._id.toString(),
          idProducto: producto._id.toString(),
          nombre: producto.nombre || "Producto sin nombre",
          precio: producto.precio || 0,
          cantidad: item.cantidad,
          subtotal: item.cantidad * (producto.precio || 0),
          imagenes: producto.imagenes || [],
          categoria: producto.categoria || "general",
          disponible: producto.disponible !== false,
        };
      });

    const total = productosConDetalles.reduce(
      (acumulador, producto) => acumulador + producto.subtotal,
      0
    );

    return { productos: productosConDetalles, total };
  } catch (error) {
    throw new Error(`Error al obtener el carrito: ${error.message}`);
  }
};

/**
 * Agrega o actualiza productos en el carrito
 * @param {string} idUsuario - ID del usuario
 * @param {Array} items - Array de items { idProducto, cantidad }
 * @returns {Object} Carrito actualizado
 */
export const agregarProductoCarritoService = async (idUsuario, items) => {
  try {
    for (const item of items) {
      const producto = await Producto.findById(item.idProducto);
      if (!producto) {
        throw new Error(`Producto con ID ${item.idProducto} no encontrado`);
      }
      if (!producto.disponible) {
        throw new Error(`El producto ${producto.nombre} no está disponible`);
      }
      if (item.cantidad && item.cantidad > producto.stock) {
        throw new Error(
          `Stock insuficiente para ${producto.nombre}. Stock disponible: ${producto.stock}`
        );
      }
    }

    let carrito = await Carrito.findOne({ usuario: idUsuario });

    if (!carrito) {
      carrito = await Carrito.create({
        usuario: idUsuario,
        productos: items.map((item) => ({
          idProducto: item.idProducto,
          cantidad: item.cantidad || 1,
        })),
      });
    } else {
      items.forEach((item) => {
        const indiceProducto = carrito.productos.findIndex(
          (p) => p.idProducto.toString() === item.idProducto.toString()
        );

        if (indiceProducto > -1) {
          const nuevaCantidad =
            item.cantidad || carrito.productos[indiceProducto].cantidad + 1;
          carrito.productos[indiceProducto].cantidad = nuevaCantidad;
        } else {
          carrito.productos.push({
            idProducto: item.idProducto,
            cantidad: item.cantidad || 1,
          });
        }
      });

      await carrito.save();
    }

    return await obtenerCarritoUsuarioService(idUsuario);
  } catch (error) {
    throw new Error(`Error al agregar producto al carrito: ${error.message}`);
  }
};

/**
 * Actualiza la cantidad de un producto específico en el carrito
 * @param {string} idUsuario - ID del usuario
 * @param {string} idProducto - ID del producto
 * @param {number} cantidad - Nueva cantidad
 * @returns {Object} Carrito actualizado
 */
export const actualizarCantidadProductoService = async (
  idUsuario,
  idProducto,
  cantidad
) => {
  try {
    if (cantidad < 1) {
      throw new Error("La cantidad debe ser mayor a 0");
    }

    const producto = await Producto.findById(idProducto);
    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    if (cantidad > producto.stock) {
      throw new Error(
        `Stock insuficiente. Stock disponible: ${producto.stock}`
      );
    }

    const carrito = await Carrito.findOne({ usuario: idUsuario });
    if (!carrito) {
      throw new Error("Carrito no encontrado");
    }

    const indiceProducto = carrito.productos.findIndex(
      (p) => p.idProducto.toString() === idProducto.toString()
    );

    if (indiceProducto === -1) {
      throw new Error("Producto no encontrado en el carrito");
    }

    carrito.productos[indiceProducto].cantidad = cantidad;
    await carrito.save();

    return await obtenerCarritoUsuarioService(idUsuario);
  } catch (error) {
    throw new Error(`Error al actualizar cantidad: ${error.message}`);
  }
};

/**
 * Elimina un producto del carrito
 * @param {string} idUsuario - ID del usuario
 * @param {string} idProducto - ID del producto a eliminar
 * @returns {Object} Carrito actualizado
 */
export const eliminarProductoCarritoService = async (idUsuario, idProducto) => {
  try {
    const carrito = await Carrito.findOne({ usuario: idUsuario });
    if (!carrito) {
      return { productos: [], total: 0 };
    }

    carrito.productos = carrito.productos.filter(
      (p) => p.idProducto.toString() !== idProducto.toString()
    );

    await carrito.save();
    return await obtenerCarritoUsuarioService(idUsuario);
  } catch (error) {
    throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
  }
};

/**
 * Limpia todo el carrito del usuario
 * @param {string} idUsuario - ID del usuario
 * @returns {Object} Carrito vacío
 */
export const limpiarCarritoService = async (idUsuario) => {
  try {
    const carrito = await Carrito.findOne({ usuario: idUsuario });
    if (!carrito) {
      return { productos: [], total: 0 };
    }

    carrito.productos = [];
    await carrito.save();
    return { productos: [], total: 0 };
  } catch (error) {
    throw new Error(`Error al limpiar el carrito: ${error.message}`);
  }
};
