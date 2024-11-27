
let p11start //координаты, в которых изначально стоял корабль
p11.onmousedown = function (e) {   //перемещение корабля с компьютера
  p11start = [p11.getBoundingClientRect().x, p11.getBoundingClientRect().y] //присовение изначальных координат корабля
  document.onmousemove = function moveAt(e) { //перемещение p11
    p11.style.left = e.pageX - p11.offsetWidth / 2 + 'px';
    p11.style.top = e.pageY - p11.offsetHeight / 2 + 'px';
  }

  p11.onmouseup = function () { //выполняется, когда p11 падает
    document.onmousemove = null;
    p11.onmouseup = null;
    p11Sticky() //прилипание корабля к ближайшей ячейке после отпускания
  }
}


//перемещение корабля с мобильного
let p11Dragging = true;

p11.addEventListener("touchstart", () => { //прикосновение
  p11Dragging = true;
});

p11.addEventListener("touchend", () => { //отпускание пальца
  p11Dragging = false;
  p11Sticky() //прилипание корабля к ближайшей ячейке после отпускания
});

p11.addEventListener("touchmove", (event) => { //перемещение пальца
  if (p11Dragging) {
    const { pageX, pageY } = event.touches[0];
    p11.style.top = pageY - 25 + "px";
    p11.style.left = pageX - 25 + "px";
    event.preventDefault() //выключает прокрутку страницы
  }
});
//




function p11Sticky() { //прилипание корабля к ближайшей ячейке после отпускания
  let p11Coords = [p11.getBoundingClientRect().x, p11.getBoundingClientRect().y] //координаты упавшего p11


  let x = uniqueCoordsX.reduce(function (accumulator, item) {
    return (Math.abs(item - p11Coords[0]) < Math.abs(accumulator - p11Coords[0]) ? item : accumulator);
  }); //вычисление x координаты ближайшей ячейки в поле к упавшему p11
  p11.style.left = x + 'px'; //присвоение к p11 координаты ближайшей ячейки поля по оси x


  let y = uniqueCoordsY.reduce(function (accumulator, item) {
    return (Math.abs(item - p11Coords[1]) < Math.abs(accumulator - p11Coords[1]) ? item : accumulator);
  }); //вычисление  y координаты  ближайшей ячейки в поле к упавшему p11
  p11.style.top = y + 'px'; // присвоение к  p11 координаты ближайшей ячейки поля по оси y
  let p11StickyCoords = [p11.getBoundingClientRect().x, p11.getBoundingClientRect().y] //координаты упавшего p11 после прилипания


  function pushToBlackList() { //занесение в черный список занятых ячеек
    blackList['p11'] = [[x, y]]

    let xindex = uniqueCoordsX.indexOf(x) //индекс координаты корабля в списке уникальных координат
    let yindex = uniqueCoordsY.indexOf(y) //индекс координаты корабля в списке уникальных координат

    if (yindex !== 0) { //пуш квадрата сверху
      blackList['p11'].push([x, uniqueCoordsY[yindex - 1]])
    }
    if (yindex !== 0 && xindex !== 9) { //пуш квадрата сверху справа
      blackList['p11'].push([uniqueCoordsX[xindex + 1], uniqueCoordsY[yindex - 1]])
    }
    if (xindex !== 9) { //пуш квадрата справа
      blackList['p11'].push([uniqueCoordsX[xindex + 1], y])
    }
    if (yindex !== 9 && xindex !== 9) { //пуш квадрата снизу справа
      blackList['p11'].push([uniqueCoordsX[xindex + 1], uniqueCoordsY[yindex + 1]])
    }
    if (yindex !== 9) { //пуш квадрата снизу
      blackList['p11'].push([x, uniqueCoordsY[yindex + 1]])
    }
    if (yindex !== 9 && xindex !== 0) { //пуш квадрата снизу слева
      blackList['p11'].push([uniqueCoordsX[xindex - 1], uniqueCoordsY[yindex + 1]])
    }
    if (xindex !== 0) { //пуш квадрата слева
      blackList['p11'].push([uniqueCoordsX[xindex - 1], y])
    }
    if (yindex !== 0 && xindex !== 0) { //пуш квадрата сверху слева
      blackList['p11'].push([uniqueCoordsX[xindex - 1], uniqueCoordsY[yindex - 1]])
    }
  }

  blackList['p11'] = [] //удаление данного корабля из черного списка

  let blackListAllCoords = Object.values(blackList).reduce(function (accumulator, item) { //все координаты всех короблей из blacklist в одном массиве
    // accumulator  = accumulator + item
    for (let i = 0; i < item.length; i++) {
      accumulator.push(item[i])
    }
    return accumulator
  }, []) //массив всех координат из blacklist

  let searchCoords = false //найдены ли координаты корабля в черном списке
  blackListAllCoords.forEach(element => { //поиск координат корабля в черном списке
    if (p11StickyCoords[0] === element[0] && p11StickyCoords[1] === element[1]) {
      searchCoords = true
    }
  });
  if (searchCoords === false) { //если координаты падающего корабля не найдены в черном списке
    pushToBlackList() //занесение его координат в черный список
  }
  else { //если корабль падает на координаты из черного списка(на занятую ячейку) => возврат на изначальную позицию
    p11.style.left = p11start[0] + "px"
    p11.style.top = p11start[1] + "px"
  }

}






