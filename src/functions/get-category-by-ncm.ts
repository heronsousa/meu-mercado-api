import { desc, sql } from "drizzle-orm";
import { category } from "../db/schema";
import { db } from "../db";

export async function getCategoryByNcm(ncm: string) {
  try {
    const [existingCategory] = await db
      .select()
      .from(category)
      .where(sql`${ncm} LIKE ${sql`${category.code} || '%'`}`)
      .orderBy(desc(sql`length(${category.code})`))
      .limit(1);

    return existingCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
}