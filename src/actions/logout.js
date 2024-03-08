import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

//helpers
import { deleteItem } from "../helpers";

export async function logoutAcion() {
    //delete user
    deleteItem({
        key: "userName"
    })
    toast.success("Deleted")
    //redirect to home
    return redirect("/")
}