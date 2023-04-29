import { useEffect } from "react";
import "./Alert.css";

const Alert = ({ type, message, isOpen, setIsOpen }) => {
  useEffect(() => {
    const alertComponent = document.getElementsByClassName("alert")[0];

    isOpen
      ? (alertComponent.style.display = "block")
      : (alertComponent.style.display = "none");
  }, [isOpen]);

  return (
    <div className={`alert alert-${type}`}>
      <button
        type="button"
        className="close"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      {message}
    </div>
  );
};

export default Alert;
