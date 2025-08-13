import React from 'react'

const AssemblyResultTableHeader = ({title}: {title: string}) => {
  return (
    <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">{title}</th>
  )
}

export default AssemblyResultTableHeader