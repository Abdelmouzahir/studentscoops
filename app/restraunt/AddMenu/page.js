"use client";
import { useState } from "react";
import { useUserAuth } from "@/services/utils";
import { useRouter } from "next/navigation";
import { addRestaurantMenu } from "@/services/PostRequest/postRequest";

const Page = () => {
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [ description, setDescription ] = useState("");
  const [ price, setPrice ] = useState("");
  const [imageerr, setImageerr] = useState("");
  const [image, setImage] = useState([]);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setImageerr("");
    if (
      !image[0].name.endsWith(".jpg") &&
      !image[0].name.endsWith(".jpeg") &&
      !image[0].name.endsWith(".png")
    ) {
      setImageerr(
        "Please ensure you upload a valid image format, such as JPEG, JPG, or PNG."
      );
      return;
    }
    addRestaurantMenu(user, name, price, description, image[0]);
    router.push("/restraunt/FetchData")
    console.log(
      name,
      "image name",
      image[0].name,
    );
  };

  return (
    <div
      className="min-h-screen py-40"
      style={{ backgroundImage: "linear-gradient(115deg, #dfc42f, #faf7df)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url(/assets/images/menu.jpeg)" }}
          ></div>
          <div className="w-full lg:w-1/2 py-16 px-12 text-black">
            <h2 className="text-3xl mb-4 text-black">Add Menu</h2>
            <p className="mb-4">Please add the available products</p>
            <form
              className="mt-5 grid grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
              <input
                type="text"
                placeholder="Price"
                required
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
              <textarea
                placeholder="Description"
                required
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full rounded-md col-span-full h-auto"
              />
              <p className="col-span-full">
                Upload remaining product package image for this product.
              </p>
              <input
                type="file"
                placeholder="Upload Image"
                required
                onChange={(e) => e && setImage(Array.from(e.target.files))}
                className="border border-gray-400 py-1 px-2 w-full rounded-md col-span-full cursor-pointer"
              />
              {imageerr && (
                <div className="text-red-500 text-sm col-span-full">
                  {imageerr}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md col-span-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
