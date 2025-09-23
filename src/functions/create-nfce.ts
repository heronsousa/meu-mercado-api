import { db } from "../db";
import { nfce } from "../db/schema";
import { NFCE } from "../types/nfce";
import { parseDate } from "../utils/parseDate";
import { v7 as uuidv7 } from "uuid";

export async function createNfce(invoice: NFCE) {
  try {
    const [newNfce] = await db
      .insert(nfce)
      .values({
        id: uuidv7(),
        key: invoice.normalizado_chave_acesso,
        store: invoice.emitente?.nome_fantasia,
        city: invoice.emitente?.municipio.split("-")[1].trim(),
        state: invoice.emitente?.uf,
        neighborhood: invoice.emitente?.bairro,
        date: parseDate(invoice.nfe.data_emissao)!,
        totalPrice: invoice.cobranca.formas_pagamento[0].valor.replace(
          ",",
          "."
        ),
        paymentMethod: invoice.cobranca.formas_pagamento[0].meio_pagamento
          .split("-")[1]
          .trim(),
      })
      .returning();

    return newNfce;
  } catch (error) {
    console.error(error);
    throw error;
  }
}