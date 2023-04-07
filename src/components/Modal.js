import { useEffect } from "react";
import "./Modal.css";

export default function Modal({ props, isOpen }) {
  useEffect(() => {
    const modal = document.getElementById("modal").style;
    isOpen ? (modal.display = "flex") : (modal.display = "none");
  }, [isOpen]);

  return (
    <div className="modal" id="modal">
      <div className="modalContent">{props}</div>
    </div>
  );
}
