import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { NozzleFormDataType, NozzleInnerRingTypes } from './types';
import { nozzleAssemblyHours } from './data';

export const downloadExcel = async (formData: NozzleFormDataType) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Form Data');

  // Optional: Add a title row
  worksheet.addRow(['Field', 'Value']);

  // Add data rows
  Object.entries(formData).forEach(([key, value]) => {
    worksheet.addRow([key, String(value)]);
  });

  // Generate buffer and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  saveAs(blob, 'form-data.xlsx');
};

export const getClosestDiameter = (inputDiameter: number): number | null => {
  const diameterNumber = Number(inputDiameter);
  if (isNaN(diameterNumber)) return null;

  const diameters = Object.keys(nozzleAssemblyHours).map(Number);
  return diameters.reduce((prev, curr) =>
    Math.abs(curr - diameterNumber) < Math.abs(prev - diameterNumber) ? curr : prev
  );
};

export const calculateOptimaAssemblyHours= (formData: NozzleFormDataType) => {
  let result = 0;
  const selectedDiameter = getClosestDiameter(formData.diameter)

  if (selectedDiameter === null) {
    throw new Error("No matching diameter found");
  }

  const hours = nozzleAssemblyHours[selectedDiameter]
 
  // calculate inner ring
  let innerRingHours = 0
  if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStInside) {
    innerRingHours = hours.innerRingAssembly
    result += innerRingHours;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStRing) {
    innerRingHours = hours.ststRingAssembly
    result += innerRingHours;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stRingAndOutlet) {
    innerRingHours = hours.ststRingAssembly
    result += innerRingHours;
  } 

  // calculate baseplate
  const basePlateHours = hours.basePlateAssembly
  result += basePlateHours

  // calculate inlet profile
  const inletProfileHours = hours.inletProfileAssembly
  result += inletProfileHours

  // // calculate outlet profile (if selected)
  let outletProfileHours = 0;
  if (formData.isOutletRoundbar) {
    outletProfileHours = hours.outletProfileAssembly
    result += outletProfileHours
  }

  // // calculate segments
  const allSegments = formData.ribs * formData.segments + formData.otherTransversePlates * formData.segments
  const segmentsHours = hours.segmentPlateAssembly * allSegments
  result += segmentsHours

  // // calculate ribs and other transversal plates
  const ribsAndTransversalHours = formData.ribs * hours.ribOrTransversalPlateAssembly + formData.otherTransversePlates * hours.ribOrTransversalPlateAssembly
  result += ribsAndTransversalHours

  // // calculate conve plates assembly
  // // for Optima nozzles rows of cone plates = rows of segments + 1
  const rowsHours = hours.conePlatesRowAssembly * formData.segments + hours.conePlatesRowAssembly 
  result += rowsHours

  // // // calculate headbox
  let headboxHours = 0;
  if (formData.isHeadbox) {
    headboxHours = hours.headboxPlateAssembly * formData.allHeadboxPlates
    result += headboxHours
  }

  // // // calculate grinding
  const grindingHours = hours.grinding
  result += grindingHours

  // // //calculate other plates
  const otherHours = formData.otherAssemblyTime
  result += otherHours

  return {
    innerRingHours,
    basePlateHours,
    inletProfileHours,
    outletProfileHours,
    segmentsHours,
    rowsHours,
    headboxHours,
    grindingHours,
    otherHours,
    total: result,
  }
}


