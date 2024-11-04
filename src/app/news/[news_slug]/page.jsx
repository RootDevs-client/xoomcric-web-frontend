import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import Link from 'next/link';
import SingleNewsDetails from '../_components/SingleNewsDetails';

export const getSingleNews = async (slug) => {
  try {
    const res = await xoomBackendUrl.get(`/api/news/${slug}`);
    return res.data; // Return only the data part of the response
  } catch (error) {
    console.error('Error fetching single news:', error);
    throw error; // Re-throw the error to handle it elsewhere
  }
};

export default async function page({ params }) {
  const { news_slug } = params;

  try {
    const newsData = await getSingleNews(news_slug);

    if (newsData.status) {
      return <SingleNewsDetails newsData={newsData.data} />;
    } else {
      console.error('Server Error:', newsData.message);
      return (
        <div className="max-w-screen-xl p-4 mx-auto top-2">
          <h2 className="text-red-600">Server Error!</h2>
          <p>{newsData.message || 'An unexpected error occurred.'}</p>
        </div>
      );
    }
  } catch (error) {
    console.error('Server Error:', error.message);
    return (
      <div className="max-w-screen-xl p-4 mx-auto top-2">
        <NoDataFound />
        <div className="flex justify-center items-center mt-5">
          <Link
            className="bg-red-500 text-white font-bold  rounded-lg px-4 py-2"
            href={`/`}
          >
            Go To The Home
          </Link>
        </div>
      </div>
    );
  }
}
