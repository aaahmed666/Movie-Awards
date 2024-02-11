import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./SubmitButtonModal.css";
import noimage from "../image/noimage.png";

const SubmitButtonModal = ({ isOpen, onClose }) => {
  const selectedNominees = useSelector(
    (state) => state.nominees.selectedNominees
  );

  const modalRef = useRef(null);

  useEffect(() => {
    const handleBackgroundClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleBackgroundClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleBackgroundClick);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" ref={modalRef}></div>
      <div className="modal-content">
        <div className="nominee-card modal-size">
          <h2 className="page-title">Success</h2>
          <ul className="nominee-cards-container modal-container">
            {Object.keys(selectedNominees).map((categoryId) => (
              <li key={categoryId}>
                <p>Category {categoryId}</p>
                <p>Name: {selectedNominees[categoryId].name}</p>
                <img
                  src={noimage}
                  alt={selectedNominees[categoryId].name}
                  style={{ width: "100px", height: "auto" }}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmitButtonModal;
