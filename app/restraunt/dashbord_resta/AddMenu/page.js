"use client";
import { useState} from "react";
import { useUserAuth } from "@/services/utils";
import { useRouter } from "next/navigation";
import { addRestaurantMenu } from "@/services/PostRequest/postRequest";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


const Page = () => {
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [ description, setDescription ] = useState("");
  const [ price, setPrice ] = useState("");
  const [imageerr, setImageerr] = useState("");
  const [image, setImage] = useState([]);
  const router = useRouter();

  const handleSubmit = () => {
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
    
    console.log(
      name,
      "image name",
      image[0].name,
    );
    router.push("/restraunt/dashbord_resta/inventory")
  };

  return (

    <section className="w-full py-5 md:py-10">
    <div className="container px-4 md:px-6 max-w-2xl mx-auto">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Add Menu Item</h1>
          <p className="text-gray-500 dark:text-gray-400">Fill out the form below to add a new item to your menu.</p>
        </div>
        <Card onSubmit={handleSubmit} >
          <CardContent className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter item name"  required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="Enter price"  required value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter item description" className="min-h-[100px]"  required value={description}
                onChange={(e)=>setDescription(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" required
                onChange={(e) => e && setImage(Array.from(e.target.files))}/>
            </div>
            {imageerr && (
                <div className="text-red-500 text-sm col-span-full">
                  {imageerr}
                </div>
              )}
          </CardContent>
          <CardFooter>
            <Button  onClick={handleSubmit} className="ml-auto">Add Item</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </section>
    

  );
};

export default Page;
