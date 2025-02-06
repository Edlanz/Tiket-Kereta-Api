"use client"

import Link from "next/link"
import { KeretaType } from "../types"
import DropKereta from "./dropKereta"
import EditKereta from "./editKereta"

type props = {
    item: KeretaType
}

const Train = (myprop: props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium">
                    Nama Kereta
                </small>
                <span>
                    <Link href={`/karyawan/kereta/${myprop.item.id}`}>
                        {myprop.item.name}
                    </Link>
                </span>
            </div>
            <div className="w-full p-2 md:w-4/12 flex flex-col">
                <small className="text-sm font-medium">
                    Description
                </small>
                <span>
                    {myprop.item.descriptions}
                </span>
            </div>
            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className="text-sm font-medium">
                    Tipe Kereta
                </small>
                <span>
                    {myprop.item.type}
                </span>
            </div>
            <div className="w-full p-2 md:w-2/12 flex flex-col">
                <small className="text-sm font-medium">
                    Option
                </small>
                <div className="gap-2 flex items-center">
                    <EditKereta kereta={myprop.item} />
                    <DropKereta kereta={myprop.item}></DropKereta>
                </div>
            </div>
        </div>
    )
}
export default Train