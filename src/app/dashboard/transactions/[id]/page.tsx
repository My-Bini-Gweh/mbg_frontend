import { TransactionDetailView } from "@/components/dashboard/TransactionDetailView";

type TransactionDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TransactionDetailPage({
  params,
}: TransactionDetailPageProps) {
  const { id } = await params;
  return <TransactionDetailView id={id} />;
}
