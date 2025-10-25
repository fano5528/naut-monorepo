import {
  pgTable,
  integer as int,
  varchar,
  json,
  text,
  boolean,
  serial,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const cmsType = pgTable(
  "cmsType",
  {
    id: serial("id").primaryKey(),
    uid: varchar("uid", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: text("description").notNull(),
    tagline: text("tagline"),
    siteDomain: varchar("siteDomain", { length: 191 }).notNull().references(() => site.domain, { onDelete: "cascade", onUpdate: "cascade" }),
    spacer: boolean("spacer").default(false).notNull(),
    categorySpacer: boolean("categorySpacer").default(false).notNull(),
    homeSpacer: boolean("homeSpacer").default(false).notNull(),
    invertHeaderColor: boolean("invertHeaderColor").default(false).notNull(),
    categoryInvertHeaderColor: boolean("categoryInvertHeaderColor").default(false).notNull(),
    homeInvertHeaderColor: boolean("homeInvertHeaderColor").default(false).notNull(),
    entryComponentName: varchar("entryComponentName", { length: 191 }).references(() => component.name, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    categoryComponentName: varchar("categoryComponentName", { length: 191 }).references(() => component.name, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
    homeComponentName: varchar("homeComponentName", { length: 191 }).references(() => component.name, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
  }
);

export const cmsCategory = pgTable(
  "cmsCategory",
  {
    id: serial("id").primaryKey(),
    typeId: int("typeId").notNull().references(() => cmsType.id, { onDelete: "cascade", onUpdate: "cascade" }),
    name: varchar("name", { length: 191 }).notNull(),
    description: text("description").notNull(),
  }
);

export const cmsField = pgTable(
  "cmsField",
  {
    id: serial("id").primaryKey(),
    cmsTypeId: int("cmsTypeId").notNull().references(() => cmsType.id, { onDelete: "cascade", onUpdate: "cascade" }),
    uid: varchar("uid", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    type: varchar("type", { length: 191 }).notNull(),
    blockPropMappedTo: varchar("blockPropMappedTo", { length: 191 }).notNull(),
  }
);

export const cmsEntry = pgTable(
  "cmsEntry",
  {
    id: serial("id").primaryKey(),
    cmsTypeId: int("cmsTypeId").notNull().references(() => cmsType.id, { onDelete: "cascade", onUpdate: "cascade" }),
    createdAt: timestamp("createdAt").notNull(),
    publishedAt: timestamp("publishedAt"),
  }
);

export const cmsEntryCategory = pgTable(
  "cmsEntryCategory",
  {
    id: serial("id").primaryKey(),
    cmsEntryId: int("cmsEntryId").notNull().references(() => cmsEntry.id, { onDelete: "cascade", onUpdate: "cascade" }),
    cmsCategoryId: int("cmsCategoryId").notNull().references(() => cmsCategory.id, { onDelete: "cascade", onUpdate: "cascade" }),
  }
);

export const cmsEntryContent = pgTable(
  "cmsEntryContent",
  {
    id: serial("id").primaryKey(),
    cmsEntryId: int("cmsEntryId").notNull().references(() => cmsEntry.id, { onDelete: "cascade", onUpdate: "cascade" }),
    cmsFieldId: int("cmsFieldId").notNull().references(() => cmsField.id, { onDelete: "cascade", onUpdate: "cascade" }),
    value: json("value").notNull(),
  }
);

export const block = pgTable(
  "Block",
  {
    id: serial("id").primaryKey(),
    pageId: int("pageId").notNull().references(() => page.id, { onDelete: "cascade", onUpdate: "cascade" }),
    componentName: varchar("componentName", { length: 191 }).notNull().references(() => component.name, { onDelete: "cascade", onUpdate: "cascade" }),
    order: int("order").notNull(),
  },
  (table) => {
    return {
     uniqueOrderInPage: unique("Block_pageId_order_key").on(table.pageId, table.order)
    };
  }
);

export const component = pgTable(
  "Component",
  {
    name: varchar("name", { length: 191 }).notNull().primaryKey(),
    type: varchar("type", { length: 191 }).notNull(),
  }
);

export const content = pgTable(
  "Content",
  {
    id: serial("id").notNull().primaryKey(),
    blockId: int("blockId").notNull().references(() => block.id, { onDelete: "cascade", onUpdate: "cascade" }),
    fieldId: int("fieldId").notNull().references(() => field.id, { onDelete: "cascade", onUpdate: "cascade" }),
    value: json().notNull(),
  },
  (table) => {
    return {
      uniqueFieldInBlock: unique("Content_blockId_fieldId_key").on(table.blockId, table.fieldId)
    };
  }
);

export const field = pgTable(
  "Field",
  {
    id: serial("id").primaryKey(),
    componentName: varchar("componentName", { length: 191 }).notNull().references(() => component.name, { onDelete: "cascade", onUpdate: "cascade" }),
    name: varchar("name", { length: 191 }).notNull(),
    type: varchar("type", { length: 191 }).notNull(),
    structure: json("structure").notNull().default("{}"),
  }
);

export const footerContent = pgTable(
  "FooterContent",
  {
    id: serial("id").primaryKey(),
    siteDomain: varchar("siteDomain", { length: 191 }).notNull().references(() => site.domain, { onDelete: "cascade", onUpdate: "cascade" }),
    fieldId: int("fieldId").notNull().references(() => field.id, { onDelete: "cascade", onUpdate: "cascade" }),
    value: json("value").notNull(),
  }
);

export const headerContent = pgTable(
  "HeaderContent",
  {
    id: serial("id").primaryKey(),
    siteDomain: varchar("siteDomain", { length: 191 }).notNull().references(() => site.domain, { onDelete: "cascade", onUpdate: "cascade" }),
    fieldId: int("fieldId").notNull().references(() => field.id, { onDelete: "cascade", onUpdate: "cascade" }),
    value: json().notNull(),
  }
);

export const image = pgTable(
  "Image",
  {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 191 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
    url: varchar("url", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
  }
);

export const page = pgTable(
  "Page",
  {
    id: serial("id").primaryKey(),
    siteDomain: varchar("siteDomain", { length: 191 }).notNull().references(() => site.domain, { onDelete: "cascade", onUpdate: "cascade" }),
    route: varchar("route", { length: 191 }).notNull(),
    title: varchar("title", { length: 191 }).notNull(),
    description: text("description").notNull(),
    header: boolean("header").default(true).notNull(),
    footer: boolean("footer").default(true).notNull(),
    spacer: boolean("spacer").default(false).notNull(),
    invertHeaderColor: boolean("invertHeaderColor").default(false).notNull(),
  },
  (table) => {
    return {
      siteDomainRouteKey: unique("Page_siteDomain_route_key").on(
        table.siteDomain,
        table.route
      ),
    };
  }
);

export const site = pgTable(
  "Site",
  {
    domain: varchar("domain", { length: 191 }).primaryKey(),
    userId: varchar("userId", { length: 191 }).notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
    name: varchar("name", { length: 191 }).notNull(),
    footerComponentName: varchar("footerComponentName", { length: 191 }).notNull().references(() => component.name, { onDelete: "cascade", onUpdate: "cascade" }),
    headerComponentName: varchar("headerComponentName", { length: 191 }).notNull().references(() => component.name, { onDelete: "cascade", onUpdate: "cascade" }),
    backgroundColor1: varchar("backgroundColor1", { length: 191 })
      .default("#f2f2f2")
      .notNull(),
    backgroundColor2: varchar("backgroundColor2", { length: 191 })
      .default("#e5e7eb")
      .notNull(),
    color1: varchar("color1", { length: 191 }).default("#fb3640").notNull(),
    color1Hover: varchar("color1Hover", { length: 191 })
      .default("#db1620")
      .notNull(),
    color2: varchar("color2", { length: 191 }),
    color2Hover: varchar("color2Hover", { length: 191 }),
    color3: varchar("color3", { length: 191 }),
    color3Hover: varchar("color3Hover", { length: 191 }),
    footerBackgroundColor: varchar("footerBackgroundColor", { length: 191 })
      .default("#d4d4d8")
      .notNull(),
    footerTextColor: varchar("footerTextColor", { length: 191 })
      .default("#71717a")
      .notNull(),
    textColor: varchar("textColor", { length: 191 })
      .default("#52525b")
      .notNull(),
    titleColor: varchar("titleColor", { length: 191 })
      .default("#050C0F")
      .notNull(),
    headerBackgroundColor: varchar("headerBackgroundColor", { length: 191 })
      .default("#ffffff")
      .notNull(),
    font2: varchar("font2", { length: 191 }),
    font3: varchar("font3", { length: 191 }),
    sansFont: varchar("sansFont", { length: 191 }).default("bergern").notNull(),
    icon: varchar("icon", { length: 191 })
      .default("https://internaut.nyc3.cdn.digitaloceanspaces.com/favicon.ico")
      .notNull(),
    deploymentId: varchar("deploymentId", { length: 191 }),
    projectId: varchar("projectId", { length: 191 }),
    googleId: varchar("googleId", { length: 191 }),
    metaId: varchar("metaId", { length: 191 }),
  }
);

export const subdomain = pgTable(
  "Subdomain",
  {
    subdomain: varchar("subdomain", { length: 191 }).primaryKey(),
    siteDomain: varchar("siteDomain", { length: 191 }).notNull().references(() => site.domain, { onDelete: "cascade", onUpdate: "cascade" }),
  },
);

export const user = pgTable(
  "User",
  {
    id: varchar("id", { length: 191 }).primaryKey(),
    stripeCustomerId: varchar("stripeCustomerId", { length: 191 })
  }
);

// Add relations for cmsEntry
export const cmsEntryRelations = relations(cmsEntry, ({ many }) => ({
  categories: many(cmsEntryCategory),
  contents: many(cmsEntryContent),
}));

// Add relations for cmsEntryCategory
export const cmsEntryCategoryRelations = relations(cmsEntryCategory, ({ one }) => ({
  entry: one(cmsEntry, {
    fields: [cmsEntryCategory.cmsEntryId],
    references: [cmsEntry.id],
  }),
  category: one(cmsCategory, {
    fields: [cmsEntryCategory.cmsCategoryId],
    references: [cmsCategory.id],
  }),
}));

// Add relations for cmsEntryContent
export const cmsEntryContentRelations = relations(cmsEntryContent, ({ one }) => ({
  entry: one(cmsEntry, {
    fields: [cmsEntryContent.cmsEntryId],
    references: [cmsEntry.id],
  }),
  field: one(cmsField, {
    fields: [cmsEntryContent.cmsFieldId],
    references: [cmsField.id],
  }),
}));

// Add relations for cmsCategory
export const cmsCategoryRelations = relations(cmsCategory, ({ many }) => ({
  entryCategories: many(cmsEntryCategory),
}));