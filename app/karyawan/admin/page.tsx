import { getServerCookie } from "@/helper/server-cookie"
import { User } from "../types"
import axiosInstance from "@/helper/api"
import Admin from "./admin"
import AddADMIN from "./addAdmin"

// fnction to get on data kereta

const getAdmin = async (): Promise<User[]> => {
    try {
        /** Get token from cookie */
        const TOKEN = await getServerCookie(`token`)
        const url = `/employee`
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
    const dataAdmin = await getAdmin()
    return(
        <div className="w-full p-5 bg-white">
            <h1>Data Admin</h1>
            <span className="text-sm">
                Halaman ini memuat daftar Pelanggan yang tersdia
            </span>
            {/** AddADMIN */}
            <AddADMIN></AddADMIN>
            <div className="my-6">
                {/** Maping data kereta */}
                {
                    dataAdmin.map((admin, index) => (
                        <Admin
                        item={admin}
                        key={`admin-${index}`}/>
                  ))
                }
            </div>
        </div>
    )
}

export default pelangganPage