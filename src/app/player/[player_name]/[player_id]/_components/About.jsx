export default function About({ playerInformation }) {
  return (
    <div>
      <div className="mx-auto">
        <div className="space-y-6">
          {playerInformation?.values?.map((info, index) => (
            <div key={index}>
              <div className="bg-blue-100 text-black px-6 font-semibold p-2 rounded-md inline-block">
                {info.name}
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex gap-3 items-center bg-gray-100 p-2 rounded-lg">
                  <div className="font-semibold">DEBUT</div>
                  <div className="text-start">
                    <p>{info?.debut}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center bg-gray-100 p-2 rounded-lg">
                  <div className="font-semibold">LAST PLAYED</div>
                  <div className="text-start">
                    <p>{info?.lastPlayed}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
