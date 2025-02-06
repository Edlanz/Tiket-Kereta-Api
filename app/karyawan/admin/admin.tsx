"use client"

import Link from "next/link"
import { User, UserDetails } from "../types"
import DropAdmin from "./dropAdmin"
import EditPelanggan from "./editAdmin"
import ResetPassword from "./resetpasswrd"

type props = {
    item: User
}

const Admin = (myprop: props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium">
                    Nama Admin
                </small>
                <span>
                    <Link href={`/karyawan/kereta/${myprop.item.id}`}>
                        {myprop.item.name}
                    </Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium">
                    `Address`
                </small>
                <span>
                    {myprop.item.address}
                </span>
            </div>
            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className="text-sm font-medium">
                    No Telp
                </small>
                <span>
                    {myprop.item.phone}
                </span>
            </div>
            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className="text-sm font-medium">
                    Option
                </small>
                <div className="gap-2 flex items-center">
                    {/*Baut Drop and edit and reset*/}
                    <EditPelanggan pelanggan={myprop.item}></EditPelanggan>
                    <DropAdmin pelanggan={myprop.item}></DropAdmin>
                    <ResetPassword pelanggan={myprop.item}></ResetPassword>
                </div>
            </div>
        </div>
    )
}
export default Admin