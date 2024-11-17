// import { xoomBackendUrl } from '@/lib/axios/getAxios';
// import { useState } from 'react';

// export default function HighlightsTab({ highlightsData }) {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [youtubeUrl, setYoutubeUrl] = useState('');
//   const [isYoutubeUrlLoading, setIsYoutubeUrlLoading] = useState(false);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [playerKey, setPlayerKey] = useState(0);
//   const [playing, setPlaying] = useState(false);

//   const handleEnded = () => {
//     // Move to the next video when the current one ends
//     setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setPlaying(false); // Pause the video when the modal is closed
//     setCurrentVideoIndex(0); // Reset video index
//     setYoutubeUrl('');
//   };

//   const handleModal = async (highlight) => {
//     setYoutubeUrl('');
//     setModalOpen(true);
//     setPlayerKey(Date.now());
//     setPlaying(true);
//     setIsYoutubeUrlLoading(true);
//     try {
//       const { data } = await xoomBackendUrl.get(
//         `/api/getYoutubeUrl/youtube/${
//           highlight.youtube_url?.split('/embed/')[1]
//         }`
//       );
//       setYoutubeUrl(data?.data?.url || '');

//       setIsYoutubeUrlLoading(false);
//     } catch (error) {
//       setYoutubeUrl('');

//       console.error('Error creating Live Matches:', error);
//       setIsYoutubeUrlLoading(false);
//     }
//   };

//   const videoUrls =
//     highlightsData[0]?.video_type === 'youtube'
//       ? highlightsData[0]?.youtube_url
//       : highlightsData[0]?.videos || [];

//   return (
//     <div className="py-2">
//       {highlightsData && highlightsData.length > 0 ? (
//         <div className="flex justify-center sm:justify-between flex-wrap">
//           {highlightsData.map((highlight) => (
//             <div className="my-2" key={highlight._id}>
//               <div className="card w-72 rounded-none">
//                 <div>
//                   <h2 className="text-sm font-semibold my-2">
//                     {highlight?.title.length > 60
//                       ? `${highlight?.title
//                           ?.replace(/&#39;|[^a-zA-Z0-9\s|]|\bA\b/g, '')
//                           ?.slice(0, 60)}...`
//                       : highlight.title?.replace(
//                           /&#39;|[^a-zA-Z0-9\s|]|\bA\b/g,
//                           ''
//                         )}
//                   </h2>
//                 </div>
//                 <div
//                   onClick={() => handleModal(highlight)}
//                   className="bg-black w-full -skew-y-[0.5deg]"
//                 >
//                   <figure>
//                     <img
//                       src={highlight?.highlight_image}
//                       alt={highlight?.title}
//                       className="h-full w-full skew-y-[0.5deg] py-[4px]"
//                     />
//                   </figure>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="p-2 font-medium text-center text-gray-600">
//           No highlights found at the moment. Check back later for updates!
//         </div>
//       )}
//       <dialog
//         id="my_modal_1"
//         className="modal p-0 m-0 rounded-sm"
//         open={modalOpen}
//       >
//         <div className="modal-box">
//           <div className="modal-action">
//             {/* Close button */}
//             <button
//               onClick={handleCloseModal}
//               className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             >
//               ✕
//             </button>
//           </div>
//           <div className=" w-full min-h-64">
//             {isYoutubeUrlLoading ? (
//               <div className="relative w-full h-64">
//                 <div className="absolute inset-0 bg-gray-300 shimmer-player"></div>
//               </div>
//             ) : (
//               <div>
//                 <video controls autoPlay width="100%">
//                   <source src={youtubeUrl} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             )}
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// }

import { useState } from 'react';

export default function HighlightsTab({ highlightsData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playerKey, setPlayerKey] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handleEnded = () => {
    // Move to the next video when the current one ends
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPlaying(false); // Pause the video when the modal is closed
    setCurrentVideoIndex(0); // Reset video index
  };

  const videoUrls =
    highlightsData[0]?.video_type === 'youtube'
      ? highlightsData[0]?.youtube_url
      : highlightsData[0]?.videos || [];

  return (
    <div className="py-2">
      {highlightsData && highlightsData.length > 0 ? (
        <div className="flex justify-center sm:justify-between flex-wrap">
          {highlightsData.map((highlight) => (
            <div className="my-2" key={highlight._id}>
              <div className="card w-72 rounded-none">
                <div>
                  <h2 className="text-sm font-semibold my-2">
                    {highlight?.title.length > 60
                      ? `${highlight?.title
                          ?.replace(/&#39;|[^a-zA-Z0-9\s|]|\bA\b/g, '')
                          ?.slice(0, 60)}...`
                      : highlight.title?.replace(
                          /&#39;|[^a-zA-Z0-9\s|]|\bA\b/g,
                          ''
                        )}
                  </h2>
                </div>
                <div
                  onClick={() => {
                    setModalOpen(true);
                    setPlayerKey(Date.now()); // Unique key to force re-mounting ReactPlayer
                    setPlaying(true); // Start playing the video when modal is opened
                    setYoutubeUrl(highlight?.youtube_url);
                  }}
                  className="bg-black w-full -skew-y-[0.5deg]"
                >
                  <figure>
                    <img
                      src={highlight?.highlight_image}
                      alt={highlight?.title}
                      className="h-full w-full skew-y-[0.5deg] py-[4px]"
                    />
                  </figure>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-2 font-medium text-center text-gray-600">
          No highlights found at the moment. Check back later for updates!
        </div>
      )}
      <dialog
        id="my_modal_1"
        className="modal p-0 m-0 rounded-sm"
        open={modalOpen}
      >
        <div className="modal-box">
          <div className="modal-action">
            <button
              onClick={handleCloseModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </div>
          <div className=" w-full">
            {youtubeUrl.length > 0 && (
              // <div
              //   className=" mt-4 p-4 w-full"
              //   style={{
              //     overflow: 'hidden',
              //     position: 'relative',
              //     width: '100%',
              //     paddingTop: '56.25%',
              //   }}
              // >
              //   <ReactPlayer
              //     key={playerKey} // Ensure ReactPlayer remounts when the modal is opened
              //     stopOnUnmount={true}
              //     controls={true}
              //     className="react-player"
              //     url={youtubeUrl} // Use current video index
              //     width="100%"
              //     height="100%"
              //     playing={playing} // Set playing state
              //     onEnded={handleEnded}
              //     style={{
              //       position: 'absolute',
              //       top: 0,
              //       left: 0,
              //       width: '100%',
              //       height: '100%',
              //       marginTop: '30px',
              //     }}
              //   />
              // </div>
              <div className="yt-embed-holder h-[200px] sm:h-[315px] overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${
                    youtubeUrl?.split('/embed/')[1]
                  }?si=7Lr-QuMZddvlcURM&autoplay=1&mute=${!modalOpen}&loop=1&controls=0&modestbranding=0$rel=0&playsinline=1&enablejsapi=1&playlist=${
                    youtubeUrl?.split('/embed/')[1]
                  }`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen="1"
                  className="w-full h-[200%] -mt-[33%]"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
