import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';
import { BiSolidCricketBall } from 'react-icons/bi';

export default function LiveCommentary({ match_id }) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    try {
      const res = await xoomBackendUrl.post(
        `/cric-buzz/cricket/mcenter/v1/${match_id}/comm`
      );

      setResult(res?.data?.data || {});
    } catch (error) {
      setLoading(false);

      console.error('Error fetching Venues Table Information:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const Shimmer = ({ height, width }) => (
    <div
      className={`bg-gray-300 animate-pulse mb-2 rounded ${height} ${width}`}
    />
  );

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800"></h3>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="border-b pb-2 last:border-b-0">
              <Shimmer height="h-4" width="w-full" />
              <Shimmer height="h-4" width="w-3/4" className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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

  return (
    <>
      {result?.commentaryList?.length > 0 && (
        <h2 className="text-lg font-bold mb-2">Last Commentary</h2>
      )}
      <div className="space-y-4">
        {result?.commentaryList?.map((commentary, index) => {
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
    </>
  );
}
