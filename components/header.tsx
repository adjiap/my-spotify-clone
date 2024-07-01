"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { RxCaretLeft } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

interface HeaderProps{
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = (
    children,
    className,
) => {
    const router = useRouter();
    const handleLogout = () => {
        // Handle logout in the future
    }
    return (
        <div
            className= {twMerge(`
            h-fit
            bg-gradient-to-b
            from-emerald-800
            p-6
            `,
            className
        )}
        >
            <div className="
                w-full
                mb-4
                flex
                items-center
                justify-between
            ">
                <div className="
                    hidden
                    md:flex
                    gap-x-2
                    items-center
                ">
                    <button className="
                        rounded-full
                        bg-black
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <RxCaretLeft
                            className="text-white"
                            size={35}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;
