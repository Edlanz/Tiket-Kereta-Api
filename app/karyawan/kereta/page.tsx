import { getServerCookie } from "@/helper/server-cookie"
import { KeretaType } from "../types"
import axiosInstance from "@/helper/api"
import Train from "./Train"
import AddKereta from "./addKereta"

// fnction to get on data kereta

const getKereta = async (): Promise<KeretaType[]> => {
    try {
        /** Get token from cookie */
        const TOKEN = await getServerCookie(`token`)
        const url = `/train`
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
const keretaPage =  async () => {
    /** call function to load data kereeta from backnd */
    const dataKereta = await getKereta()
    return(
        <div className="w-full p-5 bg-white">
            <h1>Data Kereta</h1>
            <span className="text-sm">
                Halaman ini memuat daftar kereta yang tersdia
            </span>
            <div className="my-3">
                <AddKereta/>
                {/** Maping data kereta */}
                {
                    dataKereta.map((kereta, index) => (
                        <Train
                        item={kereta}
                        key={`kereta-${index}`}/>
                    ))
                }
            </div>
        </div>
    )
}

export default keretaPage