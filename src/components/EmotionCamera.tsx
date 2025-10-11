import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdClose, MdCamera } from "react-icons/md";

interface EmotionCameraProps {
  isScanning: boolean;
  onClose: () => void;
  onEmotionDetected: (emotion: string, analysis: any) => void;
  cameraError: string | null;
}

const EmotionCamera = ({
  isScanning,
  onClose,
  onEmotionDetected,
  cameraError,
}: EmotionCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current) return;
    setIsLoading(true);
    console.log("Gemini Debug: Capturing image and starting analysis...");

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL("image/jpeg");

    try {
      console.log("Gemini Debug: Sending image to backend for analysis...");
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageDataUrl }),
      });

      console.log("Gemini Debug: Received response from backend:", response);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to analyze emotion. Status: ${response.status}, Body: ${errorText}`);
      }

      const result = await response.json();
      console.log("Gemini Debug: Parsed analysis result:", result);

      console.log("Gemini Debug: Calling onEmotionDetected callback...");
      onEmotionDetected(result.emotion, result);
    } catch (error) {
      console.error("Gemini Debug: Error analyzing emotion:", error);
      alert("Could not analyze emotion. Please ensure the backend server is running and check the browser console for errors.");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isScanning]);

  if (!isScanning) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Detect Emotion</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2"
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="relative">
          <div className="bg-black rounded-xl overflow-hidden mb-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-96 object-cover"
            />
          </div>

          {cameraError && (
            <div className="text-red-500 text-center mb-4 p-4 bg-red-50 rounded-lg">
              {cameraError}
            </div>
          )}

          <div className="text-center mb-4">
            <p className="text-gray-600">
              Position your face in the frame and capture the photo.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={captureAndAnalyze}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <MdCamera size={20} />
                  Capture and Analyze
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmotionCamera;