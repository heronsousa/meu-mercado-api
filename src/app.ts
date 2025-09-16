import express from "express";
import dotenv from "dotenv";
import nfceRouter from "./routes/nfce";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/nfce", nfceRouter);

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
