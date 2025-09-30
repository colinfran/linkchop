// lib/getFile.ts
import fs from "fs/promises";
import path from "path";

/**
 * Reads and parses a local JSON file from the project root.
 * @param filename - The name of the JSON file (e.g., "data.json")
 * @returns Parsed JSON object
 */
export async function getFile<T = unknown>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), filename);
  const fileData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileData) as T;
}
