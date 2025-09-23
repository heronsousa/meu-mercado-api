import { db } from "../db";
import { category, product } from "../db/schema";
import { NFCE } from "../types/nfce";
import { createProduct } from "./create-product";
import { getCategoryByNcm } from "./get-category-by-ncm";

export async function createProducts(invoice: NFCE, newNfceId: string) {
  try {
    let newProducts: (typeof product.$inferSelect & {
      category: typeof category.$inferSelect;
    })[] = [];
  
    await db.transaction(async (tx) => {
      const products = invoice.produtos;
  
      for (const item of products) {
        const productCategory = await getCategoryByNcm(item.ncm);
  
        const categoryToUse =
          productCategory ?? (await tx.query.category.findFirst());
  
        const newProduct = await createProduct(
          item,
          tx,
          newNfceId,
          categoryToUse?.id
        );
  
        newProducts.push({
          ...newProduct,
          category: categoryToUse,
        });
      }
    });
  
    return newProducts;
  } catch (error) {
    
  }
}