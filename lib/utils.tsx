import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { NozzleFormDataType, NozzleInnerRingTypes, NozzleProfiles, ResultType } from './types';
import { inletDiameterRatio, inletOrOutletWelding, innerRingWelding, nozzleAssemblyHours, outletDiameterRatio, filletWeld } from './nozzlesCalculatorData';

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
    worksheet.addRow(["Outlet pipe", formData.isOutletProfile ? "Yes": "No"]);
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
    const isOutletProfile = getCellText(11) === "yes" ? true: false;
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
      isOutletProfile,
      otherAssemblyTime,
      // below are welding properties, to be fixed when the form for welding is finished
      nozzleInnerRingThickness: 0,
      nozzleInnerRingLongitudinalSeams: 0,
      profileHeight: 0,
      segmentsThickness: 0,
      coneThickness: 0,
      ribsThickness: 0,
      otherTransversePlatesThickness: 0,
      headboxSidePlates: 0,
      headboxSidePlatesThickness: 0,
      headboxHeight: 0,
      otherWeldingTime: 0
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
  if (formData.isOutletProfile) {
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

// ************************************************************
// ************* CALCULATE WELDING WIRE AND HOURS *************
// ************************************************************

// fixed values
const MANUAL_WELDING = 0.7
const MANIPULATOR_WELDING = 0.4
const WASTE_FACTOR = 1.1 // how much more welding wire is required compared to theoretical

// CALCULATE INNER RING 
export const calculateInnerRingWelds = (formData: NozzleFormDataType) => {

  // resuable variables
  const nozzleCircumference = Number(formData.diameter) * Math.PI

  // result variables
  // let manualWeldingHours = 0;
  // let carbonSteelWire = 0;
  // let stainlessSteelWire = 0;

  // calculate inner ring seams
  const weldingConsumablesPerMeterOfRing = innerRingWelding.get(Number(formData.nozzleInnerRingThickness))
  
  if (weldingConsumablesPerMeterOfRing === undefined) {
    throw new Error('Invalid nozzleInnerRingThickness value');
  }

  const numberOfTransversalSeams = Math.floor((nozzleCircumference / 1000) / 6) + 1;

  const transversalSeamWire = (formData.profileHeight / 1000) * weldingConsumablesPerMeterOfRing * numberOfTransversalSeams * 1.15

  // when the profile is with "st.st. ring" or "st.st. ring + outlet",
  // there are additional circumferencial weldin seams
  let circumferencialSeamsWire = 0

  if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stStRing) {
    circumferencialSeamsWire = nozzleCircumference / 1000 * weldingConsumablesPerMeterOfRing * 2 * 1.15
  } else if (formData.nozzleInnerRingType === NozzleInnerRingTypes.stRingAndOutlet) {
    circumferencialSeamsWire = nozzleCircumference / 1000 * weldingConsumablesPerMeterOfRing * 1.15
  }

  const totalInnerRingWeldingWire = circumferencialSeamsWire + transversalSeamWire
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

  if (weldingConsumablesPerMeterOfSegment === undefined) {
    throw new Error('Invalid segmentsThickness value');
  }

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
  if (inletOrOutletWelding.get(Number(formData.nozzleInnerRingThickness)) === undefined) {
    throw new Error("Something went wrong")
  }

  const weldingConsumablesPerMeterOfRing = inletOrOutletWelding.get(Number(formData.nozzleInnerRingThickness));

  if (weldingConsumablesPerMeterOfRing === undefined) {
    throw new Error('Invalid nozzleInnerRingThickness value');
  }

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
  if (inletOrOutletWelding.get(Number(formData.nozzleInnerRingThickness)) === undefined) {
    throw new Error("Something went wrong")
  }

  const weldingConsumablesPerMeterOfRing = inletOrOutletWelding.get(Number(formData.nozzleInnerRingThickness));

  if (weldingConsumablesPerMeterOfRing === undefined) {
    throw new Error('Invalid nozzleInnerRingThickness value');
  }

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

  // this calculator treats all transversal plates as a ribs
  // total amount of ribs is "all ribs" + "all transversal plates" + "1 pc of headbox center plate"
  const weldingConsumablesPerMeterOfRibs = filletWeld.get(Number(formData.ribsThickness));
  const weldingConsumablesPerMeterOfTransversePlates = filletWeld.get(Number(formData.otherTransversePlatesThickness));

  if (weldingConsumablesPerMeterOfRibs === undefined) {
    throw new Error("Something went wrong")
  }

  if (weldingConsumablesPerMeterOfTransversePlates === undefined) {
    throw new Error("Something went wrong")
  }

  // wire = number of plates x 2 (fillet weld each side) / 1000 (convert from mm to m) * wire needed per meter
  const ribsWeldingWire = Number(formData.ribs) * 2 * Number(formData.profileHeight) / 1000 * weldingConsumablesPerMeterOfRibs;
  const transversalPlatesWeldingWire = Number(formData.otherTransversePlates) * 2 * Number(formData.profileHeight) / 1000 * weldingConsumablesPerMeterOfTransversePlates;
  const centerHeadboxPlateWeldingWire = formData.isHeadbox ? 2 * Number(formData.profileHeight) / 1000 * weldingConsumablesPerMeterOfRibs : 0;

  const totalWire = ribsWeldingWire + transversalPlatesWeldingWire + centerHeadboxPlateWeldingWire;

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

export const calculateHeadbox = (formData: NozzleFormDataType) => {

  // result variables
  let carbonSteelWire = 0;
  let stainlessSteelWire = 0;

  // calculate wire
  let sidePlatesWire = 0;

  if (formData.isHeadbox) {
    // wire = nozzle height / 1000 (convert mm to m) * number of sideplates
    // * (1/2 * plate thickness * plate thickness) (triangle area) * 8 (steel density)
    sidePlatesWire = Number(formData.profileHeight) / 1000 * Number(formData.headboxSidePlates) * 
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


// SUMMARIZE WELDING
export const calculateWelding = (formData: NozzleFormDataType) => {

  const innerRingWelding = calculateInnerRingWelds(formData);
  const segmentsWelding = calculateSegmentsWelds(formData);
  const inletWelding = calculateInletWelds(formData);
  const outletWelding = calculateOutletWelds(formData);
  const ribs = calculateRibsWelds(formData);
  const headbox = calculateHeadbox(formData);

  const totalCarbonSteelWeldingWire: number = 
      innerRingWelding.carbonSteelWire
    + segmentsWelding.carbonSteelWire
    + inletWelding.carbonSteelWire
    + outletWelding.carbonSteelWire
    + ribs.carbonSteelWire
    + headbox.carbonSteelWire;


  const totalStainlessSteelWeldingWire: number =  
      innerRingWelding.stainlessSteelWire
    + segmentsWelding.stainlessSteelWire
    + inletWelding.stainlessSteelWire
    + outletWelding.stainlessSteelWire
    + ribs.stainlessSteelWire
    + headbox.stainlessSteelWire

  const totalManualWeldingHours: number = 
      innerRingWelding.manualWeldingHours
    + segmentsWelding.manualWeldingHours
    + ribs.manualWeldingHours
    + headbox.manualWeldingHours

  const totalManipulatorWeldingHours: number = 
      inletWelding.manipulatorWeldingHours
    + outletWelding.manipulatorWeldingHours;

  return {
    carbonSteelWire: (totalCarbonSteelWeldingWire * WASTE_FACTOR).toFixed(1),
    stainlessSteelWire: (totalStainlessSteelWeldingWire * WASTE_FACTOR).toFixed(1),
    manualWeldingHours: totalManualWeldingHours.toFixed(1),
    manipulatorWeldingHours: totalManipulatorWeldingHours.toFixed(1),
  }

}


