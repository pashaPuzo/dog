document.oncontextmenu = () => false;

const keyPress = (event) => {
    let keyNum;
    if (window.event) {
        keyNum = window.event.keyCode;
    }
    else if (e) {
        keyNum = e.which;
    }

    if ( keyNum === 123 ) return false;
    if ( event.ctrlKey && keyNum == 85 ) return false;
    if ( event.ctrlKey && event.shiftKey & keyNum === 73 ) return false;
}

document.onkeydown = keyPress;


var devtools = function() {};
devtools.toString = function() {
  if (!this.opened) {
    this.opened = false;
  }
  this.opened = true;
}

console.log('%c', devtools);