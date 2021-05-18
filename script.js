//#region Operator Functions
function add(x,y) {
  return x + y;
}

function subtract(x,y) {
  return x - y;
}

function multiply(x,y) {
  return x * y;
}

function divide(x,y) {
  console.log(y);
  if (y == 0) {
    return 'None of that.';
  }
  return x / y;
}

function operate(x, y, operation) {
  switch (operation) {
    case '+': 
      storedOperator = '';
      return add(x,y);
      break;
    case '-':
      return subtract(x,y);
      break;
    case '*':
      return multiply(x,y);
      break;
    case '/':
      return divide(x,y)
      break;
    case '=':
      return y;
  }
}

//#endregion

//#region Events
function addKeyEvents () {
  window.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9) {
      numberClick(e.key);
    } else if (e.key == '/' || e.key == '*' || e.key == '-' || e.key == '=' || e.key == '+') {
      operatorClick(e.key);
    } else if (e.key == 'Enter') {
      operatorClick('=');
    } else if (e.key == '%') topRowClick('percent');
    else if (e.key == 'Backspace') backspace();
    else if (e.key == 'Delete') clear();
  })
}

function addClickEvents() {
  document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', e => {
      if (e.target.classList.contains('numbers')) numberClick(e.target.textContent);
      else if (e.target.classList.contains('operators')) operatorClick(e.target.textContent);
      else if (e.target.classList.contains('toprow')) topRowClick(e.target.id);
    })
  })
}

function topRowClick(id) {
  if (id == 'AC') clear();
  else if (id == 'plusminus') {
    if (display.textContent == 'None of that.' || display.textContent == '') clear();
    else {
      display.textContent = (parseFloat(display.textContent) * -1).toString();
    }
  } else {
    if (display.textContent == 'None of that.' || display.textContent == '') clear();
    else {
      display.textContent = (parseFloat(display.textContent) / 100).toString();
    }
  }
}

function numberClick(val) {
  if (answer == false) {
    displayContent('append', val);
  } else {
    displayContent('replace', val);
    answer = false;
  }
}

function operatorClick(val) {
    if (display.textContent == 'None of that.') {
      clear();
    }else if (display.textContent != '' && storedVal == '') {
      storedVal = display.textContent;
      storedOperator = val;
      displayContent('clear');
    }else if (display.textContent != '' && storedVal != '') {
      displayContent('replace', operate(parseFloat(storedVal), parseFloat(display.textContent), storedOperator));
      storedOperator = val;
      storedVal = display.textContent;
      answer = true;
    }      
}
//#endregion

//#region Helper Functions
function displayContent (action, val) {
  let newDisp = '';
  switch (action) {
    case 'append':
      newDisp = display.textContent + val;
      break;
    case 'clear':
      newDisp = '';
      break;
    case 'replace':
      newDisp = val.toString();
      if (newDisp == 'None of that.') {
        display.textContent = 'None of that.';
        return;
      }else if(newDisp.length > 10) {
        newDisp = parseFloat(val).toPrecision(10).toString();
      }
  }
  if(newDisp.length < 11) {
    display.textContent = newDisp;
  } else display.textContent = newDisp.substring(0,11);
  
}

function clear() {
  storedVal = '';
  storedOperator = '';
  answer = false;
  displayContent('clear');
}

function backspace() {
  const screen = document.querySelector('#display');
  screen.textContent = screen.textContent.slice(0, screen.textContent.length-1);
}
//#endregion

addKeyEvents();
addClickEvents();
let storedVal = '';
let storedOperator = '';
let answer = false;
let display = document.querySelector('#display');

