"use client";

import React from "react";
import MediaItem from "./mediaitem";
import LikeButton from "./likebutton";
import { Song } from "@/types";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";


interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    // TODO: remove hardcoded `false` that will permanently show a Play button in mobile view
    const Icon = false ? BsPauseFill : BsPlayFill;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="
                flex
                w-full
                justify-start
            ">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            {/* The below div is relevant for mobile view */}
            <div
                className="
                    flex
                    md:hidden
                    col-autow-full
                    justify-end
                    items-center
                "
            >
                <div
                    onClick={() => {}}
                    className="
                        h-10
                        w-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black"/>
                </div>
            </div>
        </div>
    )
}

export default PlayerContent;