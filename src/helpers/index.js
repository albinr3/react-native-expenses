const formatDate = date => {
    const newDate = new Date(date);
    const options = {
        weekday: "short",
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }

    return newDate.toLocaleDateString("es-ES", options)
}

export const categoryToKey = (category, data) => 
data.filter(item => item.value === category); //this is for the picker

export default formatDate