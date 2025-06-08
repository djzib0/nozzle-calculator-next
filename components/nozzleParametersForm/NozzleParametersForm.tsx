'use client'
import { NozzleInnerRingTypes, NozzleProfiles } from '@/lib/types';
import React, { useState } from 'react';
import SegmentedCircle from '../segmentedCircle/SegmentedCircle';
import NACAProfile from "@/components/nacaProfile/NacaProfile";


const NozzleParametersForm = () => {

  const [formData, setFormData] = useState({
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


  console.log(formData.isHeadbox, " current selected profile")

  return (
    <div className='flex flex-row'>
      <form className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-[#4d4d4f] text-black dark:text-white rounded-lg shadow-md space-y-6">

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
            Segments
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={8}
            id="segments"
            name="segments"
            onChange={handleChange}
            value={formData.segments}
          />
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
            Headbox transverse plates
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={10}
            id="headboxTransversePlates"
            name='headboxTransversePlates'
            onChange={handleChange}
            value={formData.headboxTransversePlates}
            disabled={!formData.isHeadbox}
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

        <br></br>
        <br></br>

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

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 rounded-md font-semibold uppercase transition 
                    bg-[#0033a0] hover:bg-[#002a88] text-white 
                    dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
        >
          Submit
        </button>
      </form>

      <div className='flex flex-row'>
        <NACAProfile height={300} linesCount={Number(formData.segments)} />
        <SegmentedCircle segments={
          Number(formData.ribs) + 
          Number(formData.otherTransversePlates) + 
          Number(formData.isHeadbox ? formData.headboxTransversePlates : 0)} 
        />
      </div>

    </div>
  )
}

export default NozzleParametersForm