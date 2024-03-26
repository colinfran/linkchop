import { pgTable, varchar, boolean, date, timestamp, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("users", {
  id: varchar("id"),
  name: varchar("name"),
  email: varchar("email"),
  password: varchar("password"),
  created_at: date("created_at"),
  updated_at: date("updated_at"),
})

export const subscriptions = pgTable("subscriptions", {
  subscription_id: varchar("subscription_id"),
  user_id: varchar("user_id"),
  start_date: date("start_date"),
  expiration_day: integer("expiration_day"),
  status: varchar("status"),
  end_date: date("end_date"),
})

export const urls = pgTable("urls", {
  id: varchar("id"),
  original_url: varchar("original_url"),
  user_id: varchar("user_id"),
  created_at: date("created_at"),
})

export const visits = pgTable("visits", {
  id: varchar("id"),
  url_id: varchar("url_id") || "",
  timestamp: date("timestamp"),
  device_type: varchar("device_type"),
  device_model: varchar("device_model"),
  device_vendor: varchar("device_vendor"),
  is_a_bot: boolean("is_a_bot"),
  browser_name: varchar("browser_name"),
  browser_version: varchar("browser_version"),
  engine_name: varchar("engine_name"),
  engine_version: varchar("engine_version"),
  os_name: varchar("os_name"),
  os_version: varchar("os_version"),
})

export const passwordResets = pgTable("password_resets", {
  id: varchar("id"),
  email: varchar("email"),
  expiration: timestamp("expiration", { mode: "date" }),
})
