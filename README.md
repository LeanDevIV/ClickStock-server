# 🛒 ClickStock - Backend API

> API RESTful robusta para e-commerce con gestión de stock. Construida con Node.js, Express y MongoDB.

---

## 🚀 Tecnologías Principales

### Core

- **Node.js** - Runtime de JavaScript
- **Express 5** - Framework web minimalista y rápido
- **MongoDB** - Base de datos NoSQL
- **Mongoose 8** - ODM para MongoDB

### Seguridad

- **Helmet** - Headers de seguridad HTTP
- **Express Rate Limit** - Limitación de requests
- **Express Mongo Sanitize** - Prevención de inyección NoSQL
- **XSS** - Sanitización contra Cross-Site Scripting
- **HPP** - Protección contra HTTP Parameter Pollution
- **Argon2** - Hash de contraseñas (más seguro que bcrypt)
- **JWT** - Autenticación basada en tokens

### Validación

- **Zod** - Validación de esquemas y tipos
- **Express Validator** - Validación de requests

### Integraciones

- **Firebase Admin** - Autenticación social (Google, GitHub)
- **MercadoPago** - Pasarela de pagos
- **Nodemailer** - Envío de emails
- **OpenAI** - Chatbot con IA
- **Vercel Blob** - Almacenamiento de archivos

### Utilidades

- **Morgan** - Logger de HTTP requests
- **DayJS** - Manipulación de fechas
- **Slugify** - Generación de slugs
- **Chalk** - Colores en consola
- **Dotenv** - Variables de entorno

---

## ⚙️ Características Principales

### 🔐 Autenticación y Autorización

- **Registro/Login tradicional** con email y contraseña
- **Autenticación social** (Google, GitHub) vía Firebase
- **JWT tokens** con expiración configurable
- **Roles de usuario** (admin, usuario)
- **Middleware de autorización** por rol
- **Hash seguro de contraseñas** con Argon2

### 🛍️ E-commerce

- **CRUD de productos** con imágenes
- **Sistema de categorías** jerárquico
- **Carrito de compras** persistente por usuario
- **Favoritos** de productos
- **Sistema de reseñas** con calificaciones
- **Promociones** con descuentos y fechas
- **Gestión de pedidos** con estados

### 💳 Pagos

- **Integración con MercadoPago**
- **Creación de preferencias de pago**
- **Webhooks** para notificaciones de pago
- **Generación de QR** para pagos

### 📧 Comunicación

- **Envío de emails** con Nodemailer
- **Formulario de contacto**
- **Notificaciones** de pedidos

### 🤖 IA

- **Chatbot** integrado con OpenAI
- **Asistencia automatizada** a usuarios

### 📦 Gestión de Archivos

- **Upload de imágenes** a Vercel Blob
- **Validación de archivos**
- **URLs públicas** de archivos

### 🛡️ Seguridad

- **Rate limiting** en endpoints API
- **Sanitización** de inputs (NoSQL injection, XSS)
- **Headers de seguridad** con Helmet
- **Validación robusta** con Zod
- **CORS** configurado
- **Error handling** centralizado

### 🌱 Auto-Seeding

- **Población automática** de BD en desarrollo
- **Seeds** para usuarios, productos y categorías
- **Datos de demostración** listos para usar

---

## 📁 Estructura del Proyecto

```
ClickStock-server/
│
├── src/
│   ├── config/              # Configuraciones
│   │   ├── db.js           # Conexión a MongoDB
│   │   ├── firebase.js     # Config de Firebase Admin
│   │   └── nodemailer.js   # Config de email
│   │
│   ├── models/              # Modelos de Mongoose (9)
│   │   ├── Usuario.js      # Usuarios del sistema
│   │   ├── Productos.js    # Productos del catálogo
│   │   ├── Categoria.js    # Categorías de productos
│   │   ├── Carrito.js      # Carritos de compra
│   │   ├── Pedido.js       # Pedidos realizados
│   │   ├── Favoritos.js    # Favoritos de usuarios
│   │   ├── Review.js       # Reseñas de productos
│   │   ├── promocion.js    # Promociones activas
│   │   └── Contacto.js     # Mensajes de contacto
│   │
│   ├── routes/              # Rutas de la API (14)
│   │   ├── indexRoutes.js  # Router principal
│   │   ├── auth.routes.js
│   │   ├── usuario.routes.js
│   │   ├── productos.routes.js
│   │   ├── categorias.routes.js
│   │   ├── carrito.routes.js
│   │   ├── pedidos.routes.js
│   │   ├── favoritos.routes.js
│   │   ├── review.routes.js
│   │   ├── promocion.Routes.js
│   │   ├── payment.routes.js
│   │   ├── upload.routes.js
│   │   ├── contacto.routes.js
│   │   └── chatbot.routes.js
│   │
│   ├── controllers/         # Controladores (13)
│   │   ├── auth.controller.js
│   │   ├── usuario.controller.js
│   │   ├── productos.controller.js
│   │   ├── categorias.controller.js
│   │   ├── carrito.controller.js
│   │   ├── pedido.controller.js
│   │   ├── favoritos.controller.js
│   │   ├── review.controller.js
│   │   ├── promocion.controller.js
│   │   ├── payment.controller.js
│   │   ├── upload.controller.js
│   │   ├── contacto.controller.js
│   │   └── chatbot.controller.js
│   │
│   ├── services/            # Lógica de negocio (12)
│   │   ├── auth.service.js
│   │   ├── usuario.service.js
│   │   ├── productos.service.js
│   │   ├── categorias.service.js
│   │   ├── carrito.service.js
│   │   ├── pedido.service.js
│   │   ├── favoritos.service.js
│   │   ├── review.service.js
│   │   ├── promocion.service.js
│   │   ├── payment.service.js
│   │   ├── upload.service.js
│   │   └── contacto.service.js
│   │
│   ├── middleware/          # Middlewares (8)
│   │   ├── validacionDeToken.js    # Verificación JWT
│   │   ├── validacionDeRol.js      # Autorización por rol
│   │   ├── zodValidator.js         # Validación Zod
│   │   ├── errorHandler.js         # Manejo de errores
│   │   ├── rateLimit.js            # Rate limiting
│   │   ├── mongoSanitize.js        # Sanitización NoSQL
│   │   ├── xssSanitize.js          # Sanitización XSS
│   │   └── validarContacto.js      # Validación contacto
│   │
│   ├── schemas/             # Esquemas de validación Zod
│   │   ├── productos.schema.js
│   │   └── promocion.schema.js
│   │
│   ├── seeds/               # Seeds de base de datos (4)
│   │   ├── seedUsuarios.js
│   │   ├── seedProductos.js
│   │   ├── seedCategorias.js
│   │   └── [otros seeds]
│   │
│   └── utils/               # Utilidades
│       ├── autoSeed.js     # Auto-seeding en desarrollo
│       └── [otras utils]
│
├── public/                  # Archivos estáticos
├── storage/                 # Almacenamiento local temporal
├── .env                     # Variables de entorno
├── .env.example             # Ejemplo de variables
├── index.js                 # Punto de entrada
├── package.json
└── vercel.json              # Config de deploy en Vercel

```

---

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- MongoDB (local o Atlas)
- Cuenta de Firebase (para auth social)
- Cuenta de MercadoPago (para pagos)
- Cuenta de Vercel (para blob storage)
- Cuenta de OpenAI (para chatbot)

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repo>
cd ClickStock-server
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del proyecto:

```env
# -------------------------
# MongoDB
# -------------------------
MONGO_URI=mongodb://localhost:27017/clickstock
# O usar MongoDB Atlas:
# MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/clickstock

# -------------------------
# JWT
# -------------------------
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
JWT_EXPIRES_IN=7d

# -------------------------
# Server
# -------------------------
PORT=5000
NODE_ENV=development
BASE_URL=http://localhost:5000
PUBLIC_BASE_URL=http://localhost:5000

# -------------------------
# CORS
# -------------------------
CORS_ORIGIN=http://localhost:5173

# -------------------------
# Firebase Admin SDK
# -------------------------
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_PRIVATE_KEY_ID=tu_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@tu-proyecto.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=tu_client_id
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...

# -------------------------
# MercadoPago
# -------------------------
MP_ACCESS_TOKEN=tu_access_token_de_mercadopago

# -------------------------
# Vercel Blob Storage
# -------------------------
BLOB_READ_WRITE_TOKEN=tu_token_de_vercel_blob

# -------------------------
# OpenAI
# -------------------------
OPENAI_API_KEY=sk-...

# -------------------------
# Nodemailer (Gmail ejemplo)
# -------------------------
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password

# -------------------------
# Auto-Seeding
# -------------------------
AUTO_SEED=true

# -------------------------
# Debug
# -------------------------
DEBUG=true
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

5. **Ejecutar seeds manualmente (opcional)**

```bash
npm run seed:users
npm run seed:products
npm run seed:categorias
```

6. **Producción**

```bash
npm start
```

---

## 🧩 Arquitectura

### Patrón MVC Extendido

```
Request → Middleware → Router → Controller → Service → Model → Database
                                     ↓
                                 Response
```

### Flujo de una Request

1. **Middleware de seguridad** (helmet, rate limit, sanitización)
2. **Validación de token** (si es ruta protegida)
3. **Validación de rol** (si requiere permisos)
4. **Validación de datos** (Zod schemas)
5. **Controller** recibe y valida request
6. **Service** ejecuta lógica de negocio
7. **Model** interactúa con MongoDB
8. **Response** formateada al cliente
9. **Error handler** captura errores

### Separación de Responsabilidades

- **Routes**: Definición de endpoints y middlewares
- **Controllers**: Manejo de request/response
- **Services**: Lógica de negocio
- **Models**: Esquemas y validación de datos
- **Middleware**: Validación, autenticación, seguridad
- **Utils**: Funciones auxiliares

---

## 📡 API Endpoints

### Autenticación

```
POST   /api/auth/register          # Registro de usuario
POST   /api/auth/login             # Login tradicional
POST   /api/auth/firebase-login    # Login con Firebase (Google/GitHub)
GET    /api/auth/verify            # Verificar token
```

### Usuarios

```
GET    /api/usuarios               # Listar usuarios (admin)
GET    /api/usuarios/:id           # Obtener usuario
PUT    /api/usuarios/:id           # Actualizar usuario
DELETE /api/usuarios/:id           # Eliminar usuario (admin)
PATCH  /api/usuarios/:id/rol       # Cambiar rol (admin)
```

### Productos

```
GET    /api/productos              # Listar productos
GET    /api/productos/:id          # Obtener producto
POST   /api/productos              # Crear producto (admin)
PUT    /api/productos/:id          # Actualizar producto (admin)
DELETE /api/productos/:id          # Eliminar producto (admin)
GET    /api/productos/categoria/:id # Productos por categoría
```

### Categorías

```
GET    /api/categorias             # Listar categorías
GET    /api/categorias/:id         # Obtener categoría
POST   /api/categorias             # Crear categoría (admin)
PUT    /api/categorias/:id         # Actualizar categoría (admin)
DELETE /api/categorias/:id         # Eliminar categoría (admin)
```

### Carrito

```
GET    /api/carrito                # Obtener carrito del usuario
POST   /api/carrito                # Agregar producto al carrito
PUT    /api/carrito/:productoId    # Actualizar cantidad
DELETE /api/carrito/:productoId    # Eliminar del carrito
DELETE /api/carrito                # Vaciar carrito
```

### Pedidos

```
GET    /api/pedidos                # Listar pedidos (admin: todos, user: propios)
GET    /api/pedidos/:id            # Obtener pedido
POST   /api/pedidos                # Crear pedido
PUT    /api/pedidos/:id            # Actualizar pedido (admin)
DELETE /api/pedidos/:id            # Eliminar pedido (admin)
PATCH  /api/pedidos/:id/estado     # Cambiar estado (admin)
```

### Favoritos

```
GET    /api/favoritos              # Obtener favoritos del usuario
POST   /api/favoritos              # Agregar a favoritos
DELETE /api/favoritos/:productoId  # Eliminar de favoritos
```

### Reseñas

```
GET    /api/reviews                # Listar todas las reseñas (admin)
GET    /api/reviews/producto/:id   # Reseñas de un producto
POST   /api/reviews                # Crear reseña
PUT    /api/reviews/:id            # Actualizar reseña
DELETE /api/reviews/:id            # Eliminar reseña
```

### Promociones

```
GET    /api/promociones            # Listar promociones
GET    /api/promociones/:id        # Obtener promoción
POST   /api/promociones            # Crear promoción (admin)
PUT    /api/promociones/:id        # Actualizar promoción (admin)
DELETE /api/promociones/:id        # Eliminar promoción (admin)
GET    /api/promociones/activas    # Promociones activas
```

### Pagos

```
POST   /api/payment/create-preference  # Crear preferencia de pago
POST   /api/payment/webhook            # Webhook de MercadoPago
```

### Upload

```
POST   /api/upload                 # Subir archivo a Vercel Blob
```

### Contacto

```
POST   /api/contacto               # Enviar mensaje de contacto
GET    /api/contacto               # Listar mensajes (admin)
```

### Chatbot

```
POST   /api/chatbot                # Enviar mensaje al chatbot
```

### Health Check

```
GET    /health                     # Estado del servidor
```

---

## 🔐 Autenticación y Autorización

### Métodos de Autenticación

#### 1. Tradicional (Email/Password)

```javascript
POST /api/auth/register
{
  "nombre": "Usuario",
  "email": "user@example.com",
  "password": "password123"
}

POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 2. Firebase (Google/GitHub)

```javascript
POST /api/auth/firebase-login
{
  "firebaseToken": "token_de_firebase"
}
```

### Roles

- **admin**: Acceso completo al sistema
- **usuario**: Acceso a funciones de cliente

### Protección de Rutas

```javascript
// Requiere autenticación
router.get("/protected", validacionDeToken, controller);

// Requiere rol admin
router.delete(
  "/admin-only",
  validacionDeToken,
  validacionDeRol(["admin"]),
  controller
);
```

---

## 🛡️ Seguridad

### Medidas Implementadas

1. **Helmet**: Headers de seguridad HTTP
2. **Rate Limiting**: 100 requests por 15 minutos por IP
3. **CORS**: Configurado para frontend específico
4. **Sanitización**:
   - NoSQL injection prevention
   - XSS protection
   - HPP (HTTP Parameter Pollution)
5. **Validación**: Zod schemas en todas las entradas
6. **Argon2**: Hash seguro de contraseñas
7. **JWT**: Tokens con expiración
8. **Límite de payload**: 10kb en JSON

---

## 📊 Modelos de Datos

### Usuario

```javascript
{
  nombre: String,
  email: String (unique),
  password: String (hashed),
  rol: String (enum: ['admin', 'usuario']),
  firebaseUid: String (optional),
  authProvider: String (enum: ['local', 'google', 'github']),
  createdAt: Date,
  updatedAt: Date
}
```

### Producto

```javascript
{
  nombre: String,
  descripcion: String,
  precio: Number,
  stock: Number,
  categoria: ObjectId (ref: Categoria),
  imagen: String (URL),
  slug: String (unique),
  activo: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Pedido

```javascript
{
  usuario: ObjectId (ref: Usuario),
  productos: [{
    producto: ObjectId (ref: Producto),
    cantidad: Number,
    precio: Number
  }],
  total: Number,
  estado: String (enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado']),
  metodoPago: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Carrito

```javascript
{
  usuario: ObjectId (ref: Usuario),
  productos: [{
    producto: ObjectId (ref: Producto),
    cantidad: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Validación con Zod

Ejemplo de schema de producto:

```javascript
const productoSchema = z.object({
  nombre: z.string().min(3).max(100),
  descripcion: z.string().min(10).max(500),
  precio: z.number().positive(),
  stock: z.number().int().min(0),
  categoria: z.string(),
  imagen: z.string().url().optional(),
});
```

---

## 📦 Scripts Disponibles

```bash
npm start              # Iniciar servidor en producción
npm run dev            # Desarrollo con nodemon
npm run seed:users     # Poblar usuarios de prueba
npm run seed:products  # Poblar productos de prueba
npm run seed:categorias # Poblar categorías
```

---

## 🌐 Deploy en Vercel

### Configuración

El archivo `vercel.json` ya está configurado:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

### Variables de Entorno en Vercel

Configurar todas las variables del `.env` en el dashboard de Vercel.

**URL de producción**: https://click-stock-server.vercel.app/

---

## 🔧 Configuración Adicional

### Auto-Seeding

El servidor automáticamente pobla la base de datos con datos de demostración si está vacía y `AUTO_SEED=true`.

### CORS

Configurar `CORS_ORIGIN` con la URL del frontend en producción.

### Nodemailer

Para Gmail, necesitas generar una "App Password" en la configuración de seguridad de Google.

---

## 📝 Convenciones de Código

### Nomenclatura

- **Archivos**: camelCase con sufijos (`.controller.js`, `.service.js`, `.routes.js`)
- **Modelos**: PascalCase (`Usuario.js`, `Producto.js`)
- **Funciones**: camelCase (`obtenerProductos`, `crearPedido`)
- **Constantes**: UPPER_SNAKE_CASE
- **Variables**: camelCase

### Estructura de Archivos

```javascript
// Imports
import express from "express";

// Middleware/Config
const router = express.Router();

// Routes/Functions
router.get("/", controller);

// Export
export default router;
```

---

## 🤝 Contribución

Este proyecto sigue las mejores prácticas:

- ✅ Arquitectura MVC
- ✅ Separación de responsabilidades
- ✅ Validación robusta con Zod
- ✅ Seguridad multicapa
- ✅ Error handling centralizado
- ✅ Code splitting por dominio

---

## 👨‍💻 Autor

**Lean**  
Desarrollador Full Stack especializado en Node.js y arquitecturas escalables.

---

## 📄 Licencia

Este proyecto es parte de un portafolio educativo.

---

## 🔗 Links

- **Backend API**: https://click-stock-server.vercel.app/
- **Frontend**: https://stock-project-frontend-beta.vercel.app/
- **Documentación API**: [Enlace a Postman/Swagger]
