import { visits } from "../tables"
import { db } from "../init"
import { VisitData } from "../types"

/**
 * Adds visit data to the database.
 * @param {VisitData} data - The visit data to be added.
 * @returns {Promise<boolean>} A promise that resolves to true if the data was added successfully, false otherwise.
 */

export const addVisit = async (data: VisitData): Promise<boolean> => {
  try {
    await db.insert(visits).values(data)
    return true
  } catch (error) {
    console.error("Error adding visit:", error)
    return false
  }
}
