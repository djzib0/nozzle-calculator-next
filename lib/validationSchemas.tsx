import { z } from 'zod'

export const nozzleFormDataSchema = z.object({
  nozzleProfile: z.string(),
  nozzleInnerRingType: z.string(),
  diameter: z.number().min(450, 'Diameter must be greater than 400').max(5100, 'Diameter must be lesser than 5100'),
  segments: z.number().min(0),
  coneRows: z.number().min(1, 'Cone rows must be greater than one.'),
  ribs: z.number().min(0, 'Ribs must be 0 or more'),
  otherTransversePlates: z.number().min(0, 'Must be 0 or more'),
  isHeadbox: z.boolean(),
  allHeadboxPlates: z.number().min(0, 'Must be 0 or more'),
  isOutletProfile: z.boolean(),
  otherAssemblyTime: z.number().min(0, 'Assembly time must be 0 or more'),
})
