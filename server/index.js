import express from "express";
import morgan from "morgan";
import path from "path";
import cors from 'cors';
import paymentRoutes from "./routes/payment.routes.js";
import { config } from "dotenv";

config(); // Cargar variables de entorno

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-eval'"
  );
  next();
});

app.use(morgan("dev"));
app.use(express.json());

app.use(paymentRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.listen(3001, () => {
  console.log("Servidor backend en http://localhost:3001");
});
