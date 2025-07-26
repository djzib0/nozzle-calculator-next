import React from 'react'

const InnerRingHelp = () => {
  return (
    <div className="help-content space-y-6 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How to Select a Nozzle Profile</h2>

      <p>
        Choosing the correct nozzle profile depends on vessel type, expected thrust, and compatibility with propeller diameter.
        Below is a quick overview of common profiles:
      </p>

      {/* <img
        src="/images/nozzle-profile-example.png"
        alt="Nozzle profile diagram"
        className="w-full rounded-lg shadow-md"
      /> */}

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-6">Steps to Follow:</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Determine the required thrust and propeller diameter.</li>
        <li>Compare the performance curves of available profiles.</li>
        <li>Select the profile that balances efficiency and structural needs.</li>
      </ol>

      <p className="italic text-gray-600 dark:text-gray-400">
        Note: Type 19A is typically used in higher-speed applications with limited space.
      </p>
    </div>
  )
}

export default InnerRingHelp