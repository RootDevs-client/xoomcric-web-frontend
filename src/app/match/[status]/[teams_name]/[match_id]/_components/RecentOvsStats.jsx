function formatOversString(input = '') {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove leading/trailing whitespace and split by '|'
  const parts = input.trim().split('|');

  // Return the parts joined back with ' | ' (or you can adjust based on use case)
  return parts.map((part) => part.trim()).join(' | ');
}

const RecentOvsStats = ({ recentOvsStats }) => {
  // Format the input string and split it by the pipe (|)
  const oversArray = formatOversString(recentOvsStats)
    .split(' | ') // Split by ' | ' for individual overs
    .flatMap((ov) => ov.trim().split(' ')); // Split individual overs into individual balls

  return (
    <div className="flex space-x-1 mt-2 overflow-x-scroll scrollbar-0">
      {oversArray.map((stat, index) => {
        const isWicket = stat === 'W'; // Check if the stat is a 'W' for wicket
        const bgColor = isWicket ? 'bg-red-500 text-white' : 'bg-gray-200';

        return (
          <span key={index} className={`px-3 py-1 ${bgColor} rounded-full`}>
            {stat}
          </span>
        );
      })}
    </div>
  );
};

export default RecentOvsStats;
