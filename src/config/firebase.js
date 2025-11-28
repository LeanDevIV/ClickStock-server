import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Verificar si las variables de entorno necesarias están definidas
const requiredEnvVars = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
];

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  console.warn(
    `⚠️ Faltan variables de entorno de Firebase: ${missingEnvVars.join(
      ", "
    )}. El login social no funcionará.`
  );
} else {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
      });
      console.log("🔥 Firebase Admin inicializado correctamente");
    }
  } catch (error) {
    console.error("❌ Error al inicializar Firebase Admin:", error);
  }
}

export default admin;
