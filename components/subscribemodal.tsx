"use client";

import React from "react";
import Modal from "./modal";
import { ProductWithPrice } from "@/types";

interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({
    products,
}) => {
    // INFO: Default content
    let content = (
        <div className="text-center">
            No products available
        </div>
    );

    if (products.length) {
        content = (
            <div>
                {products.map((product)=> {
                    if (!product.prices?.length) {
                        return (
                            <div key={product.id}>
                                No prices avaialable
                            </div>
                        )
                    }
                })}
            </div>
        )
    };

    return (
        <Modal
            title="Only for premium users"
            description="Listen to music with Spotify Premium"
            isOpen
            onChange={() => {}}
        >
            {content}
        </Modal>
    );
};

export default SubscribeModal;
