import { db } from '../database/connection';
import { product } from '../database/schema';
import { Product } from '../models';
import { v7 as uuidv7 } from 'uuid';

export class ProductRepository {
  async createMany(data: Omit<Product, 'id' | 'createdAt'>[]): Promise<Product[]> {
    if (data.length === 0) return [];

    const productsWithIds = data.map(item => ({
      id: uuidv7(),
      ...item,
    }));

    const newProducts = await db
      .insert(product)
      .values(productsWithIds)
      .returning();

    return newProducts;
  }
}