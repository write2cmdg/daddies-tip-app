import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

//helpers
import { deleteItem } from "../helpers";

export async function logoutAcion() {
    //delete user
    deleteItem({
        key: "userName"
    })
    deleteItem({
        key: "shifts"
    })
    toast.success("Thank you! Come back soon! ;)")
    //redirect to home
    return redirect("/")
}