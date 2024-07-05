"use client";

import React, { useState } from "react"
import Modal from "./modal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./input";
import Button from "./button";

const uploadModal = () => {
    const uploadModal = useUploadModal();
    const [ isLoading, setIsLoading ] = useState();
    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null,
        }
    })

    // To close the modal once we click the close button
    const onChange = (open: boolean) => {
        if (!open){
            reset();
            uploadModal.onClose();
        }
    }
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //TODO: upload to Supabase
    }

    return(
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4" // Add separation between input boxes
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", { required:true })}  // must be the same as id
                    placeholder="Song Title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register("author", { required:true })}
                    placeholder="Song author"
                />
                <div className="pb-1">
                    Select a song from file
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"       // would only accept .mp3 files
                        {...register("song", { required:true })}
                    />
                </div>
                <div className="pb-1">
                    Select an image
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"   // would only accept files that are images in nature, like .png or .jpeg
                        {...register("image", { required:true })} 
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Add Song
                </Button>
            </form>
        </Modal>
    )
}

export default uploadModal;
