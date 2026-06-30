import { SubscriptionDetailsPage } from "../../../pages/SubscriptionDetailsPage";

type SubscriptionRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SubscriptionRoute({ params }: SubscriptionRouteProps) {
  const { id } = await params;

  return <SubscriptionDetailsPage subscriptionId={id} />;
}
