import { eq } from "drizzle-orm";
import { db } from "../db";
import { nfce } from "../db/schema";

export async function getNfceByKey(key: string) {
  try {
    const existingNfce = await db.query.nfce.findFirst({
      where: eq(nfce.key, key),
    });

    return existingNfce;
  } catch (error) {
    console.error(error);
    throw error;
  }
}