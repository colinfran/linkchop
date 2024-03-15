import { visits } from "../tables"
import { db } from "../init"

type VisitData = {
  url_id: string
  device_type: string | undefined
  device_model: string | undefined
  device_vendor: string | undefined
  is_a_bot: boolean | undefined
  browser_name: string | undefined
  browser_version: string | undefined
  engine_name: string | undefined
  engine_version: string | undefined
  os_name: string | undefined
  os_version: string | undefined
}

export const addVisit = async (data: VisitData): Promise<boolean> => {
  try {
    await db.insert(visits).values(data)
    return true
  } catch (error) {
    console.error("Error adding visit:", error)
    return false
  }
}
