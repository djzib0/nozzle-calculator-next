import React from 'react'

const WeightCalculationForm = ({isOpen}: {isOpen: boolean}) => {
  return (
     <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <form
          className="grid grid-cols-2 gap-4 p-4 bg-white border rounded-2xl shadow-sm"
        >
          <div className="col-span-2 text-xl font-semibold">Add Item Details</div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Quantity</label>
            <input
              type="number"
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="0"
            />
          </div>

          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
  )
}

export default WeightCalculationForm