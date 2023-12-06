import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function App({articleId, prix, handleCloseDialog}) {
  const initialOptions = {
    "client-id": "AZmbw_PBE3LgbOUNzzSoSnbgIve6prbaRdCz4Z7FYqFkLfNEFZMTX3Tc2pny1ksYOGmDZhvipoYTy3dA",
    "enable-funding": "venmo,card",
    "disable-funding": "paylater",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };


  // Récupérez l'identifiant de l'utilisateur depuis localStorage
  const userData = localStorage.getItem("userData");
  const userId = userData ? JSON.parse(userData).user_id : null;
  const prixAsString = prix.toString();
  console.log(prixAsString)


  const basicAuth = btoa('AZmbw_PBE3LgbOUNzzSoSnbgIve6prbaRdCz4Z7FYqFkLfNEFZMTX3Tc2pny1ksYOGmDZhvipoYTy3dA:EIP-CocnC5Di3GQQcCYgeZk1YCGFunw6LlTIlIDQ2iSQn3B-tjQ9xm1NWMi687ixQnGNxzSXIPHXdkcO');

  const [message, setMessage] = useState("");

  const requestId = `article-${userId}-${articleId}`;
  console.log(requestId)

  async function updatePaymentStatus(orderID) {
    try {
      const response = await fetch(`http://localhost:5000/update-payment-status/${orderID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          status: 'Published',
        }),
      });
  
      if (response.ok) {
        console.log('Statut de paiement mis à jour avec succès dans la base de données.');
        const data = await response.json();
        localStorage.setItem('articlesData', JSON.stringify(data.articles));
      } else {
        console.error('Échec de la mise à jour du statut de paiement dans la base de données.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de paiement :', error);
    }
  }
  

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
          }}
          //fundingSource="paypal"
          createOrder={async () => {
            try {
              const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'PayPal-Request-Id': requestId,
                    'Authorization': `Basic ${basicAuth}`,
                },
        
                body: JSON.stringify({
                  intent: 'CAPTURE',
                  purchase_units: [
                    {
                      amount: {
                        currency_code: 'USD',
                        value:prixAsString
                      }
                    }
                  ]
                })
              });

              const orderData = await response.json();

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(
                `https://api-m.sandbox.paypal.com/v2/checkout/orders/${data.orderID}/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea205048',
                    'Authorization': `Basic ${basicAuth}`,
                },
                },
              );

              const orderData = await response.json();

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`,
                );
              } else {
                await updatePaymentStatus(articleId);
                handleCloseDialog;
                window.location.reload();
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}.`,
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2),
                );
              }
              
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`,
              );
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default App;
