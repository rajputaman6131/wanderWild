import React from "react";

const InstagramIcon = () => {
    return (
        <a
            href="https://www.instagram.com/wanderwildadventures0/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: "fixed",
                bottom: "90px", // Adjust position if you want it near the WhatsApp icon
                right: "20px",
                backgroundColor: "#E4405F",
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
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                style={{ width: "30px", height: "30px" }}
            />
        </a>
    );
};

export default InstagramIcon;
