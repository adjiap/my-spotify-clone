"use client";

import Modal from "@/components/modal";
import React, { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    
    // Prevents errors by modals due to server-side rendering, as modals can cause errors
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted){
        return null;
    }

    return (
        <>
            <Modal
                title= "Test Modal"
                description="Test Description"
                isOpen
                onChange={() => {}}
            >
                Test Children
            </Modal>
        </>
    );
}

export default ModalProvider;
