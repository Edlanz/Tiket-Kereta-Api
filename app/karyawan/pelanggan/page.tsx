import { getServerCookie } from "@/helper/server-cookie"
import { User } from "../types"
import axiosInstance from "@/helper/api"
import Pelanggan from "./Pelanggan"
import AddPelanggan from "./addPelanggan"

// fnction to get on data kereta

const getPelanggan = async (): Promise<User[]> => {
    try {
        /** Get token from cookie */
        const TOKEN = await getServerCookie(`token`)
        const url = `/customer`
        const response: any = await axiosInstance.get(url, {
            headers:
            {
                authorization: `Bearer ${TOKEN}`
            }
        })
        if(response.data.success == true){
            return response.data.data
        }

        return []
    } catch (error) {
        console.log(error)
        return []
    }
}
const pelangganPage =  async () => {
    /** call function to load data kereeta from backnd */
    const dataPelanggan = await getPelanggan()
    return(
        <div className="w-full p-5 bg-white">
            <h1>Data Pelanggan</h1>
            <span className="text-sm">
                Halaman ini memuat daftar Pelanggan yang tersdia
            </span>
            <AddPelanggan></AddPelanggan>
            <div className="my-6">
                {/** Maping data kereta */}
                {
                    dataPelanggan.map((pelanggan, index) => (
                        <Pelanggan
                        item={pelanggan}
                        key={`pelanggan-${index}`}/>
                  ))
                }
            </div>
        </div>
    )
}

export default pelangganPage