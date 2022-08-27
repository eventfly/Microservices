// import {
//     Elements,
//     CardElement,
//     useElements,
//     useStripe
//   } from "@stripe/react-stripe-js";
//   import { loadStripe } from "@stripe/stripe-js";

//   import Button from 'react-bootstrap/Button';
//   import {useState} from 'react';
//   import PopupModal from '../PopupModal';

  
//   const stripePromise = loadStripe("pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG");
  
//   const handleSubmit = (stripe, elements) => async () => {
//     const cardElement = elements.getElement(CardElement);
  
//     const {error, paymentMethod} = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });
  
//     if (error) {
//       console.log('[error]', error);
//     } else {
//       console.log('[PaymentMethod]', paymentMethod);
//       // ... SEND to your API server to process payment intent
//     }
//   };
  
//   const PaymentForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     return (
//       <>
//         <h1>stripe form</h1>
//         <CardElement />
//         <button onClick={handleSubmit(stripe, elements)}>Buy</button>
//       </>
//     );
//   }
  
// const StripePaymentForm  = () => {

//     const [modalShow, setModalShow] = useState(false);

//     const subscriptionJSX = (
//         <Elements stripe={stripePromise}>
//             <PaymentForm />
//         </Elements>
//     )


//     return(
//         <>
//             <Button variant="success" onClick={() => setModalShow(true)}>Buy Package</Button>

//             <PopupModal
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//                 header="Buy Package"
//                 bodyComponent={subscriptionJSX}
//                 saveButtonText={"Checkout"}
//                 size="lg"
//             />

//         </>
//     )

// }

//   export default StripePaymentForm