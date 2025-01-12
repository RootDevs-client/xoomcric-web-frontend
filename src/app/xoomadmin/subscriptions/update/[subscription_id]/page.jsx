import SubscriptionUpdate from '../../_components/SubscriptionUpdate';

export const metadata = {
  title: 'XoomCric Admin | Edit Subscription',
};

export default async function Page({ params }) {
  const { subscription_id } = params;

  return <SubscriptionUpdate  id={subscription_id} />;
}
