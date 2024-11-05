import { useState } from 'react';

const useFetchVideoUrl = () => {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  const fetchVideoUrl = async (videoId) => {
    console.log({ videoId });
    setLoading(true);
    setError(null);

    // try {

    const response = await fetch(
      'https://www.youtube.com/youtubei/v1/player?key=AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc&prettyPrint=false',
      {
        method: 'POST',
        headers: {
          'X-Youtube-Client-Name': 'ANDROID_VR',
          'X-Youtube-Client-Version': '1.56.21',
          'X-Goog-Visitor-Id':
            'CgstWXlPYUttajR4ZyiN-6e5BjIKCgJCRBIEGgAgPQ%3D%3D',
          Origin: 'https://www.youtube.com',
          'Sec-Fetch-Mode': 'navigate',
          'Content-Type': 'application/json',
          Cookie: `VISITOR_INFO1_LIVE=-YyOaKmj4xg; VISITOR_PRIVACY_METADATA=CgJCRBIEGgAgPQ%3D%3D; PREF=hl=en; SOCS=CAI; GPS=1`,
        },
        body: JSON.stringify({
          context: {
            client: {
              clientName: 'ANDROID_VR',
              clientVersion: '1.56.21',
              deviceModel: 'Quest 3',
              osVersion: '12',
              osName: 'Android',
              androidSdkVersion: 32,
              hl: 'en',
              timeZone: 'UTC',
              utcOffsetMinutes: 0,
            },
          },
          videoId,
          playbackContext: {
            contentPlaybackContext: {
              html5Preference: 'HTML5_PREF_WANTS',
              signatureTimestamp: 20026,
            },
          },
        }),
      }
    );
    console.log(response, 'response');

    if (!response.ok) {
      throw new Error('Failed to fetch video data');
    }

    const data = await response.json();

    const foundVideoUrl =
      data?.streamingData?.formats?.find((format) =>
        format.mimeType.includes('video/mp4; codecs="avc1.42001E, mp4a.40.2')
      )?.url || null;

    console.log({ foundVideoUrl });
    setVideoUrl(foundVideoUrl);
    // } catch (err) {
    //   console.log('catch');

    //   console.log('err', err);
    //   setError(err.message || 'Failed to fetch video URL.');
    // } finally {
    //   setLoading(false);
    // }
  };

  return { fetchVideoUrl, loading, videoUrl, error };
};

export default useFetchVideoUrl;
