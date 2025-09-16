import { relations, sql } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, numeric } from "drizzle-orm/pg-core";

// TABLES -------------------------------------------------------------------------

export const nfce = pgTable("nfce", {
  id: uuid().primaryKey(),
  key: text().notNull().unique(),
  market: text().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  neighborhood: text().notNull(),
  date: timestamp().notNull(),
  totalPrice: numeric("total_price").notNull(),
  paymentMethod: text("payment_method").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const product = pgTable("product", {
  id: uuid().primaryKey(),
  description: text("").notNull(),
  ncm: text("").notNull(),
  price: numeric("").notNull(),
  qtd: numeric("").notNull(),
  unity: text("").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  nfceId: uuid("nfce_id").notNull().references(() => nfce.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id").notNull().references(() => category.id, { onDelete: "set null" }),
});

export const category = pgTable("category", {
  id: uuid().primaryKey(),
  description: text("").notNull(),
  code: text("").notNull().unique(),
});

// RELATIONS -------------------------------------------------------------------------

export const nfceRelations = relations(nfce, ({ many }) => ({
  products: many(product),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product),
}));

export const productRelations = relations(product, ({ one }) => ({
  nfce: one(nfce,  {
    fields: [product.nfceId],
    references: [nfce.id],
  }),
  category: one(category,  {
    fields: [product.categoryId],
    references: [category.id],
  }),
}));
