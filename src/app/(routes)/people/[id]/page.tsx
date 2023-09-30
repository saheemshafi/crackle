import { FC } from "react";

interface PersonDetailsPageProps {
  params: { id: string };
}

const PersonDetailsPage: FC<PersonDetailsPageProps> = ({ params }) => {
  // TODO:Complete this route.
  return <div>Person with id {params.id}</div>;
};

export default PersonDetailsPage;
