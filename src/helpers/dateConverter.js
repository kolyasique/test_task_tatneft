// Конвертеры даты
function rusufucateMonth(month) {
    let rusMonth;
    switch (month) {
      case 1:
        rusMonth = 'Января';
        break;
      case 2:
        rusMonth = 'Февраля';
        break;
      case 3:
        rusMonth = 'Марта';
        break;
      case 4:
        rusMonth = 'Апреля';
        break;
      case 5:
        rusMonth = 'Мая';
        break;
      case 6:
        rusMonth = 'Июня';
        break;
      case 7:
        rusMonth = 'Июля';
        break;
      case 8:
        rusMonth = 'Августа';
        break;
      case 9:
        rusMonth = 'Сентября';
        break;
      case 10:
        rusMonth = 'Октября';
        break;
      case 11:
        rusMonth = 'Ноября';
        break;
      case 12:
        rusMonth = 'Декабря';
        break;
      default: break;
    }
    return rusMonth;
  }
  
  export const convertDate = (dataR) => {
    const newDate = new Date(dataR);
    const time = [newDate.getHours(), newDate?.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
    return `${newDate.getDate()} ${
      rusufucateMonth(newDate.getMonth() + 1)} ${
      newDate.getFullYear()} | ${time}`;
  };
  