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
  if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStInside) {
    result += hours.innerRingAssembly;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStRing) {
    result += hours.ststRingAssembly;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stRingAndOutlet) {
    result += hours.ststRingAssembly;
  } 

  // calculate baseplate
  result += hours.basePlateAssembly

  // calculate inlet profile
  result += hours.inletProfileAssembly

  // calculate outlet profile (if selected)
  if (formData.isOutletRoundbar) {
    result += hours.outletProfileAssembly
  }

  // calculate segments
  result += hours.segmentPlateAssembly * (formData.ribs + formData.otherTransversePlates) * formData.segments

  // calculate ribs and other transversal plates
  result += hours.ribOrTransversalPlateAssembly * (formData.ribs + formData.otherTransversePlates)

  // calculate conve plates assembly
  // for Optima nozzles rows of cone plates = rows of segments + 1
  result += hours.conePlatesRowAssembly * (formData.segments + 1)

  // calculate headbox
  if (formData.isHeadbox) {
    result += hours.headboxPlateAssembly * formData.allHeadboxPlates
  }

  // calculate grinding
  result += hours.grinding

  //calculate other plates
  result += Number(formData.otherAssemblyTime)


  return result
}

