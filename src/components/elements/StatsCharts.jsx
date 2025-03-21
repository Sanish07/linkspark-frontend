import React, { useState } from 'react';
import ClickStatsBarChart from './charts/ClickStatsBarChart';
import ClickStatsLineChart from './charts/ClickStatsLineChart';


const StatsCharts = ({ totalClickData }) => {

    //Chart toggle state
      const [isLineChart, setIsLineChart] = useState(true);

  return (
    <>
        <div className="flex items-center justify-end mb-4">
            <span className={`text-sm font-medium ${isLineChart ? 'text-purple-600' : 'text-gray-600'}`}>Line Chart</span>
            <label className="relative inline-flex items-center cursor-pointer mx-2">
              <input type="checkbox" checked={!isLineChart} onChange={() => setIsLineChart(!isLineChart)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer dark:bg-purple-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
            <span className={`text-sm font-medium ${!isLineChart ? 'text-blue-600' : 'text-gray-600'}`}>Bar Chart</span>
        </div>
          
        {/* Chart Rendering */}
        {isLineChart ? <ClickStatsLineChart chartData={totalClickData} /> : <ClickStatsBarChart chartData={totalClickData} />}
    </>
  )
}

export default StatsCharts;