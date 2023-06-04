import { FC } from 'react'

interface SeriesDetailPageProps {
    params: { seriesId: string }
}

const SeriesDetailPage: FC<SeriesDetailPageProps> = ({ params }) => {
    return <div>Series details : {params.seriesId}</div>
}

export default SeriesDetailPage;