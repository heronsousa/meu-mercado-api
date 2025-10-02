import express from "express";
import { getInvoice } from "../services/infosimples";
import { createNfce } from "../functions/create-nfce";
import { getNfceByKey } from "../functions/get-nfce-by-key";
import { NfceAlreadyExistsError } from "../functions/errors/nfce-already-exists";
import { StatusCodes } from "../functions/errors/constants/status-code";
import { createProducts } from "../functions/create-products";
import { NfceKeyNotProvidedError } from "../functions/errors/nfce-key-not-provided";
import { getNfceSummary } from "../functions/get-nfce-summary";

import { getDashboardSummary } from "../functions/get-dashboard-summary";
const router = express.Router();

router.post("/", async (req, res) => {
  const { nfce_key } = req.body;

  if (!nfce_key) {
    throw new NfceKeyNotProvidedError();
  }

  const existingNfce = await getNfceByKey(nfce_key);

  if (existingNfce) {
    throw new NfceAlreadyExistsError();
  }

  try {
    const invoice = await getInvoice(nfce_key);

    const newNfce = await createNfce(invoice);

    const products = await createProducts(invoice, newNfce.id);

    res.status(StatusCodes.CREATED).send({
      nfce: {
        ...newNfce,
        products,
      },
    });
  } catch (err: any) {
    console.log("err", err);
    res.status(500).send({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const nfces = await getNfceSummary();
    const dashboardSummary = await getDashboardSummary();

    res.status(StatusCodes.OK).send({
      ...dashboardSummary,
      nfces,
    });
  } catch (err: any) {
    console.log("err", err);
    res.status(500).send({ error: err.message });
  }
});

export default router;
