import {useEffect, useState} from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4} from "uuid"
import storage from "../firebase";

export const useFileUpload = () => {

    const upload = (file, uploadFolder, fileName, setValue, setUploadState) => {
        if(file == null) return;
        const imageRef = ref(storage, `${uploadFolder === "images" ? "/images": uploadFolder === "audios" ? "/audios" : uploadFolder === "videos" && "/videos"}/${file.name + v4()}`);
        const uploadTask = uploadBytesResumable(imageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                setUploadState(progress)
                switch (snapshot.state) {
                case 'paused':
                    // console.log('Upload is paused');
                    break;
                case 'running':
                    // console.log('Upload is running');
                    break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                // console.log("Upload Complete")
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setValue(prev => {
                        if(Array.isArray(prev)){
                            return [
                                ...prev,
                                url
                            ]
                        }
                        else{
                            return {
                                ...prev,
                                [fileName]: url
                            }
                        }
                    })
                    alert("Upload Successful")
                });
            }
        );
    }

    return { upload }
}