import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="h-14 bg-red-600 w-full sticky top-0">
      <nav>header</nav>
    </header>
  );
};

export default Header;
