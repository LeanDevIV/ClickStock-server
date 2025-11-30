import dotenv from "dotenv";
dotenv.config();
import { conexionBD } from "../config/db.js";
import mongoose from "mongoose";

import { UsuarioModel } from "../models/Usuario.js";

const usuariosCargados = [
  {
    nombre: "Leandro",
    apellido: "Dev",
    correo: "lean@example.com",
    rol: "admin",
    contrasenia: "123456",
    telefono: "123456789",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombre: "Diego",
    apellido: "Rc",
    correo: "diego@example.com",
    rol: "usuario",
    contrasenia: "123456",
    telefono: "987654321",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombre: "Martina",
    apellido: "Code",
    correo: "martina@example.com",
    rol: "usuario",
    contrasenia: "123456",
    telefono: "1122334455",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombre: "Agus",
    apellido: "Js",
    correo: "agus@example.com",
    rol: "usuario",
    contrasenia: "123456",
    telefono: "5544332211",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
  {
    nombre: "Sofia",
    apellido: "Admin",
    correo: "sofia@example.com",
    rol: "admin",
    contrasenia: "123456",
    telefono: "6677889900",
    isDeleted: false,
    deletedBy: null,
    deletedAt: null,
  },
];

async function runSeed() {
  try {
    await conexionBD();

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
