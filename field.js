let alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']



let field = {} //координаты каждой ячейки {название ячейки: координаты x, y}
for (let a = 0; a < alph.length; a++) { //пуш координат ячеек в объект {название ячейки: координаты x, y}
    for (let b = 1; b <= 10; b++) {
        document.getElementById(`${alph[a] + b}`).style.height = a1.getBoundingClientRect().width + 'px'; //установка высоты ячеек под адаптивную ширину
        field[alph[a] + b] = document.getElementById(`${alph[a] + b}`)
        field[alph[a] + b] = [field[alph[a] + b].getBoundingClientRect().x, field[alph[a] + b].getBoundingClientRect().y]
    }
}

let blackList = { p11: [], p12: [], p13: [], p14: [], p21: [], p22: [], p23: [], p31: [], p32: [], p41: [] } //координаты занятых ячеек и вокруг


let names = Object.keys(field) //массив названий ячеек
let coords = Object.values(field) //массив координат ячеек соответствующим им по индексу

let uniqueCoordsX = [] //массив только уникальных x координат ячеек для более легкого поиска ближайшего значения
let uniqueCoordsY = [] //массив только уникальных y координат ячеек для более легкого поиска ближайшего значения
for (let i = 0; i < coords.length; i++) {
    uniqueCoordsX.push(coords[i][0])
    uniqueCoordsY.push(coords[i][1])
    i = i + 10
}