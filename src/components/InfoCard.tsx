import { FC } from "react";

interface InfoCardProps {
  title: string | JSX.Element | null;
  id: string;
  children: React.ReactNode;
}

const InfoCard: FC<InfoCardProps> = ({ title, id, children }) => {
  return (
    <section
      id={id}
      className="min-h-[100px] scroll-mt-28 rounded-lg border border-gray-md/30 bg-gray-dark shadow-md transition-shadow target:border-brand/50 target:ring target:ring-brand/10 hover:shadow-lg"
    >
      <div className="border-b border-b-gray-md/30 px-3 py-2 font-work-sans font-medium text-white">
        {title && <h2>{title}</h2>}
      </div>
      <div className="px-3">{children}</div>
    </section>
  );
};

export default InfoCard;
