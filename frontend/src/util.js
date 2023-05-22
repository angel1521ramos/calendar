import dayjs from "dayjs";

function getMonth(month = dayjs().month()) {
    month = Math.floor(month);
    const year = dayjs().year();//obtenemos el año presente
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()//obtenemos el dia de la semana numero uno del mes ejemplo:domingo = 0, lunes = 1, ... , sabado = 6; 3

    let currentMounthCount = 0 - firstDayOfTheMonth//pasamos a negativo el valor del dia '-3'
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMounthCount++//'-2'
            return dayjs(new Date(year, month, currentMounthCount))//el dia domingo sera 3 dias antes al ser -2 ya que contamos el 0 es decir 29
        })
    })
    return daysMatrix
}
export default getMonth