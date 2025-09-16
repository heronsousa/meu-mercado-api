import express from "express";
import { v7 as uuidv7 } from "uuid";
import { sql } from "drizzle-orm";
import { db } from "../db";
import { parseDate } from "../utils/parseDate";
import { getInvoice } from "../services/infosimples";
import { category, nfce, product } from "../db/schema";

const router = express.Router();

router.post("/", async (req, res) => {
  const { nfce_key } = req.body;

  try {
    const invoice = await getInvoice(nfce_key);

    const [newNfce] = await db.insert(nfce).values({
      id: uuidv7(),
      key: invoice.normalizado_chave_acesso,
      market: invoice.emitente?.nome_fantasia,
      city: invoice.emitente?.municipio.split('-')[1].trim(),
      state: invoice.emitente?.uf,
      neighborhood: invoice.emitente?.bairro,
      date: parseDate(invoice.nfe.data_emissao)!,
      totalPrice: invoice.cobranca.formas_pagamento[0].valor.replace(',', '.'),
      paymentMethod: invoice.cobranca.formas_pagamento[0].meio_pagamento.split('-')[1].trim()
    }).returning();

    if (!newNfce) {
      throw new Error("Failed to create nfce");
    }

    const products = invoice.produtos;
    const categories = await db.select().from(category).orderBy(sql`length(code) desc`);
    
    const newProducts: typeof product.$inferInsert[] = []

    await db.transaction(async (tx) => {
      products.forEach(async (item: any) => {
        const category = categories.find((cat) => item.ncm.startsWith(cat.code));

        const categoryId = category ? category.id : categories[categories.length - 1].id;
  
        const [newProduct] = await tx.insert(product).values({
          id: uuidv7(),
          description: item.descricao,
          ncm: item.ncm,
          price: item.normalizado_valor,
          qtd: item.qtd,
          unity: item.unidade,
          nfceId: newNfce.id,
          categoryId
        }).returning();
        
        if (!newProduct) {
          throw new Error("Failed to create product");
        }

        newProducts.push(newProduct);
      });
    });

    res.json({ ok: true, nfce:  {
      ...newNfce,
      products: newProducts
    }});
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
