'use client'
import { NozzleFormDataType, NozzleInnerRingTypes, NozzleProfiles } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import SegmentedCircle from '../segmentedCircle/SegmentedCircle';
import NACAProfile from "@/components/nacaProfile/NacaProfile";
import { calculateOptimaAssemblyHours, downloadExcel, getClosestDiameter } from '@/lib/utils'
import ClipboardButton from '../ui/clipboardButton/ClipboardButton';


const NozzleParametersForm = () => {

  const [formData, setFormData] = useState<NozzleFormDataType>({
    nozzleProfile: NozzleProfiles.optima,
    nozzleInnerRingType: NozzleInnerRingTypes.stStRing,
    diameter: 2000,
    segments: 2,
    ribs: 3,
    otherTransversePlates: 0,
    isHeadbox: false,
    headboxTransversePlates: 0,
    allHeadboxPlates: 5,
    isOutletRoundbar: false,
    otherAssemblyTime: 0,
  })

  const [result, setResult] = useState(0);

  useEffect(() => {
    console.log("form data has been changed")
    const newResult = calculateOptimaAssemblyHours(formData)
    setResult(newResult)
  }, [formData])

  // select options for nozzle profile
  const nozzleProfilesSelectOptions = Object.entries(NozzleProfiles).map(([key, value]) => {
    return (
    <option key={key} value={value}>
      {value.toUpperCase()}
    </option>
    )
  })

  // select option for nozzle inner ring type
  const nozzleInnerRingTypesSelectOptions = Object.entries(NozzleInnerRingTypes).map(([key, value]) => {
    return (
      <option key={key} value={value}>
        {value.toUpperCase()}
      </option>
    )
  })


  // handling functions
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleBlur  = (value: number) => {
    if (value) setFormData(prevState => {
      return ({...prevState, headboxTransversePlates: 10})
    })
  }


  console.log(formData.headboxTransversePlates, " current selected profile")

  return (
    <div className='flex flex-row justify-center gap-6'>
      <form className="w-full max-w-xl p-6 bg-white dark:bg-[#4d4d4f] text-black dark:text-white rounded-lg shadow-md space-y-6">

        <div className="w-full form__group">
          <label htmlFor="country" className="form__label"
            >
            Profile
          </label>
          <select
            id="nozzleProfile"
            name="nozzleProfile"
            className="form__input"
            defaultValue={formData.nozzleProfile}
            onChange={handleChange}
          >
            {nozzleProfilesSelectOptions}
          </select>
        </div>

        <div className="w-full form__group">
          <label htmlFor="country" className="form__label"
            >
            Inner ring type
          </label>
          <select
            id="nozzleInnerRingType"
            name="nozzleInnerRingType"
            className="form__input"
            defaultValue={formData.nozzleInnerRingType}
            onChange={handleChange}
          >
            {nozzleInnerRingTypesSelectOptions}
          </select>
        </div>

        <div className='form__group'>
          <label htmlFor="name" className="form__label">
            Diameter
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={6500}
            id="diameter"
            name="diameter"
            onChange={handleChange}
            value={formData.diameter}
          />
        </div>

        <div className='form__group'>
          <label htmlFor="name" className="form__label">
            Segments rows
          </label>
          <select
            className="form__input"
            id="segments"
            name="segments"
            onChange={handleChange}
            value={formData.segments}
          >
            {Array.from({ length: 9 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div className='form__group'>
          <label htmlFor="name" className="form__label">
            Ribs
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={20}
            id="ribs"
            name='ribs'
            onChange={handleChange}
            value={formData.ribs}
          />
        </div>

        <div className='form__group'>
          <label htmlFor="name" className="form__label">
            Other transverse plates
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={10}
            id="otherTransversePlates"
            name='otherTransversePlates'
            onChange={handleChange}
            value={formData.otherTransversePlates}
          />
        </div>

        <div className="form__group">
          <label className="form__label flex items-center gap-2 cursor-pointer">
            <span className="text-sm">Headbox</span>
          </label>
            <input
              type="checkbox"
              id="isHeadbox"
              name='isHeadbox'
              className="form__checkbox"
              checked={formData.isHeadbox}
              onChange={handleChange}
            />
        </div>

        <div className='form__group'>
          <label htmlFor="name" className="form__label">
            All headbox plates
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={10}
            id="allHeadboxPlates"
            name='allHeadboxPlates'
            onChange={handleChange}
            value={formData.allHeadboxPlates}
            onBlur={() => handleBlur(Number(formData.allHeadboxPlates))}
          />
        </div>

        <div className="form__group">
          <label className="form__label flex items-center gap-2 cursor-pointer">
            <span className="text-sm">Outlet pipe</span>
          </label>
            <input
              type="checkbox"
              id="isOutletRoundbar"
              name='isOutletRoundbar'
              className="form__checkbox"
              checked={formData.isOutletRoundbar}
              onChange={handleChange}
            />
        </div>

        <div className='form__group'>
          <label htmlFor="name" className="form__label">
            Other assembly time [h]
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={10}
            id="otherAssemblyTime"
            name='otherAssemblyTime'
            onChange={handleChange}
            value={formData.otherAssemblyTime}
          />
        </div>
        


        {/* <div className='form__group'>
          <label htmlFor="message" className="form__label">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="form__input"
            placeholder="Type your message..."
          />
        </div> */}

        <div className='flex flex-row gap-4'>
          <button
            type="button"
            onClick={() => downloadExcel(formData)}
            className="w-full md:w-auto px-6 py-2 flex items-center gap-2 rounded-md font-semibold uppercase tracking-wide
                      bg-[#007b3c] hover:bg-[#006333] text-white
                      dark:bg-white/10 dark:hover:bg-white/20 dark:text-white
                      transition duration-200 shadow-sm hover:shadow-md
                      cursor-pointer"
          >
            {/* Excel Icon (clean, scalable SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M369.9 97.98l-83.89-83.88C275.6 5.373 263.8 0 251.3 0H64C28.65 0 0 28.65 0 64v384c0 35.35 
              28.65 64 64 64h256c35.35 0 64-28.65 64-64V132.3C384 119.8 378.6 107.1 369.9 97.98zM256 51.91L332.1 
              128H256V51.91zM270.2 371.8L238.4 320l31.77-51.77c4.594-7.594 2.25-17.5-5.344-22.09s-17.5-2.25-22.09 
              5.344L216 295.1l-26.77-44.61c-4.594-7.594-14.5-9.938-22.09-5.344s-9.938 14.5-5.344 
              22.09L193.6 320l-31.77 51.77c-4.594 7.594-2.25 17.5 5.344 22.09C169.9 396.6 172.9 397.3 
              176 397.3c5.406 0 10.69-2.75 13.84-7.688L216 344.9l26.77 44.61c3.156 5.125 8.438 7.688 
              13.84 7.688c3.125 0 6.156-.688 8.969-2.125C272.5 389.3 274.8 379.4 270.2 371.8z"/>
            </svg>
            Excel file
          </button>
    
          <ClipboardButton formData={formData} />

        </div>


      </form>

      <div className='w-full max-w-md flex flex-col p-4 bg-white dark:bg-[#4d4d4f] text-black dark:text-white rounded-lg shadow-md space-y-6'>
        <div className='flex flex-row'>
          <NACAProfile height={300} linesCount={Number(formData.segments)} />
          <SegmentedCircle segments={
            Number(formData.ribs) + 
            Number(formData.otherTransversePlates)} 
            />
        </div>
        
        <div className=''>
          <h3 className='font-medium'>Results:</h3>
            Chosen diameter is:
            {getClosestDiameter(formData.diameter)}
            <p>
              {result}
            </p>
        </div>
      </div>

    </div>
  )
}

export default NozzleParametersForm