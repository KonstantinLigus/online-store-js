"use client";

import PasswordChangeForm from "@/frontend/components/consumers/PasswordChangeForm";
import PasswordRecoveryForm from "@/frontend/components/consumers/PasswordRecoveryForm";
import { useState } from "react";

const PasswordRecoverPage = () => {
  const [emailForSendTempPassw, setEmailForSendTempPassw] = useState("");

  return (
    <>
      {/* {!emailForSendTempPassw && (
        <PasswordRecoveryForm
          setEmailForSendTempPassw={setEmailForSendTempPassw}
        />
      )} */}
      {/* {emailForSendTempPassw && <PasswordChangeForm isOldPasswAsTemp={true} />} */}
      <PasswordRecoveryForm />
    </>
  );
};

export default PasswordRecoverPage;
