"use client";
import { useEffect, useState } from "react";
import { PasswordReset } from "@/Components/PasswordReset";
import { useUserAuth } from "@/services/utils";
import { EmailVerification } from "@/Components/EmailVerificaton";

function page() {
  const { verified } = useUserAuth();
  return(
    <div>{verified ? (<PasswordReset />) : (<EmailVerification />)}</div>
  )
}

export default page;
