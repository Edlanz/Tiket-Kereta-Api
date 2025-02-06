"use client"

import Modal from "@/components/modal"
import axiosInstance from "@/helper/api"
import { GetCookie } from "@/helper/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { KeretaType } from "../types"

type props = {
    kereta:KeretaType
}

const EditKereta = (myprop : props) => {
    const [name, setName] = useState<string>("")
    const [descriptions, setDescriptions] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setName(myprop.kereta.name)
        setDescriptions(myprop.kereta.descriptions)
        setType(myprop.kereta.type)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = GetCookie(`token`)
            const url = `/train/${myprop.kereta.id}`
            const requestData = {
                name, descriptions, type
            }
            /** hit endpoint to add Kereta */
            const response: any = await axiosInstance.put(
                url, requestData, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    }
                }
            )
            const message = response.data.message
            if(response.data.success == true){
                toast(message,{
                    containerId:`toastEdit-${myprop.kereta.id}`,
                    type:"success"
                })
                setShow(false)
                /** reload Page */
                setTimeout(() => router.refresh(), 1000)
            }else{
                toast(message,{
                    containerId:`toastEdit-${myprop.kereta.id}`,
                    type:"warning"
                })
            }
        } catch (error) {
            console.log(error)
            toast(
                `something wrong`,
                {
                    containerId: `toastEdit-${myprop.kereta.id}`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myprop.kereta.id}`}/>
            <button type="button" onClick={() => openModal()} 
            className="px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white">
                &#x270E;
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Edit Data Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi Benar
                        </span>
                    </div>
                    {/** Modal Body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nama Kereta
                            </small>
                            <input type="text" id={`name-${myprop.kereta.id}`}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"></input>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Deskripsi Kereta
                            </small>
                            <input type="text" id={`descriptions-${myprop.kereta.id}`}
                                value={descriptions}
                                onChange={e => setDescriptions(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"></input>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Tipe Kereta
                            </small>
                            <input type="text" id={`type-${myprop.kereta.id}`}
                                value={type}
                                onChange={e => setType(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"></input>
                        </div>
                    </div>
                    {/** model footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button" onClick={() => closeModal()} className="px-4 bg-slate-700 -py-2 rounded-md hover:bg-slate-600 text-white">
                            Close
                        </button>
                        <button type="submit" className="px-4 bg-sky-700 -py-2 rounded-md hover:bg-sky-600 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
export default EditKereta