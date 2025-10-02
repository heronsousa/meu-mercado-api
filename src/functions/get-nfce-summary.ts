import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { category, nfce, product } from "../db/schema";

export async function getNfceSummary() {
  try {
    const allNfce = await db
      .select({
        id: nfce.id,
        key: nfce.key,
        date: nfce.date,
        store: nfce.store,
        total: nfce.totalPrice,
        productCount: sql<number>`count(${product.id})::int`.as("product_count"),
        categories: sql<string>`coalesce(
          json_agg(
            distinct jsonb_build_object(
              'name', ${category.description},
              'color', ${category.color}
            )
          )::text,
          '[]'
        )`.as("categories"),
      })
      .from(nfce)
      .leftJoin(product, eq(product.nfceId, nfce.id))
      .leftJoin(category, eq(category.id, product.categoryId))
      .groupBy(nfce.id);

    return allNfce.map((nfce) => ({ ...nfce, categories: JSON.parse(nfce.categories) }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}
