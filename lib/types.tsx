export enum NozzleProfiles {
    optima = "optima",
    schottelSdv45 = "schottel sdv 45",
    type19A = "19A",
    type37 = "type 37",
    hr = "hr",
    aqm = "aqm",
}

export enum NozzleInnerRingTypes {
    stStInside = "st. st. inside",
    stStRing = "st. st. ring",
    stRingAndOutlet = "st. st. ring + outlet"
}

export type NozzleFormDataType = {
  nozzleProfile: NozzleProfiles;
  nozzleInnerRingType: NozzleInnerRingTypes;
  diameter: number;
  segments: number;
  coneRows: number;
  ribs: number;
  otherTransversePlates: number;
  isHeadbox: boolean;
  allHeadboxPlates: number;
  isOutletRoundbar: boolean;
  otherAssemblyTime: number;
};

export type formErrorType = {
    nozzleProfile?: string;
    nozzleInnerRingType?: string;
    diameter?: string;
    segments?: string;
    coneRows?: string;
    ribs?: string;
    otherTransversePlates?: string;
    allHeadboxPlates?: string;
    otherAssemblyTime?: string;
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