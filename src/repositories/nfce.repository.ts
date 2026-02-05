import { eq, sql } from 'drizzle-orm';
import { db } from '../database/connection';
import { nfce, product, category } from '../database/schema';
import { Nfce, NfceSummaryResponse } from '../models';
import { v7 as uuidv7 } from 'uuid';

export class NfceRepository {
  async create(data: Omit<Nfce, 'id' | 'createdAt'>): Promise<Nfce> {
    const [newNfce] = await db
      .insert(nfce)
      .values({
        id: uuidv7(),
        ...data,
      })
      .returning();

    return newNfce;
  }

  async findByKey(key: string): Promise<Nfce | null> {
    const [result] = await db
      .select()
      .from(nfce)
      .where(eq(nfce.key, key))
      .limit(1);

    return result || null;
  }

  async getSummary(): Promise<NfceSummaryResponse> {
    const [dashboard] = await db
      .select({
        invoiceCount: sql<number>`count(distinct ${nfce.id})::int`,
        totalAmount: sql<number>`coalesce(sum(${nfce.totalPrice}), 0)::numeric(10,2)`,
        averageValue: sql<number>`coalesce(avg(${nfce.totalPrice}), 0)::numeric(10,2)`,
      })
      .from(nfce);

    const allNfce = await db
      .select({
        id: nfce.id,
        key: nfce.key,
        date: nfce.date,
        store: nfce.store,
        total: nfce.totalPrice,
        productCount: sql<number>`count(${product.id})::int`.as('product_count'),
        categories: sql<string>`coalesce(
          json_agg(
            distinct jsonb_build_object(
              'name', ${category.description},
              'color', ${category.color}
            )
          )::text,
          '[]'
        )`.as('categories'),
      })
      .from(nfce)
      .leftJoin(product, eq(product.nfceId, nfce.id))
      .leftJoin(category, eq(category.id, product.categoryId))
      .groupBy(nfce.id);

    return {
      ...dashboard,
      nfces: allNfce.map((nfce) => ({ 
        ...nfce, 
        categories: JSON.parse(nfce.categories) 
      })),
    };
  }
}