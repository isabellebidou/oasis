import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import FeedbackCheckoutForm from "./FeedbackCheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
//https://github.com/matthewling-stripe/react-stripe-payment-element
function FeedbackPayment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("/api/create-payment-intent-feedback", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <fieldset>
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <FeedbackCheckoutForm
            expectations={props.expectations}
            offerId={props.offerId}
            videoId={props.videoId}
          />
        </Elements>
      )}
    </fieldset>
  );
}

export default FeedbackPayment;