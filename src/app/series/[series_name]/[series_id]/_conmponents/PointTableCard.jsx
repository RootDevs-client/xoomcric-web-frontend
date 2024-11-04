import moment from 'moment'; // Import Moment.js
import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
// Function to format match date using Moment.js
const formatDate = (timestamp) => {
  return moment(parseInt(timestamp)).format('D MMM'); // Format date as "28 Feb"
};

export default function PointTableCard({ pointsTable }) {
  const [expandedRow, setExpandedRow] = useState(null); // State to track which row is expanded

  const toggleRow = (teamId) => {
    // Toggle the expanded row state
    setExpandedRow(expandedRow === teamId ? null : teamId);
  };

  return (
    <table className="w-full bg-white border border-gray-200 rounded shadow-md">
      <thead>
        <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
          <th className="sm:py-3 py-1 sm:px-6 px-1 text-left">
            {pointsTable.groupName}
          </th>
          <th className="sm:py-3 py-1 sm:px-6 px-1 text-left">Mat</th>
          <th className="sm:py-3 py-1 sm:px-6 px-1 text-left">Won</th>
          <th className="sm:py-3 py-1 sm:px-6 px-1 text-left">Lost</th>
          <th className="sm:py-3 py-1 sm:px-6 px-1 text-left">Tied</th>
          <th className="sm:py-3 py-1 sm:px-6 px-1 text-left">Points</th>
          <th className="sm:py-3 py-1 sm:px-6 px-1 text-left">NRR</th>
          <th className="sm:py-3 py-1 sm:px-6 px-1 text-left"></th>
        </tr>
      </thead>
      <tbody className="text-gray-800 text-sm font-light">
        {pointsTable?.pointsTableInfo?.map((team) => (
          <React.Fragment key={team.teamId}>
            <tr
              onClick={() => toggleRow(team.teamId)} // Add click event to toggle row
              className={`border-b hover:bg-gray-100 cursor-pointer ${
                expandedRow === team.teamId ? 'bg-gray-50' : ''
              }`}
            >
              <td className="sm:py-3 py-1 sm:px-6 px-1">
                {team.teamFullName} ({team.teamName})
              </td>
              <td className="sm:py-3 py-1 sm:px-6 px-1">
                {team.matchesPlayed || 0}
              </td>
              <td className="sm:py-3 py-1 sm:px-6 px-1">
                {team.matchesWon || 0}
              </td>
              <td className="sm:py-3 py-1 sm:px-6 px-1">
                {team.matchesLost || 0}
              </td>
              <td className="sm:py-3 py-1 sm:px-6 px-1">{team.noRes || 0}</td>
              <td className="sm:py-3 py-1 sm:px-6 px-1">{team.points || 0}</td>
              <td className="sm:py-3 py-1 sm:px-6 px-1">{team.nrr || 0}</td>
              <td className="sm:py-3 py-1 sm:px-6 px-1">
                <IoIosArrowDown
                  className={`${
                    expandedRow === team.teamId ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </td>
            </tr>
            {expandedRow === team.teamId && (
              <tr>
                <td colSpan={8} className="bg-gray-100 py-2">
                  <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-2 px-4 text-left">Opponent</th>
                        <th className="py-2 px-4 text-left">Description</th>
                        <th className="py-2 px-4 text-left">Date</th>
                        <th className="py-2 px-4 text-left">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.teamMatches.map((match) => (
                        <tr key={match.matchId} className="border-b">
                          <td className="py-2 px-4">
                            {match.opponent || 'NA'}
                          </td>
                          <td className="py-2 px-4">
                            {match.matchName || 'NA'}
                          </td>
                          <td className="py-2 px-4">
                            {formatDate(match.startdt)}
                          </td>
                          <td className="py-2 px-4">{match.result || 'NA'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
