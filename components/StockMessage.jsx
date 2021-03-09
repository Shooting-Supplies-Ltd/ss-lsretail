export default function StockMessage() {
  return (
    <div className="xl:mt-4 p-4 bg-ssblue rounded-lg">
      <p className="text-white font-semibold uppercase">
        We are currently adding all of our stock lines to the website, some items aren't yet listed.
      </p>
      <p className="mt-2 text-white font-semibold uppercase">
        If you can't find what your looking for, please call us{' '}
        <span className="mt-2 text-ssorange text-xl">
          <a href="tel:01527831261">01527831261</a>
        </span>
      </p>
    </div>
  );
}
