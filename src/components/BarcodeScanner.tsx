import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let active = true;
    let currentStream: MediaStream | null = null;

    if (scanning) {
      (async () => {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const cameras = devices.filter((d) => d.kind === "videoinput");

          if (cameras.length === 0) {
            setError("No camera devices found");
            return;
          }

          const selectedDeviceId = cameras[0].deviceId;

          codeReader.decodeFromVideoDevice(
            selectedDeviceId,
            videoRef.current!,
            (result: any | undefined, err) => {
              if (result && active) {
                const code = result.getText();
                setScanning(false);
                stopStream();
                navigate(`/product/${code}`);
              }
              if (err && !(err.name === "NotFoundException")) {
                console.error(err);
              }
            }
          );

          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: selectedDeviceId },
          });
          currentStream = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error(err);
          setError("Camera access denied or unavailable.");
        }
      })();
    }

    const stopStream = () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
        currentStream = null;
      }
    };

    return () => {
      active = false;
      stopStream();
    };
  }, [scanning, navigate]);

  return (
    <div className="border rounded-xl p-4 shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-2">Scan Product Barcode</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {!scanning ? (
        <button
          onClick={() => setScanning(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Start Scanning
        </button>
      ) : (
        <div className="relative">
          <video ref={videoRef} autoPlay className="w-full rounded-md" />
          <p className="absolute bottom-2 left-2 text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            Scanning...
          </p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
