"use client";
import Image from "next/image";
import Link from "next/link";
import { RxMagnifyingGlass } from "react-icons/rx";
import MenuList from "./ui/MenuList";
import { UserProfile } from "@/types/user";
import { RxHamburgerMenu } from "react-icons/rx";
import SignInBtn from "./ui/SignInBtn";
import SignOutBtn from "./ui/SignOutBtn";
import Button from "./ui/Button";
import { useContext } from "react";
import { SidebarContext } from "@/providers/SidebarProvider";
import { useSession } from "next-auth/react";
interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const { dispatch } = useContext(SidebarContext);
  const user = useSession().data?.user as UserProfile;
  return (
    <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between bg-dark px-4 font-work-sans font-normal text-white shadow-lg md:px-5">
      <div>
        <Button
          icon={<RxHamburgerMenu size={22} />}
          text={<span className="sr-only">Search</span>}
          attrs={{
            className:
              "grid h-8 w-8 place-items-center rounded-sm outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50 md:hidden",
            type: "button",
          }}
          handler={() => dispatch({ type: "toggle" })}
        />
      </div>
      <div className="flex h-14 items-center overflow-hidden md:hidden">
        <Link href="/">
          <Image
            src="/images/brand/crackle-brand.png"
            alt="crackle"
            width={100}
            height={30}
            className="ml-1 mt-2 h-full w-24"
          />
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/search"
          className="grid h-8 w-8 place-items-center rounded-sm outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50"
        >
          <span className="sr-only">Search</span>
          <RxMagnifyingGlass />
        </Link>

        {user ? (
          <MenuList
            title={user.name}
            buttonClasses="flex items-center gap-2 rounded-full sm:rounded-md sm:px-3 sm:py-1 p-1 outline-none hover:bg-gray-dark focus-visible:bg-gray-dark focus-visible:ring-2 focus-visible:ring-brand/50"
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
                <div className="hidden text-start text-xs font-normal sm:block">
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
