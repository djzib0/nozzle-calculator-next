'use client'
import NozzleParametersForm from "@/components/nozzleParametersForm/NozzleParametersForm";
// import WeightCalculationForm from "@/components/weightCalculationForm/WeightCalculationForm";
// import { useState } from "react";

export default function Home() {

  // const [isDMCNLFormOn, setIsDMCNLFormOn] = useState(true);

  return (
    <div className="content__container">
      {/* <button
        onClick={() => setIsDMCNLFormOn(!isDMCNLFormOn)}
        className="w-full bg-blue-600 text-white py-3 rounded-2xl text-lg font-medium hover:bg-blue-700 transition"
      >
        {isDMCNLFormOn ? "Hide Form" : "Add New Item"}
      </button> */}
      {/* {isDMCNLFormOn && <WeightCalculationForm isOpen={isDMCNLFormOn}/>} */}
      <NozzleParametersForm />
    </div>
  );
}
