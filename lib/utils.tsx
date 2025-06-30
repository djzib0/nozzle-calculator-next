import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { NozzleFormDataType, NozzleInnerRingTypes, ResultType } from './types';
import { nozzleAssemblyHours } from './data';

export const downloadExcel = async (result: ResultType | null | undefined) => {
  if (result) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Form Data');
  
    // Add a title row
    const headerRow = worksheet.addRow(['Operation', 'Hours [h]']);
    headerRow.font = { bold: true };
  
    // Add data rows
    worksheet.addRow(["Inner ring", result.innerRingHours]);
    worksheet.addRow(["Base plate", result.basePlateHours]);
    worksheet.addRow(["Inlet profile", result.inletProfileHours]);
    worksheet.addRow(["Outlet profile", result.outletProfileHours]);
    worksheet.addRow(["Segments", result.segmentsHours]);
    worksheet.addRow(["Ribs/transversal plates", result.ribsAndTransversalHours]);
    worksheet.addRow(["Cone plates", result.coneRowsHours]);
    worksheet.addRow(["Headbox", result.headboxHours]);
    worksheet.addRow(["Grinding", result.grindingHours]);
    worksheet.addRow(["Other", result.otherHours]);
    // Object.entries(result).forEach(([key, value]) => {
    //   worksheet.addRow([key, value]);
    // });
  
    // Generate buffer and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    saveAs(blob, 'form-data.xlsx');
  }
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

  // // calculate cone plates assembly

  const coneRowsHours = hours.conePlatesRowAssembly * formData.coneRows
  result += coneRowsHours

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
  const otherHours = Number(formData.otherAssemblyTime)
  result += otherHours

  return {
    innerRingHours,
    basePlateHours,
    inletProfileHours,
    outletProfileHours,
    segmentsHours,
    ribsAndTransversalHours,
    coneRowsHours,
    headboxHours,
    grindingHours,
    otherHours,
    total: result,
  }
}


