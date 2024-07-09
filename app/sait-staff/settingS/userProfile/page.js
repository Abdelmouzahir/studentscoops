/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SnDrbEvPfnn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useEffect, useRef, use } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatPhoneNumber } from "@/Constant/formated";
import { db } from "@/app/firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { CgArrowsExchange } from "react-icons/cg";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase/config";

export default function UserProfile({ data, getUserData }) {
  const [name, setName] = useState(data[0].name);
  const [email, setEmail] = useState(data[0].email);
  const [phoneNumber, setPhoneNumber] = useState(data[0].phoneNumber);
  const [address, setAddress] = useState(data[0].address);
  const [role, setRole] = useState(data[0].role);
  const fileInpt = useRef(null);

  useEffect(() => {
    if (data) {
      setName(data[0].name);
      setEmail(data[0].email);
      setPhoneNumber(data[0].phoneNumber);
      setAddress(data[0].address);
      setRole(data[0].role);
    }
  }, [data]);

  const handleDivClick = () => {
    fileInpt.current.click();
  };

  async function uploadImage(image) {
    const storageRef = ref(storage, `Saitstaff/${data[0].uid}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const fileProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${fileProgress}% done`);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error("Upload failed", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        try {
          // Query to find the restaurant document with the matching userId
          const docRef = doc(db, "saitStaff", data[0].id);
          await updateDoc(docRef, {
            imageUrl: downloadURL,
          }).then(() => {
            alert("Image uploaded successfully");
            getUserData();
          });
        } catch (error) {
          console.error("Error writing document: ", error);
        }
      }
    );
  }

  const validExtensions = [
    ".png",
    ".jpeg",
    ".jpg",
    ".gif",
    ".bmp",
    ".tiff",
    ".tif",
    ".svg",
    ".webp",
    ".ico",
    ".heif",
    ".heic",
    ".raw",
  ];
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))) {
      uploadImage(file);
    } else {
      console.log("Invalid file format");
    }
  };

  async function updateProfile(e) {
    e.preventDefault();
    try {
      const docRef = doc(db, "saitStaff", data[0].id);
      await updateDoc(docRef, {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
      }).then(() => {
        alert("Profile updated successfully");
        getUserData();
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    // Changes to be made here
    <div className="mx-full max-w-md">
      <div className="mx-auto grid items-center justify-center w-[200%]">
        <div
          className="mx-auto rounded-full bg-cover bg-center w-96 h-96 cursor-pointer"
          style={{ backgroundImage: `url(${data[0].imageUrl})` }}
        >
          <input
            type="file"
            ref={fileInpt}
            onChange={(e) => handleFileChange(e)}
            className="hidden"
          />
          <div
            className="group rounded-full w-96 h-96 hover:bg-black/30 grid items-center justify-center text-center cursor-pointer"
            onClick={handleDivClick}
          >
            <CgArrowsExchange className="hidden group-hover:block text-4xl z-10 text-white"></CgArrowsExchange>
          </div>
        </div>
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
                  setAddress(e.target.value);
                }}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-green-600"
            onClick={(e) => {
              updateProfile(e);
            }}
          >
            Update Profile
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
