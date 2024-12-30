import React from "react";

const CallIcon = () => {
    return (
        <a
            href="tel:+916269769999"
            style={{
                position: "fixed",
                bottom: "180px", // Adjust position to stack icons vertically
                right: "20px",
                backgroundColor: "#34A853", // Google-style green
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
                src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Phone_icon.png"
                alt="Call"
                style={{ width: "30px", height: "30px", color: 'white' }}
            />
        </a>
    );
};

export default CallIcon;
