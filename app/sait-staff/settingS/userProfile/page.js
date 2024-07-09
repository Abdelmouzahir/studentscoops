/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SnDrbEvPfnn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatPhoneNumber } from "@/Constant/formated";

export default function UserProfile({ data }) {
  const [name, setName] = useState(data[0].name);
  const [email, setEmail] = useState(data[0].email);
  const [phoneNumber, setPhoneNumber] = useState(data[0].phoneNumber);
  const [address, setAddress] = useState(data[0].address);
  const [role, setRole] = useState(data[0].role);
  const [active, setActive] = useState(data[0].active);
  useEffect(() => {
    console.log("data: ", data);
  }, [data]);
  return (
    // Changes to be made here
    <div className="mx-full max-w-md">
      <div className="mx-auto grid items-center justify-center w-[200%]">
        <div
          className="mx-auto rounded-full bg-cover bg-center w-96 h-96 "
          style={{ backgroundImage: `url(${data[0].imageUrl})` }}
        />
        <h1 className="text-3xl font-bold mx-auto my-10">{data[0].name}</h1>
      </div>
      <Card className="w-[200%]">
        <CardContent className="grid grid-cols-2 gap-5 mt-6">
          <div className="space-y-2">
            <Label htmlFor="password">Name</Label>
            <div className="relative">
              <Input
                id="password"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                value={email}
                readOnly={true}
                className="cursor-not-allowed"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <div className="relative">
              <Input
                id="phoneNumber"
                maxLength={14}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(formatPhoneNumber(e.target.value));
                }}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <div className="relative">
              <Input
                id="role"
                value={role}
                readOnly={true}
                className="cursor-not-allowed"
              />
            </div>
          </div>
          <div className="space-y-2 col-span-full">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <Input
                id="address"
                value={address}
                onChange={(e) => {
                  address(e.target.value);
                }}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-green-600">
            Reset Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function EyeOffIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}
