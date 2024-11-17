import MatchCardCricket from '@/app/match/_components/MatchCardCricket';
import GlobalLoading from '@/components/Global/GlobalLoading';

export default function FavoritesMatches({
  userProfile,
  notLoggedIn,
  session,
  userProfileLoading,
}) {
  if (userProfileLoading) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white h-12 w-full -skew-y-[0.5deg]">
        <div className="skew-y-[0.5deg] ">
          <div>
            {notLoggedIn ? (
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src="/images/vector_competitions_fav.png"
                  alt="favorite graphics"
                  className="w-8/12 h-auto"
                />
                <h4 className="p-2 px-4 text-red-500">
                  Please log in first and add your favorite matches
                </h4>
                <button
                  type="button"
                  onClick={() => window.authModal.showModal()}
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  Login / Register
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mt-2">
                  {/* Add header if needed */}
                  {/* <h4 className="text-gray-900 text-[16px] font-semibold uppercase">
                    League Name
                  </h4>
                  <FiChevronRight className="text-xl" /> */}
                </div>

                {userProfile?.favorites?.matches?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src="/images/vector_competitions_fav.png"
                      alt="favorite graphics"
                      className="w-auto h-60"
                    />
                    <p className="p-2 text-gray-600">
                      You haven{"'"}t added any favorites yet. Discover matches
                      and add them to your favorites!
                    </p>
                  </div>
                ) : (
                  <div>
                    {userProfile?.favorites?.matches?.map((match, index) => (
                      <MatchCardCricket
                        key={index}
                        match={match}
                        status={match?.status?.toLocaleLowerCase() || 'recent'}
                        //   refetchFixtures={refetchFixtures}
                        activeTab={1}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
