import dotenv from "dotenv";
dotenv.config();
import { conexionBD } from "../config/db.js";
import mongoose from "mongoose";

import { UsuarioModel } from "../models/Usuario.js"; // ajustá la ruta según tu estructura

const usuariosCargados = [
  {
    nombreUsuario: "lean_dev",
    emailUsuario: "lean@example.com",
    rolUsuario: "admin",
    contrasenia: "123456",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombreUsuario: "diego_rc",
    emailUsuario: "diego@example.com",
    rolUsuario: "usuario",
    contrasenia: "123456",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombreUsuario: "martina_code",
    emailUsuario: "martina@example.com",
    rolUsuario: "usuario",
    contrasenia: "123456",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombreUsuario: "agus_js",
    emailUsuario: "agus@example.com",
    rolUsuario: "usuario",
    contrasenia: "123456",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombreUsuario: "sofia_admin",
    emailUsuario: "sofia@example.com",
    rolUsuario: "admin",
    contrasenia: "123456",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
];

async function runSeed() {
  try {
    await conexionBD();

    // Limpiar colección (opcional)
    await UsuarioModel.deleteMany({});
    console.log("🧹 Colección 'usuarios' limpiada");

    const insertResult = await UsuarioModel.insertMany(usuariosCargados, {
      ordered: true,
    });
    console.log(`✅ Insertados ${insertResult.length} usuarios`);
  } catch (error) {
    console.error("❌ Error durante el seeding:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Conexión a MongoDB cerrada");
  }
}

runSeed();
