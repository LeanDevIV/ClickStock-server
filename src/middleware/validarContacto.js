// import { check, validationResult } from "express-validator";

// export const validarContacto = [
//   check("nombre")
//     .not().isEmpty().withMessage("El nombre es obligatorio")
//     .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

//   check("email")
//     .not().isEmpty().withMessage("El email es obligatorio")
//     .isEmail().withMessage("Debe ingresar un email válido"),

//   check("asunto")
//     .not().isEmpty().withMessage("El asunto es obligatorio")
//     .isLength({ min: 3 }).withMessage("El asunto debe tener al menos 3 caracteres"),

//   check("mensaje")
//     .not().isEmpty().withMessage("El mensaje es obligatorio")
//     .isLength({ min: 10 }).withMessage("El mensaje debe tener al menos 10 caracteres"),

//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         ok: false,
//         errors: errors.array(),
//       });
//     }
//     next();
//   }
// ];
import { check, validationResult } from "express-validator";

export const validarContacto = [
  check("nombre")
    .not().isEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

  check("email")
    .not().isEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe ingresar un email válido"),

  check("asunto")
    .not().isEmpty().withMessage("El asunto es obligatorio")
    .isLength({ min: 3 }).withMessage("El asunto debe tener al menos 3 caracteres"),

  check("mensaje")
    .not().isEmpty().withMessage("El mensaje es obligatorio")
    .isLength({ min: 10 }).withMessage("El mensaje debe tener al menos 10 caracteres")
    .custom((value) => {
      const palabras = value.trim().split(/\s+/); // separa por espacios múltiples
      const maxLetrasPorPalabra = 20; // <-- cambiá este número si querés

      for (let palabra of palabras) {
        if (palabra.length > maxLetrasPorPalabra) {
          throw new Error(`Cada palabra puede tener como máximo ${maxLetrasPorPalabra} letras`);
        }
      }

      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.array(),
      });
    }
    next();
  }
];
