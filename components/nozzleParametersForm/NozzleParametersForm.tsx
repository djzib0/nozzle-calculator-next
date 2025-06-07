'use client'
import React, { useState } from 'react';

const NozzleParametersForm = () => {

  const [formData, setFormData] = useState({
    ribs: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value, type} = e.target
    if ("checked" in e.target) {
      const checked = e.target.checked
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [name]: type === "checkbox" ? checked: value
        }
      })
    }
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  console.log(formData.ribs, " ribs")


  return (
      <form className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-[#4d4d4f] text-black dark:text-white rounded-lg shadow-md space-y-6">
      <div>
        <label htmlFor="name" className="form__label">
          Name
        </label>
        <input
          type="number"
          id="name"
          name='ribs'
          className="form__input"
          placeholder="Your name"
          onChange={handleChange}
          value={formData.ribs}
        />
      </div>

      

      <div>
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form__input"
          placeholder="you@example.com"
        />
      </div>

      <div className="w-full">
        <label htmlFor="country" className="form__label"
          >
          Choose a country
        </label>
        <select
          id="country"
          name="country"
          className="w-full px-4 py-2 rounded-md 
                    border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-[#2a2a2a] 
                    text-black dark:text-white 
                    focus:outline-none focus:ring-2 focus:ring-[#0033a0] 
                    transition"
          defaultValue=""
        >
          <option value="" disabled>Select one</option>
          <option value="pl">Poland</option>
          <option value="nl">Netherlands</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="us">United States</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="form__label">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="form__input"
          placeholder="Type your message..."
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-6 py-2 rounded-md font-semibold uppercase transition 
                  bg-[#0033a0] hover:bg-[#002a88] text-white 
                  dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
      >
        Submit
      </button>

    </form>
  )
}

export default NozzleParametersForm