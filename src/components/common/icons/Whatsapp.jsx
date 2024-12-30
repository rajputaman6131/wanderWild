import React from "react";

const WhatsAppIcon = () => {
    return (
        <a
            href="https://wa.me/+916269769999?text=Hello"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                backgroundColor: "#25D366",
                color: "white",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                cursor: "pointer",
            }}
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                style={{ width: "30px", height: "30px" }}
            />
        </a>
    );
};

export default WhatsAppIcon;
