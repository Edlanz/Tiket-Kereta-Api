"use client"

import Link from "next/link"
import { User, UserDetails } from "../types"
import EditPelanggan from "./editPelanggan"
import DropPelanggan from "./dropPelanggan"
import ResetPassword from "./resetPassword"

type props = {
    item: User
}

const Pelanggan = (myprop: props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium">
                    Nama Pelanggan
                </small>
                <span>
                    <Link href={`/karyawan/kereta/${myprop.item.id}`}>
                        {myprop.item.name}
                    </Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium">
                    Username
                </small>
                <span>
                    {myprop.item.user_details.username}
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
                    <DropPelanggan pelanggan={myprop.item}></DropPelanggan>
                    <ResetPassword pelanggan={myprop.item}></ResetPassword>
                </div>
            </div>
        </div>
    )
}
export default Pelanggan