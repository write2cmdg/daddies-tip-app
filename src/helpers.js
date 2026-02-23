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


//delete transaction 
export const deleteItem = ({ key, id }) => {
    return new Promise((resolve, reject) => {
        try {
            const existingData = fetchData(key);
            if (id) {
                const newData = existingData.filter((item) => item.id !== id);
                localStorage.setItem(key, JSON.stringify(newData));
            } else {
                localStorage.removeItem(key);
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

//delete shift 
export const deleteShiftItem = ({key, id}) => {
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}


//format time
const currentDate = new Date(Date.now());
const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
const dd = String(currentDate.getDate()).padStart(2, '0');
const yyyy = String(currentDate.getFullYear()).slice(-2);
const formattedDate = `${mm}-${dd}-${yyyy}`;
const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });


// fee calc using cent math (per-transaction rounding)
const calcFee = (check) => {
    const checkCents = Math.round((Number(check) || 0) * 100);
    const feeCents = Math.round(checkCents * 3 / 100);
    return (feeCents / 100).toFixed(2);
};


//create shift
export const createShift = ({ shift, id }) => {
    const newItem = {
        id: crypto.randomUUID(),
        server: fetchData("userName"),
        shift: shift,
        date: formattedDate,
        createdAt: Date.now(),
        day: day,
    }

    const existingShifts = fetchData("shifts") ?? [];
    const updatedShifts = [...existingShifts, newItem];
    localStorage.setItem("shifts", JSON.stringify(updatedShifts));

    return newItem.id;
}



//create transaction
export const createTransaction = ({ check, tips, payment, shiftId }) => {

    const safeCheck = check ? check : "0.00";

    const fee = payment === "CreditCard"
        ? calcFee(safeCheck)
        : "0.00";

    const newItem = {
        id: crypto.randomUUID(),
        server: fetchData("userName"),
        date: formattedDate,
        check: safeCheck,
        tips: tips ? tips : "0.00",
        fee: fee,
        payment: payment,
        createdAt: Date.now(),
        shiftId: shiftId,
    }

    const existingTransactions = fetchData("transactions") ?? [];
    return localStorage.setItem("transactions", JSON.stringify([...existingTransactions, newItem]))
}



//update transaction (check + tips) and keep fee correct
export const updateTransaction = ({ transactionId, check, tips }) => {

    const existingTransactions = fetchData("transactions") ?? [];

    const updatedTransactions = existingTransactions.map((t) => {
        if (t.id !== transactionId) return t;

        const nextCheck = check ? check : t.check;
        const nextTips = tips ? tips : "0.00";

        const nextFee = t.payment === "CreditCard"
            ? calcFee(nextCheck)
            : "0.00";

        return {
            ...t,
            check: nextCheck,
            tips: nextTips,
            fee: nextFee,
        };
    });

    return localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
};


//update shift date (expects ISO date: "YYYY-MM-DD")
export const updateShiftDate = ({ shiftId, isoDate }) => {
    const existingShifts = fetchData("shifts") ?? [];

    const dt = new Date(isoDate);
    if (isNaN(dt)) return;

    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    const yy = String(dt.getFullYear()).slice(-2);
    const nextDate = `${mm}-${dd}-${yy}`;

    const nextDay = dt.toLocaleDateString('en-US', { weekday: 'short' });

    const updatedShifts = existingShifts.map((s) => {
        if (s.id !== shiftId) return s;
        return {
            ...s,
            date: nextDate,
            day: nextDay,
        };
    });

    localStorage.setItem("shifts", JSON.stringify(updatedShifts));
};