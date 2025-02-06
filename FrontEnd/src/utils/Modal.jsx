import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}    
                style={{
                    background: "#1E2139",
                    textAlign: "center",
                    opacity: 0.8,
                    height: 350,
                    width: 700,
                    margin: "auto",
                    padding: "2%",
                    border: "1px solid #ffffff",
                    borderRadius: "10px",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;