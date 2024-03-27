import { useParams } from "react-router-dom";

//generate random color
const generateRandomColor = () => {
    const existingShiftLength = fetchData('shifts')?.length ?? 0;
    return `${existingShiftLength * 34} 65% 50%` 
}

// delay
export const waait = () => new Promise(res => setTimeout(res, Math.random() * 750))

// local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};


//get all Items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)
}

//delete item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}

//format time
const currentDate = new Date(Date.now());
const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
const dd = String(currentDate.getDate()).padStart(2, '0');
const yyyy = String(currentDate.getFullYear()).slice(-2);
const formattedDate = `${mm}-${dd}-${yyyy}`;
const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });

//create shift

export const createShift = ({ shift, date }) => {
    const newItem = {
        id: crypto.randomUUID(),
        server: fetchData("userName"),
        shift: shift,
        date: formattedDate,
        createdAt: Date.now(),
        day: day,
    }

    const existingShifts = fetchData("shifts") ?? [];
    return localStorage.setItem("shifts", JSON.stringify([...existingShifts, newItem]))
 }



//create transaction


export const createTransaction = ({ check, tips, payment, shiftId }) => {

    const newItem = {
        id: crypto.randomUUID(),
        server: fetchData("userName"),
        date: formattedDate,
        check: check,
        tips: tips,
        payment: payment,
        createdAt: Date.now(),
        shiftId: shiftId,
    }

    const existingTransactions = fetchData("transactions") ?? [];
    return localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newItem]))
 }