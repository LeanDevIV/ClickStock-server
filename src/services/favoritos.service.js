import Favoritos from "../models/Favoritos.js";
import Producto from "../models/Productos.js";

/**
import Favoritos from "../models/Favoritos.js";
import Producto from "../models/Productos.js";

/**
 * Obtiene la lista de favoritos de un usuario con los productos poblados
 * @param {string} idUsuario - ID del usuario
 * @returns {Object} Favoritos con productos y total
 */
export const obtenerFavoritosUsuarioService = async (idUsuario) => {
  try {
    const favoritos = await Favoritos.findOne({ usuario: idUsuario }).populate(
      "productos.idProducto"
    );

    if (!favoritos) {
      return { productos: [], total: 0 };
    }

    const productosConDetalles = favoritos.productos
      .filter((item) => item.idProducto) // Filtrar productos eliminados
      .map((item) => {
        const producto =
          typeof item.idProducto === "object" ? item.idProducto : null;

        if (!producto) {
          return {
            _id: item._id.toString(),
            idProducto: item.idProducto?.toString() || null,
            nombre: "Producto no disponible",
            precio: 0,
            imagenes: [],
            fechaAgregado: item.fechaAgregado,
          };
        }

        return {
          _id: item._id.toString(),
          idProducto: producto._id.toString(),
          nombre: producto.nombre || "Producto sin nombre",
          precio: producto.precio || 0,
          descripcion: producto.descripcion || "",
          categoria: producto.categoria || "general",
          stock: producto.stock || 0,
          imagenes: producto.imagenes || [],
          disponible: producto.disponible !== false,
          fechaAgregado: item.fechaAgregado,
        };
      });

    return {
      productos: productosConDetalles,
      total: productosConDetalles.length,
    };
  } catch (error) {
    throw new Error(`Error al obtener los favoritos: ${error.message}`);
  }
};

/**
 * Agrega un producto a los favoritos del usuario
 * @param {string} idUsuario - ID del usuario
 * @param {string} idProducto - ID del producto a agregar
 * @returns {Object} Favoritos actualizados
 */
export const agregarProductoFavoritosService = async (
  idUsuario,
  idProducto
) => {
  try {
    const producto = await Producto.findById(idProducto);
    if (!producto) {
      throw new Error(`Producto con ID ${idProducto} no encontrado`);
    }

    let favoritos = await Favoritos.findOne({ usuario: idUsuario });

    if (!favoritos) {
      favoritos = new Favoritos({
        usuario: idUsuario,
        productos: [
          {
            idProducto: idProducto,
            fechaAgregado: new Date(),
          },
        ],
      });
      await favoritos.save();
    } else {
      const productoExistente = favoritos.productos.find(
        (p) => p.idProducto.toString() === idProducto.toString()
      );

      if (productoExistente) {
        throw new Error("El producto ya está en tus favoritos");
      }

      favoritos.productos.push({
        idProducto: idProducto,
        fechaAgregado: new Date(),
      });

      await favoritos.save();
    }

    return await obtenerFavoritosUsuarioService(idUsuario);
  } catch (error) {
    throw new Error(`Error al agregar producto a favoritos: ${error.message}`);
  }
};

/**
 * Elimina un producto de los favoritos
 * @param {string} idUsuario - ID del usuario
 * @param {string} idProducto - ID del producto a eliminar
 * @returns {Object} Favoritos actualizados
 */
export const eliminarProductoFavoritosService = async (
  idUsuario,
  idProducto
) => {
  try {
    const favoritos = await Favoritos.findOne({ usuario: idUsuario });
    if (!favoritos) {
      return { productos: [], total: 0 };
    }

    const productoIndex = favoritos.productos.findIndex(
      (p) => p.idProducto.toString() === idProducto.toString()
    );

    if (productoIndex === -1) {
      throw new Error("El producto no está en tus favoritos");
    }

    favoritos.productos.splice(productoIndex, 1);
    await favoritos.save();

    return await obtenerFavoritosUsuarioService(idUsuario);
  } catch (error) {
    throw new Error(
      `Error al eliminar producto de favoritos: ${error.message}`
    );
  }
};

/**
 * Verifica si un producto está en los favoritos del usuario
 * @param {string} idUsuario - ID del usuario
 * @param {string} idProducto - ID del producto
 * @returns {boolean} true si está en favoritos, false si no
 */
export const verificarProductoEnFavoritosService = async (
  idUsuario,
  idProducto
) => {
  try {
    const favoritos = await Favoritos.findOne({ usuario: idUsuario });
    if (!favoritos) {
      return false;
    }

    const productoExistente = favoritos.productos.find(
      (p) => p.idProducto.toString() === idProducto.toString()
    );

    return !!productoExistente;
  } catch (error) {
    throw new Error(
      `Error al verificar producto en favoritos: ${error.message}`
    );
  }
};

/**
 * Limpia todos los favoritos del usuario
 * @param {string} idUsuario - ID del usuario
 * @returns {Object} Favoritos vacíos
 */
export const limpiarFavoritosService = async (idUsuario) => {
  try {
    const favoritos = await Favoritos.findOne({ usuario: idUsuario });
    if (favoritos) {
      favoritos.productos = [];
      await favoritos.save();
    }
    return { productos: [], total: 0 };
  } catch (error) {
    throw new Error(`Error al limpiar los favoritos: ${error.message}`);
  }
};
