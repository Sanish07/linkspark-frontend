import React from 'react'

const StatCard = ({ icon, label, value, color = "text-blue-500"}) => {
  return (
    <div className="flex items-center bg-white p-5 rounded-lg shadow-md">
        <div className={"text-4xl "+color}>{icon}</div>
        <div className="ml-4">
          <p className="text-gray-500 text-sm">{label}</p>
          <h3 className="text-lg font-bold text-gray-800">{value}</h3>
        </div>
      </div>
  )
}

export default StatCard;
