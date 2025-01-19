import NewsUpdate from '../../_components/NewsUpdate';

export const metadata = {
  title: 'XoomCric Admin | Edit News',
};

export default async function Page({ params }) {
  const { news_id } = params;

  return <NewsUpdate  id={news_id} />;
}
