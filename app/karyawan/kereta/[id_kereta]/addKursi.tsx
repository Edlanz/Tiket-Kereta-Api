"use client"

import Modal from "@/components/modal"
import axiosInstance from "@/helper/api"
import { GetCookie } from "@/helper/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

type props = {
    wagon_id: number
}
const addSeat = (myprop: props) => {
    const [seat_number, setSeatNumber] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setSeatNumber("")
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = GetCookie(`token`)
            const url = `/train/wagon`
            const requestData = {
             seat_number
            }

            const response: any = await axiosInstance.post(
                url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }

            )
            const message = response.data.message
            if (response.data.success === true) {
                setShow(false)
                toast(message, {
                    containerId: ` toastAddSeat`,
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000)
            }
            else {
                toast(message, {
                    containerId: `toastAddSeat`,
                    type: "warning"
                })
            }
        } catch (error) {
            console.log(error);
            toast(
                `Something Wong`
                , {
                    containerId: `toastAddSeat`,
                    type: "error"
                }
            )
        }
    }
    return (
        <div>
            <ToastContainer containerId={`toastAddGerbong`}></ToastContainer>
            <button className="bg-green-700 size-20 rounded-sm flex items-center justify-center" type="button"
                onClick={() => openModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
            <Modal isShow={show}>
            <form>
            <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Kursi
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi Benar
                        </span>
                    </div>
                    {/** Modal Body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nomer kursi
                            </small>
                            <input type="text" id={`name`}
                                value={seat_number}
                                onChange={e => setSeatNumber(e.target.value)}
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
export default addSeat