import { sql } from "drizzle-orm";
import { db } from "../db";
import { nfce } from "../db/schema";

export async function getDashboardSummary() {
  try {
    const [dashboard] = await db
      .select({
        invoiceCount: sql<number>`count(distinct ${nfce.id})::int`,
        totalAmount: sql<number>`coalesce(sum(${nfce.totalPrice}), 0)::numeric(10,2)`,
        averageValue: sql<number>`coalesce(avg(${nfce.totalPrice}), 0)::numeric(10,2)`,
      })
      .from(nfce);

    return dashboard;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
