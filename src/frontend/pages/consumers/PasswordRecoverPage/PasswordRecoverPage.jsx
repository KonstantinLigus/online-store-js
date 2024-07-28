"use client";

import PasswordChangeForm from "@/frontend/components/consumers/PasswordChangeForm";
import PasswordRecoveryForm from "@/frontend/components/consumers/PasswordRecoveryForm";
import PasswordRecoveryTempForm from "@/frontend/components/consumers/PasswordRecoveryTempForm";
import { useState } from "react";

const PasswordRecoverPage = () => {
  const [emailForSendTempPassw, setEmailForSendTempPassw] = useState("");
  const [tempPassw, setTempPassw] = useState("");

  return (
    <>
      {!emailForSendTempPassw && (
        <PasswordRecoveryForm
          setEmailForSendTempPassw={setEmailForSendTempPassw}
        />
      )}
      {emailForSendTempPassw && !tempPassw && (
        <PasswordRecoveryTempForm setTempPassw={setTempPassw} />
      )}
      {tempPassw && (
        <PasswordChangeForm
          oldPassw={tempPassw}
          emailForSendTempPassw={emailForSendTempPassw}
        />
      )}
    </>
  );
};

export default PasswordRecoverPage;
