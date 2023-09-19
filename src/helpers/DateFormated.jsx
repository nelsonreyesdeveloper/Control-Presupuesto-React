
const DateFormated = (fecha) => {
    return fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: '2-digit' })
}

export default DateFormated
