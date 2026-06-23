import MedicinesDetailsPage from "@/features/medicine/components/details"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1">
      <MedicinesDetailsPage slug={id} />
    </div>
  );
}