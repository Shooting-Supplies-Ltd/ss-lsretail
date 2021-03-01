import Link from 'next/link';

const TopBar = () => (
  <div className="hidden lg:flex mx-12 py-1">
    <div className="w-2/6" />
    <div className="w-2/6">
      <p className="text-center text-sm">
        Get the latest from Shooting Supplies on our{' '}
        <Link href="/blog">
          <a>
            <span className="text-ssorange hover:text-ssblue underline">Blog</span>
          </a>
        </Link>
      </p>
    </div>
    <div className="w-2/6">
      <p className="text-right text-sm">
        Call Us:{' '}
        <span className="hover:text-ssblue">
          <a href="tel:01527831261">01527831261</a>
        </span>
      </p>
    </div>
  </div>
);

export default TopBar;
