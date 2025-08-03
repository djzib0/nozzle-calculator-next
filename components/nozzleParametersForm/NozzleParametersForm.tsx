'use client'
import { formErrorType, HelpModalForEnums, NozzleFormDataType, NozzleInnerRingTypes, NozzleProfiles, ResultType } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import SegmentedCircle from '../shapes/segmentedCircle/SegmentedCircle';
import OptimaShape from "@/components/shapes/optimaShape/OptimaShape";
import { calculateOptimaAssemblyHours, calculateWelding, downloadExcel, getClosestDiameter, handleExcelUpload } from '@/lib/utils'
// import ClipboardButton from '../ui/clipboardButton/ClipboardButton';
import useToggleModal from '@/customHooks/useToggleModal/useToggleModal';
import { FiHelpCircle } from "react-icons/fi";
import HelpModal from '../helpModal/HelpModal';
import { conePlatesWelding, filletWeld, innerRingWelding } from '@/lib/nozzlesCalculatorData';


const NozzleParametersForm = () => {

  const [formData, setFormData] = useState<NozzleFormDataType>({
    nozzleProfile: NozzleProfiles.optima,
    nozzleInnerRingType: NozzleInnerRingTypes.stStInside,
    nozzleInnerRingThickness: 8,
    nozzleInnerRingLongitudinalSeams: 0,
    diameter: 2000,
    profileHeight: 1000,
    segments: 2,
    segmentsThickness: 20,
    coneRows: 3,
    coneThickness: 20,
    ribs: 4,
    ribsThickness: 20,
    otherTransversePlates: 2,
    otherTransversePlatesThickness: 20,
    isHeadbox: true,
    allHeadboxPlates: 5,
    headboxSidePlates: 2,
    headboxSidePlatesThickness: 20,
    headboxHeight: 500,
    isOutletProfile: true,
    otherAssemblyTime: 0,
    otherWeldingTime: 0,
  })

  
  // states
  const [result, setResult] = useState<ResultType | null>();
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof NozzleFormDataType, string>>>({});
  const [isError, setIsError] = useState(false);
  
  // const variables
  const weldingResult = calculateWelding(formData)

  // utilize custom hook
  const {modalData, setModalData} = useToggleModal();

  // form validation
  const validateForm = () => {
    const errors: formErrorType = {};

    // Diameter validation
    const diameter = Number(formData.diameter);
    if (diameter < 400) {
      errors.diameter = "Diameter must be greater than 400";
    } else if (diameter > 5100) {
      errors.diameter = "Diameter must be less than 5100";
    }

    // Nozzle height validation
    const height = Number(formData.profileHeight);
    if (height > diameter) {
      errors.profileHeight = "Height cannot be greater than diameter"
    } else if (height > (diameter * 0.7)) {
      errors.profileHeight = "Height of the nozzle is too big"
    }

    // Cone rows vs segments
    if (Number(formData.coneRows) < Number(formData.segments)) {
      errors.coneRows = "Number of cone rows must be equal or greater than segments";
    }

    // Headbox plates
    if (formData.isHeadbox && Number(formData.allHeadboxPlates) < 1) {
      errors.allHeadboxPlates = "Number of headbox plates must be greater than 0";
    }

    // Set all errors at once
    setFormErrors(errors);
    setIsError(Object.keys(errors).length > 0);

    return Object.keys(errors).length === 0;
  };

  
  useEffect(() => {
    try {
      validateForm();
      const calculated = calculateOptimaAssemblyHours(formData);
      setResult(calculated);
    } catch (err) {
      console.error(err);
      setResult(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

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
      return ({...prevState, headboxTransversePlates: value})
    })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const newFormData = await handleExcelUpload(event);

    // console.log("uploaded data", newFormData)

    if (newFormData) {
      setFormData(prev => ({
        ...prev,
        ...newFormData,     
      }));
    }
    
    event.target.value = "";
  };

  return (
    <div className='flex flex-row justify-center gap-6'>
      <form className="w-full max-w-xl p-6 bg-white dark:bg-[#4d4d4f] text-black dark:text-white rounded-lg shadow-md space-y-6">

        <div className="w-full form__group">
          <label htmlFor="nozzleProfile" className="form__label"
            >
            Profile
          </label>
          <select
            id="nozzleProfile"
            name="nozzleProfile"
            className="form__input"
            value={formData.nozzleProfile}
            onChange={handleChange}
          >
            {nozzleProfilesSelectOptions}
          </select>
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.nozzleProfile
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className="w-full form__group">
          <label htmlFor="nozzleInnerRingType" className="form__label"
            >
            Inner ring type
          </label>
          <select
            id="nozzleInnerRingType"
            name="nozzleInnerRingType"
            className="form__input !text-[10px] !w-[150px]"
            value={formData.nozzleInnerRingType}
            onChange={handleChange}
          >
            {nozzleInnerRingTypesSelectOptions}
          </select>

          <label htmlFor="nozzleInnerRingThickness" className="form__label !pl-4 !min-w-[120px]">
            Thickness [mm]
          </label>
          <select
            className="form__input"
            id="nozzleInnerRingThickness"
            name="nozzleInnerRingThickness"
            onChange={handleChange}
            value={formData.nozzleInnerRingThickness}
          >
            {[...innerRingWelding.keys()].map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.nozzleInnerRingType
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className='form__group'>
          <label htmlFor="diameter" className="form__label">
            Diameter [mm]
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
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.diameter
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>
        {formErrors.diameter !== "" && <p className='text-red-500 text-sm'>{formErrors.diameter}</p>}
        
        <div className='form__group'>
          <label htmlFor="profileHeight" className="form__label">
            Profile height [mm]
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={3250}
            id="profileHeight"
            name="profileHeight"
            onChange={handleChange}
            value={formData.profileHeight}
          />
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.diameter
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>
        {formErrors.profileHeight !== "" && <p className='text-red-500 text-sm'>{formErrors.profileHeight}</p>}
        

        <div className='form__row'>
          <label htmlFor="segments" className="form__label">
            Segments rows
          </label>
          <select
            className="form__input"
            id="segments"
            name="segments"
            onChange={handleChange}
            value={formData.segments}
          >
            {Array.from({ length: 7 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <label htmlFor="segmentsThickness" className="form__label !pl-4 !min-w-[120px]">
            Thickness [mm]
          </label>
          <select
            className="form__input"
            id="segmentsThickness"
            name="segmentsThickness"
            onChange={handleChange}
            value={formData.segmentsThickness}
          >
            {[...filletWeld.keys()].map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.segments
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className='form__row'>
          <label htmlFor="coneRows" className="form__label">
            Cone plates rows
          </label>
          <select
            className="form__input"
            id="coneRows"
            name="coneRows"
            onChange={handleChange}
            value={formData.coneRows}
          >
            {Array.from({ length: 9 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <label htmlFor="coneThickness" className="form__label !pl-4 !min-w-[120px]">
            Thickness [mm]
          </label>
          <select
            className="form__input"
            id="coneThickness"
            name="coneThickness"
            onChange={handleChange}
            value={formData.coneThickness}
          >
            {[...conePlatesWelding.keys()].map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.coneRows
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>
        {formErrors.coneRows !== "" && <p className='text-red-500 text-sm'>{formErrors.coneRows}</p>}

        <div className='form__row'>
          <label htmlFor="ribs" className="form__label">
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
          
          <label htmlFor="ribsThickness" className="form__label !pl-4 !min-w-[120px]">
            Thickness [mm]
          </label>
          <select
            className="form__input"
            id="ribsThickness"
            name="ribsThickness"
            onChange={handleChange}
            value={formData.ribsThickness}
          >
            {Array.from({ length: 41 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.ribs
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className='form__group'>
          <label htmlFor="otherTransversePlates" className="form__label">
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
          <label htmlFor="otherTransversePlatesThickness" className="form__label !pl-4 !min-w-[120px]">
            Thickness [mm]
          </label>
          <select
            className="form__input"
            id="otherTransversePlatesThickness"
            name="otherTransversePlatesThickness"
            onChange={handleChange}
            value={formData.otherTransversePlatesThickness}
          >
            {Array.from({ length: 41 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.otherTransversePlates
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className="form__group justify-between">
          <div className='flex flex-row'>
            <label className="form__label flex items-center gap-2" htmlFor='isHeadbox'>
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
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.isHeadbox
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
          
        </div>

        <div className='form__group'>
          <label htmlFor="allHeadboxPlates" className="form__label">
            Headbox plates
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
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.allHeadboxPlates
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>
        {formErrors.allHeadboxPlates !== "" && <p className='text-red-500 text-sm'>{formErrors.allHeadboxPlates}</p>}

        <div className='form__row'>
          <label htmlFor="headboxSidePlates" className="form__label">
            Headbox sideplates
          </label>
          <select
            className="form__input"
            id="headboxSidePlates"
            name="headboxSidePlates"
            onChange={handleChange}
            value={formData.headboxSidePlates}
          >
            {Array.from({ length: 7 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <label htmlFor="headboxSidePlatesThickness" className="form__label !pl-4 !min-w-[120px]">
            Thickness [mm]
          </label>
          <select
            className="form__input"
            id="headboxSidePlatesThickness"
            name="headboxSidePlatesThickness"
            onChange={handleChange}
            value={formData.headboxSidePlatesThickness}
          >
            {[...filletWeld.keys()].map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.headboxSidePlates
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className="form__group justify-between">
          <div className='flex flex-row'>
            <label className="form__label flex items-center gap-2" htmlFor='isOutletProfile'>
              <span className="text-sm">Outlet pipe</span>
            </label>
            <input
              type="checkbox"
              id="isOutletProfile"
              name='isOutletProfile'
              className="form__checkbox"
              checked={formData.isOutletProfile}
              onChange={handleChange}
              />
          </div>
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.isOutletProfile
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className='form__group'>
          <label htmlFor="otherAssemblyTime" className="form__label">
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
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.otherAssemblyTime
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className='flex flex-row gap-4 mt-8 justify-center'>
          <button
            type="button"
            onClick={() => downloadExcel(result, formData)}
            className="w-full sm:w-[220px] px-4 py-1.5 text-sm flex items-center justify-center gap-2 rounded-md font-medium 
                      bg-[#007b3c] hover:bg-[#006333] text-white 
                      dark:bg-[#007b3c] dark:hover:bg-[#006333] 
                      transition duration-150 shadow-sm hover:shadow-md
                      cursor-pointer"
          >
            {/* <svg
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
            </svg> */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                d="M12 16.5l4-4h-3V4h-2v8.5H8l4 4z"
              />
              <path
                d="M20 20H4v-2h16v2z"
              />
            </svg>
            Download Excel file
          </button>

          <div className="relative w-[250px]">
            {/* Hidden file input */}
            <input
              type="file"
              accept=".xlsx"
              id="upload-excel"
              onChange={handleFileUpload} 
              className="hidden"
            />

            {/* Styled label acting as the button */}
            <label
              htmlFor="upload-excel"
              className="w-full sm:w-[220px] px-4 py-1.5 text-sm flex items-center justify-center gap-2 rounded-md font-medium 
                        bg-[#007b3c] hover:bg-[#006333] text-white 
                        dark:bg-[#007b3c] dark:hover:bg-[#006333] 
                        transition duration-150 shadow-sm hover:shadow-md
                        cursor-pointer"
            >
              {/* <svg
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
              </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  d="M12 7.5l-4 4h3V20h2v-8.5h3l-4-4z"
                />
                <path
                  d="M4 4h16v2H4V4z"
                />
              </svg>
              Upload Excel file
            </label>
          </div>

          {/* {result?.total && <ClipboardButton total={result?.total} />} */}

        </div>

      </form>

      <div className='w-full max-w-md flex flex-col p-4 bg-white dark:bg-[#4d4d4f]
                    text-black dark:text-white rounded-lg shadow-md
                    '
       >
        <div className='flex flex-row max-h-[350px] gap-8 bg-white dark:bg-[#939393] rounded-lg mb-4'>
          <OptimaShape height={300} linesCount={Number(formData.segments)} />
          <SegmentedCircle segments={
            Number(formData.ribs) + 
            Number(formData.otherTransversePlates)} 
            />
        </div>
        
        <div>
            <p className="inline-block px-3 py-1 rounded-md bg-blue-100 text-blue-900 
                          dark:bg-emerald-700 dark:text-white
                          font-medium"
            >
              Chosen diameter is {getClosestDiameter(formData.diameter)} mm
            </p>
            <h3 className='font-medium py-4'>Results:</h3>
            <div className='grid grid-cols-[200px_60px_30px] gap-y-1'>

              <p>Inner ring:</p>
              <p>{result?.innerRingHours && result.innerRingHours}</p>
              <p>hr</p>

              <p>Base plate:</p>
              <p>{result?.basePlateHours && result.basePlateHours}</p>
              <p>hr</p>

              <p>Inlet profile:</p>
              <p>{result?.inletProfileHours && result.inletProfileHours}</p>
              <p>hr</p>

              <p>Outlet profile:</p>
              <p>{result?.outletProfileHours && result.outletProfileHours}</p>
              <p>hr</p>

              <p>Segments:</p>
              <p>{result?.segmentsHours && result.segmentsHours}</p>
              <p>hr</p>

              <p>Ribs/transversal plates:</p>
              <p>{result?.ribsAndTransversalHours && result.ribsAndTransversalHours}</p>
              <p>hr</p>

              <p>Cone plates:</p>
              <p>{result?.coneRowsHours && result.coneRowsHours}</p>
              <p>hr</p>

              <p>Headbox:</p>
              <p>{result?.headboxHours && result.headboxHours}</p>
              <p>hr</p>

              <p>Grinding:</p>
              <p>{result?.grindingHours && result.grindingHours}</p>
              <p>hr</p>

              <p className='border-b'>Other:</p>
              <p className='border-b'>{result?.otherHours && result.otherHours}</p>
              <p className='border-b'>hr</p>

              {isError ?
              <p className='text-red-500 text-md col-span-3'>There are mistakes in the form. Please correct them to see the result.</p>
              :
              <div className='grid grid-cols-[200px_60px_30px] gap-y-1'>
                <p className='font-semibold text-lg mt-2 '>Total:</p>
                <p className='font-semibold text-lg mt-2 text-indigo-700 dark:text-indigo-300'>{result?.total && result.total}</p>
                <p className='font-semibold text-lg mt-2 '>hr</p>
              </div>
              }
            </div>
            <div className='grid grid-cols-[200px_60px_30px] gap-y-1'>
                <p className='font-semibold text-lg mt-2 '>Carbon wire:</p>
                <p className='font-semibold text-lg mt-2 text-indigo-700 dark:text-indigo-300'>{weldingResult.carbonSteelWire}</p>
                <p className='font-semibold text-lg mt-2 '>hr</p>
            </div>
            <div className='grid grid-cols-[200px_60px_30px] gap-y-1'>
                <p className='font-semibold text-lg mt-2 '>St.st. wire:</p>
                <p className='font-semibold text-lg mt-2 text-indigo-700 dark:text-indigo-300'>{weldingResult.stainlessSteelWire}</p>
                <p className='font-semibold text-lg mt-2 '>hr</p>
            </div>
            <div className='grid grid-cols-[200px_60px_30px] gap-y-1'>
                <p className='font-semibold text-lg mt-2 '>Manual hours:</p>
                <p className='font-semibold text-lg mt-2 text-indigo-700 dark:text-indigo-300'>{weldingResult.manualWeldingHours}</p>
                <p className='font-semibold text-lg mt-2 '>hr</p>
            </div>
            <div className='grid grid-cols-[200px_60px_30px] gap-y-1'>
                <p className='font-semibold text-lg mt-2 '>Manipulator hours:</p>
                <p className='font-semibold text-lg mt-2 text-indigo-700 dark:text-indigo-300'>{weldingResult.manipulatorWeldingHours}</p>
                <p className='font-semibold text-lg mt-2 '>hr</p>
            </div>
        </div>
      </div>

      {modalData.isModalOn && 
        <HelpModal
          isModalOn={modalData.isModalOn}
          modalFor={modalData.modalFor}
          closeFunction={modalData.closeFunction}
        />
      }

    </div>
  
  )
}

export default NozzleParametersForm