module.exports=() => {
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const randomDayOffset = Math.floor(Math.random() * 7);
    const randomDayOfMonth = currentDayOfMonth + randomDayOffset;
    currentDate.setDate(randomDayOfMonth);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}