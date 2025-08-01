type NozzleAssemblyOperation = {
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

export const nozzleAssemblyHours: Record<number, NozzleAssemblyOperation>= {
  500: {
    "innerRingAssembly": 4.0,
    "ststRingAssembly": 7.0,
    "basePlateAssembly": 3.0,
    "inletProfileAssembly": 3.0,
    "outletProfileAssembly": 3.0,
    "segmentPlateAssembly": 1.0,
    "ribOrTransversalPlateAssembly": 1.5,
    "conePlatesRowAssembly": 5.0,
    "headboxPlateAssembly": 2.0,
    "grinding": 7.0
  },
  600: {
    "innerRingAssembly": 4.0,
    "ststRingAssembly": 8.0,
    "basePlateAssembly": 3.0,
    "inletProfileAssembly": 3.0,
    "outletProfileAssembly": 3.0,
    "segmentPlateAssembly": 1.0,
    "ribOrTransversalPlateAssembly": 2.0,
    "conePlatesRowAssembly": 6.0,
    "headboxPlateAssembly": 2.0,
    "grinding": 8.0
  },
  700: {
    "innerRingAssembly": 4.0,
    "ststRingAssembly": 9.0,
    "basePlateAssembly": 3.5,
    "inletProfileAssembly": 3.5,
    "outletProfileAssembly": 3.5,
    "segmentPlateAssembly": 1.0,
    "ribOrTransversalPlateAssembly": 2.0,
    "conePlatesRowAssembly": 6.0,
    "headboxPlateAssembly": 2.0,
    "grinding": 8.5
  },
  800: {
    "innerRingAssembly": 4.0,
    "ststRingAssembly": 9.0,
    "basePlateAssembly": 4.0,
    "inletProfileAssembly": 4.0,
    "outletProfileAssembly": 4.0,
    "segmentPlateAssembly": 1.0,
    "ribOrTransversalPlateAssembly": 2.0,
    "conePlatesRowAssembly": 7.0,
    "headboxPlateAssembly": 2.0,
    "grinding": 9.0
  },
  900: {
    "innerRingAssembly": 4.0,
    "ststRingAssembly": 10.0,
    "basePlateAssembly": 4.0,
    "inletProfileAssembly": 4.0,
    "outletProfileAssembly": 4.0,
    "segmentPlateAssembly": 1.0,
    "ribOrTransversalPlateAssembly": 2.0,
    "conePlatesRowAssembly": 7.0,
    "headboxPlateAssembly": 2.0,
    "grinding": 9.5
  },
  1000: {
    "innerRingAssembly": 4.0,
    "ststRingAssembly": 11.5,
    "basePlateAssembly": 5.0,
    "inletProfileAssembly": 5.0,
    "outletProfileAssembly": 5.0,
    "segmentPlateAssembly": 1.0,
    "ribOrTransversalPlateAssembly": 2.0,
    "conePlatesRowAssembly": 8.0,
    "headboxPlateAssembly": 2.5,
    "grinding": 10.0
  },
  1200: {
    "innerRingAssembly": 4.0,
    "ststRingAssembly": 12.0,
    "basePlateAssembly": 5.0,
    "inletProfileAssembly": 5.5,
    "outletProfileAssembly": 5.5,
    "segmentPlateAssembly": 1.5,
    "ribOrTransversalPlateAssembly": 2.0,
    "conePlatesRowAssembly": 8.0,
    "headboxPlateAssembly": 3.0,
    "grinding": 10.5
  },
  1400: {
    "innerRingAssembly": 4.0,
    "ststRingAssembly": 12.5,
    "basePlateAssembly": 5.0,
    "inletProfileAssembly": 5.5,
    "outletProfileAssembly": 5.5,
    "segmentPlateAssembly": 1.5,
    "ribOrTransversalPlateAssembly": 2.0,
    "conePlatesRowAssembly": 9.0,
    "headboxPlateAssembly": 3.5,
    "grinding": 11.0
  },
  1600: {
    "innerRingAssembly": 5.0,
    "ststRingAssembly": 13.0,
    "basePlateAssembly": 5.0,
    "inletProfileAssembly": 6.5,
    "outletProfileAssembly": 6.5,
    "segmentPlateAssembly": 1.5,
    "ribOrTransversalPlateAssembly": 2.0,
    "conePlatesRowAssembly": 9.0,
    "headboxPlateAssembly": 4.0,
    "grinding": 12.0
  },
  1800: {
    "innerRingAssembly": 5.0,
    "ststRingAssembly": 13.5,
    "basePlateAssembly": 5.0,
    "inletProfileAssembly": 7.0,
    "outletProfileAssembly": 7.0,
    "segmentPlateAssembly": 1.5,
    "ribOrTransversalPlateAssembly": 2.0,
    "conePlatesRowAssembly": 10.0,
    "headboxPlateAssembly": 4.5,
    "grinding": 13.0
  },
  2000: {
    "innerRingAssembly": 6.0,
    "ststRingAssembly": 14.0,
    "basePlateAssembly": 6.0,
    "inletProfileAssembly": 7.5,
    "outletProfileAssembly": 7.5,
    "segmentPlateAssembly": 1.5,
    "ribOrTransversalPlateAssembly": 2.5,
    "conePlatesRowAssembly": 10.0,
    "headboxPlateAssembly": 5.0,
    "grinding": 14.0
  },
  2200: {
    "innerRingAssembly": 6.0,
    "ststRingAssembly": 14.5,
    "basePlateAssembly": 6.0,
    "inletProfileAssembly": 8.0,
    "outletProfileAssembly": 8.0,
    "segmentPlateAssembly": 2.0,
    "ribOrTransversalPlateAssembly": 2.5,
    "conePlatesRowAssembly": 11.0,
    "headboxPlateAssembly": 5.0,
    "grinding": 16.0
  },
  2400: {
    "innerRingAssembly": 6.0,
    "ststRingAssembly": 15.0,
    "basePlateAssembly": 6.0,
    "inletProfileAssembly": 9.0,
    "outletProfileAssembly": 9.0,
    "segmentPlateAssembly": 2.0,
    "ribOrTransversalPlateAssembly": 2.5,
    "conePlatesRowAssembly": 11.0,
    "headboxPlateAssembly": 5.5,
    "grinding": 20.0
  },
  2600: {
    "innerRingAssembly": 8.0,
    "ststRingAssembly": 15.5,
    "basePlateAssembly": 8.0,
    "inletProfileAssembly": 9.5,
    "outletProfileAssembly": 9.5,
    "segmentPlateAssembly": 2.5,
    "ribOrTransversalPlateAssembly": 2.5,
    "conePlatesRowAssembly": 12.0,
    "headboxPlateAssembly": 5.5,
    "grinding": 24.0
  },
  2800: {
    "innerRingAssembly": 8.0,
    "ststRingAssembly": 16.0,
    "basePlateAssembly": 8.0,
    "inletProfileAssembly": 10.0,
    "outletProfileAssembly": 10.0,
    "segmentPlateAssembly": 2.5,
    "ribOrTransversalPlateAssembly": 2.5,
    "conePlatesRowAssembly": 12.0,
    "headboxPlateAssembly": 6.0,
    "grinding": 28.0
  },
  3000: {
    "innerRingAssembly": 8.0,
    "ststRingAssembly": 16.5,
    "basePlateAssembly": 8.0,
    "inletProfileAssembly": 11.0,
    "outletProfileAssembly": 11.0,
    "segmentPlateAssembly": 3.0,
    "ribOrTransversalPlateAssembly": 3.0,
    "conePlatesRowAssembly": 13.0,
    "headboxPlateAssembly": 6.0,
    "grinding": 32.0
  },
  3200: {
    "innerRingAssembly": 10.0,
    "ststRingAssembly": 17.0,
    "basePlateAssembly": 10.0,
    "inletProfileAssembly": 12.0,
    "outletProfileAssembly": 12.0,
    "segmentPlateAssembly": 3.0,
    "ribOrTransversalPlateAssembly": 3.0,
    "conePlatesRowAssembly": 13.0,
    "headboxPlateAssembly": 6.5,
    "grinding": 36.0
  },
  3400: {
    "innerRingAssembly": 10.0,
    "ststRingAssembly": 17.5,
    "basePlateAssembly": 11.0,
    "inletProfileAssembly": 13.0,
    "outletProfileAssembly": 13.0,
    "segmentPlateAssembly": 3.0,
    "ribOrTransversalPlateAssembly": 3.0,
    "conePlatesRowAssembly": 14.0,
    "headboxPlateAssembly": 6.5,
    "grinding": 40.0
  },
  3600: {
    "innerRingAssembly": 10.0,
    "ststRingAssembly": 18.0,
    "basePlateAssembly": 12.0,
    "inletProfileAssembly": 14.0,
    "outletProfileAssembly": 14.0,
    "segmentPlateAssembly": 3.0,
    "ribOrTransversalPlateAssembly": 3.0,
    "conePlatesRowAssembly": 14.0,
    "headboxPlateAssembly": 7.0,
    "grinding": 44.0
  },
  3800: {
    "innerRingAssembly": 12.0,
    "ststRingAssembly": 18.5,
    "basePlateAssembly": 13.0,
    "inletProfileAssembly": 15.0,
    "outletProfileAssembly": 15.0,
    "segmentPlateAssembly": 3.0,
    "ribOrTransversalPlateAssembly": 3.0,
    "conePlatesRowAssembly": 15.0,
    "headboxPlateAssembly": 7.0,
    "grinding": 48.0
  },
  4000: {
    "innerRingAssembly": 12.0,
    "ststRingAssembly": 19.0,
    "basePlateAssembly": 14.0,
    "inletProfileAssembly": 16.0,
    "outletProfileAssembly": 16.0,
    "segmentPlateAssembly": 3.0,
    "ribOrTransversalPlateAssembly": 3.0,
    "conePlatesRowAssembly": 15.0,
    "headboxPlateAssembly": 7.5,
    "grinding": 52.0
  },
  4200: {
    "innerRingAssembly": 14.0,
    "ststRingAssembly": 19.5,
    "basePlateAssembly": 15.0,
    "inletProfileAssembly": 18.0,
    "outletProfileAssembly": 18.0,
    "segmentPlateAssembly": 3.0,
    "ribOrTransversalPlateAssembly": 3.0,
    "conePlatesRowAssembly": 16.0,
    "headboxPlateAssembly": 7.5,
    "grinding": 56.0
  },
  4400: {
    "innerRingAssembly": 16.0,
    "ststRingAssembly": 20.0,
    "basePlateAssembly": 16.0,
    "inletProfileAssembly": 20.0,
    "outletProfileAssembly": 20.0,
    "segmentPlateAssembly": 3.0,
    "ribOrTransversalPlateAssembly": 3.0,
    "conePlatesRowAssembly": 16.0,
    "headboxPlateAssembly": 8.0,
    "grinding": 60.0
  },
  4600: {
    "innerRingAssembly": 18.0,
    "ststRingAssembly": 20.5,
    "basePlateAssembly": 17.0,
    "inletProfileAssembly": 22.0,
    "outletProfileAssembly": 22.0,
    "segmentPlateAssembly": 4.0,
    "ribOrTransversalPlateAssembly": 4.0,
    "conePlatesRowAssembly": 17.0,
    "headboxPlateAssembly": 8.0,
    "grinding": 64.0
  },
  4800: {
    "innerRingAssembly": 20.0,
    "ststRingAssembly": 21.0,
    "basePlateAssembly": 18.0,
    "inletProfileAssembly": 24.0,
    "outletProfileAssembly": 24.0,
    "segmentPlateAssembly": 4.0,
    "ribOrTransversalPlateAssembly": 4.0,
    "conePlatesRowAssembly": 17.0,
    "headboxPlateAssembly": 9.0,
    "grinding": 68.0
  },
  5000: {
    "innerRingAssembly": 22.0,
    "ststRingAssembly": 22.0,
    "basePlateAssembly": 20.0,
    "inletProfileAssembly": 26.0,
    "outletProfileAssembly": 26.0,
    "segmentPlateAssembly": 5.0,
    "ribOrTransversalPlateAssembly": 5.0,
    "conePlatesRowAssembly": 18.0,
    "headboxPlateAssembly": 9.0,
    "grinding": 72.0
  }
};

// WELDING HOURS

export const innerRingWelding: Map<number, number> = new Map([
  // plate thickness / kg per meter
  [8, 0.55],
  [10, 0.75],
  [12, 0.93],
  [14, 1.17],
  [15, 1.3],
  [16, 1.44],
  [18, 1.91],
  [20, 2.25],
  [22, 2.61],
  [25, 3.21],
  [28, 3.81],
  [30, 4.33],
]);

export const segmentsWelding: Map<number, number> = new Map([
  // plate thickness / kg per meter
  [8, 0.12],
  [10, 0.2],
  [12, 0.31],
  [14, 0.46],
  [16, 0.55],
  [18, 0.65],
  [20, 0.65],
  [22, 0.81],
  [25, 0.99],
  [30, 1.2],
]);



