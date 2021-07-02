import Link from "next/link";

const TopBar = () => (
  <div className="hidden xl:flex justify-center items-center h-8">
    <p className="">
      Get the latest from Shooting Supplies on our{" "}
      <Link href="/blog">
        <a>
          <span className="text-ssblue hover:text-ssorange underline">
            Blog
          </span>
        </a>
      </Link>
    </p>
  </div>
);

export default TopBar;
