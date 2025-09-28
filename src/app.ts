import express, { ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import nfceRouter from "./routes/nfce";
import { RouteNotFoundError } from "./functions/errors/not-found";
import { BaseError } from "./functions/errors/base-error";
import { INTERNAL_ERROR } from "./functions/errors/constants/messages";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/nfce", nfceRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ error: err.message });
  }

  res.status(INTERNAL_ERROR.statusCode).send({
    message: INTERNAL_ERROR.message,
  });
};

app.use(errorHandler);

app.use(async () => {
  throw new RouteNotFoundError();
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
