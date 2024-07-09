'use client'
import Header from "./main-component/layout/header/header";
import Footer from "./main-component/layout/footer/footer";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import {motion} from "framer-motion";
import { Card, CardContent } from "/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import LearnMore from "@/components/LearnMore";
// import { CartProvider } from "./Restrauntitems/cart-context/page";

export default function Home() {

const [showModal, setShowModal] = useState(false);

  return (
    <>
    <main className="bg-white max-h-max ">
      <Header />
      <div>
            {/* Section 1: Hero section with an image and some text */}
            <section className="w-full bg-[#f8f9fa] py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <motion.img
                        iwhileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}

                            alt="Hero"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                            height="550"
                            src="/assets/images/login.jpeg"
                            width="550" />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Scooping Better <span className="text-primary">Deals</span> for Students
                                </h1>
                                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Our student-focused food app connects you with local eateries offering exclusive discounts. Enjoy
                                    delicious meals at affordable prices and build a sense of community.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4 min-[400px]:flex-row">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#6c5ce7] dark:text-gray-50 dark:hover:bg-[#6c5ce7]/90 dark:focus-visible:ring-[#6c5ce7]"
                                    href="/auth/register">
                                    Register
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowModal(true)}
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:border-[#6c5ce7] dark:bg-[#1e1e1e] dark:hover:bg-[#2b2b2b] dark:hover:text-gray-50 dark:focus-visible:ring-[#6c5ce7]"
                                    href="#">
                                    Learn More
                                </motion.button>
                                <Modal
                                isVisible={showModal}
                                onClose={() => {
                                setShowModal(false);
                                }}
                                >
                                  <LearnMore setShow={setShowModal}/>
                                </Modal>
                                 
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Features section with icons and descriptions */}
            <section className="w-full py-12 md:py-24 lg:py-32 ">
                <div className="container grid gap-12 px-4 md:grid-cols-3 md:px-6">
                    <div className="space-y-4 text-center">
                        <DiscIcon className="mx-auto h-12 w-12 text-primary" />
                        <h2 className="text-2xl font-bold">Discounted Leftovers</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Save up to 50% on delicious leftover meals from local restaurants and cafes.
                        </p>
                        <Button  onClick variant="link">Learn More</Button>
                    </div>
                    <div className="space-y-4 text-center">
                        <BuildingIcon className="mx-auto h-12 w-12 text-primary" />
                        <h2 className="text-2xl font-bold">Support Local Businesses</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Help reduce food waste and support your local community by ordering leftover meals.
                        </p>
                        <Button variant="link">Learn More</Button>
                    </div>
                    <div className="space-y-4 text-center">
                        <SmartphoneIcon className="mx-auto h-12 w-12 text-primary" />
                        <h2 className="text-2xl font-bold">Accessible on Multiple devices</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Easily browse, order, and track your leftover meals on multiple devices.
                        </p>
                        <Button variant="link">Learn More</Button>
                    </div>
                </div>
            </section>

            {/* Section 3: Testimonials section with student reviews */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9fa] dark:bg-[#2b2b2b]">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-[#e6e6e6] px-3 py-1 text-sm dark:bg-[#3b3b3b]">
                                Student Testimonials
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Hear from our satisfied students about how our app has helped them discover delicious and affordable
                                meals near their campus.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                        <Card>
                            <CardContent className="p-6 text-left">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border">
                                        <img src="/placeholder.svg" alt="@username" />
                                        <AvatarFallback>JS</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-bold">Jessica Smith</h3>
                                        <p className="text-gray-500 dark:text-gray-400">University of California, Berkeley</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-500 dark:text-gray-400">
                                    "This app has been a game-changer for me as a busy student. I love being able to discover new
                                    restaurants with discounts and save money on delicious meals. It's made eating out so much more
                                    affordable."
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-left">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border">
                                        <img src="/placeholder.svg" alt="@username" />
                                        <AvatarFallback>MR</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-bold">Michael Rodriguez</h3>
                                        <p className="text-gray-500 dark:text-gray-400">University of Texas, Austin</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-500 dark:text-gray-400">
                                    "As a student, I'm always looking for ways to save money, and this app has been a lifesaver. The
                                    discounts and deals have helped me enjoy delicious meals without breaking the bank. I highly
                                    recommend it to all my friends."
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-left">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border">
                                        <img src="/placeholder.svg" alt="@username" />
                                        <AvatarFallback>EM</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-bold">Emily Martinez</h3>
                                        <p className="text-gray-500 dark:text-gray-400">University of Washington, Seattle</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-500 dark:text-gray-400">
                                    "I love how this app connects me with local restaurants that offer discounts for students. It's
                                    helped me discover so many new and delicious places to eat, and the community aspect is really
                                    special. I feel like I'm part of a network of students who are all looking to save money and enjoy
                                    great food."
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
      <Footer />
    </main>
    </>
  );
}

function BuildingIcon(props) {
  return (
      (<svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M12 6h.01" />
          <path d="M12 10h.01" />
          <path d="M12 14h.01" />
          <path d="M16 10h.01" />
          <path d="M16 14h.01" />
          <path d="M8 10h.01" />
          <path d="M8 14h.01" />
      </svg>)
  );
}

function SmartphoneIcon(props) {
  return (
      (<svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
      </svg>)
  );
}

// Icon components used in Section 2
function DiscIcon(props) {
  return (
      (<svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="2" />
      </svg>)
  );
}