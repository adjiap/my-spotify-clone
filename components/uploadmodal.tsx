"use client";

import React, { useState } from "react"
import Modal from "./modal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./input";

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
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", { required:true })}  // must be the same as id
                    placeholder="Song Title"
                >
                </Input>
            </form>
        </Modal>
    )
}

export default uploadModal;
