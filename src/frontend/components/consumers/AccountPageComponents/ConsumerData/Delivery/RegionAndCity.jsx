"use client";
import React, { useState, useEffect } from "react";
import styles from "../ConsumerData.module.scss";
import PostOffice from "./PostOffice";
import ConsumerAddress from "./ConsumerAddress";

const RegionAndCity = ({
  consumerData,
  setConsumerData,
  setDataWasChanged,
  typeOfDelivery,
}) => {
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState({});
  const [regionsNames, setRegionsNames] = useState([]);
  const [regionIsValid, setRegionIsValid] = useState(true);

  const [cities, setCities] = useState([]);
  const [cityIsValid, setCityIsValid] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/novaPoshta/getAreas");
      const { data } = await res.json();
      setRegions(data);
      setRegionsNames(data.map(i => i.description));
      setRegion(data.find(i => i.description === consumerData.region));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (consumerData.region === "") {
      setRegionIsValid(false);
      setCityIsValid(false);
      document
        .querySelector("input[name='region']")
        .setCustomValidity("Invalid field.");
      document
        .querySelector("input[name='city']")
        .setCustomValidity("Invalid field.");
    }
  }, [typeOfDelivery]);

  const validateRegion = e => {
    if (regionsNames.includes(e.target.value)) {
      setRegionIsValid(true);
      e.target.setCustomValidity("");
      setDataWasChanged(prev => ({
        ...prev,
        region: true,
      }));
      setRegion(regions.find(i => i.description === e.target.value));
    } else {
      setRegionIsValid(false);
      e.target.setCustomValidity("Invalid field.");
      setDataWasChanged(prev => ({
        ...prev,
        region: null,
      }));
    }
  };

  const handleRegion = e => {
    validateRegion(e);
    setConsumerData(prev => ({
      ...prev,
      region: e.target.value,
      city: "",
      postOffice: "",
      street: "",
      house: "",
      flat: "",
    }));
  };

  const handleCity = e => {
    if (e.target.value.length > 0) {
      const fetchData = async () => {
        const res = await fetch(
          `api/novaPoshta/getCities?areaRef=${region.areaRef}&cityName=${e.target.value}`,
        );
        const { data } = await res.json();
        setCities(data);
        if (data) {
          if (e.target.value === data[0].description) {
            setCityIsValid(true);
            e.target.setCustomValidity("");
            setDataWasChanged(prev => ({
              ...prev,
              city: true,
            }));
          } else {
            setCityIsValid(false);
            e.target.setCustomValidity("Invalid field.");
            setDataWasChanged(prev => ({
              ...prev,
              city: null,
            }));
          }
        }
      };
      fetchData();
    }

    setConsumerData(prev => ({
      ...prev,
      city: e.target.value,
      postOffice: "",
      street: "",
      house: "",
      flat: "",
    }));
  };

  return (
    <>
      <label
        htmlFor="region"
        className={regionIsValid ? styles.labelValid : styles.labelInvalid}
      >
        Область:
      </label>
      <input
        list="region"
        name="region"
        className={styles.select}
        value={consumerData.region}
        onChange={handleRegion}
      />
      <datalist id="region">
        {regions.map(r => (
          <option key={r.areaRef} value={r.description}>
            {r.description}
          </option>
        ))}
      </datalist>

      <label
        htmlFor="city"
        className={cityIsValid ? styles.labelValid : styles.labelInvalid}
      >
        Місто:
      </label>
      <input
        list="city"
        name="city"
        className={styles.select}
        value={consumerData.city}
        onChange={handleCity}
      />
      {cities && (
        <datalist id="city">
          {cities.map(c => (
            <option key={c.cityRef} value={c.description}>
              {c.description}
            </option>
          ))}
        </datalist>
      )}

      {typeOfDelivery === "office" ? (
        <PostOffice
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
          city={cities}
          typeOfDelivery={typeOfDelivery}
        />
      ) : (
        <ConsumerAddress
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
          typeOfDelivery={typeOfDelivery}
        />
      )}
    </>
  );
};

export default RegionAndCity;
