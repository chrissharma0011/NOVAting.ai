import React, { useEffect, useRef, useState } from 'react';

const UserHomePage = () => {
  const videoRef = useRef(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setPermissionGranted(true);
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setError(err.name);
      }
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      getMedia();
    } else {
      setError("getUserMedia is not supported by your browser.");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-inter text-gray-200" style={{ backgroundColor: '#0b0f2a' }}>
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full -z-10" style={{ backgroundImage: 'linear-gradient(135deg, #4c288d, #3c096c, #2a0a5e)', overflow: 'hidden' }}>
        <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]" style={{
          background: 'radial-gradient(circle at top right, #6e3dbe, transparent 50%), radial-gradient(circle at bottom left, #3d3b9e, transparent 50%)',
          opacity: 0.5,
          animation: 'moveGradient 15s infinite alternate'
        }} />
      </div>

      <div className="relative w-full max-w-4xl mx-auto p-8 md:p-12 bg-gray-900 rounded-2xl shadow-2xl backdrop-blur-md bg-opacity-80 text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">User Dashboard</h1>
        
        {!permissionGranted && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Requesting Camera and Mic Access...</h2>
            {error && <p className="text-red-400">Error: {error}. Please ensure you have granted permissions.</p>}
          </div>
        )}

        {permissionGranted && (
          <div className="w-full flex justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-w-xl rounded-xl shadow-lg border-4 border-purple-500"
            ></video>
          </div>
        )}

        <div className="mt-8 text-sm text-gray-400">
          Welcome to your personal space. The AI is ready when you are.
        </div>
      </div>

      {/* CSS for background animation */}
      <style>
        {`
          @keyframes moveGradient {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50%, 50%); }
          }
        `}
      </style>
    </div>
  );
};

export default UserHomePage;
