var stripe;

document.addEventListener("DOMContentLoaded", async () => {
  const grammar =
    "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";
  const recognition = new SpeechRecognition();
  // const speechRecognitionList = new SpeechGrammarList();
  // speechRecognitionList.addFromString(grammar, 1);
  // recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const diagnostic = document.querySelector(".output");
  const bg = document.querySelector("html");

  document.body.onclick = () => {
    recognition.start();
    console.log("Ready to receive a color command.");
  };

  recognition.onresult = (event) => {
    console.log("WHAT ARE RESULTS HERE");
    const color = event.results[0][0].transcript;
    diagnostic.textContent = `Result received: ${color}`;
    bg.style.backgroundColor = color;
  };

  return;
  stripe = Stripe(
    "pk_test_51PQnOqIZbtxi3QJkNRCoR7ZT1zviV5zPC6BYjaqA9K61qQRax2uW9rRxEvIKrEWJfZfhoQznRZ4rxKAVDWYaOPlg00AYBaOUh2",
    {
      apiVersion: "2024-04-10",
    }
  );

  // 2. Create a payment request object
  var paymentRequest = stripe.paymentRequest({
    country: "US",
    currency: "usd",
    total: {
      label: "Demo total",
      amount: 1001,
    },
    requestPayerName: true,
    requestPayerEmail: true,
  });

  //3. Create a PaymentRequestButton element
  const elements = stripe.elements();
  const prButton = elements.create("paymentRequestButton", {
    paymentRequest: paymentRequest,
  });

  // Check the availability of the Payment Request API,
  // then mount the PaymentRequestButton
  paymentRequest.canMakePayment().then((result) => {
    if (result) {
      prButton.mount("#payment-request-button");
    } else {
      document.getElementById("payment-request-button").style.display = "none";
    }
  });

  paymentRequest.on("paymentmethod", async (e) => {
    fetch(
      "https://api-xpressocashbook.cash/payment/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: "usd",
          paymentMethodType: "card",
          amount: 1000,
        }),
      }
    )
      .then((res) => res.json())
      .then(async (res) => {
        // Confirm the PaymentIntent without handling potential next actions (yet).
        let { error, paymentIntent } = await stripe.confirmCardPayment(
          res.client_secret,
          {
            payment_method: e.paymentMethod.id,
          },
          {
            handleActions: false,
          }
        );

        if (error) {
          // Report to the browser that the payment failed, prompting it to
          // re-show the payment interface, or show an error message and close
          // the payment interface.
          e.complete("fail");
          return;
        }

        e.complete("success");

        if (paymentIntent.status === "requires_action") {
          // Let Stripe.js handle the rest of the payment flow.
          let { error, paymentIntent } = await stripe.confirmCardPayment(
            res.client_secret
          );

          if (error) {
            // The payment failed -- ask your customer for a new payment method.
            // addMessage(error.message);
            return;
          }
          //addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`
        }
      });
  });
});

function startApplePay() {
  // 2. Create a payment request object
  var paymentRequest = stripe.paymentRequest({
    country: "US",
    currency: "usd",
    total: {
      label: "Demo total",
      amount: 1001,
    },
    requestPayerName: true,
    requestPayerEmail: true,
  });

  //3. Create a PaymentRequestButton element
  const elements = stripe.elements();
  const prButton = elements.create("paymentRequestButton", {
    paymentRequest: paymentRequest,
  });

  // Check the availability of the Payment Request API,
  // then mount the PaymentRequestButton
  paymentRequest.canMakePayment().then((result) => {
    if (result) {
      prButton.mount("#payment-request-button");
    } else {
      document.getElementById("payment-request-button").style.display = "none";
    }
  });

  paymentRequest.on("paymentmethod", async (e) => {
    const { error: backendError, clientSecret } = await fetch(
      "https://api-xpressocashbook.cash/payment/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: "usd",
          paymentMethodType: "card",
          amount: 1000,
        }),
      }
    ).then((r) => r.json());

    alert(clientSecret);

    // Confirm the PaymentIntent without handling potential next actions (yet).
    let { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: e.paymentMethod.id,
      },
      {
        handleActions: false,
      }
    );

    if (error) {
      // Report to the browser that the payment failed, prompting it to
      // re-show the payment interface, or show an error message and close
      // the payment interface.
      e.complete("fail");
      return;
    }

    e.complete("success");

    if (paymentIntent.status === "requires_action") {
      // Let Stripe.js handle the rest of the payment flow.
      let { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret
      );
      if (error) {
        // The payment failed -- ask your customer for a new payment method.
        // addMessage(error.message);
        return;
      }
      //addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    }
  });

  return;
  if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
    const paymentRequest = {
      countryCode: "US",
      currencyCode: "USD",
      supportedNetworks: ["visa", "masterCard", "amex"],
      merchantCapabilities: ["supports3DS"],
      total: { label: "Demo (Apple Pay)", amount: "1.00" },
    };

    const session = new ApplePaySession(3, paymentRequest);

    session.onvalidatemerchant = async (event) => {
      const validationURL = event.validationURL;
      const response = await fetch(
        "https://api-xpressocashbook.cash/payment/validate-merchant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ validationURL }),
        }
      );

      const merchantSession = await response.json();

      session.completeMerchantValidation(merchantSession);
    };

    session.onpaymentauthorized = async (event) => {
      const payment = event.payment;
      const paymentIntent = await createPaymentIntent(1000); // Amount in cents
      if (paymentIntent) {
        const success = await confirmPayment(
          paymentIntent.client_secret,
          payment.token
        );

        session.completePayment(
          success
            ? ApplePaySession.STATUS_SUCCESS
            : ApplePaySession.STATUS_FAILURE
        );
      } else {
        session.completePayment(ApplePaySession.STATUS_FAILURE);
      }
    };

    session.begin();
  }
}

async function createPaymentIntent(amount) {
  const response = await fetch(
    "https://api-xpressocashbook.cash/payment/create-payment-intent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    console.error("Error creating payment intent");
    return null;
  }
}

async function confirmPayment(clientSecret, paymentData) {
  const response = await fetch(
    "https://api-xpressocashbook.cash/payment/process-payment",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: clientSecret,
        paymentData,
      }),
    }
  );

  if (response.ok) {
    const result = await response.json();
    return result.success;
  } else {
    console.error("Error processing payment");
    return false;
  }
}
