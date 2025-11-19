export enum NozzleProfiles {
    optima05D = "optima 0,5D",
    optima04D = "optima 0,4D",
    type19A = "19A",
    schottelSdv45 = "schottel sdv 45",
    schottelSDC = "schottel sdc",
    type37 = "type 37",
    vg40 = "vg40",
    hr = "hr (Wärtsilä)",
    hp = "hp (Wärtsilä)",
    aht = "aht",
    aqm = "aqm",
    hs20 = "HS2.0 (Sip Marine)"
}

export enum NozzleInnerRingTypes {
    completeSteel = "complete steel",
    stStInside = "st. st. inside",
    stStRing = "st. st. ring",
    stRingAndOutlet = "st. st. ring + outlet",
}

export enum HelpModalForEnums {
  whenClosed,
  dmcnlProjectRef,
  internalProjectRef,
  clientRef,
  weight,
  nozzleProfile,
  nozzleInnerRingType,
  diameter,
  profileHeightHelp,
  segments,
  coneRows,
  ribs,
  otherTransversePlates,
  isHeadbox,
  allHeadboxPlates,
  headboxSidePlates,
  isOutletProfile,
  other
}

export type HelpModalType = {
    isModalOn: boolean;
    modalFor: HelpModalForEnums;
    closeFunction: () => void;
}

export type NozzleFormDataType = {
  dmcnlProjectRef: string;
  internalProjectRef: string;
  clientRef: string;
  projectDescription: string;
  nozzleProfile: NozzleProfiles;
  nozzleInnerRingType: NozzleInnerRingTypes;
  nozzleInnerRingThickness: number;
  // nozzleInnerRingLongitudinalSeams: number;
  diameter: number;
  profileHeight: number;
  weight: number;
  segments: number;
  segmentsThickness: number;
  coneRows: number;
  coneThickness: number;
  ribs: number;
  ribsThickness: number;
  otherTransversePlates: number;
  otherTransversePlatesThickness: number;
  isHeadbox: boolean;
  allHeadboxPlates: number;
  headboxSidePlates: number;
  headboxSidePlatesThickness: number;
  isOutletProfile: boolean;
  isSolePlate: boolean;
  isTopFlange: boolean;
  isBottomFlange: boolean;
  isDoubleBottomFlange: boolean;
  otherAssemblyTime: number;
  otherAssemblyTimeComment: string;
  otherWeldingTime: number;
  otherWeldingTimeComment: string;
  otherCarbonWire: number;
  otherCarbonWireComment: string;
  otherStainlessWire: number;
  otherStainlessWireComment: string;
};

export type formErrorType = {
    nozzleProfile?: string;
    nozzleInnerRingType?: string;
    diameter?: string;
    profileHeight?: string;
    weight?: string;
    segments?: string;
    coneRows?: string;
    ribs?: string;
    otherTransversePlates?: string;
    allHeadboxPlates?: string;
    otherAssemblyTime?: string;
}

export type formWarningType = {
  segments?: string;
  ribs?: string;

}

export type NozzleAssemblyOperationType = {
  innerRingAssembly: number;
  ststRingAssembly: number;
  basePlateAssembly: number;
  inletProfileAssembly: number;
  outletProfileAssembly: number;
  segmentPlateAssembly: number;
  ribOrTransversalPlateAssembly: number;
  conePlatesRowAssembly: number;
  headboxPlateAssembly: number;
  grinding: number;
};

export type AssemblyResultType = {
  innerRingHours: number;
  basePlateHours: number;
  inletProfileHours: number;
  outletProfileHours: number;
  solePlateHours: number;
  topFlangeHours: number;
  bottomFlangeHours: number;
  segmentsHours: number;
  ribsAndTransversalHours: number;
  coneRowsHours: number;
  headboxHours: number;
  grindingHours: number;
  otherHours: number;
  total: number;
}

export type WeldingResultType = {
  carbonSteelWire: string | number;
  stainlessSteelWire: string | number;
  manualWeldingHours: string | number;
  manipulatorWeldingHours: string | number;
  otherWeldingTime: string | number;
  otherCarbonWire: string | number;
  otherStainlessWire: string | number;
  details: {
    innerRingWelding: {
      carbonSteelWire: string | number;
      stainlessSteelWire: string | number;
      manualWeldingTime: string | number;
      manipulatorWeldingTime: string | number;
    };
    segmentsWelding: {
      carbonSteelWire: string | number;
      stainlessSteelWire: string | number;
      manualWeldingTime: string | number;
      manipulatorWeldingTime: string | number;
    };
    inletWelding: {
      carbonSteelWire: string | number;
      stainlessSteelWire: string | number;
      manualWeldingTime: string | number;
      manipulatorWeldingTime: string | number;
    };
    outletWelding: {
      carbonSteelWire: string | number;
      stainlessSteelWire: string | number;
      manualWeldingTime: string | number;
      manipulatorWeldingTime: string | number;
    };
    ribsWelding: {
      carbonSteelWire: string | number;
      stainlessSteelWire: string | number;
      manualWeldingTime: string | number;
      manipulatorWeldingTime: string | number;
    };
    headboxWelding: {
      carbonSteelWire: string | number;
      stainlessSteelWire: string | number;
      manualWeldingTime: string | number;
      manipulatorWeldingTime: string | number;
    };
    conePlatesWelding: {
      carbonSteelWire: string | number;
      stainlessSteelWire: string | number;
      manualWeldingTime: string | number;
      manipulatorWeldingTime: string | number;
    };
    
    
  }
}