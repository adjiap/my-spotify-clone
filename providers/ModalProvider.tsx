"use client";

import AuthModal from "@/components/authmodal";
import UploadModal from "@/components/uploadmodal";
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
            <AuthModal />
            <UploadModal />
        </>
    );
}

export default ModalProvider;
 