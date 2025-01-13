import Link from 'next/link';

export default function page() {
  return (
    <div className="max-w-screen-lg mx-auto px-2">
      <div className="flex items-center justify-center mt-10">
        <div className="border border-red-300 rounded-lg px-5 py-2 shadow-red-200 text-base font-semibold">
          Your payment has been failed, Please try again.{' '}
          <Link href={'/register'} className="btn btn-sm btn-primary">
            Register{' '}
          </Link>
        </div>
      </div>
    </div>
  );
}
