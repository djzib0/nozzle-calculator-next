import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { NozzleFormDataType, NozzleInnerRingTypes, NozzleProfiles, AssemblyResultType, WeldingResultType } from './types';
import { inletDiameterRatio, inletOrOutletWelding, innerRingWelding, nozzleAssemblyHours, outletDiameterRatio, filletWeld, conePlatesWelding } from './nozzlesCalculatorData';

export const downloadExcel = async (
  result: AssemblyResultType | null | undefined, 
  weldingResult: WeldingResultType | null | undefined,
  formData: NozzleFormDataType
) => {

  
  if (result && weldingResult && formData) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Form Data');

    // Add project info
    worksheet.addRow(["DMCNL project ref.", formData.dmcnlProjectRef]);
    worksheet.addRow(["Internal project ref.", formData.internalProjectRef]);
    worksheet.addRow(["Client project ref.", formData.clientRef]);

    // Merge cells to save project comment
    worksheet.mergeCells(1, 3, 3, 4);

    // Save comment
    const projectDescriptionCell = worksheet.getCell(1, 3) // C1
    projectDescriptionCell.value = formData.projectDescription

    // Format comment cell
    projectDescriptionCell.alignment = { wrapText: true, vertical: "top", horizontal: "left" };

    // Add empty row
    worksheet.addRow([])

    // Add a title row for parameters
    const headerParametersRow = worksheet.addRow(['Parameters', 'Value']);
    headerParametersRow.font = { bold: true };

    // Add data from formData

    worksheet.addRow(["Profile", formData.nozzleProfile]);
    worksheet.addRow(["Inner ring type", formData.nozzleInnerRingType, "Thickness [mm]", Number(formData.nozzleInnerRingThickness)]);
    worksheet.addRow(["Diameter [mm]", Number(formData.diameter)]);
    worksheet.addRow(["Profile height [mm]", Number(formData.ProfileHeightHelp)]);
    worksheet.addRow(["Weight [kg]", Number(formData.weight)]);
    worksheet.addRow(["Segments rows", Number(formData.segments), "Thickness [mm]", Number(formData.segmentsThickness)]);
    worksheet.addRow(["Cone plates rows", Number(formData.coneRows), "Thickness [mm]", Number(formData.coneThickness)]);
    worksheet.addRow(["Ribs", Number(formData.ribs), "Thickness [mm]", Number(formData.ribsThickness)]);
    worksheet.addRow(["Other transverse plates", Number(formData.otherTransversePlates), "Thickness [mm]", Number(formData.otherTransversePlatesThickness)]);
    worksheet.addRow(["Headbox?", formData.isHeadbox ? "Yes": "No"]);
    worksheet.addRow(["Headbox plates", formData.isHeadbox ? formData.allHeadboxPlates: "N/A"]);
    worksheet.addRow(["Headbox side plates", Number(formData.headboxSidePlates), "Thickness [mm]", Number(formData.headboxSidePlatesThickness)]);
    worksheet.addRow(["Outlet pipe", formData.isOutletProfile ? "Yes": "No"]);
    worksheet.addRow(["Other assembly time [h]", formData.otherAssemblyTime, formData.otherAssemblyTimeComment]);
    worksheet.addRow(["Other welding time [h]", formData.otherWeldingTime, formData.otherWeldingTimeComment]);
    worksheet.addRow(["Other carbon wire [kg]", formData.otherCarbonWire, formData.otherCarbonWireComment]);
    worksheet.addRow(["Other st. st. wire [kg]", formData.otherStainlessWire, formData.otherStainlessWireComment]);

    // Add empty row
    worksheet.addRow([])

    // Add a title row for results
    let headerTitle = worksheet.addRow(['Assembly']);
    let headerResultsRow = worksheet.addRow(['Operation', 'Hours [h]']);
    headerTitle.font = { bold: true, size: 12 };
    headerResultsRow.font = { bold: true };
  
    // Add data rows for assembly result
    worksheet.addRow(["Inner ring", result.innerRingHours]);
    worksheet.addRow(["Base plate", result.basePlateHours]);
    worksheet.addRow(["Inlet profile", result.inletProfileHours]);
    worksheet.addRow(["Outlet profile", result.outletProfileHours]);
    worksheet.addRow(["Segments", result.segmentsHours]);
    worksheet.addRow(["Ribs/transverse plates", result.ribsAndTransversalHours]);
    worksheet.addRow(["Cone plates", result.coneRowsHours]);
    worksheet.addRow(["Headbox", result.headboxHours]);
    worksheet.addRow(["Grinding", result.grindingHours]);
    worksheet.addRow(["Other", result.otherHours]);
    const totalResultRow = worksheet.addRow(["Total", result.total])

    // Add empty row
    worksheet.addRow([])

    // Add a title row for results
    headerTitle = worksheet.addRow(['Welding']);
    headerResultsRow = worksheet.addRow(['Name', 'Carbon wire [kg]', 'Stainless wire [kg]', 'Manual welding time [hr]', 'Manipulator welding time [hr]']);
    headerTitle.font = { bold: true, size: 12 };
    headerResultsRow.font = { bold: true };
    headerResultsRow.alignment = {wrapText: true}
    
    // Add data rows for welding results
    const resultDetails = weldingResult.details
    worksheet.addRow(
      [
        "Inner ring", 
        Number(resultDetails.innerRingWelding.carbonSteelWire),
        Number(resultDetails.innerRingWelding.stainlessSteelWire),
        Number(resultDetails.innerRingWelding.manualWeldingTime),
        Number(resultDetails.innerRingWelding.manipulatorWeldingTime),
      ]
    );
    worksheet.addRow(
      [
        "Segments", 
        Number(resultDetails.segmentsWelding.carbonSteelWire),
        Number(resultDetails.segmentsWelding.stainlessSteelWire),
        Number(resultDetails.segmentsWelding.manualWeldingTime),
        Number(resultDetails.segmentsWelding.manipulatorWeldingTime),
      ]
    );
    worksheet.addRow(
      [
        "Inlet", 
        Number(resultDetails.inletWelding.carbonSteelWire),
        Number(resultDetails.inletWelding.stainlessSteelWire),
        Number(resultDetails.inletWelding.manualWeldingTime),
        Number(resultDetails.inletWelding.manipulatorWeldingTime),
      ]
    );
    worksheet.addRow(
      [
        "Outlet", 
        Number(resultDetails.outletWelding.carbonSteelWire),
        Number(resultDetails.outletWelding.stainlessSteelWire),
        Number(resultDetails.outletWelding.manualWeldingTime),
        Number(resultDetails.outletWelding.manipulatorWeldingTime),
      ]
    );
    worksheet.addRow(
      [
        "Ribs", 
        Number(resultDetails.ribsWelding.carbonSteelWire),
        Number(resultDetails.ribsWelding.stainlessSteelWire),
        Number(resultDetails.ribsWelding.manualWeldingTime),
        Number(resultDetails.ribsWelding.manipulatorWeldingTime),
      ]
    );
    worksheet.addRow(
      [
        "Cone plates", 
        Number(resultDetails.conePlatesWelding.carbonSteelWire),
        Number(resultDetails.conePlatesWelding.stainlessSteelWire),
        Number(resultDetails.conePlatesWelding.manualWeldingTime),
        Number(resultDetails.conePlatesWelding.manipulatorWeldingTime),
      ]
    );
    worksheet.addRow(
      [
        "Headbox", 
        Number(resultDetails.headboxWelding.carbonSteelWire),
        Number(resultDetails.headboxWelding.stainlessSteelWire),
        Number(resultDetails.headboxWelding.manualWeldingTime),
        Number(resultDetails.headboxWelding.manipulatorWeldingTime),
      ]
    );
    worksheet.addRow(
      [
        "Other", 
        Number(formData.otherCarbonWire),
        Number(formData.otherStainlessWire),
        Number(formData.otherWeldingTime),
        Number(0),
      ]
    );

    const totalWeldingResultRow = worksheet.addRow(
      [
        "Total", 
        Number(weldingResult.carbonSteelWire), 
        Number(weldingResult.stainlessSteelWire),
        Number(weldingResult.manualWeldingHours),
        Number(weldingResult.manipulatorWeldingHours),
      ]
    );

    // set styles 
    worksheet.getColumn(1).width = 23;
    worksheet.getColumn(2).width = Number(Number(formData.nozzleProfile.length) + 10);
    worksheet.getColumn(2).alignment = {horizontal: "center"}
    worksheet.getColumn(3).width = 14;
    worksheet.getColumn(4).width = 14;
    worksheet.getColumn(5).width = 14;
    totalResultRow.getCell(1).border = {top: {style: "thin"}}
    totalResultRow.getCell(2).border = {top: {style: "thin"}}
    totalResultRow.getCell(1).font = { bold: true };
    totalResultRow.getCell(2).font = { bold: true };
    totalWeldingResultRow.getCell(1).border = {top: {style: "thin"}}
    totalWeldingResultRow.getCell(2).border = {top: {style: "thin"}}
    totalWeldingResultRow.getCell(3).border = {top: {style: "thin"}}
    totalWeldingResultRow.getCell(4).border = {top: {style: "thin"}}
    totalWeldingResultRow.getCell(5).border = {top: {style: "thin"}}
    totalWeldingResultRow.getCell(1).font = { bold: true };
    totalWeldingResultRow.getCell(2).font = { bold: true };
    totalWeldingResultRow.getCell(3).font = { bold: true };
    totalWeldingResultRow.getCell(4).font = { bold: true };
    totalWeldingResultRow.getCell(5).font = { bold: true };
    
    // Generate buffer and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    saveAs(blob, createExcelFileName(formData.dmcnlProjectRef));
  };

};

export const createExcelFileName = (projectNumber: string) : string => {
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear().toLocaleString();

  // if day is less than nine, function adds
  // zero before the day number
  const formattedDay = day.toLocaleString.length < 2 ? `0${day}` : day

  // if month is September or earlier, function adds
  // zero before the month number
  const formattedMonth = month.toLocaleString.length < 2 ? `0${month + 1}` : month
  
  const formattedYear = year[2] + year[3] + formattedMonth + formattedDay
  return `${formattedYear} -${projectNumber.length < 1 ? "" : ` ${projectNumber}`} form data`
}

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
    
    const getUnformattedCellText = (rowNumber: number, col = 2): string =>
      worksheet.getRow(rowNumber).getCell(col).text?.toString().trim() || "";

    const dmcnlProjectRef = getUnformattedCellText(1);
    const internalProjectRef = getUnformattedCellText(2);
    const clientRef = getUnformattedCellText(3);
    const projectDescription = getUnformattedCellText(1, 3);
    const profileNameFromExcel  = getCellText(6).toLowerCase();
    const nozzleInnerRingTypeFromExcel = getCellText(7).toLowerCase();
    const nozzleInnerRingThickness = getCellValue(7, 4);
    const diameter = getCellValue(8);
    const ProfileHeightHelp = getCellValue(9);
    const weight = getCellValue(10);
    const segments = getCellValue(11);
    const segmentsThickness = getCellValue(11, 4);
    const coneRows = getCellValue(12);
    const coneThickness = getCellValue(12, 4);
    const ribs = getCellValue(13);
    const ribsThickness = getCellValue(13, 4);
    const otherTransversePlates = getCellValue(14);
    const otherTransversePlatesThickness = getCellValue(14, 4);
    const isHeadbox = getCellText(15) === "yes" ? true: false;
    const allHeadboxPlates = getCellValue(16);
    const headboxSidePlates = getCellValue(17);
    const headboxSidePlatesThickness = getCellValue(17, 4);
    const isOutletProfile = getCellText(18) === "yes" ? true: false;
    const otherAssemblyTime = getCellValue(19);
    const otherAssemblyTimeComment = getUnformattedCellText(19, 3);
    const otherWeldingTime = getCellValue(20);
    const otherWeldingTimeComment = getUnformattedCellText(20, 3);
    const otherCarbonWire = getCellValue(21);
    const otherCarbonWireComment = getUnformattedCellText(21, 3)
    const otherStainlessWire = getCellValue(22);
    const otherStainlessWireComment = getUnformattedCellText(22, 3)

    const matchedProfile = Object.values(NozzleProfiles).find(
      (profile) => profile.toLowerCase() === profileNameFromExcel 
    );

    const matchedInnerRingType = Object.values(NozzleInnerRingTypes).find(
      (innerRingType) => innerRingType.toLocaleLowerCase() === nozzleInnerRingTypeFromExcel
    )

    // Fallback if not found
    const nozzleProfile: NozzleProfiles = matchedProfile as NozzleProfiles ?? NozzleProfiles.optima05D;
    const nozzleInnerRingType: NozzleInnerRingTypes = matchedInnerRingType as NozzleInnerRingTypes.stStInside;

    const newFormData: NozzleFormDataType = {
      dmcnlProjectRef,
      internalProjectRef,
      clientRef,
      projectDescription,
      nozzleProfile,
      nozzleInnerRingType,
      diameter,
      ProfileHeightHelp,
      weight,
      segments,
      coneRows,
      ribs,
      otherTransversePlates,
      isHeadbox,
      allHeadboxPlates,
      isOutletProfile,
      nozzleInnerRingThickness,
      segmentsThickness,
      coneThickness,
      ribsThickness,
      otherTransversePlatesThickness,
      headboxSidePlates,
      headboxSidePlatesThickness,
      otherAssemblyTime,
      otherAssemblyTimeComment,
      otherWeldingTime,
      otherWeldingTimeComment,
      otherCarbonWire,
      otherCarbonWireComment,
      otherStainlessWire,
      otherStainlessWireComment
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

export const getValueFromMap = (input: number, map: Map<number, number>): number | null => {
  return map.get(input) ?? null;
}

export const calculateOptimaAssemblyHours= (formData: NozzleFormDataType) => {
  let result = 0;
  const selectedDiameter = getClosestDiameter(formData.diameter)

  if (selectedDiameter === null) throw new Error("No matching diameter found");

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
  if (formData.isOutletProfile) {
    outletProfileHours = hours.outletProfileAssembly
    result += outletProfileHours
  }

  // // calculate segments
  const allSegments = Number(formData.ribs) * formData.segments + formData.otherTransversePlates * formData.segments
  const segmentsHours = hours.segmentPlateAssembly * allSegments
  result += segmentsHours

  // // calculate ribs and other transverse plates
  const ribsAndTransversalHours = Number(formData.ribs) * hours.ribOrTransversalPlateAssembly + formData.otherTransversePlates * hours.ribOrTransversalPlateAssembly
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

// ************************************************************
// ************* CALCULATE WELDING WIRE AND HOURS *************
// ************************************************************

// fixed values
const MANUAL_WELDING = 0.7
const MANIPULATOR_WELDING = 0.4
const WASTE_FACTOR = 1.1 // how much more welding wire is required compared to theoretical

// helper function
const withWaste = (value: number) => (value * WASTE_FACTOR).toFixed(1);

// CALCULATE INNER RING 
export const calculateInnerRingWelds = (formData: NozzleFormDataType) => {

  // reusable variables
  const nozzleCircumference = Number(formData.diameter) * Math.PI

  // calculate inner ring seams
  const weldingConsumablesPerMeterOfRing = innerRingWelding.get(Number(formData.nozzleInnerRingThickness))
  
  if (weldingConsumablesPerMeterOfRing === undefined) throw new Error('Invalid nozzleInnerRingThickness value');


  const numberOfTransversalSeams = Math.floor((nozzleCircumference / 1000) / 6) + 1;

  const transverseSeamWire = (formData.ProfileHeightHelp / 1000) * weldingConsumablesPerMeterOfRing * numberOfTransversalSeams * 1.15

  // when the profile is with "st.st. ring" or "st.st. ring + outlet",
  // there are additional circumferencial weldin seams
  let circumferencialSeamsWire = 0

  if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStRing) {
    circumferencialSeamsWire = nozzleCircumference / 1000 * weldingConsumablesPerMeterOfRing * 2 * 1.15
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stRingAndOutlet) {
    circumferencialSeamsWire = nozzleCircumference / 1000 * weldingConsumablesPerMeterOfRing * 1.15
  }

  const totalInnerRingWeldingWire = circumferencialSeamsWire + transverseSeamWire
  const totalInnerRingWeldingHours = totalInnerRingWeldingWire * MANUAL_WELDING

  return {
    manualWeldingHours: totalInnerRingWeldingHours, // inner ring is always welded manualy
    carbonSteelWire: formData.nozzleInnerRingType === NozzleInnerRingTypes.completeSteel ? totalInnerRingWeldingWire : 0,
    stainlessSteelWire: formData.nozzleInnerRingType != NozzleInnerRingTypes.completeSteel ? totalInnerRingWeldingWire: 0,
  }
}

// CALCULATE SEGMENTS
export const calculateSegmentsWelds = (formData: NozzleFormDataType) => {

  // result variables
  let carbonSteelWire = 0;
  let stainlessSteelWire = 0;

  // segments circumference = nozzle diameter + 2 x inner ring thickness
  const circumference = (Number(formData.diameter) + Number(formData.nozzleInnerRingThickness) * 2) * Math.PI

  const weldingConsumablesPerMeterOfSegment = filletWeld.get(Number(formData.segmentsThickness));

  if (weldingConsumablesPerMeterOfSegment === undefined) throw new Error('Invalid segmentsThickness value');

  // calculate welding wire
  const totalSegmentsWeldingWire = (circumference) / 1000 * Number(formData.segments) * 2 * weldingConsumablesPerMeterOfSegment;

  if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStRing) {
    if (Number(formData.segments) === 1) {
      carbonSteelWire = totalSegmentsWeldingWire;
    } else if  (Number(formData.segments) === 2) {
      carbonSteelWire = totalSegmentsWeldingWire / 2;
      stainlessSteelWire = totalSegmentsWeldingWire /2;
    } else if (Number(formData.segments) >= 3) {
      carbonSteelWire = (totalSegmentsWeldingWire / Number(formData.segments)) * (Number(formData.segments - 2));
      stainlessSteelWire = totalSegmentsWeldingWire / Number(formData.segments) * 2
    }
  }

  if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stRingAndOutlet) {
    if (Number(formData.segments) === 1) {
      stainlessSteelWire = totalSegmentsWeldingWire;
    } else if  (Number(formData.segments) === 2) {
      carbonSteelWire = totalSegmentsWeldingWire / 2;
      stainlessSteelWire = totalSegmentsWeldingWire /2;
    } else if (Number(formData.segments) === 3) {
      carbonSteelWire = totalSegmentsWeldingWire / Number(formData.segments) * 1 
      stainlessSteelWire = totalSegmentsWeldingWire / Number(formData.segments) * 2
    } else if (Number(formData.segments) === 4) {
      carbonSteelWire = totalSegmentsWeldingWire / Number(formData.segments) * 1 
      stainlessSteelWire = totalSegmentsWeldingWire / Number(formData.segments) * 3
    } else if (Number(formData.segments) === 5) {
      carbonSteelWire = totalSegmentsWeldingWire / Number(formData.segments) * 2
      stainlessSteelWire = totalSegmentsWeldingWire / Number(formData.segments) * 3
    } else if (Number(formData.segments) === 6) {
      carbonSteelWire = totalSegmentsWeldingWire / Number(formData.segments) * 2
      stainlessSteelWire = totalSegmentsWeldingWire / Number(formData.segments) * 4
    }
  }

  if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStInside) {
    stainlessSteelWire = totalSegmentsWeldingWire
  }

  if (formData.nozzleInnerRingType === NozzleInnerRingTypes.completeSteel) {
    carbonSteelWire = totalSegmentsWeldingWire
  }

  // calculate time
  const totalSegmentsWeldingHours = totalSegmentsWeldingWire * MANUAL_WELDING;

  return {
    manualWeldingHours: totalSegmentsWeldingHours,
    carbonSteelWire,
    stainlessSteelWire,
  }
}

// CALCULATE INLET SEAM
export const calculateInletWelds = (formData: NozzleFormDataType) => {

  // calculate weldin seam length
  const ratio = inletDiameterRatio.get(formData.nozzleProfile) ?? 1;
  const weldingSeamLength = Number(formData.diameter) * Math.PI * ratio;

  // calculate welding wire
  if (inletOrOutletWelding.get(Number(formData.nozzleInnerRingThickness)) === undefined) throw new Error("Something went wrong");
  

  const weldingConsumablesPerMeterOfRing = inletOrOutletWelding.get(Number(formData.nozzleInnerRingThickness));

  if (weldingConsumablesPerMeterOfRing === undefined) throw new Error('Invalid nozzleInnerRingThickness value');

  // wire = wire per meter * welding seam lenght / 1000 (convert from mm to m)
  const totalWeldingWire = weldingConsumablesPerMeterOfRing * weldingSeamLength / 1000;


  return {
    manipulatorWeldingHours: totalWeldingWire * MANIPULATOR_WELDING,
    carbonSteelWire: formData.nozzleInnerRingType != NozzleInnerRingTypes.stStInside ? totalWeldingWire : 0,
    stainlessSteelWire: formData.nozzleInnerRingType === NozzleInnerRingTypes.stStInside ? totalWeldingWire : 0,
  }
}

// CALCULATE OUTLET SEAM
export const calculateOutletWelds = (formData: NozzleFormDataType) => {

  // result variables
  let carbonSteelWire = 0;
  let stainlessSteelWire = 0;

  // calculate weldin seam length
  const ratio = outletDiameterRatio.get(formData.nozzleProfile) ?? 1;
  const weldingSeamLength = Number(formData.diameter) * Math.PI * ratio;

  // calculate welding wire
  const weldingConsumablesPerMeterOfRing = inletOrOutletWelding.get(Number(formData.nozzleInnerRingThickness));

  if (weldingConsumablesPerMeterOfRing === undefined) throw new Error('Invalid nozzleInnerRingThickness value');


  const totalWire = formData.isOutletProfile ? weldingConsumablesPerMeterOfRing * weldingSeamLength / 1000 : weldingConsumablesPerMeterOfRing * weldingSeamLength / 1000 * 0.5;

  if (formData.nozzleInnerRingType === NozzleInnerRingTypes.completeSteel) {
    carbonSteelWire = totalWire;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stRingAndOutlet) {
    stainlessSteelWire = totalWire;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStRing) {
    carbonSteelWire = totalWire;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStInside) {
    stainlessSteelWire = totalWire;
  }

  return {
    manipulatorWeldingHours: totalWire * MANIPULATOR_WELDING,
    carbonSteelWire,
    stainlessSteelWire,
    // carbonSteelWire: formData.nozzleInnerRingType === NozzleInnerRingTypes.completeSteel || formData.nozzleInnerRingType === NozzleInnerRingTypes.stStRing ? totalWeldingWire : 0,
    // stainlessSteelWire: formData.nozzleInnerRingType === NozzleInnerRingTypes.stStInside || formData.nozzleInnerRingType === NozzleInnerRingTypes.stRingAndOutlet ? totalWeldingWire : 0,
  }
}

// CALCULATE RIBS
export const calculateRibsWelds = (formData: NozzleFormDataType) => {

  // result variables
  let carbonSteelWire = 0;
  let stainlessSteelWire = 0;

  // this calculator treats all transverse plates as a ribs
  // total amount of ribs is "all ribs" + "all transverse plates" + "1 pc of headbox center plate"
  const weldingConsumablesPerMeterOfRibs = filletWeld.get(Number(formData.ribsThickness));
  const weldingConsumablesPerMeterOfTransversePlates = filletWeld.get(Number(formData.otherTransversePlatesThickness));

  if (weldingConsumablesPerMeterOfRibs === undefined) throw new Error("Something went wrong");

  if (weldingConsumablesPerMeterOfTransversePlates === undefined) throw new Error("Something went wrong");

  // wire = number of plates x 2 (fillet weld each side) / 1000 (convert from mm to m) * wire needed per meter
  const ribsWeldingWire = Number(formData.ribs) * 2 * Number(formData.ProfileHeightHelp) / 1000 * weldingConsumablesPerMeterOfRibs;
  const transversePlatesWeldingWire = Number(formData.otherTransversePlates) * 2 * Number(formData.ProfileHeightHelp) / 1000 * weldingConsumablesPerMeterOfTransversePlates;
  const centerHeadboxPlateWeldingWire = formData.isHeadbox ? 2 * Number(formData.ProfileHeightHelp) / 1000 * weldingConsumablesPerMeterOfRibs : 0;

  const totalWire = ribsWeldingWire + transversePlatesWeldingWire + centerHeadboxPlateWeldingWire;

  if (formData.nozzleInnerRingType === NozzleInnerRingTypes.completeSteel) {
    carbonSteelWire = totalWire;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stRingAndOutlet) {
    carbonSteelWire = totalWire / 3;
    stainlessSteelWire = totalWire / 3 * 2;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStRing) {
    carbonSteelWire = totalWire / 3 * 2;
    stainlessSteelWire = totalWire /3;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStInside) {
    stainlessSteelWire = totalWire;
  }

  return {
    manualWeldingHours: totalWire * MANUAL_WELDING, // time needed to weld
    carbonSteelWire,
    stainlessSteelWire,
  }
}

// CALCULATE HEADBOX
export const calculateHeadboxWelds = (formData: NozzleFormDataType) => {

  // result variables
  let carbonSteelWire = 0;
  let stainlessSteelWire = 0;

  // calculate wire
  let sidePlatesWire = 0;

  if (formData.isHeadbox) {
    // wire = nozzle height / 1000 (convert mm to m) * number of sideplates
    // * (1/2 * plate thickness * plate thickness) (triangle area) * 8 (steel density)
    sidePlatesWire = Number(formData.ProfileHeightHelp) / 1000 * Number(formData.headboxSidePlates) * 
    0.5 * Number(formData.headboxSidePlatesThickness) * Number(formData.headboxSidePlatesThickness) / 1000 * 8 ;
  }

  // determine how much wire is
   if (formData.nozzleInnerRingType === NozzleInnerRingTypes.completeSteel) {
    carbonSteelWire = sidePlatesWire;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stRingAndOutlet) {
    carbonSteelWire = sidePlatesWire / 3;
    stainlessSteelWire = sidePlatesWire / 3 * 2;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStRing) {
    carbonSteelWire = sidePlatesWire / 3 * 2;
    stainlessSteelWire = sidePlatesWire /3;
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStInside) {
    stainlessSteelWire = sidePlatesWire;
  }

  // remaining headbox welding
  let headboxWire = 0;
  
  if (formData.isHeadbox) {
    headboxWire = Number(formData.diameter /1000 * 11);
    carbonSteelWire += headboxWire
  }

  const totalWire = sidePlatesWire + headboxWire;

  return {
    manualWeldingHours: totalWire * MANUAL_WELDING,
    carbonSteelWire,
    stainlessSteelWire
  }
}

// CALCULATE CONE PLATES
export const calculateConePlatesWelds = (formData: NozzleFormDataType) => {

  // calculate average circumference

  const inletRatio = inletDiameterRatio.get(formData.nozzleProfile)
  const outletRatio = outletDiameterRatio.get(formData.nozzleProfile)

  if (inletRatio === undefined || outletRatio === undefined) throw new Error("Something went wrong")

  const inletDiameter = inletRatio * Number(formData.diameter) / 1000 * Math.PI;
  const outletDiameter = outletRatio * formData.diameter / 1000 * Math.PI;
  const averageDiameter = (inletDiameter + outletDiameter) / 2;

  
  // calculate circumferencial seams
  // circumferencial seams are equal to number of segments + inlet and outlet seam
  // if there is no pipe seams are equal to number of segments + inlet only!
  let numberOfCircumferencialSeams = 0;
  
  if (formData.isOutletProfile) {
    numberOfCircumferencialSeams = Number(formData.segments) + 2;
  } else {
    numberOfCircumferencialSeams = Number(formData.segments) + 1;
  }
  
  // calculate wire
  // wire = average diameter [meter] * number of seams * welding wire usage per meter 
  const wirePerMeter = conePlatesWelding.get(Number(formData.coneThickness));
  const numberOfHeadboxPlates = formData.isHeadbox ? Number(formData.headboxSidePlates + 1) : 0;

  if (!wirePerMeter) throw new Error("Something went wrong!")

  const circumferencialSeamsWire = averageDiameter * numberOfCircumferencialSeams * wirePerMeter;
  const horizontalSeamsWire = Number(formData.ProfileHeightHelp) / 1000 * (Number(formData.ribs) + Number(numberOfHeadboxPlates) + Number(formData.otherTransversePlates)) * wirePerMeter

  return {
    manualWeldingHours: horizontalSeamsWire * MANUAL_WELDING,
    manipulatorWeldingHours: circumferencialSeamsWire * MANIPULATOR_WELDING,
    carbonSteelWire: circumferencialSeamsWire + horizontalSeamsWire,
  }

}

// SUMMARIZE WELDING
export const calculateWelding = (formData: NozzleFormDataType) : WeldingResultType => {

  const innerRingWelding = calculateInnerRingWelds(formData);
  const segmentsWelding = calculateSegmentsWelds(formData);
  const inletWelding = calculateInletWelds(formData);
  const outletWelding = calculateOutletWelds(formData);
  const ribsWelding = calculateRibsWelds(formData);
  const headboxWelding = calculateHeadboxWelds(formData);
  const conePlatesWelding = calculateConePlatesWelds(formData);

  const totalCarbonSteelWeldingWire: number = 
      innerRingWelding.carbonSteelWire
    + segmentsWelding.carbonSteelWire
    + inletWelding.carbonSteelWire
    + outletWelding.carbonSteelWire
    + ribsWelding.carbonSteelWire
    + headboxWelding.carbonSteelWire
    + conePlatesWelding.carbonSteelWire

  const totalStainlessSteelWeldingWire: number =  
      innerRingWelding.stainlessSteelWire
    + segmentsWelding.stainlessSteelWire
    + inletWelding.stainlessSteelWire
    + outletWelding.stainlessSteelWire
    + ribsWelding.stainlessSteelWire
    + headboxWelding.stainlessSteelWire;

  const totalManualWeldingHours: number = 
      innerRingWelding.manualWeldingHours
    + segmentsWelding.manualWeldingHours
    + ribsWelding.manualWeldingHours
    + headboxWelding.manualWeldingHours
    + conePlatesWelding.manualWeldingHours;

  const totalManipulatorWeldingHours: number = 
      inletWelding.manipulatorWeldingHours
    + outletWelding.manipulatorWeldingHours
    + conePlatesWelding.manipulatorWeldingHours;

  return {
    carbonSteelWire: ((totalCarbonSteelWeldingWire * WASTE_FACTOR) + Number(formData.otherCarbonWire)).toFixed(),
    stainlessSteelWire: ((totalStainlessSteelWeldingWire * WASTE_FACTOR) + Number(formData.otherStainlessWire)).toFixed(),
    manualWeldingHours: ((Number(totalManualWeldingHours) * WASTE_FACTOR) + Number(formData.otherWeldingTime)).toFixed(),
    manipulatorWeldingHours: (Number(totalManipulatorWeldingHours) * WASTE_FACTOR).toFixed(),
    otherWeldingTime: Number(formData.otherWeldingTime),
    otherCarbonWire: Number(formData.otherCarbonWire),
    otherStainlessWire: Number(formData.otherStainlessWire),
    details: {
      innerRingWelding: {
        carbonSteelWire: withWaste(innerRingWelding.carbonSteelWire),
        stainlessSteelWire: withWaste(innerRingWelding.stainlessSteelWire),
        manualWeldingTime: withWaste(innerRingWelding.manualWeldingHours),
        manipulatorWeldingTime: 0,
      },
      segmentsWelding: {
        carbonSteelWire: withWaste(segmentsWelding.carbonSteelWire),
        stainlessSteelWire: withWaste(segmentsWelding.stainlessSteelWire),
        manualWeldingTime: withWaste(segmentsWelding.manualWeldingHours),
        manipulatorWeldingTime: 0,
      },
      inletWelding: {
        carbonSteelWire: withWaste(inletWelding.carbonSteelWire),
        stainlessSteelWire: withWaste(inletWelding.stainlessSteelWire),
        manualWeldingTime: 0,
        manipulatorWeldingTime: withWaste(inletWelding.manipulatorWeldingHours),
      },
      outletWelding: {
        carbonSteelWire: withWaste(outletWelding.carbonSteelWire),
        stainlessSteelWire: withWaste(outletWelding.stainlessSteelWire),
        manualWeldingTime: 0,
        manipulatorWeldingTime: withWaste(outletWelding.manipulatorWeldingHours),
      },
      ribsWelding: {
        carbonSteelWire: withWaste(ribsWelding.carbonSteelWire),
        stainlessSteelWire: withWaste(ribsWelding.stainlessSteelWire),
        manualWeldingTime: withWaste(ribsWelding.manualWeldingHours),
        manipulatorWeldingTime: 0
      },
      headboxWelding: {
        carbonSteelWire: withWaste(headboxWelding.carbonSteelWire),
        stainlessSteelWire: withWaste(headboxWelding.stainlessSteelWire),
        manualWeldingTime: withWaste(headboxWelding.manualWeldingHours),
        manipulatorWeldingTime: 0,
      },
      conePlatesWelding: {
        carbonSteelWire: withWaste(conePlatesWelding.carbonSteelWire),
        stainlessSteelWire: 0,
        manualWeldingTime: withWaste(conePlatesWelding.manualWeldingHours),
        manipulatorWeldingTime: withWaste(conePlatesWelding.manipulatorWeldingHours),
      },
    }
  }

}

export const calculateWeldingMaterialShareInWeight = (
  carbonSteelWire: number | string,
  stainlessSteelWire: number | string,
  otherCarbonWire: number | string,
  otherStainlessWire: number | string,
  weight: number | string,
) => {

  const totalWire = Number(carbonSteelWire) + Number(stainlessSteelWire) +
                    Number(otherCarbonWire) + Number(otherStainlessWire);

  return (totalWire / Number(weight) * 100).toFixed(1)
}


