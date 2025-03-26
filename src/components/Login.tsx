import React from "react";
import { auth, provider, signInWithPopup } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center md:justify-start bg-[#FDF7F5]">
      {/* Background Image */}
      <img
        src="/Login image.png"
        alt="login"
        className="absolute bg-cover bg-center h-screen w-full overflow-hidden hidden md:block"
      />
      {/* Login Box */}
      <div className="relative z-10 text-center md:text-left p-6 rounded-lg max-w-md">
        <h1 className="text-2xl font-bold text-purple-700 md:text-left flex items-center justify-center gap-2">
          <span className="text-3xl">📋</span> TaskBuddy
        </h1>
        <p className="mt-2 text-gray-600">
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </p>

        {/* Google Sign-in Button */}
        <button
          onClick={handleGoogleSignIn}
          className="mt-6 flex items-center justify-center gap-2 w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
        >
          <img src="/google.png" alt="Google Logo" className="w-7 h-7" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
