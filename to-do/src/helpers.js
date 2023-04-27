export const formatDate = (date) => {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
};

export const compareByDate = (a, b) => {
    const dateA = Date.parse(a.date);
    const dateB = Date.parse(b.date);
    return dateA - dateB;
};

export const compareByName = (a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
};

export const compareByStatus = (a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
    return 0;
};