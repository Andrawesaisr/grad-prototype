import React, { useRef } from "react";

const LearnLetter = () => {
  const videoRef = useRef(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };
  return (
    <div>
      <button onClick={startWebcam}>Start Webcam</button>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
    </div>
  );
};

export default LearnLetter;
