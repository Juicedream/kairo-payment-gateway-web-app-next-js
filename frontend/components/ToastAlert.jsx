import { CircleCheckBig, CircleX, Info, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

const ToastAlert = ({
  type = "success",
  message = "Change this message",
}) => {
  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    function hideOrShowAlert() {
      setTimeout(() => setShowAlert(false), 3000);
    }
    hideOrShowAlert();
  }, [showAlert]);

  if (!showAlert) return null;

  return (
    <div
      role="alert"
      className="toast toast-top toast-center animate-fade-in animate-bounce"
    >
      {type === "info" && (
        <div className="alert alert-info">
          <Info />
          <span>{message}</span>
        </div>
      )}
      {type === "warning" && (
        <div className="alert alert-warning">
          <TriangleAlert />
          <span>{message}</span>
        </div>
      )}
      {type === "error" && (
        <div className="alert alert-error">
          <CircleX />
          <span>{message}</span>
        </div>
      )}
      {type === "success" && (
        <div className="alert alert-success">
          <CircleCheckBig />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default ToastAlert;
