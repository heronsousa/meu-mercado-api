import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";

// TABLES -------------------------------------------------------------------------

export const nfce = pgTable("nfce", {
  id: uuid().primaryKey(),
  key: text().notNull().unique(),
  store: text().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  neighborhood: text().notNull(),
  date: timestamp().notNull(),
  totalPrice: numeric("total_price").notNull(),
  paymentMethod: text("payment_method").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const category = pgTable("category", {
  id: uuid("id").primaryKey(),
  description: text().notNull(),
  code: text().notNull().unique(),
  color: text().notNull(),
});

export const product = pgTable("product", {
  id: uuid().primaryKey(),
  description: text().notNull(),
  ncm: text().notNull(),
  price: numeric().notNull(),
  qtd: numeric().notNull(),
  unity: text().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  nfceId: uuid("nfce_id")
    .notNull()
    .references(() => nfce.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "cascade" }),
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// RELATIONS -------------------------------------------------------------------------

export const nfceRelations = relations(nfce, ({ many }) => ({
  products: many(product),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product),
}));

export const productRelations = relations(product, ({ one }) => ({
  nfce: one(nfce, {
    fields: [product.nfceId],
    references: [nfce.id],
  }),
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
}));
