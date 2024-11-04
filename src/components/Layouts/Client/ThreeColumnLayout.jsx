'use client';
import useGetAllPlayer from '@/lib/hooks/useGetAllLeagues';
import useGetSelectedPointTable from '@/lib/hooks/useGetSelectedPointTable';
import useGetTopSeries from '@/lib/hooks/useGetTopLeagues';
import AllPlayerList from '../../Global/AllPlayerList';
import SelectedPointTable from '../../Global/SelectedPointTable';
import SkewCard from '../../Global/SkewCard';
import TopSeriesList from '../../Global/TopSeriesList';
import TrendingNewsSlider from '../../Global/TrendingNewsSlider';

export default function ThreeColumnLayout({ children }) {
  const { selectedPointTable, isLoadingSelectedPointTable } =
    useGetSelectedPointTable();
  const { allPlayersData, isLoadingAllPlayer } = useGetAllPlayer();
  const { topSeries, isLoadingTopSeries } = useGetTopSeries();

  console.log(selectedPointTable);

  return (
    <div className="mx-auto max-w-screen-xl mt-3">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 lg:col-span-3 w-full hidden lg:block">
          <SkewCard title="TOP SERIES">
            <TopSeriesList
              topSeries={topSeries}
              isLoadingTopSeries={isLoadingTopSeries}
            />
          </SkewCard>

          <SkewCard title="TOP PLAYER ">
            <AllPlayerList
              allPlayerData={allPlayersData || []}
              isLoadingAllLeagues={isLoadingAllPlayer}
            />
          </SkewCard>
        </div>
        <div className="col-span-12 lg:col-span-6 w-full mt-3">{children}</div>
        <div className="col-span-3 lg:col-span-3 w-full hidden lg:block">
          <div className="relative">
            <SkewCard title="TRENDING NEWS">
              <TrendingNewsSlider />
            </SkewCard>
          </div>
          <SelectedPointTable
            selectedPointTable={selectedPointTable}
            isLoadingSelectedPointTable={isLoadingSelectedPointTable}
          />
        </div>
      </div>
    </div>
  );
}
