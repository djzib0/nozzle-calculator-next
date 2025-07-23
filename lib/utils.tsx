import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { NozzleFormDataType, NozzleInnerRingTypes, NozzleProfiles, ResultType } from './types';
import { nozzleAssemblyHours } from './data';

export const downloadExcel = async (
  result: ResultType | null | undefined, 
  formData: NozzleFormDataType
) => {
  if (result && formData) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Form Data');

    // Add a title row for parameters
    const headerParametersRow = worksheet.addRow(['Parameters', 'Value']);
    headerParametersRow.font = { bold: true };

    console.log(formData.nozzleInnerRingType, " in excel function")

    worksheet.addRow(["Profile", formData.nozzleProfile]);
    worksheet.addRow(["Inner ring type", formData.nozzleInnerRingType]);
    worksheet.addRow(["Diameter", formData.diameter]);
    worksheet.addRow(["Segments rows", formData.segments]);
    worksheet.addRow(["Cone plates rows", formData.coneRows]);
    worksheet.addRow(["Ribs", formData.ribs]);
    worksheet.addRow(["Other transverse plates", formData.otherTransversePlates]);
    worksheet.addRow(["Headbox?", formData.isHeadbox ? "Yes": "No"]);
    worksheet.addRow(["Headbox plates", formData.isHeadbox ? formData.allHeadboxPlates: "N/A"]);
    worksheet.addRow(["Outlet pipe", formData.isOutletRoundbar ? "Yes": "No"]);
    worksheet.addRow(["Other assembly time", formData.otherAssemblyTime]);
      
    // Add empty row
    worksheet.addRow([])

    // Add a title row for results
    const headerResultsRow = worksheet.addRow(['Operation', 'Hours [h]']);
    headerResultsRow.font = { bold: true };
  
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
    const totalResultRow = worksheet.addRow(["Total", result.total])

    // set styles 
    worksheet.getColumn(1).width = 23;
    worksheet.getColumn(2).width = Number(formData.nozzleProfile.length) + 10;
    worksheet.getColumn(2).alignment = {horizontal: "center"}
    totalResultRow.getCell(1).border = {top: {style: "thin"}}
    totalResultRow.getCell(2).border = {top: {style: "thin"}}
    totalResultRow.getCell(1).font = { bold: true };
    totalResultRow.getCell(2).font = { bold: true };

    // Generate buffer and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    saveAs(blob, 'form-data.xlsx');
  };
};

export const handleExcelUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.getWorksheet('Form Data');

  if (worksheet) {
    const getCellValue = (rowNumber: number, col = 2): number =>
      Number(worksheet.getRow(rowNumber).getCell(col).value) || 0;

    const getCellText = (rowNumber: number, col = 2): string =>
      worksheet.getRow(rowNumber).getCell(col).text?.toString().trim().toLowerCase() || "";

    const profileNameFromExcel  = getCellText(2).toLowerCase();
    const nozzleInnerRingTypeFromExcel = getCellText(3).toLowerCase();
    const diameter = getCellValue(4);
    const segments = getCellValue(5);
    const coneRows = getCellValue(6);
    const ribs = getCellValue(7);
    const otherTransversePlates = getCellValue(8);
    const isHeadbox = getCellText(9) === "yes" ? true: false;
    const allHeadboxPlates = getCellValue(10);
    const isOutletRoundbar = getCellText(11) === "yes" ? true: false;
    const otherAssemblyTime = getCellValue(12)

    const matchedProfile = Object.values(NozzleProfiles).find(
      (profile) => profile.toLowerCase() === profileNameFromExcel 
    );

    const matchedInnerRingType = Object.values(NozzleInnerRingTypes).find(
      (innerRingType) => innerRingType.toLocaleLowerCase() === nozzleInnerRingTypeFromExcel
    )

    // Fallback if not found
    const nozzleProfile: NozzleProfiles = matchedProfile as NozzleProfiles ?? NozzleProfiles.optima;
    const nozzleInnerRingType: NozzleInnerRingTypes = matchedInnerRingType as NozzleInnerRingTypes.stStInside;

    console.log(nozzleProfile)


    const newFormData: NozzleFormDataType = {
      nozzleProfile,
      nozzleInnerRingType,
      diameter,
      segments,
      coneRows,
      ribs,
      otherTransversePlates,
      isHeadbox,
      allHeadboxPlates,
      isOutletRoundbar,
      otherAssemblyTime,
    };

    return newFormData

  };

  return null
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


