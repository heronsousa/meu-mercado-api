import { v7 as uuidv7 } from "uuid";
import { product } from "../db/schema";
import { NFCE } from "../types/nfce";

export async function createProduct(
  item: NFCE['produtos'][number],
  tx: any,
  nfceId: string,
  categoryId: string
) {
  try {
    const [newProduct] = await tx
      .insert(product)
      .values({
        id: uuidv7(),
        description: item.descricao,
        ncm: item.ncm,
        price: item.normalizado_valor,
        qtd: item.qtd,
        unity: item.unidade,
        nfceId,
        categoryId,
      })
      .returning();

    return newProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}