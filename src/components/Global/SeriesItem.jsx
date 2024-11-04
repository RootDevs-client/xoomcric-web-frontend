import { convertTimestampToFormattedDateAndYear } from '@/lib/helpers/convertTimestampToFormattedDate';
import getSlugify from '@/lib/helpers/getSlugify';
import Link from 'next/link';
import { CiClock1 } from 'react-icons/ci';

export default function SeriesItem({ series }) {
  return (
    <div className="bg-gray-200 cursor-pointer rounded-md p-2">
      <Link
        href={`/series/${getSlugify(series?.name)}/${series?.id}`}
        className="flex items-center"
      >
        {/* <img
          src={series?.image_path}
          alt={series?.name}
          className="w-7 h-7 ring-1 ring-primary mr-4 rounded-full"
        /> */}
        <div>
          <p className="text-black font-semibold text-[1rem] uppercase">
            {series?.name}
          </p>
          <div className="mt-1">
            <span className="font-semibold flex justify-start items-center gap-1 text-gray-800">
              <CiClock1 className="text-[1.3rem] text-[#fb0404af]" />
              {convertTimestampToFormattedDateAndYear(series.startDate)}{' '}
              <span className="font-semibold text-[#FB0404]">-</span>{' '}
              {convertTimestampToFormattedDateAndYear(series.endDate)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
