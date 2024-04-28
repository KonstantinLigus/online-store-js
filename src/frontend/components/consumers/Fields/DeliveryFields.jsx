import { useEffect, useState } from "react";
import DeliveryInputOptions from "./DeliveryInputOptions";
import ConsumerAddress from "./ConsumerAddress";
import deliveryTypes from "./deliveryTypes";

const [postOfficeDelivery, courierDelivery, storeDelivery] = deliveryTypes;

const DelivetyFields = ({ consumer, setConsumer }) => {
  const { region, city, postOffice, deliveryType } = consumer;
  const [deliveryData, setDeliveryData] = useState({
    region,
    city,
    postOffice,
  });

  useEffect(() => {
    setConsumer(prev => {
      const {
        region: { name: prevRegionName },
        city: { name: prevCityName },
        // postOffice: { name: prevPostOfficeName },
      } = prev;

      const {
        region: { name: currentRegionName },
        city: { name: currentCityName },
        postOffice: { name: currentPostOfficeName },
      } = deliveryData;

      if (prevRegionName !== currentRegionName)
        return {
          ...prev,
          region: deliveryData.region,
          city: { ref: "", name: "" },
          postOffice: { ref: "", name: "" },
        };
      if (prevCityName !== currentCityName)
        return {
          ...prev,
          city: deliveryData.city,
          postOffice: { ref: "", name: "" },
        };
      if (prev.postOffice?.name.length > currentPostOfficeName.length)
        return {
          ...prev,
          postOffice: { ref: "", name: "" },
        };
      if (prev.postOffice?.name.length < currentPostOfficeName.length)
        return {
          ...prev,
          postOffice: {
            ref: deliveryData.postOffice.ref,
            name: deliveryData.postOffice.name,
          },
        };
      return prev;
    });
  }, [deliveryData, setConsumer]);

  const getAreas = setOptionsList => async value => {
    const res = await fetch("api/novaPoshta/getAreas");
    const { data } = await res.json();

    const filteredData = data.filter(option =>
      option.description.toLowerCase().includes(value.toLowerCase()),
    );
    setOptionsList(filteredData);

    value.length === 0 && setOptionsList([]);
  };

  const getSities = setOptionsList => async value => {
    const res = await fetch(
      `api/novaPoshta/getCities?areaRef=${region.ref}&cityName=${value}`,
    );
    const { data } = await res.json();

    data && setOptionsList(data);

    value.length === 0 && setOptionsList([]);
  };

  const getPostOffices = setOptionsList => async value => {
    const res = await fetch(
      `api/novaPoshta/getPostOffices?cityRef=${city.ref}`,
    );
    const { data } = await res.json();

    data && setOptionsList(data);

    value.length === 0 && setOptionsList([]);
  };

  return (
    <>
      {deliveryType !== storeDelivery && (
        <>
          <DeliveryInputOptions
            name="Область"
            initValue={region.name}
            setDeliveryData={setDeliveryData}
            fetchAndSetData={getAreas}
            type="region"
          />
          {region.ref && (
            <DeliveryInputOptions
              name="Місто"
              initValue={city.name}
              setDeliveryData={setDeliveryData}
              fetchAndSetData={getSities}
              type="city"
            />
          )}
          {deliveryType === postOfficeDelivery && region.ref && city.ref && (
            <DeliveryInputOptions
              name="Відділення"
              initValue={postOffice.name}
              setDeliveryData={setDeliveryData}
              fetchAndSetData={getPostOffices}
              type="postOffice"
            />
          )}
          {deliveryType === courierDelivery && region.ref && city.ref && (
            <ConsumerAddress consumer={consumer} setConsumer={setConsumer} />
          )}
        </>
      )}
      {deliveryType === storeDelivery && null}
    </>
  );
};

export default DelivetyFields;
