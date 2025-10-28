'use client'
import { formErrorType, HelpModalForEnums, NozzleFormDataType, NozzleInnerRingTypes, NozzleProfiles, AssemblyResultType } from '@/lib/types';
import React, { useEffect, useState } from 'react';
// import SegmentedCircle from '../shapes/segmentedCircle/SegmentedCircle';
// import OptimaShape from "@/components/shapes/optimaShape/OptimaShape";
import { calculateOptimaAssemblyHours, calculateWelding, calculateWeldingMaterialShareInWeight, downloadExcel, handleExcelUpload } from '@/lib/utils'
// import ClipboardButton from '../ui/clipboardButton/ClipboardButton';
import useToggleModal from '@/customHooks/useToggleModal/useToggleModal';
import { FiHelpCircle } from "react-icons/fi";
import HelpModal from '../helpModal/HelpModal';
import { conePlatesWelding, filletWeld, innerRingWelding } from '@/lib/nozzlesCalculatorData';
import WeldingResultTable from '../weldingResultTable/WeldingResultTable';
import AssemblyResultsTable from '../assemblyResultsTable/AssemblyResultsTable';
import CommentModal from '../commentModal/CommentModal';
import AddCommentButton from '../ui/addCommentButton/AddCommentButton';
import { Callout } from '../ui/callout/Callout';

const NozzleParametersForm = () => {

  const [formData, setFormData] = useState<NozzleFormDataType>({
    dmcnlProjectRef: "",
    internalProjectRef: "",
    clientRef: "",
    projectDescription: "",
    nozzleProfile: NozzleProfiles.optima05D,
    nozzleInnerRingType: NozzleInnerRingTypes.stStInside,
    nozzleInnerRingThickness: 15,
    diameter: 2000,
    ProfileHeightHelp: 1000,
    weight: 0,
    segments: 2,
    segmentsThickness: 20,
    coneRows: 3,
    coneThickness: 20,
    ribs: 4,
    ribsThickness: 20,
    otherTransversePlates: 0,
    otherTransversePlatesThickness: 20,
    isHeadbox: true,
    allHeadboxPlates: 5,
    headboxSidePlates: 2,
    headboxSidePlatesThickness: 20,
    isOutletProfile: true,
    isSolePlate: false,
    otherAssemblyTime: 0,
    otherAssemblyTimeComment: "",
    otherWeldingTime: 0,
    otherWeldingTimeComment: "",
    otherCarbonWire: 0,
    otherCarbonWireComment: "",
    otherStainlessWire: 0,
    otherStainlessWireComment: "",
  })

  // states
  const [result, setResult] = useState<AssemblyResultType | null>();
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof NozzleFormDataType, string>>>({});
  const [isError, setIsError] = useState(false);
  const [formWarnings, setFormWarnings] = useState<Partial<Record<keyof NozzleFormDataType, string>>>({});
  const [isCommentModalOn, setIsCommentModalOn] = useState(false);
  const [commentKey, setCommentKey] = useState<string>("");
  const [commentModalTitle, setCommentModalTitle] = useState("");
  
  // const variables
  const weldingResult = calculateWelding(formData)

  // utilize custom hook
  const {modalData, setModalData} = useToggleModal();

  // form validation
  const validateForm = () => {
    const errors: formErrorType = {};
    const warnings: formErrorType = {weight: ""};

    // Diameter validation
    const diameter = Number(formData.diameter);
    if (diameter < 400) {
      errors.diameter = "Diameter must be greater than 400";
    } else if (diameter > 5100) {
      errors.diameter = "Diameter must be less than 5100";
    }

    // Nozzle height validation
    const height = Number(formData.ProfileHeightHelp);
    if (height > diameter) {
      errors.ProfileHeightHelp = "Height cannot be greater than diameter."
    } else if (height > (diameter * 0.7)) {
      errors.ProfileHeightHelp = "Height of the nozzle is too big."
    } else if (height < (diameter * 0.37)) {
      errors.ProfileHeightHelp = "Height of the nozzle is too small."
    }

    // nozzle weight validation
    const weight = Number(formData.weight);
    if (weight > 24000) {
      warnings.weight = `This nozzle is very heavy. Please verify that it can be welded on the manipulator.
                        If welding on the manipulator is not possible, manually enter the required welding 
                        wire and additional welding time.`
    }

    // Cone rows vs segments
    if (Number(formData.coneRows) < Number(formData.segments)) {
      errors.coneRows = "Number of cone rows must be equal or greater than segments by one.";
    }

    if (Number(formData.coneRows) - Number(formData.segments) > 1) {
      errors.coneRows = "Number of cone rows cannot be greater than one."
    }

    if (Number(formData.coneRows) === 0) {
      errors.coneRows = "There must be at least one cone row."
    }

    if (Number(formData.coneRows) === Number(formData.segments)) {
      warnings.coneRows = "There is usually only one more row of cones than the number of rows of segments."
    }

    // Headbox plates
    if (formData.isHeadbox && Number(formData.allHeadboxPlates) < 1) {
      errors.allHeadboxPlates = "Number of headbox plates must be greater than 0.";
    }

    // Set all errors at once
    setFormErrors(errors);
    setFormWarnings(warnings);
    setIsError(Object.keys(errors).length > 0);
 
    // return Object.keys(errors).length === 0;
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

  const openCommentModal = (title: string, property: keyof NozzleFormDataType) => {
    setCommentModalTitle(title);
    setCommentKey(property);
    setIsCommentModalOn(true);
  }

  const saveCommentChange = (property: string, text: string) => {
    setFormData(prevFormData => {
      return (
        {...prevFormData,
          [property]: text.trim()
        }
      )
    })
    setIsCommentModalOn(false);
  }


  const handleBlur  = (value: number) => {
    if (value) setFormData(prevState => {
      return ({...prevState, headboxTransversePlates: value})
    })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const newFormData = await handleExcelUpload(event);

    if (newFormData) {
      setFormData(prev => ({
        ...prev,
        ...newFormData,     
      }));
    }
    
    event.target.value = "";
  };

  const toggleModal = (bool: boolean) => {
    setIsCommentModalOn(bool)
  }

  return (
    <div className='flex flex-row justify-center gap-6'>
      <form className="w-full max-w-xl p-6 bg-white dark:bg-[#4d4d4f] text-black dark:text-white rounded-lg shadow-md space-y-6">

        <div className='form__group'>
          <label htmlFor="dmcnlProjectRef" className="form__label">
            DMCNL project number
          </label>
          <input
            className="form__input"
            type="text"
            min={0}
            max={6500}
            id="dmcnlProjectRef"
            name="dmcnlProjectRef"
            onChange={handleChange}
            value={formData.dmcnlProjectRef}
          />
          <button type='button' onClick={() => openCommentModal("project", "projectDescription")}>
            <AddCommentButton comment={formData.projectDescription} />
          </button>
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.dmcnlProjectRef
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className='form__group'>
          <label htmlFor="internalProjectRef" className="form__label">
            Internal project number
          </label>
          <input
            className="form__input"
            type="text"
            min={0}
            max={6500}
            id="internalProjectRef"
            name="internalProjectRef"
            onChange={handleChange}
            value={formData.internalProjectRef}
          />
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.internalProjectRef
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className='form__group'>
          <label htmlFor="clientRef" className="form__label">
            Client ref. number
          </label>
          <input
            className="form__input"
            type="text"
            min={0}
            max={6500}
            id="clientRef"
            name="clientRef"
            onChange={handleChange}
            value={formData.clientRef}
          />
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.clientRef
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

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

          <label htmlFor="nozzleInnerRingThickness" className="form__label !pl-0 !min-w-[110px]">
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
          <label htmlFor="ProfileHeightHelp" className="form__label">
            Profile height [mm]
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={3250}
            id="ProfileHeightHelp"
            name="ProfileHeightHelp"
            onChange={handleChange}
            value={formData.ProfileHeightHelp}
          />
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.profileHeightHelp
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>
        {formErrors.ProfileHeightHelp !== "" && <p className='text-red-500 text-sm'>{formErrors.ProfileHeightHelp}</p>}

        <div className='form__group'>
          <label htmlFor="weight" className="form__label">
            Weight [kg]
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={3250}
            id="weight"
            name="weight"
            onChange={handleChange}
            value={formData.weight}
          />
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.weight
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>
        

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
        {formWarnings.coneRows !== "" && <p className="space-x-1 text-sm text-amber-600 dark:text-amber-400">{formWarnings.coneRows}</p>}

        <div className='form__row'>
          <label htmlFor="ribs" className="form__label">
            Ribs
          </label>
          <select
            className="form__input"
            id="ribs"
            name='ribs'
            onChange={handleChange}
            value={formData.ribs}
          >
            {Array.from({ length: 16 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          
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
          <select
            className="form__input"
            id="otherTransversePlates"
            name='otherTransversePlates'
            onChange={handleChange}
            value={formData.otherTransversePlates}
          >
            {Array.from({ length: 9 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
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
            {Array.from({ length: 9 }, (_, i) => {
              const value = i + 2; // start from 2
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
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

        <div className="form__group justify-between">
          <div className='flex flex-row'>
            <label className="form__label flex items-center gap-2" htmlFor='isSolePlate'>
              <span className="text-sm">Sole plate</span>
            </label>
            <input
              type="checkbox"
              id="isSolePlate"
              name='isSolePlate'
              className="form__checkbox"
              checked={formData.isSolePlate}
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

          <button type='button' onClick={() => openCommentModal("other assembly time", "otherAssemblyTimeComment")}>
            <AddCommentButton comment={formData.otherAssemblyTimeComment} />
          </button>

          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.other
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>

        </div>

        <div className='form__group'>
          <label htmlFor="otherWeldingTime" className="form__label">
            Other welding time [h]
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={10}
            id="otherWeldingTime"
            name='otherWeldingTime'
            onChange={handleChange}
            value={formData.otherWeldingTime}
          />

          <button type='button' onClick={() => openCommentModal("other welding time", "otherWeldingTimeComment")}>
            <AddCommentButton comment={formData.otherWeldingTimeComment} />
          </button>

          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.other
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className='form__group'>
          <label htmlFor="otherCarbonWire" className="form__label">
            Other carbon wire [kg]
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={10}
            id="otherCarbonWire"
            name='otherCarbonWire'
            onChange={handleChange}
            value={formData.otherCarbonWire}
          />

          <button type='button' onClick={() => openCommentModal("other carbon wire", "otherCarbonWireComment")}>
            <AddCommentButton comment={formData.otherCarbonWireComment} />
          </button>
          
          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.other
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className='form__group'>
          <label htmlFor="otherStainlessWire" className="form__label">
            Other st. st. wire [kg]
          </label>
          <input
            className="form__input"
            type="number"
            min={0}
            max={10}
            id="otherStainlessWire"
            name='otherStainlessWire'
            onChange={handleChange}
            value={formData.otherStainlessWire}
          />

          <button type='button' onClick={() => openCommentModal("other st. st. wire", "otherStainlessWireComment")}>
            <AddCommentButton comment={formData.otherStainlessWireComment} />
          </button>

          <button
            onClick={() => setModalData({
              ...modalData,
              isModalOn: true,
              modalFor: HelpModalForEnums.other
            })}
            type='button' 
            className='text-gray-400 dark:text-gray-300 text-2xl cursor-pointer'>
              <FiHelpCircle />
          </button>
        </div>

        <div className='flex flex-row gap-4 mt-8 justify-center'>
          <button
            type="button"
            onClick={() => downloadExcel(result, weldingResult, formData)}
            className="w-full sm:w-[220px] px-4 py-1.5 text-sm flex items-center justify-center gap-2 rounded-md font-medium 
                      bg-[#007b3c] hover:bg-[#006333] text-white 
                      dark:bg-[#007b3c] dark:hover:bg-[#006333] 
                      transition duration-150 shadow-sm hover:shadow-md
                      cursor-pointer"
          >
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

      <div className='w-[550px] flex flex-col p-4 bg-white dark:bg-[#4d4d4f]
                    text-black dark:text-white rounded-lg shadow-md
                    '
       >

        {/* <div className='flex flex-row max-h-[350px] gap-8 bg-white dark:bg-[#939393] rounded-lg mb-4'>
          <OptimaShape height={300} linesCount={Number(formData.segments)} />
          <SegmentedCircle segments={
            Number(formData.ribs) + 
            Number(formData.otherTransversePlates)} 
            />
        </div> */}

        <div>
          {result && <AssemblyResultsTable result={result} isError={isError}/>}
          {weldingResult && <WeldingResultTable result={weldingResult} isError={isError}/>}
          {weldingResult && formData.weight > 0 && 
          <p className="mt-4 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                        text-gray-900 dark:text-gray-100 font-medium">
            Welding material share in weight :{" "}
            {calculateWeldingMaterialShareInWeight(
              weldingResult.carbonSteelWire,
              weldingResult.stainlessSteelWire,
              weldingResult.otherCarbonWire,
              weldingResult.otherStainlessWire,
              formData.weight
            )}
            %
          </p>
          }
          {formWarnings.weight !== "" && formWarnings.weight !== undefined && 
            <Callout type='warning' title='Warning'>
              {formWarnings.weight}
            </Callout>
          }
        </div>

      </div>

      {modalData.isModalOn && 
        <HelpModal
          isModalOn={modalData.isModalOn}
          modalFor={modalData.modalFor}
          closeFunction={modalData.closeFunction}
        />
      }

      {isCommentModalOn && 
      <CommentModal
        closeFunction={() => toggleModal(false)}
        saveCommentChange={saveCommentChange}
        title={commentModalTitle}
        formData={formData}
        property={commentKey}
      />
      }

    </div>
  
  )
}

export default NozzleParametersForm