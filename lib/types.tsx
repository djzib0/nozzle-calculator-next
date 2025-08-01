export enum NozzleProfiles {
    optima = "optima",
    schottelSdv45 = "schottel sdv 45",
    type19A = "19A",
    type37 = "type 37",
    hr = "hr",
    aqm = "aqm",
}

export enum NozzleInnerRingTypes {
    completeSteel = "complete steel",
    stStInside = "st. st. inside",
    stStRing = "st. st. ring",
    stRingAndOutlet = "st. st. ring + outlet"
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
  isOutletProfile,
  otherAssemblyTime,
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
  headboxSidePlatesThickness: number;
  headboxHeight: number;
  isOutletProfile: boolean;
  otherAssemblyTime: number;
  otherWeldingTime: number;
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