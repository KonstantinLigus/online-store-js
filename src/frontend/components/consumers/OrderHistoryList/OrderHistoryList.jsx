import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./OrderHistoryList.module.scss";

export default function OrderHistoryList({ owner }) {
  const [orders, setOrders] = useState([]);

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
              city: { name: cityName },
              region: { name: regionName },
              street,
              flat,
              house,
            },
            totalPrice,
          }) => {
            const date = new Date(Number(dateOfCreation));
            const formatedDate = new Intl.DateTimeFormat("uk", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            }).format(date);

            return (
              <li key={_id} className={styles.OrderWrapper}>
                <div className={styles.OrderTitleWrapper}>
                  <div className={styles.OrderInfoWrapper}>
                    <div>
                      <b className={styles.MarginBottom}>Замовлення {_id}</b>
                      <b>{isCompleted ? "Доставлений" : "Не доставлений"}</b>
                    </div>
                    <div>
                      <div className={styles.MarginBottom}>
                        Сума замовлення:
                      </div>
                      <b>{totalPrice} ₴</b>
                    </div>
                  </div>
                  <div>
                    <b>Дата створення:</b> {formatedDate}
                  </div>
                  <div>
                    <b>Адреса доставки:</b> {cityName}, {regionName} обл., вул.{" "}
                    {street} {house}, кв. {flat}
                  </div>
                </div>
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
                          <div className={styles.ProductName}>
                            {productName}
                          </div>
                          <div className={styles.QuantityAndValue}>
                            <div>
                              {quantity * value} {unit}
                            </div>
                            <div>{price} ₴</div>
                          </div>
                        </div>
                      </li>
                    ),
                  )}
                </ul>
              </li>
            );
          },
        )}
    </ul>
  );
}
