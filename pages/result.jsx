import { useRouter } from 'next/router';
import { useShoppingCart } from 'use-shopping-cart';
import { parseCookies, destroyCookie } from 'nookies';
import Layout from '../components/layout/Layout';
import PrintObject from '../components/PrintObject';
import { createSale } from './api/lightspeed';

const ResultPage = (props) => {
  const router = useRouter();
  const { data } = props.props;
  const { saleID } = props.props;
  const { clearCart } = useShoppingCart();

  if (!props) return <div>failed to load</div>;

  destroyCookie(null, 'cart');
  clearCart();

  return (
    <Layout>
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Sale Reference: {saleID}</h2>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? 'loading...'} />
      </div>
    </Layout>
  );
};

ResultPage.getInitialProps = async ({ query, req }) => {
  const { session_id } = query;
  const { headers } = req;
  const parsedCookies = parseCookies({ req });

  const { cart } = parsedCookies;

  const data = await fetch(`http://${headers.host}/api/checkout_sessions/${session_id}`);
  const stripeSessionData = await data.json();
  let saleID = null;

  if (cart) {
    if (stripeSessionData.payment_status === 'paid') {
      const parseCartDetails = JSON.parse(cart);
      const { cartDetails } = parseCartDetails;

      const saleLines = Object.keys(cartDetails).map((item) => ({
        SaleLine: [
          {
            shopID: 1,
            employeeID: 5,
            customSku: cartDetails[item].sku,
            unitQuantity: cartDetails[item].quantity,
            unitPrice: cartDetails[item].unitPrice,
            itemID: parseInt(cartDetails[item].itemID),
          },
        ],
      }));

      const sale = {
        employeeID: 5,
        registerID: 1,
        completed: true,
        shopID: 1,
        referenceNumber: stripeSessionData.payment_intent.id,
        SaleLines: saleLines.map((item) => item),
        SalePayments: {
          SalePayment: {
            amount: parseFloat(parseCartDetails.formattedTotalPrice.replace('£', '')),
            paymentTypeID: 1,
          },
        },
      };

      await createSale(sale).then((res) => {
        saleID = res.data.Sale.saleID;
      });
    }
  }

  return {
    props: {
      data: stripeSessionData,
      saleID,
    },
  };
};

export default ResultPage;
