'use client';

import { BiSolidCricketBall } from 'react-icons/bi';

const MatchCommentary = ({ data }) => {
  // function replaceText(inputString, target, replacement) {
  //   return inputString.replace(target, replacement);
  // }

  // const inputString =
  //   'B0$  \\nHidden somewhere underneath the glamor of a nigh perfect home record since 2012 is the inconvenient truth of a faltering';

  // const result = replaceText(
  //   inputString,
  //   'B0$',
  //   'Let\u2019s address the elephant in the room!!'
  // );
  // console.log(result, 'result');

  // =============

  function createFormattedString(data) {
    const { commText, commentaryFormats } = data;
    const { bold } = commentaryFormats;

    let formattedCommText = commText.replace(/\\n/g, '<br/>');
    if (bold && bold.formatId && bold.formatValue) {
      bold.formatId.forEach((id, index) => {
        formattedCommText = formattedCommText.replace(
          id,
          `<span class="font-bold">${bold.formatValue[index]}</span>`
        );
      });
    }
    return formattedCommText;
  }

  // =============

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="md:text-3xl sm:text-xl text-lg font-bold mb-2 text-black">
        {data?.matchHeader?.seriesName}
      </h1>
      {data?.matchHeader?.matchDescription && (
        <h2 className="md:text-2xl text-md mb-2 text-gray-700">
          ({data?.matchHeader?.matchDescription})
        </h2>
      )}

      <p className="mb-4 text-sm text-gray-500">{data?.matchHeader?.status}</p>
      <div className="font-semibold text-black">
        {data?.miniscore?.matchScoreDetails?.inningsScoreList.map(
          (match, index) => (
            <div key={index} className="mb-2 text-sm sm:text-base">
              <span className="sm:text-lg text-base">
                {match?.batTeamName}:{' '}
              </span>
              <span>{match?.score} runs</span>
              <span> | {match?.wickets} wickets</span>
              <span> | {match?.overs} overs</span>
              {match?.isDeclared && (
                <span className="text-green-500"> (Declared)</span>
              )}
              {match?.isFollowOn && (
                <span className="text-yellow-500"> (Follow-on)</span>
              )}
            </div>
          )
        )}
      </div>

      {data?.miniscore?.lastWicket && (
        <div className="flex flex-wrap mt-3 justify-start items-center gap-2">
          <p className="sm:text-lg text-sm text-black font-bold">
            last Wicket:
          </p>
          <div className="flex">{data?.miniscore?.lastWicket}</div>
        </div>
      )}
      {data?.miniscore?.recentOvsStats && (
        <div className="flex flex-wrap mb-3 mt-2  justify-start items-center gap-2">
          <p className="sm:text-lg text-sm text-black font-bold">Recent:</p>
          <div className="flex">{data?.miniscore?.recentOvsStats}</div>
        </div>
      )}

      {data?.miniscore && (
        <div>
          <div className="overflow-x-auto rounded-lg mb-3">
            {/* Batsman Table */}
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    Batter
                  </th>
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    R
                  </th>
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    B
                  </th>
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    SR
                  </th>
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    4S
                  </th>
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    6S
                  </th>
                </tr>
              </thead>
              <tbody>
                {['batsmanStriker', 'batsmanNonStriker'].map((role) => (
                  <tr className="hover:bg-gray-100" key={role}>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].batName} (
                      {role === 'batsmanStriker' ? 'Striker' : 'Non-Striker'})
                    </td>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].batRuns}
                    </td>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].batBalls}
                    </td>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].batStrikeRate}
                    </td>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].batFours}
                    </td>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].batSixes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto rounded-lg mb-3">
            {/* Bowler Table */}
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    Bowler
                  </th>
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    O
                  </th>
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    R
                  </th>
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    W
                  </th>
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    Eco
                  </th>
                  <th className="border px-4 py-2 text-start text-sm md:text-base">
                    M
                  </th>
                </tr>
              </thead>
              <tbody>
                {['bowlerStriker', 'bowlerNonStriker'].map((role) => (
                  <tr className="hover:bg-gray-100" key={role}>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].bowlName} (
                      {role === 'bowlerStriker' ? 'Striker' : 'Non-Striker'})
                    </td>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].bowlOvs}
                    </td>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].bowlRuns}
                    </td>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].bowlWkts}
                    </td>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].bowlEcon}
                    </td>
                    <td className="border px-4 py-2 text-start text-sm md:text-base">
                      {data?.miniscore?.[role].bowlMaidens}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!data?.commentaryList ||
        (data?.commentaryList?.length > 0 && (
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Commentary
          </h3>
        ))}
      <div className="space-y-4">
        {data?.commentaryList?.map((commentary, index) => {
          return (
            <div key={index} className="border-b pb-2 last:border-b-0">
              <p className="text-gray-600 text-sm md:text-base">
                {new Date(commentary.timestamp).toLocaleTimeString()}
                <div className="text-gray-800 flex gap-x-2">
                  {commentary?.overNumber && (
                    <div className="font-bold text-base flex items-center justify-start">
                      <BiSolidCricketBall className="mr-1" />{' '}
                      {commentary?.overNumber}
                    </div>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: createFormattedString(commentary),
                    }}
                  />
                </div>
              </p>
              {commentary.commentaryFormats?.bold?.formatValue?.map(
                (boldText, i) => {
                  return (
                    <p key={i} className="text-gray-600 text-sm md:text-base">
                      {boldText}
                    </p>
                  );
                }
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchCommentary;
