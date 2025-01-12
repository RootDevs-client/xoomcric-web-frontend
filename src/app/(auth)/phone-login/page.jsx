import PhoneLogin from '../_components/PhoneLogin';

export default function page({ searchParams }) {
  const { MobileNumber } = searchParams;

  let phone;
  if (MobileNumber && MobileNumber?.startsWith(' ')) {
    phone = '+' + MobileNumber?.trim();
  } else {
    phone = MobileNumber;
  }

  return (
    <div className="max-w-screen-lg mx-auto px-2">
      <PhoneLogin phone={phone} />
    </div>
  );
}
