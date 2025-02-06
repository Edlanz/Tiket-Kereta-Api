/** function to call detail kereta included gerbong dan kursi */

import { getServerCookie } from "@/helper/server-cookie";
import { KeretaType } from "../../types";
import axiosInstance from "@/helper/api";
import { headers } from "next/headers";
import Gerbong from "./Gerbong";
import AddGerbong from "./addGerbong";
import AddKereta from "../addKereta";

const getDetailKereta = async (id_kereta: string): Promise<KeretaType | null> => {
    try {
        /** get token from cookie */
        const TOKEN = await getServerCookie(`token`)
        const url = `/train/${id_kereta}`

        const response: any = await axiosInstance
        .get(url, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        })
        if (response.data.success == true) {
            return response.data.data
        }
        return null
    } catch (error) {
        console.log(error);
        return null
    }
}
type props = {
    params: {
        id_kereta: string
        /** sesuai dengan nama foldernya */
    }
}
const DetailKeretaPage = async (
    myprop: props) => {
    /** get value of selected "id_kereta" */
    const id_kereta = myprop.params.id_kereta
    /** get data from backend */
    const dataKereta = await getDetailKereta(id_kereta)
    return (
        <div className="bg-yellow-100 w-full p-3">
            {
                dataKereta === null ?
                    <div className="rounded-md p-3">
                        <h1 className="text-lg font-semibold">
                            Informasi
                        </h1>
                        <p className="text-sm text-slate-500">
                            Data Kereta tidak ditemukan
                        </p>
                    </div> :
                    <div className="">
                        <h1 className="text-lg font-semibold">
                            {dataKereta.name}
                        </h1>
                        <p className="text-sm">
                            {dataKereta.descriptions}
                        </p>
                        <h2 className="text-base font-medium">
                            Daftar Gerbong
                        </h2>
                        <AddGerbong id_kereta={Number(id_kereta)}></AddGerbong>
                        
                        <div className="my-5">
                            {
                                dataKereta.wagons.map((gerbong, index) => (
                                    <Gerbong item={gerbong}
                                    key={`keyGerbong-${index}`}>
                                    </Gerbong>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
export default DetailKeretaPage