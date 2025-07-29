"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, createError] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", "true");
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    if (createError) {
      if (createError.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else {
        setError("Error creating account");
      }
    }
  }, [createError]);

  const handleSignUp = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button onClick={handleSignUp} className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500">
            Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
