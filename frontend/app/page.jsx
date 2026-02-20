"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const websocket = new WebSocket(
  "wss://blink-pay-bank-app-backend.onrender.com",
);

function LandingPage() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    websocket.onopen = () => {
      console.log("WebSocket connection established to Blink Pay Bank");
    };
  }, []);
  return (
    <div
      className="px-8 py-4 w-full h-screen flex flex-col items-center justify-center gap-4"
      theme="light"
    >
      {/* hero section */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(http://localhost:3000/background.png)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Kairo Payment Service</h1>
            <p className="mb-5">
              Experience seamless transactions with Kairo Payment Service, your
              trusted partner for secure and efficient payment solutions. Join
              us today and revolutionize the way you handle payments!
            </p>
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
