import React from "react";
import { twMerge } from "tailwind-merge";

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({
    children,
    className
}) => {
    return (
        <div
            className={twMerge(`
                bg-neutral-900
                rounded-lg
                h-fit
                w-full
            `,
                className  /* 'By adding className, we made a reuseable box component with the properties under the twMerge'*/
            )}
        >
            {children}
        </div>
    );
}

export default Box;
