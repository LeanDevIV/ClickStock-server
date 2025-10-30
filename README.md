🧾 Proyecto Final: Control de Stock
🎯 Objetivo del Sistema

El sistema tiene como propósito permitir a un administrador gestionar el stock de productos de un local comercial.
Debe contar con una sección donde los usuarios puedan visualizar los productos, y otra donde el administrador pueda administrarlos.

🧱 Secciones del Sitio
🏠 Página Principal

Mostrar todos los productos del negocio.

Incluir un filtro por categorías.

👤 Administrador

Permitir realizar un CRUD completo de productos:

Nombre

Stock

Descripción

Fecha del último control de stock

Administrar usuarios registrados:

Ver lista de usuarios

Eliminar o suspender cuentas

📄 Secciones adicionales

Quiénes somos

Contacto

⚙️ Requerimientos del Proyecto

📋 Panel de Trello (debe incluir mockups).

💻 Repositorios separados para el backend y el frontend.

🧠 Archivo README con todas las especificaciones del proyecto.

🧩 Mockup del sistema.

📘 PDF con la documentación técnica.

📱 Sitio completamente responsive.

🛠️ Especificaciones Técnicas
🗃️ 1. Base de Datos (MongoDB)

Definir la estructura de la base de datos con las siguientes colecciones:

Usuarios: nombre, correo electrónico, contraseña, roles, etc.

Productos: nombre, descripción, stock, fecha del último control, etc.

🔐 2. Autenticación y Autorización

Implementar registro e inicio de sesión con Node.js y Express.

Usar las siguientes bibliotecas:

jsonwebtoken → para generar tokens JWT.

bcrypt → para encriptar contraseñas.

🔗 3. Integración Frontend / Backend

Conectar el frontend (React.js) con el backend (Node.js / Express).

Utilizar Axios para las solicitudes HTTP.

Definir las rutas del backend para:

Obtener productos.

Crear, editar o eliminar productos.

Registrar o iniciar sesión de usuarios.

(Opcional) realizar compras o reservas.

🧩 4. CRUD de Productos

Desarrollar las vistas y formularios para cada operación CRUD.

Proteger las rutas con roles (solo los administradores pueden modificarlos).

🧑‍💼 5. Funcionalidad de Administración

Crear un panel de administración para:

Ver usuarios registrados.

Eliminar o suspender cuentas.

🧠 Validaciones y Manejo de Errores

✅ Validar cada acción o formulario antes de enviarlo al servidor.

🚫 Manejar el Error 404 desde el backend y mostrar una página personalizada en el frontend.

💬 Mostrar mensajes claros al usuario según el código de estado HTTP recibido.

Ejemplo: mostrar qué error ocurrió y cómo puede solucionarlo.
