import React from 'react';


interface FormSingleInputProps {
  id: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

const SingleInputField = ({
  id,
  name,
  type='text',
  value,
  onChange,
  min,
  max,
}: FormSingleInputProps) => {


  return (
      <input
        className="form__input"
        type={type}
        min={min}
        max={max}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
      />
  )
}

export default SingleInputField