import Container from "@/components/Container";
import { getAuthUser } from "@/lib/api/getUser";
import Image from "next/image";
import Link from "next/link";
import { BiVideo } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { RiTv2Line } from "react-icons/ri";
import { RxCaretRight } from "react-icons/rx";

interface ProfilePageProps {}

const ProfilePage = async ({}: ProfilePageProps) => {
  const session = await getAuthUser();
  const user = session?.user;

  return (
    <Container>
      <h1 className="relative mb-6 pb-3 text-2xl font-medium after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-md after:bg-brand">
        User Profile
      </h1>

      <div className="mt-4 flex flex-col items-center gap-6 border-y border-gray-dark px-5 py-8 sm:flex-row">
        <Image
          src={
            user?.avatar?.tmdb.avatar_path
              ? `https://image.tmdb.org/t/p/original/${user.avatar?.tmdb.avatar_path}`
              : "/images/avatar.png"
          }
          alt="user avatar"
          width={100}
          height={100}
          className="aspect-square rounded-full object-cover"
        />
        <div>
          <div className="mb-4">
            <h4 className="font-work-sans text-2xl font-semibold leading-tight">
              {user?.name}
            </h4>
            <small className="flex justify-center sm:justify-start items-center font-normal text-white">
              <BsDot />
              {user?.username}
            </small>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="mb-4 font-work-sans font-medium text-gray-light">
          Explore Your Watchlist -
        </p>
        <div className="flex items-center gap-4 font-work-sans font-medium text-white">
          <Link
            className="group flex items-center justify-center gap-4 rounded border border-gray-md/30 bg-gray-dark px-3 py-2 transition-colors hover:text-brand"
            href="/user/watch-list"
          >
            <BiVideo size={40} />
            Movies
          </Link>
          <Link
            className="group flex items-center justify-center gap-4 rounded border border-gray-md/30 bg-gray-dark px-3 py-2 transition-colors hover:text-brand"
            href="/user/watch-list"
          >
            <RiTv2Line size={40} />
            Series
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
