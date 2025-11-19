import React from 'react'

const Label = ({label, id}: {label: string; id: string}) => {
  return (
    <label htmlFor={id} className="form__label">
      {label}
    </label>
  )
}

export default Label