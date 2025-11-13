# Documentación - Modelo de Categorías

## Resumen de cambios

Se ha agregado un nuevo módulo completo de **Categorías** al proyecto. Ahora puedes organizar tus productos por categorías y mostrarlas de forma separada en tu página.

## Archivos creados

### 1. **Modelo** (`src/models/Categoria.js`)
Define la estructura de las categorías en la base de datos:
- `nombre`: Nombre único de la categoría
- `descripcion`: Descripción de la categoría
- `imagen`: URL de la imagen de la categoría
- `activa`: Estado de la categoría (activa/inactiva)
- Timestamps automáticos (createdAt, updatedAt)
- Presaves de Slug para URL's más amigables

### 2. **Servicio** (`src/services/categorias.service.js`)
Contiene la lógica de negocios:
- `obtenerTodasLasCategorias()` - Obtiene todas las categorías activas
- `obtenerCategoriaPorId(id)` - Obtiene una categoría por ID y/o por slug
- `crearCategoria(datos)` - Crea una nueva categoría
- `actualizarCategoria(id, datos)` - Actualiza una categoría
- `eliminarCategoria(id)` - Elimina una categoría
- `desactivarCategoria(id)` - Desactiva una categoría (sin eliminar)

### 3. **Controlador** (`src/controllers/categorias.controller.js`)
Maneja las solicitudes HTTP:
- GET `/categorias` - Obtener todas las categorías
- GET `/categorias/:id` - Obtener una categoría específica
- POST `/categorias` - Crear nueva categoría
- PUT `/categorias/:id` - Actualizar categoría
- PATCH `/categorias/:id/desactivar` - Desactivar categoría
- DELETE `/categorias/:id` - Eliminar categoría

### 4. **Rutas** (`src/routes/categorias.routes.js`)
Define los endpoints de la API de categorías

### 5. **Seed** (`src/seeds/seedCategorias.js`)
Script para poblar la base de datos con categorías de ejemplo

## Cambios en archivos existentes

### `src/models/Productos.js`
La propiedad `categoria` ahora es una **referencia** al modelo de Categoría en lugar de un string:
```javascript
categoria: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Categoria",
  default: null,
}
```

### `src/services/productos.service.js`
Actualizado para usar `.populate("categoria")` para obtener los datos completos de la categoría

### `src/controllers/productos.controller.js`
Agregado un nuevo controlador `obtenerProductosPorCategoriaController`

### `src/routes/productos.routes.js`
Agregado un nuevo endpoint para filtrar productos por categoría:
```
GET /productos/categoria/:categoriaId
```

### `src/routes/indexRoutes.js`
Registradas las rutas de categorías

### `package.json`
Agregado el script:
```json
"seed:categorias": "node src/seeds/seedCategorias.js"
```

## Cómo usar

### 1. Crear categorías iniciales
```bash
npm run seed:categorias
```

Este comando creará 6 categorías de ejemplo:
- Electrónica
- Ropa
- Hogar
- Deportes
- Libros
- Juguetes

### 2. Endpoints disponibles

#### Obtener todas las categorías
```
GET /api/categorias
```

#### Obtener una categoría por ID
```
GET /api/categorias/:id
```

#### Crear una nueva categoría
```
POST /api/categorias
Content-Type: application/json

{
  "nombre": "Electrónica",
  "descripcion": "Dispositivos electrónicos",
  "imagen": "https://ejemplo.com/imagen.jpg"
}
```

#### Actualizar una categoría
```
PUT /api/categorias/:id
Content-Type: application/json

{
  "nombre": "Electrónica Actualizada",
  "descripcion": "Nueva descripción",
  "imagen": "https://ejemplo.com/nueva-imagen.jpg",
  "activa": true
}
```

#### Desactivar una categoría
```
PATCH /api/categorias/:id/desactivar
```

#### Eliminar una categoría
```
DELETE /api/categorias/:id
```

### 3. Filtrar productos por categoría
```
GET /api/productos/categoria/:categoriaId
```

Ejemplo:
```
GET /api/productos/categoria/507f1f77bcf86cd799439011
```

### 4. Crear un producto con categoría
```
POST /api/productos
Content-Type: application/json

{
  "nombre": "Laptop",
  "descripcion": "Laptop de alta gama",
  "precio": 1200,
  "categoria": "507f1f77bcf86cd799439011",
  "stock": 5,
  "imagenes": ["https://ejemplo.com/laptop.jpg"]
}
```

## Notas importantes

1. **Validación de nombres únicos**: No puedes crear dos categorías con el mismo nombre
2. **Categorías activas**: Por defecto, solo se muestran las categorías con `activa: true`
3. **Referencia en productos**: Cuando obtienes un producto, ahora la categoría viene con todos sus datos
4. **Desactivar vs Eliminar**: Puedes desactivar una categoría sin perder el historial, o eliminarla completamente

## Migración de productos existentes

Si ya tienes productos con categorías como strings, necesitarás:

1. Crear las categorías nuevas en la base de datos
2. Actualizar cada producto para referenciar el ID de la categoría

Puedes hacerlo con una migración manual o consultarme para crear un script de migración automática.
