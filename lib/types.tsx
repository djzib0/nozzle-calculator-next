export enum NozzleProfiles {
    optima05D = "optima 0,5D",
    optima04D = "optima 0,4D",
    schottelSdv45 = "schottel sdv 45",
    schottelSDC = "schottel sdc",
    type19A = "19A",
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
  nozzleProfile,
  nozzleInnerRingType,
  diameter,
  segments,
  coneRows,
  ribs,
  otherTransversePlates,
  isHeadbox,
  allHeadboxPlates,
  headboxSidePlates,
  isOutletProfile,
  otherAssemblyTime,
  otherWeldingTime,
  otherCarbonWire,
  otherStainlessWire,
}

export type HelpModalType = {
    isModalOn: boolean;
    modalFor: HelpModalForEnums;
    closeFunction: () => void;
}

export type NozzleFormDataType = {
  nozzleProfile: NozzleProfiles;
  nozzleInnerRingType: NozzleInnerRingTypes;
  nozzleInnerRingThickness: number;
  nozzleInnerRingLongitudinalSeams: number;
  diameter: number;
  profileHeight: number;
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
  headboxHeight: number;
  isOutletProfile: boolean;
  otherAssemblyTime: number;
  otherWeldingTime: number;
  otherCarbonWire: number;
  otherStainlessWire: number;
};

export type formErrorType = {
    nozzleProfile?: string;
    nozzleInnerRingType?: string;
    diameter?: string;
    profileHeight?: string;
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

export type ResultType = {
  innerRingHours: number;
  basePlateHours: number;
  inletProfileHours: number;
  outletProfileHours: number;
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
  details: {
    innerRingWelding: {
      manualWeldingHours: 
    }
  }
}