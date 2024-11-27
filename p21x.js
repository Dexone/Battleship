
let p21start //координаты, в которых изначально стоял корабль
p21.onmousedown = function (e) {   //перемещение корабля с компьютера
  p21start = [p21.getBoundingClientRect().x, p21.getBoundingClientRect().y] //присовение изначальных координат корабля
  document.onmousemove = function moveAt(e) { //перемещение p21
    p21.style.left = e.pageX - p21.offsetWidth / 2 + 'px';
    p21.style.top = e.pageY - p21.offsetHeight / 2 + 'px';
  }

  p21.onmouseup = function () { //выполняется, когда p21 падает
    document.onmousemove = null;
    p21.onmouseup = null;
    p21Sticky() //прилипание корабля к ближайшей ячейке после отпускания
  }
}


//перемещение корабля с мобильного
let p21Dragging = true;

p21.addEventListener("touchstart", () => { //прикосновение
  p21Dragging = true;
});

p21.addEventListener("touchend", () => { //отпускание пальца
  p21Dragging = false;
  p21Sticky() //прилипание корабля к ближайшей ячейке после отпускания
});

p21.addEventListener("touchmove", (event) => { //перемещение пальца
  if (p21Dragging) {
    const { pageX, pageY } = event.touches[0];
    p21.style.top = pageY - 25 + "px";
    p21.style.left = pageX - 25 + "px";
    event.preventDefault() //выключает прокрутку страницы
  }
});
//




function p21Sticky() { //прилипание корабля к ближайшей ячейке после отпускания
  let p21Coords = [p21.getBoundingClientRect().x, p21.getBoundingClientRect().y] //координаты упавшего p21


  let x = uniqueCoordsX.reduce(function (accumulator, item) {
    return (Math.abs(item - p21Coords[0]) < Math.abs(accumulator - p21Coords[0]) ? item : accumulator);
  }); //вычисление x координаты ближайшей ячейки в поле к упавшему p21
  p21.style.left = x + 'px'; //присвоение к p21 координаты ближайшей ячейки поля по оси x


  let y = uniqueCoordsY.reduce(function (accumulator, item) {
    return (Math.abs(item - p21Coords[1]) < Math.abs(accumulator - p21Coords[1]) ? item : accumulator);
  }); //вычисление  y координаты  ближайшей ячейки в поле к упавшему p21
  p21.style.top = y + 'px'; // присвоение к  p21 координаты ближайшей ячейки поля по оси y
  let p21StickyCoords = [p21.getBoundingClientRect().x, p21.getBoundingClientRect().y] //координаты упавшего p21 после прилипания


  function pushToBlackList() { //занесение в черный список занятых ячеек
    blackList['p21'] = [[x, y]]

    let xindex = uniqueCoordsX.indexOf(x) //индекс координаты корабля в списке уникальных координат
    let yindex = uniqueCoordsY.indexOf(y) //индекс координаты корабля в списке уникальных координат

    if (yindex !== 0) { //пуш квадрата сверху
      blackList['p21'].push([x, uniqueCoordsY[yindex - 1]])
    }
    if (yindex !== 0 && xindex !== 9) { //пуш квадрата сверху справа
      blackList['p21'].push([uniqueCoordsX[xindex + 1], uniqueCoordsY[yindex - 1]])
    }
    if (xindex !== 9) { //пуш квадрата справа
      blackList['p21'].push([uniqueCoordsX[xindex + 1], y])
    }
    if (yindex !== 9 && xindex !== 9) { //пуш квадрата снизу справа
      blackList['p21'].push([uniqueCoordsX[xindex + 1], uniqueCoordsY[yindex + 1]])
    }
    if (yindex !== 9) { //пуш квадрата снизу
      blackList['p21'].push([x, uniqueCoordsY[yindex + 1]])
    }
    if (yindex !== 9 && xindex !== 0) { //пуш квадрата снизу слева
      blackList['p21'].push([uniqueCoordsX[xindex - 1], uniqueCoordsY[yindex + 1]])
    }
    if (xindex !== 0) { //пуш квадрата слева
      blackList['p21'].push([uniqueCoordsX[xindex - 1], y])
    }
    if (yindex !== 0 && xindex !== 0) { //пуш квадрата сверху слева
      blackList['p21'].push([uniqueCoordsX[xindex - 1], uniqueCoordsY[yindex - 1]])
    }
  }

  blackList['p21'] = [] //удаление данного корабля из черного списка

  let blackListAllCoords = Object.values(blackList).reduce(function (accumulator, item) { //все координаты всех короблей из blacklist в одном массиве
    // accumulator  = accumulator + item
    for (let i = 0; i < item.length; i++) {
      accumulator.push(item[i])
    }
    return accumulator
  }, []) //массив всех координат из blacklist

  let searchCoords = false //найдены ли координаты корабля в черном списке
  blackListAllCoords.forEach(element => { //поиск координат корабля в черном списке
    if (p21StickyCoords[0] === element[0] && p21StickyCoords[1] === element[1]) {
      searchCoords = true
    }
  });
  if (searchCoords === false) { //если координаты падающего корабля не найдены в черном списке
    pushToBlackList() //занесение его координат в черный список
  }
  else { //если корабль падает на координаты из черного списка(на занятую ячейку) => возврат на изначальную позицию
    p21.style.left = p21start[0] + "px"
    p21.style.top = p21start[1] + "px"
  }

}






