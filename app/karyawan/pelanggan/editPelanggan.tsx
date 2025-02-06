"use client"

import Modal from "@/components/modal"
import axiosInstance from "@/helper/api"
import { GetCookie } from "@/helper/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { User, UserDetails } from "../types"

type props = {
    pelanggan:User
}

const EditPelanggan = (myprop : props) => {
    const [username, setUsername] = useState<string>("")
    const [Password, setPassword] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [nik, setNIK] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setUsername(myprop.pelanggan.user_details.username)
        setPassword(myprop.pelanggan.user_details.password)
        setName(myprop.pelanggan.name)
        setAddress(myprop.pelanggan.address)
        setPhone(myprop.pelanggan.phone)
        setNIK(myprop.pelanggan.nik)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = GetCookie(`token`)
            const url = `/customer/${myprop.pelanggan.id}`
            const requestData = {
                name, address, phone, nik
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
                    containerId:`toastEdit-${myprop.pelanggan.id}`,
                    type:"success"
                })
                setShow(false)
                /** reload Page */
                setTimeout(() => router.refresh(), 1000)
            }else{
                toast(message,{
                    containerId:`toastEdit-${myprop.pelanggan.id}`,
                    type:"warning"
                })
            }
        } catch (error) {
            console.log(error)
            toast(
                `something wrong`,
                {
                    containerId: `toastEdit-${myprop.pelanggan.id}`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myprop.pelanggan.id}`}/>
            <button type="button" onClick={() => openModal()} 
            className="px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white">
                &#x270E;
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Edit Data Pelanggan
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi Benar
                        </span>
                    </div>
                    {/** Modal Body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nama Pelanggan
                            </small>
                            <input type="text" id={`name-${myprop.pelanggan.id}`}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"></input>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Alamat Pengguna
                            </small>
                            <input type="text" id={`address-${myprop.pelanggan.id}`}
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"></input>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                No Telp
                            </small>
                            <input type="text" id={`phone-${myprop.pelanggan.id}`}
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"></input>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                NIK
                            </small>
                            <input type="text" id={`nik-${myprop.pelanggan.id}`}
                                value={nik}
                                onChange={e => setNIK(e.target.value)}
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
export default EditPelanggan