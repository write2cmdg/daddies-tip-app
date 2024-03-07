import { redirect } from "react-router-dom";

//helpers
import { deleteItem } from "../helpers";

export async function logoutAcion() {
    //delete user
    deleteItem({
        key: "userName"
    })

    //redirect to home
    return redirect("/")
}