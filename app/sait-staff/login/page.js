"use client";
import React, { Fragment, useState, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { AiOutlineUser } from "react-icons/ai";
import Modal from "@/components/Modal";
import { BiSolidCommentError } from "react-icons/bi";
import Loading from "@/app/loading";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saitStaffName, setSaitStaffName] = useState("");
  const [saitStaffimg, setSaitStaffimg] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch saitStaff name when component mounts
    fetchSaitStaffName();
  }, []);

  const fetchSaitStaffName = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const q = query(collection(db, "saitStaff"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        console.log("uid:",uid);

        if (!querySnapshot.empty) {
          const saitStaffData = querySnapshot.docs[0].data();
          const { name, imageUrl } = saitStaffData;
          const adminImg = imageUrl || <AiOutlineUser />;
          setSaitStaffimg(adminImg);
          setSaitStaffName(name);
        } else {
          console.log("No SAIT Staff data found for current user");
          setSaitStaffName("SAIT Staff"); // Set default name
        }
      }
    } catch (error) {
      console.error("Error fetching SAIT Staff name:", error);
      setSaitStaffName("SAIT Staff"); // Handle error, set default name
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(email, password);
      router.push("/sait-staff"); // Redirect after successful sign-in
      setEmail("");
      setPassword("");
      setLoginError("");
    } catch (error) {
      setLoading(false);
      setLoginError("Invalid email or password");
      console.error("Error signing in:", error);
    }
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();

    if (!email.endsWith("@sait.ca")) {
      setEmailError("Please use a SAIT Staff email");
      return;
    } else {
      setEmailError("");
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setShowModal(false);
        router.push("/auth/sign-in/afterResetPassword");
      })
      .catch((err) => {
        console.error("Error sending password reset email:", err);
        setEmailError("Failed to send password reset email");
      });
  };

  if (loading) {
    return <Loading />; // Render the Loading component when loading
  }

  return (
    <div
      className="min-h-screen py-40"
      style={{
        backgroundImage: "url(/assets/images/loginCover.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Fragment>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden">
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: "url(/assets/images/saitLogin.jpg)" }}
            ></div>
            <div className="w-full lg:w-1/2 py-16 px-12 text-black">
              <h2 className="text-3xl mb-4 text-black">Login</h2>
              <p className="mb-4">Welcome back!</p>
              <div className="mt-5">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 py-1 px-2 w-full rounded-md"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-400 py-1 px-2 w-full rounded-md"
                />
              </div>
              <div>
                {loginError && (
                  <div className="text-red-500 text-sm mb-4 flex">
                    <BiSolidCommentError className="mt-1 mr-2" />
                    {loginError}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <p
                  className="text-yellow-500 cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Forget Password?
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleSignIn}
                  className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <div>
            <p className="text-3xl mb-4 text-black">Reset Password🔒</p>
            <p className="py-3">
              We will send you an email with instructions on how to reset your
              password.
            </p>
            <div>
              <form onSubmit={handleForgotPassword}>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                  />
                  {emailError && (
                    <div className="text-red-500 text-sm mb-4 flex">
                      <BiSolidCommentError className="mt-1 mr-2" />
                      {emailError}
                    </div>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
                  >
                    Email Me
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </Fragment>
    </div>
  );
};

export default SignIn;
