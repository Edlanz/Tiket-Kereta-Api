import { SeatsType } from "../../types"

type props = 
{item: SeatsType}

const Seat = (myProp: props) => {
    return(
        <div className="bg-sky-700 size-20 rounded-sm flex items-center justify-center">
            <span className="text-white font-semibold">
                {
                    myProp.item.seat_number
                }
            </span>
        </div>
    )
}
export default Seat