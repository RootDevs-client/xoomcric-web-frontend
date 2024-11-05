import { fetchData } from '@/lib/api/FetchData';

export default async function page() {
  try {
    const res = await fetchData();
    return (
      <div className="max-w-screen-xl px-4 mx-auto mt-2">
        <div dangerouslySetInnerHTML={{ __html: res?.data?.terms || '' }} />
      </div>
    );
  } catch (err) {
    return (
      <div className="max-w-screen-xl px-4 mx-auto mt-2">
        <div>Error Occurred when fetch terms and condition!</div>
      </div>
    );
  }
}
