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
  ribs: number;
  otherTransversePlates: number;
  isHeadbox: boolean;
  headboxTransversePlates: number;
  allHeadboxPlates: number;
  isOutletRoundbar: boolean;
  otherAssemblyTime: number;
};