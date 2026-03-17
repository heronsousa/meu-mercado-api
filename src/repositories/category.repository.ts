import { db } from '../database/connection';
import { category } from '../database/schema';
import { Category } from '../models';
import { v7 as uuidv7 } from 'uuid';
import { eq, sql, desc } from 'drizzle-orm';

export class CategoryRepository {
  async findAll(): Promise<Category[]> {
    return await db.select().from(category);
  }

  async findByCode(code: string): Promise<Category | null> {
    const [result] = await db
      .select()
      .from(category)
      .where(eq(category.code, code))
      .limit(1);
    
    return result || null;
  }

  async findByNcm(ncm: string): Promise<Category | null> {
    const [result] = await db
      .select()
      .from(category)
      .where(sql`${ncm} LIKE ${sql`${category.code} || '%'`}`)
      .orderBy(desc(sql`length(${category.code})`))
      .limit(1);

    return result || null;
  }

  async findDefault(): Promise<Category> {
    const [result] = await db
      .select()
      .from(category)
      .where(eq(category.code, '-'))
      .limit(1);

    if (!result) {
      throw new Error('Default category not found. Run migrations first.');
    }

    return result;
  }

  async create(data: Omit<Category, 'id'>): Promise<Category> {
    const [newCategory] = await db
      .insert(category)
      .values({
        id: uuidv7(),
        ...data,
      })
      .returning();

    return newCategory;
  }
}