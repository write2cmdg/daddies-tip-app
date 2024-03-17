
//generate random color
const generateRandomColor = () => {
    const existingShiftLength = fetchData('shifts')?.length ?? 0;
    return `${existingShiftLength * 34} 65% 50%` 
}

// delay
export const waait = () => new Promise(res )

// local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

//delete item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}

//format time
const currentDate = new Date(Date.now());
const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
const dd = String(currentDate.getDate()).padStart(2, '0');
const yyyy = currentDate.getFullYear();
const formattedDate = `${mm}${dd}${yyyy}`;


//create shift

export const createShift = ({ shift, date }) => {
    const newItem = {
        id: crypto.randomUUID(),
        server: fetchData("userName"),
        shift: shift,
        date: formattedDate,
        createdAt: Date.now(),
        color: generateRandomColor()
    }

    const existingShifts = fetchData("shifts") ?? [];
    return localStorage.setItem("shifts", JSON.stringify([...existingShifts, newItem]))
 }