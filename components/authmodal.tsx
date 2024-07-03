"use client";

import React from "react";
import Modal from "./modal";

const AuthModal = () => {
    return(
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen
            onChange={() => {}}
        >
           Auth modal 
        </Modal>
    )
};

export default AuthModal;
