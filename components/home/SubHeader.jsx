import { GiReticule } from 'react-icons/gi';

const SubHeader = () => (
  <div className="bg-ssblue h-14 flex justify-center">
    <ul className="grid grid-cols-3 gap-12 text-white text-lg">
      <li className="flex items-center justify-center space-x-2">
        <GiReticule />
        <span>In-Store Finance Available</span>
      </li>
      <li className="flex items-center justify-center space-x-2">
        <GiReticule />
        <span>Expert Advice</span>
      </li>
      {/* <li className="flex items-center justify-center space-x-2"><GiReticule /><span>Fast Delivery Options</span></li> */}
      <li className="flex items-center justify-center space-x-2">
        <GiReticule />
        <span>In-Store Repairs & Servicing</span>
      </li>
    </ul>
  </div>
);

export default SubHeader;
