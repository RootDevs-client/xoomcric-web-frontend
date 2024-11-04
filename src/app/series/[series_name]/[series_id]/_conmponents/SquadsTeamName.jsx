import { useState } from 'react';

export default function SquadsTeamName({ data, loading, getPlayers }) {
  const [activeTab, setActiveTab] = useState(null); // State to track the active tab

  return (
    <div className="w-64 bg-gray-100">
      {data.map((item, index) =>
        item.isHeader ? (
          <div key={index} className="bg-gray-800 text-white font-semibold p-4">
            {item.squadType.toUpperCase()}
          </div>
        ) : (
          <ul key={item.squadId} className="divide-y divide-gray-300">
            <li
              onClick={() => {
                setActiveTab(item.squadId); // Set active tab
                getPlayers(item.teamId);
              }}
              className={`p-4 cursor-pointer ${
                activeTab === item.squadId
                  ? 'bg-gray-300 text-gray-800 font-semibold' // Style for active tab
                  : item.squadType === 'Canada Squad'
                  ? 'bg-gray-200 text-gray-800 font-semibold'
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              {item.squadType}
            </li>
          </ul>
        )
      )}
    </div>
  );
}
