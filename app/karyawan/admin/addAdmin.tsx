"use client"

import Modal from "@/components/modal"
import axiosInstance from "@/helper/api"
import { GetCookie } from "@/helper/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const AddADMIN = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [nik, setNIK] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setPassword("")
        setUsername("")
        setName("")
        setAddress("")
        setNIK("")
        setPhone("")
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = GetCookie(`token`)
            const url = `/employee/register`
            const requestData = {
                name, address, phone, username, password, nik
            }
            /** hit endpoint to add Kereta */
            const response: any = await axiosInstance.post(
                url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
            )
            const message = response.data.message
            if (response.data.success == true) {
                toast(message, {
                    containerId: `toastAdd`,
                    type: "success"
                })
                setShow(false)
                /** reload Page */
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastAdd`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error)
            toast(
                `something wrong`,
                {
                    containerId: `toastAdd`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAdd`} />
            <button type="button" onClick={() => openModal()}
                className="px-4 py-2 rounded-md bg-lime-600 hover:bg-lime-500 text-white">
                Tambah Admin
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Data Admin
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi Benar
                        </span>
                    </div>
                    {/** Modal Body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Username
                            </small>
                            <input type="text" id={`username`}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"></input>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Password
                            </small>
                            <input type="text" id={`password`}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"></input>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nama Admin
                            </small>
                            <input type="text" id={`name`}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"></input>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Alamat Admin
                            </small>
                            <input type="text" id={`address`}
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"></input>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                No Telp
                            </small>
                            <input type="text" id={`phone`}
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"></input>
                        </div>
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                NIK
                            </small>
                            <input type="text" id={`nik`}
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
export default AddADMIN