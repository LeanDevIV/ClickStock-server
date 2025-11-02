export const validacionDeRol = (...rolesPermitidos) => {
    return (req, res, next) => {
      if (!req.usuario || !req.usuario.rolUsuario) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }
  
      if (!rolesPermitidos.includes(req.usuario.rolUsuario)) {
        return res.status(403).json({ message: "Credenciales insuficientes" });
      }
  
      next();
    };
  };
  