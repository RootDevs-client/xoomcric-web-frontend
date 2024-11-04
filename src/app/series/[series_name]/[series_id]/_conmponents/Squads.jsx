'use client';
import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';
import PlayerList from './SquadsPlayerList'; // Ensure this component handles player rendering
import SquadsTeamName from './SquadsTeamName';

export default function Squads({ series_id }) {
  const [squads, setSquads] = useState([]);
  const [squadsFirstTeam, setSquadsFirstTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [PlayerIsloading, setPlayerIsloading] = useState(true);

  async function getData() {
    setLoading(true);
    setError(null);
    try {
      const res = await xoomBackendUrl.post(
        `/cric-buzz/cricket/series/v1/${series_id}/squads`
      );
      const squadData = res?.data?.data || [];
      setSquads(squadData);

      // Fetch players for the first squad if available
      if (squadData?.squads.length > 0) {
        await getPlayers(squadData?.squads[1]?.teamId || 0); // Changed to fetch the first squad
      }
    } catch (error) {
      console.error('Error fetching Squads Information:', error);
      setError('Failed to fetch squads. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  async function getPlayers(teamId) {
    try {
      setPlayerIsloading(true);
      const res = await xoomBackendUrl.post(
        `/cric-buzz/cricket/teams/v1/${teamId}/players`
      );
      setSquadsFirstTeam(res?.data?.data || []);
    } catch (error) {
      console.error('Error fetching Players Information:', error);
      setError('Failed to fetch players. Please try again later.');
    } finally {
      setPlayerIsloading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [series_id]);

  if (loading) {
    return (
      <div className="w-full bg-gray-100">
        {/* Shimmer effect for the header */}
        <div
          className="bg-gray-800 text-white font-semibold p-4 animate-pulse mb-2"
          style={{ width: '100%', height: '20px' }}
        ></div>
        {/* Shimmer effect for the items */}
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="p-4 cursor-default bg-gray-200 animate-pulse mb-2"
            style={{ height: '20px' }}
          ></div>
        ))}
      </div>
    );
  }

  if (!squads?.squads || squads?.squads?.length == 0) {
    return <NoDataFound />;
  }

  return (
    <>
      <div className="join join-vertical w-full md:hidden block">
        {squads.squads?.map((squad, index) => (
          <div key={index}>
            {/* Header for each squad type */}
            {squad.isHeader && (
              <h2 className="text-2xl font-bold my-4">{squad.squadType}</h2>
            )}
            {!squad.isHeader && (
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input
                  type="radio"
                  name="my-accordion-4"
                  onClick={() => getPlayers(squad.teamId)}
                />
                <div className="collapse-title text-xl font-medium">
                  {squad.squadType}
                </div>
                <div className="collapse-content">
                  {squadsFirstTeam?.player?.length > 0 && (
                    <PlayerList
                      players={squadsFirstTeam?.player}
                      PlayerIsloading={PlayerIsloading}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="md:block hidden">
        <div className="flex gap-4">
          <SquadsTeamName
            data={squads?.squads || []}
            loading={loading}
            getPlayers={getPlayers}
          />
          {squadsFirstTeam?.player?.length > 0 && (
            <PlayerList
              players={squadsFirstTeam?.player}
              PlayerIsloading={PlayerIsloading}
            />
          )}
        </div>
      </div>
    </>
  );
}
