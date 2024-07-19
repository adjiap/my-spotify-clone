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
    const VolumeIcon = true ? HiSpeakerXMark : HiSpeakerWave

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
            {/* This will be the backward, forward, and play button */}
            <div
                className="
                    hidden
                    h-full
                    md:flex
                    justify-center
                    items-center
                    w-full
                    max-w-[722px]
                    gap-x-6
                "
            >
                <AiFillStepBackward
                    size={30}
                    onClick = {() => {}}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                    />
                <div
                    onClick={() => {}}
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black" />
                </div>
                <AiFillStepForward
                    size={30}
                    onClick = {() => {}}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
            </div>
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon 
                        onClick={() => {}}
                        className="cursor-pointer"
                        size={34}
                    />
                </div>
            </div>
        </div>
    )
}

export default PlayerContent;