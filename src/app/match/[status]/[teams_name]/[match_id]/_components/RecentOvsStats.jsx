function formatOversString(input = '') {
  if (typeof input !== 'string') {
    return '';
  }
  const parts = input?.split('|').slice(1);

  return parts?.map((part) => part?.trim())?.join(' | ');
}

const RecentOvsStats = ({ recentOvsStats }) => {
  console.log(formatOversString(recentOvsStats), 'string');
  const oversArray = formatOversString(recentOvsStats)
    .split('|')
    .flatMap((ov) => ov.trim().split(' '));

  return (
    <div className="flex space-x-2 mt-2">
      {oversArray.map((stat, index) => {
        const isWicket = stat === 'W';
        const bgColor = isWicket ? 'bg-red-500 text-white' : 'bg-gray-200';

        return (
          <span key={index} className={`px-4 py-2 ${bgColor} rounded-full`}>
            {stat}
          </span>
        );
      })}
    </div>
  );
};

export default RecentOvsStats;
