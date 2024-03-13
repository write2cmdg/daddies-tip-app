
//generate random color
const generateRandomColor = () => {
    const existingShiftLength = fetchData('shifts')?.length ?? 0;
    return `${existingShiftLength * 34} 65% 50%` 
}

// local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

//delete item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}

//create shift

export const createShift = ({ shift, date}) => {
    const newItem = {
        id: crypto.randomUUID(),
        shift: shift,
        date: Date.now(),
        createdAt: Date.now(),
        color: generateRandomColor()
    }

    const existingShifts = fetchData("shifts") ?? [];
    return localStorage.setItem("shifts", JSON.stringify([...existingShifts, newItem]))
 }