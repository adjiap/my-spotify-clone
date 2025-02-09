"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./box";
import SidebarItem from "./sidebaritem";
import Library from "./library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({
    children,
    songs,
}) => {
    const pathname = usePathname();
    const player = usePlayer();
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search', /*Always active at home, when the cursor is not at the 'search'*/
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname == '/search',
            href: '/search',
        }
    ], [pathname]);
    
    return (
        <div className={twMerge(`
            flex
            h-full
        `,
            player.activeId && "h-[calc(100%-80px)]"
        )}>
            <div className="
                hidden
                md:flex     <!-- On medium screen, it will show the sidebar-->
                flex-col
                gap-y-2
                bg-black
                h-full
                w-[300px]
                p-2
                "
            >
                <Box>
                    <div
                        className="
                            flex
                            flex-col
                            gap-y-4
                            px-5
                            py-4
                        "
                    >
                        {routes.map((item) => (
                          <SidebarItem
                            key={item.label}
                            {...item}
                          />  
                        ))}
                    </div>
                </Box>
                <Box className="
                    overflow-auto       <!-- automatically resize content that's too large for the container -->
                    h-full              <!-- height of component is 100% -->
                ">  
                    <Library songs={songs}/>
                </Box>
            </div>
            <main className="
                h-full
                flex-1
                overflow-y-auto
                py-2
            ">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;
