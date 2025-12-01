import admin from "firebase-admin";
import dotenv from "dotenv";

// Solo cargar .env en desarrollo local, no en producción (Vercel)
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

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
    )}. El login social y otras funciones de Admin podrían fallar.`
  );
} else {
  try {
    if (!admin.apps.length) {
      const serviceAccountConfig = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountConfig),
      });
      console.log("🔥 Firebase Admin inicializado correctamente");
    }
  } catch (error) {
    console.error("❌ Error al inicializar Firebase Admin:", error);
  }
}

export default admin;
