"use client";

import AuthModal from "@/components/authmodal";
import SubscribeModal from "@/components/subscribemodal";
import UploadModal from "@/components/uploadmodal";
import { ProductWithPrice } from "@/types";
import React, { useEffect, useState } from "react";

interface ModalProviderProps {
    products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
    products,
}) => {
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
            <SubscribeModal products={products}/>
        </>
    );
}

export default ModalProvider;
 