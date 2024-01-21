"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export const Payment = ({ dataAndSignatureObj, setPaymentData }) => {
  const [isScript, setIsScript] = useState(false);
  useEffect(() => setIsScript(true), [dataAndSignatureObj]);

  const successPaymentHandler = async ({ order_id, end_date }) => {
    await fetch(`/api/order/update?id=${order_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isPaid: true,
        liqPayEncodedData: null,
        dateOfPayment: end_date,
      }),
    });
  };

  return (
    <>
      <div id="liqpay_checkout"></div>
      {isScript && (
        <>
          <Script id="liqpay-script">
            {
              (window.LiqPayCheckoutCallback = function () {
                LiqPayCheckout.init({
                  ...dataAndSignatureObj,
                  embedTo: "#liqpay_checkout",
                  mode: "embed", // embed || popup
                })
                  .on("liqpay.callback", successPaymentHandler)
                  .on("liqpay.ready", function (data) {
                    // ready
                  })
                  .on("liqpay.close", function (data) {
                    // close
                    setPaymentData(null);
                  });
              })
            }
          </Script>
          <Script
            src="//static.liqpay.ua/libjs/checkout.js"
            beforeInteractive
          />
        </>
      )}
    </>
  );
};
