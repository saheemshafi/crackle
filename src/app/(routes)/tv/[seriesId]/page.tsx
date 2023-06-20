import { redirect } from "next/navigation";
import { FC } from "react";

interface SeriesDetailPageProps {
  params: { seriesId: string };
}

const SeriesDetailPage: FC<SeriesDetailPageProps> = ({ params }) => {
  redirect(`/tv/${params.seriesId}/overview`);
};

export default SeriesDetailPage;
