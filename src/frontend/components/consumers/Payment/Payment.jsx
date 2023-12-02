"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export const Payment = ({ dataAndSignatureObj }) => {
  const [isScript, setIsScript] = useState(false);
  useEffect(() => setIsScript(true), [dataAndSignatureObj]);

  const successPaymentHandler = async ({ order_id, end_date }) => {
    const res = await fetch(`/api/order/update?id=${order_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isPaid: true,
        liqPayEncodedData: null,
        dateOfPayment: end_date,
      }),
    });
    const dataRes = await res.json();
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
                  mode: "popup", // embed || popup
                })
                  .on("liqpay.callback", successPaymentHandler)
                  .on("liqpay.ready", function (data) {
                    // ready
                  })
                  .on("liqpay.close", function (data) {
                    // close
                  });
              })
            }
          </Script>
          <Script src="//static.liqpay.ua/libjs/checkout.js" />
        </>
      )}
    </>
  );
};
