import { FiShoppingBag } from "react-icons/fi";
import Link from "next/link";

const CartIcon = () => {
  return (
    <div className="text-2xl hover:text-ssorange">
      <Link href="/cart">
        <a>
          <FiShoppingBag />
        </a>
      </Link>
    </div>
  );
};

export default CartIcon;
