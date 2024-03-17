import { useState } from "react";
import DeliveryInputOptions from "../Fields/DeliveryInputOptions";

const DelivetyFields = ({ consumer, setConsumer }) => {
  const [regionRef, setRegionRef] = useState(null);
  const [cityRef, setCityRef] = useState(null);
  const [dataRefs, setRefsData] = useState({ region: "", city: "" });

  return (
    <>
      <DeliveryInputOptions
        initValue={consumer.region}
        setState={setConsumer}
        type="region"
        setRef={setRefsData}
      />
      {(dataRefs.region || consumer.city) && (
        <DeliveryInputOptions
          initValue={consumer.city}
          setState={setConsumer}
          type="city"
          dataRef={dataRefs.region}
          setRef={setRefsData}
        />
      )}
      {(dataRefs.city || consumer.postOffice) && (
        <DeliveryInputOptions
          initValue={consumer.postOffice}
          setState={setConsumer}
          type="postOffice"
          dataRef={dataRefs.city}
          setRef={setRefsData}
        />
      )}
    </>
  );
};

export default DelivetyFields;
