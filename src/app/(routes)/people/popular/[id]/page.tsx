import { FC } from 'react'

interface PersonDetailsPageProps {
    params: { id: string }
}

const PersonDetailsPage: FC<PersonDetailsPageProps> = ({ params }) => {
    return <div>Person with id {params.id}</div>
}

export default PersonDetailsPage