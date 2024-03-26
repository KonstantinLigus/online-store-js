import { useEffect, useState } from "react";
import DeliveryInputOptions from "../Fields/DeliveryInputOptions";

const DelivetyFields = ({ consumer, setConsumer }) => {
  const { region, city, postOffice } = consumer;
  const [deliveryData, setDeliveryData] = useState({
    region,
    city,
    postOffice,
  });
  useEffect(() => {
    setDeliveryData({
      region,
      city,
      postOffice,
    });
  }, [city, postOffice, region]);

  useEffect(() => {
    setConsumer(prev => {
      const {
        region: { name: prevRegionName },
        city: { name: prevCityName },
        postOffice: { name: prevPostOfficeName },
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
      if (prevPostOfficeName.length > currentPostOfficeName.length)
        return {
          ...prev,
          postOffice: { ref: deliveryData.postOffice.ref, name: "" },
        };
      if (prevPostOfficeName !== currentPostOfficeName)
        return {
          ...prev,
          postOffice: { ref: "", name: currentPostOfficeName },
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
      <DeliveryInputOptions
        name="Область"
        deliveryData={deliveryData}
        setDeliveryData={setDeliveryData}
        fetchAndSetData={getAreas}
        type="region"
      />
      {region.ref && (
        <DeliveryInputOptions
          name="Місто"
          deliveryData={deliveryData}
          setDeliveryData={setDeliveryData}
          fetchAndSetData={getSities}
          type="city"
        />
      )}
      {region.ref && city.ref && (
        <DeliveryInputOptions
          name="Відділення"
          deliveryData={deliveryData}
          setDeliveryData={setDeliveryData}
          fetchAndSetData={getPostOffices}
          type="postOffice"
        />
      )}
    </>
  );
};

export default DelivetyFields;
