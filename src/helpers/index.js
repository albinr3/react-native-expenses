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

export default formatDate