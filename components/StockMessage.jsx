export default function StockMessage() {
  return (
    <div className="xl:mt-4 p-4 bg-ssblue rounded-lg">
      <p className="text-white font-semibold uppercase">Our stock is being added.</p>
      <p className="mt-2 text-white font-semibold uppercase">
        If you can't find what your looking for, call us{' '}
        <span className="mt-2 text-ssorange text-xl">
          <a href="tel:01527831261">01527831261</a>
        </span>
      </p>
    </div>
  );
}
