
let p12start //координаты, в которых изначально стоял корабль
p12.onmousedown = function (e) {   //перемещение корабля с компьютера
  p12start = [p12.getBoundingClientRect().x, p12.getBoundingClientRect().y] //присовение изначальных координат корабля
  document.onmousemove = function moveAt(e) { //перемещение p12
    p12.style.left = e.pageX - p12.offsetWidth / 2 + 'px';
    p12.style.top = e.pageY - p12.offsetHeight / 2 + 'px';
  }

  p12.onmouseup = function () { //выполняется, когда p12 падает
    document.onmousemove = null;
    p12.onmouseup = null;
    p12Sticky() //прилипание корабля к ближайшей ячейке после отпускания
  }
}


//перемещение корабля с мобильного
let p12Dragging = true;

p12.addEventListener("touchstart", () => { //прикосновение
  p12Dragging = true;
});

p12.addEventListener("touchend", () => { //отпускание пальца
  p12Dragging = false;
  p12Sticky() //прилипание корабля к ближайшей ячейке после отпускания
});

p12.addEventListener("touchmove", (event) => { //перемещение пальца
  if (p12Dragging) {
    const { pageX, pageY } = event.touches[0];
    p12.style.top = pageY - 25 + "px";
    p12.style.left = pageX - 25 + "px";
    event.preventDefault() //выключает прокрутку страницы
  }
});
//




function p12Sticky() { //прилипание корабля к ближайшей ячейке после отпускания
  let p12Coords = [p12.getBoundingClientRect().x, p12.getBoundingClientRect().y] //координаты упавшего p12


  let x = uniqueCoordsX.reduce(function (accumulator, item) {
    return (Math.abs(item - p12Coords[0]) < Math.abs(accumulator - p12Coords[0]) ? item : accumulator);
  }); //вычисление x координаты ближайшей ячейки в поле к упавшему p12
  p12.style.left = x + 'px'; //присвоение к p12 координаты ближайшей ячейки поля по оси x


  let y = uniqueCoordsY.reduce(function (accumulator, item) {
    return (Math.abs(item - p12Coords[1]) < Math.abs(accumulator - p12Coords[1]) ? item : accumulator);
  }); //вычисление  y координаты  ближайшей ячейки в поле к упавшему p12
  p12.style.top = y + 'px'; // присвоение к  p12 координаты ближайшей ячейки поля по оси y
  let p12StickyCoords = [p12.getBoundingClientRect().x, p12.getBoundingClientRect().y] //координаты упавшего p12 после прилипания


  function pushToBlackList() { //занесение в черный список занятых ячеек
    blackList['p12'] = [[x, y]]

    let xindex = uniqueCoordsX.indexOf(x) //индекс координаты корабля в списке уникальных координат
    let yindex = uniqueCoordsY.indexOf(y) //индекс координаты корабля в списке уникальных координат

    if (yindex !== 0) { //пуш квадрата сверху
      blackList['p12'].push([x, uniqueCoordsY[yindex - 1]])
    }
    if (yindex !== 0 && xindex !== 9) { //пуш квадрата сверху справа
      blackList['p12'].push([uniqueCoordsX[xindex + 1], uniqueCoordsY[yindex - 1]])
    }
    if (xindex !== 9) { //пуш квадрата справа
      blackList['p12'].push([uniqueCoordsX[xindex + 1], y])
    }
    if (yindex !== 9 && xindex !== 9) { //пуш квадрата снизу справа
      blackList['p12'].push([uniqueCoordsX[xindex + 1], uniqueCoordsY[yindex + 1]])
    }
    if (yindex !== 9) { //пуш квадрата снизу
      blackList['p12'].push([x, uniqueCoordsY[yindex + 1]])
    }
    if (yindex !== 9 && xindex !== 0) { //пуш квадрата снизу слева
      blackList['p12'].push([uniqueCoordsX[xindex - 1], uniqueCoordsY[yindex + 1]])
    }
    if (xindex !== 0) { //пуш квадрата слева
      blackList['p12'].push([uniqueCoordsX[xindex - 1], y])
    }
    if (yindex !== 0 && xindex !== 0) { //пуш квадрата сверху слева
      blackList['p12'].push([uniqueCoordsX[xindex - 1], uniqueCoordsY[yindex - 1]])
    }
  }

  blackList['p12'] = [] //удаление данного корабля из черного списка

  let blackListAllCoords = Object.values(blackList).reduce(function (accumulator, item) { //все координаты всех короблей из blacklist в одном массиве
    // accumulator  = accumulator + item
    for (let i = 0; i < item.length; i++) {
      accumulator.push(item[i])
    }
    return accumulator
  }, []) //массив всех координат из blacklist

  let searchCoords = false //найдены ли координаты корабля в черном списке
  blackListAllCoords.forEach(element => { //поиск координат корабля в черном списке
    if (p12StickyCoords[0] === element[0] && p12StickyCoords[1] === element[1]) {
      searchCoords = true
    }
  });
  if (searchCoords === false) { //если координаты падающего корабля не найдены в черном списке
    pushToBlackList() //занесение его координат в черный список
  }
  else { //если корабль падает на координаты из черного списка(на занятую ячейку) => возврат на изначальную позицию
    p12.style.left = p12start[0] + "px"
    p12.style.top = p12start[1] + "px"
  }

}






