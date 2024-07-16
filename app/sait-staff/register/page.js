"use client";
import { useState, useEffect } from "react";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import zxcvbn from "zxcvbn";

//icons
import { FaCheckCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSolidCommentError } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import addStudentEmailStatus from "@/services/PostRequest/postRequest";
import { getStudentEmailWithStatus } from "@/services/GetRequest/getRequest";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const [databaseEmailwithStatus, setDatabaseEmailwithStatus] = useState(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [minLengthMet, setMinLengthMet] = useState(false);
  const [uppercaseMet, setUppercaseMet] = useState(false);
  const [lowercaseMet, setLowercaseMet] = useState(false);
  const [numberMet, setNumberMet] = useState(false);
  const [specialCharMet, setSpecialCharMet] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword === password) {
        setIsPasswordMatch(true);
        setConfirmPassError("");
      } else {
        setIsPasswordMatch(false);
        setConfirmPassError("Passwords do not match");
      }
    } else {
      setIsPasswordMatch(false);
      setConfirmPassError("");
    }
  }, [confirmPassword, password]);

  useEffect(() => {
    async function gettingStudentEmailWhereStatusistrue() {
      const data = await getStudentEmailWithStatus();
      setDatabaseEmailwithStatus(data);
      
    }
    gettingStudentEmailWhereStatusistrue();
  }, []);

  useEffect(() => {
    // Check password strength
    const result = zxcvbn(password);
    setPasswordScore(result.score);

    // Check password conditions
    setMinLengthMet(password.length >= 8);
    setUppercaseMet(/[A-Z]/.test(password));
    setLowercaseMet(/[a-z]/.test(password));
    setNumberMet(/\d/.test(password));
    setSpecialCharMet(/[@$!%*?&]/.test(password));
  }, [password]);

  const handleSignUp = async () => {
    setEmailError("");
    setPassError("");
    setError("");

    // Check the email domain
    if (!email.endsWith("@sait.ca")) {
      setEmailError("Please use a SAIT Staff email");
      return;
    }

    if (!databaseEmailwithStatus.length==0){
      if (!databaseEmailwithStatus.includes(email)){
        setEmailError('Your email is either not a SAIT email or it is currently inactive.')
        return;
      }
    }
    if(databaseEmailwithStatus.length==0){
      setEmailError("Please refresh the page. If the issue persists, there may be a problem connecting to the database. For further assistance, please use the 'Contact Us' option.")
      return;
    }
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      setPassError(
        "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters."
      );
      return;
    }

    // Check if passwords match
    if (!isPasswordMatch) {
      setConfirmPassError("Passwords do not match");
      return;
    }

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      // await sendEmailVerification(auth.currentUser);
      console.log("User registered successfully");
      sessionStorage.setItem("user", true);
      
      router.push("/sait-staff/login");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (e) {
      // Check if the user already exists in the database
      console.error("Error registering:", e.message);
      if (e.code === "auth/email-already-in-use") {
        setEmailError("This email is already registered.");
      } else {
        setError("Failed to create account. Please try again.");
      }
    }
  };

  const getPasswordStrengthBar = (score) => {
    const strength = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const width = ["w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"];
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-green-700",
    ];
    const textColor = [
      "text-red-500",
      "text-orange-500",
      "text-yellow-500",
      "text-green-500",
      "text-green-700",
    ];
    return (
      <div className="mt-2 flex items-center">
        <div
          className={`h-2 ${colors[score]} ${width[score]} rounded-md mr-2`}
        ></div>
        <p className={`text-sm ${textColor[score]}`}>{strength[score]}</p>
      </div>
    );
  };

  const renderCondition = (conditionMet, label) => (
    <div className="flex items-center text-sm mt-2">
      {conditionMet ? (
        <FaCheckCircle className="text-green-500 mr-2" />
      ) : (
        <FaCheckCircle className="text-gray-300 mr-2" />
      )}
      <p className="text-black">{label}</p>
    </div>
  );

  return (
    <div
      className="min-h-screen py-40"
      style={{ 
        backgroundImage: "url(/assets/images/registerCover.jpg)",
        backgroundSize: "cover", // Adjusts the size of the background image
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat", // Prevents the background image from repeating
          }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url(/assets/images/phone.png)" }}
          ></div>
          <div className="w-full lg:w-1/2 py-16 px-12 text-black">
            <h2 className="text-3xl mb-4 text-black">Register</h2>
            <p className="mb-4">
              Create your account. It’s free and only takes a minute
            </p>
            <div className="mt-5">
              <input
                type="email"
                placeholder="Email: xxx@edu.sait.ca "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
            </div>
            {emailError && (
              <div className="text-red-500 text-sm mb-4 flex">
                <BiSolidCommentError className="mt-1 mr-2" />
                {emailError}
              </div>
            )}
            <div className="mt-5 relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
              <div
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
            {getPasswordStrengthBar(passwordScore)}
            <div className="mt-2">
              {renderCondition(minLengthMet, "Min 8 characters")}
              {renderCondition(uppercaseMet, "Uppercase")}
              {renderCondition(lowercaseMet, "Lowercase")}
              {renderCondition(numberMet, "Number")}
              {renderCondition(specialCharMet, "Special character")}
            </div>
            {passError && (
              <div className="text-red-500 text-sm mb-4">{passError}</div>
            )}
            <div className="mt-5 relative">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full rounded-md"
              />
              <div
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              >
                {isConfirmPasswordVisible ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </div>
            </div>
            {confirmPassError && (
              <div className="text-red-500 text-sm mb-4 flex">
                {" "}
                <AiFillCloseCircle className="text-red-500 mt-1 mr-2" />{" "}
                {confirmPassError}
              </div>
            )}
            {isPasswordMatch && confirmPassword && (
              <div className="text-green-500 text-sm mb-4 flex">
                {" "}
                <FaCheckCircle className="text-green-500 mt-1 mr-2" /> Passwords
                match!
              </div>
            )}
            <div className="mt-4">
              <button
                onClick={handleSignUp}
                className="w-full bg-yellow-500 py-3 text-center text-white mt-3 rounded-md"
              >
                Sign Up
              </button>
            </div>
            {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
