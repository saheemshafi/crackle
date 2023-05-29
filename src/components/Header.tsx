import Image from "next/image";
import Link from "next/link";
import { RxMagnifyingGlass } from "react-icons/rx";
import NavLink from "./ui/NavLink";
import MenuList from "./ui/MenuList";
import { UserProfile } from "@/types/user";
import SignInBtn from "./ui/SignInBtn";
import SignOutBtn from "./ui/SignOutBtn";
import { getSession } from "next-auth/react";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/authentication/auth-options";
interface HeaderProps {}

const Header = async ({}: HeaderProps) => {
  const user = (await getServerSession(authOptions))?.user as UserProfile;
  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between bg-dark px-4 font-work-sans font-normal text-white shadow-lg md:px-5">
      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/search"
          className="grid h-8 w-8 place-items-center rounded-sm outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50"
        >
          <RxMagnifyingGlass />
        </Link>

        {user ? (
          <MenuList
            title="User Options"
            buttonClasses="flex items-center gap-2 rounded-md px-3 py-1 outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50"
            buttonHTML={
              <>
                <Image
                  src={
                    user.avatar?.tmdb.avatar_path
                      ? `https://image.tmdb.org/t/p/original/${user.avatar?.tmdb.avatar_path}`
                      : "/images/avatar.png"
                  }
                  alt="user avatar"
                  width={30}
                  height={30}
                  className="aspect-square rounded-full object-cover"
                />
                <div className="text-start text-xs font-normal">
                  <p>{user?.name}</p>
                  <p className="text-xs text-gray-light">@{user.username}</p>
                </div>
              </>
            }
          >
            <ul>
              <li>
                <Link className="menu-link" href={"/user/profile"}>
                  Profile
                </Link>
              </li>
              <li>
                <Link className="menu-link" href={"/user/watch-list"}>
                  Watch List
                </Link>
              </li>
              <li>
                <Link className="menu-link" href={`/user/ratings`}>
                  Ratings
                </Link>
              </li>
              <li>
                <SignOutBtn attrs={{ className: "menu-link" }} />
              </li>
            </ul>
          </MenuList>
        ) : (
          <SignInBtn />
        )}
      </div>
    </header>
  );
};

export default Header;
