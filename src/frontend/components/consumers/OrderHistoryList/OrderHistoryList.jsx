import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./OrderHistoryList.module.scss";
import deliveryTypes from "@/deliveryTypes";
import InputRadioCarusel from "../InputRadio/InputRadioCarusel";

const [post, courier, store] = deliveryTypes;

export default function OrderHistoryList({ owner }) {
  const [orders, setOrders] = useState([]);
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetch(`api/order/getAllForOwner?owner=${owner._id}`);
      const { orders } = await data.json();
      setOrders(orders);
    };
    getOrders();
  }, [owner._id]);

  return (
    <ul className={styles.OrdersList}>
      {orders &&
        orders.map(
          ({
            _id,
            products,
            dateOfCreation,
            isCompleted,
            deliveryInfo: {
              deliveryType,
              city: { name: cityName },
              region: { name: regionName },
              street,
              flat,
              house,
              postOffice,
            },
            totalPrice,
          }) => {
            const date = new Date(Number(dateOfCreation));
            const formatedDate = new Intl.DateTimeFormat("uk", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            }).format(date);

            const getAddress = () => {
              if (deliveryType === post)
                return `${cityName}, ${regionName} обл., ${postOffice.name}`;
              if (deliveryType === courier)
                return `${cityName}, ${regionName} обл., вул. ${street} ${house}, кв. ${flat}`;
              return deliveryType;
            };

            return (
              <li key={_id} className={styles.OrderWrapper}>
                <InputRadioCarusel
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                  tabIndex={_id}
                >
                  <div className={styles.OrderInfoWrapper}>
                    <div>
                      <b>Замовлення {_id}</b>
                      {currentTab !== _id && (
                        <div>
                          {isCompleted ? "Доставлений" : "Не доставлений"}
                        </div>
                      )}
                    </div>
                    <div className={`${styles.Price} ${styles.OrderPrice}`}>
                      <div className={styles.MarginBottom}>
                        Сума замовлення:
                      </div>
                      <b>{totalPrice} ₴</b>
                    </div>
                  </div>
                </InputRadioCarusel>
                {currentTab === _id && (
                  <>
                    <ul className={styles.ProductList}>
                      {products.map(
                        ({
                          mainImage,
                          productName,
                          value,
                          unit,
                          quantity,
                          price,
                          _id,
                        }) => (
                          <li key={_id} className={styles.ProductWrapper}>
                            <Image
                              src={mainImage}
                              alt={productName}
                              width={130}
                              height={130}
                            />
                            <div className={styles.ProductInfoWrapper}>
                              <div className={styles.ProductNameWrap}>
                                <div className={styles.ProductName}>
                                  {productName}
                                </div>
                                <div>
                                  {isCompleted
                                    ? "Доставлений"
                                    : "Не доставлений"}
                                </div>
                              </div>
                              <div className={styles.QuantityAndValue}>
                                <div>
                                  {quantity * value} {unit}
                                </div>
                                <div className={styles.PriceOfOrder}>
                                  {price} ₴
                                </div>
                              </div>
                            </div>
                          </li>
                        ),
                      )}
                    </ul>
                    <div className={styles.DateAndAddress}>
                      <div>
                        <b>Адреса доставки: </b> {formatedDate}
                      </div>
                      <div>
                        <b>Адреса доставки: </b> {getAddress()}
                      </div>
                    </div>
                  </>
                )}
              </li>
            );
          },
        )}
    </ul>
  );
}
