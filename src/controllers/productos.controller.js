import {
  obtenerProductosService,
  obtenerProductoPorIdService,
  crearProductoService,
  actualizarProductoService,
  eliminarProductoService,
  eliminarProductoPermanentService,
  restaurarProductoService,
  obtenerProductosPorCategoriaService,
} from "../services/productos.service.js";

// Obtener todos los productos
export const obtenerProductosController = async (req, res) => {
  try {
    const { includeDeleted, includeUnavailable } = req.query;
    const options = {
      includeDeleted: includeDeleted === 'true',
      includeUnavailable: includeUnavailable === 'true',
    };
    const productos = await obtenerProductosService(options);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Obtener productos por categoría
export const obtenerProductosPorCategoriaController = async (req, res) => {
  try {
    const { categoriaId } = req.params;
    const productos = await obtenerProductosPorCategoriaService(categoriaId);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos por categoría" });
  }
};

// Obtener un producto por ID
export const obtenerProductoPorIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await obtenerProductoPorIdService(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

// Crear un nuevo producto
export const crearProductoController = async (req, res, next) => {
  try {
    const productoGuardado = await crearProductoService(req.body);
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el producto" });
    next();
  }
};

// Actualizar un producto existente
export const actualizarProductoController = async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await actualizarProductoService(id, req.body);
    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
};

// Eliminar un producto
export const eliminarProductoController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBy = req.usuario?.usuarioId || req.usuario?._id || null;
    console.log('🗑️ Iniciando eliminarProductoController con ID:', id, 'usuario:', deletedBy);
    
    const productoEliminado = await eliminarProductoService(id, deletedBy);
    
    console.log('🗑️ Respuesta del servicio:', productoEliminado);
    
    if (!productoEliminado) {
      console.log('❌ Producto no encontrado para eliminar');
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    
    console.log('✅ Enviando respuesta de eliminación al cliente');
    res.json({ mensaje: "Producto eliminado correctamente", producto: productoEliminado });
  } catch (error) {
    console.error('❌ Error en eliminarProductoController:', error);
    res.status(400).json({ error: "Error al eliminar el producto", details: error.message });
  }
};

export const eliminarProductoPermanenteController = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await eliminarProductoPermanentService(id);
    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto eliminado permanentemente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el producto permanentemente" });
  }
};

export const restaurarProductoController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🔧 Iniciando restaurarProductoController con ID:', id);
    
    const productoRestaurado = await restaurarProductoService(id);
    
    console.log('🔧 Respuesta del servicio:', productoRestaurado);
    
    if (!productoRestaurado) {
      console.log('❌ Producto no encontrado');
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    
    console.log('✅ Enviando respuesta al cliente');
    res.json({ mensaje: "Producto restaurado correctamente", producto: productoRestaurado });
  } catch (error) {
    console.error('❌ Error en restaurarProductoController:', error);
    res.status(500).json({ error: "Error al restaurar el producto", details: error.message });
  }
};
