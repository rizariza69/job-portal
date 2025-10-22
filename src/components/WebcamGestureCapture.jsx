import { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import Three from "../assets/three.png";
import Two from "../assets/two.png";
import One from "../assets/one.png";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function WebcamGestureCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [captured, setCaptured] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [cooldown, setCooldown] = useState(false);
  const [ready, setReady] = useState(false);
  const [handLandmarker, setHandLandmarker] = useState(null);

  const hands = [
    { id: 1, src: Three },
    { id: 2, src: Two },
    { id: 3, src: One },
  ];
  useEffect(() => {
    async function init() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
      const hand = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });
      setHandLandmarker(hand);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setReady(true);

      const render = async () => {
        if (!hand) return;
        const results = await hand.detectForVideo(
          videoRef.current,
          performance.now()
        );
        draw(results);
        requestAnimationFrame(render);
      };
      render();
    }
    init();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const draw = (results) => {
    if (!canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);

    if (results.landmarks?.[0]) {
      const fingers = countFingers(results.landmarks[0]);
      if (fingers === 3 && !cooldown && !captured) {
        setCooldown(true);
        startCountdown();
        setTimeout(() => setCooldown(false), 4000);
      }
    }
  };

  const countFingers = (lm) => {
    let c = 0;
    if (lm[8].y < lm[6].y) c++;
    if (lm[12].y < lm[10].y) c++;
    if (lm[16].y < lm[14].y) c++;
    if (lm[20].y < lm[18].y) c++;
    return c;
  };

  const startCountdown = () => {
    let num = 3;
    setCountdown(num);
    const timer = setInterval(() => {
      num--;
      if (num < 0) {
        clearInterval(timer);
        setCountdown(null);
        capturePhoto();
      } else {
        setCountdown(num);
      }
    }, 900);
  };

  const capturePhoto = () => {
    const c = document.createElement("canvas");
    c.width = videoRef.current.videoWidth;
    c.height = videoRef.current.videoHeight;
    const ctx = c.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    const data = c.toDataURL("image/jpeg");
    setCaptured(data);
  };

  const handleRetake = () => {
    setCaptured(null);
  };

  const handleSubmit = () => {
    if (onCapture) onCapture(captured);
  };

  return (
    <div className="flex flex-col items-center">
      {!captured ? (
        <>
          <div className="relative w-full">
            <video
              ref={videoRef}
              className="rounded-lg border"
              style={{ width: "100%", height: "360px", objectFit: "cover" }}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-7xl font-bold">
                {countdown}
              </div>
            )}
          </div>

          <div className="mt-4">
            <p className="text-[12px]  text-[#1D1F20] mb-3">
              To take a picture, follow the hand poses in the order shown below.
              The system will automatically capture the image once the final
              pose is detected.
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              {hands?.map((img, index) => (
                <div key={img.id} className="flex items-center">
                  <img
                    src={img.src}
                    alt={`Hand ${img.id}`}
                    className="w-14 h-14 object-contain bg-[#f8f5f2] p-2 rounded-md"
                  />
                  {index < hands?.length - 1 && (
                    <ChevronRightIcon className="w-6 h-6 text-gray-700 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="font-semibold text-gray-700 mb-2">
            Your Captured Photo
          </p>
          <img
            src={captured}
            alt="Captured"
            className="rounded-lg w-[400px] h-[300px] object-cover border"
          />
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleRetake}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Retake photo
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#01959F] text-white rounded-md hover:bg-[#017E86]"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
