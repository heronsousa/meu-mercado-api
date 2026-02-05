import express from "express";
import { nfceController } from "../container";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    await nfceController.create(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    await nfceController.getSummary(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
