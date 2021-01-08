const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    audio: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shiftKey: false,
    keydownEvent: false,
    languageRu: false,
    keySound: false,
    voiceRecorder: false,
  },

  init() {
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    this.elements.audio = document.createElement("audio");
    this.elements.main.style.background = "#0cbbf0"

    this.elements.main.classList.add("keyboard", "keyboard-hidden");
    this.elements.keysContainer.classList.add("keyboard-keys");
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".key-element");

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
    document.body.appendChild(this.elements.audio);


    document.querySelectorAll(".display").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
      element.addEventListener("keydown", (event) => {
        this.eve()
        this.keydownEvent = !this.keydownEvent

        this.elements.keys.forEach(i => {
          if (event.code === 'Backspace' && i.id === 'backspace') {
            i.style.background = "#0cbbf0"


          } else if (event.code === 'Enter' && i.id === 'enter') {
            i.style.background = "#0cbbf0"


          } else if ((event.code === 'CapsLock') && (this.properties.capsLock == false) && (this.properties.shiftKey == false) && (i.id === 'caps') && this.keydownEvent) {
            i.style.background = "rgba(0, 0, 0, 0.4)"
            i.style.color = "white"
            this.toggleToUpperCase()
            this.properties.capsLock = true
          } else if (event.code === 'CapsLock' && (this.properties.capsLock == true) && (this.properties.shiftKey == false) && (i.id === 'caps') && !this.keydownEvent) {
            i.style.background = "lightblue"
            i.style.color = "rgba(43, 42, 42, 0.719)"
            this.toggleToLowerCase()
            this.properties.capsLock = false
          } else if (event.code === 'CapsLock' && (this.properties.capsLock == true) && (this.properties.shiftKey == true) && (i.id === 'caps') && this.keydownEvent) {
            i.style.background = "lightblue"
            i.style.color = "rgba(43, 42, 42, 0.719)"
            this.toggleToUpperCase()
            this.properties.capsLock = false
          } else if (event.code === 'CapsLock' && (this.properties.capsLock == false) && (this.properties.shiftKey == true) && (i.id === 'caps') && !this.keydownEvent) {
            i.style.background = "rgba(0, 0, 0, 0.4)"
            i.style.color = "white"
            this.toggleToLowerCase()
            this.properties.capsLock = true


          } else if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && (this.properties.shiftKey == false) && (this.properties.capsLock == false) && (i.id === 'shift') && this.keydownEvent) {
            i.style.background = "rgba(0, 0, 0, 0.4)"
            i.style.color = "white"
            this.toggleToUpperCase()
            this.properties.shiftKey = true
          } else if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && (this.properties.shiftKey == true) && (this.properties.capsLock == false) && (i.id === 'shift') && !this.keydownEvent) {
            i.style.background = "lightblue"
            i.style.color = "rgba(43, 42, 42, 0.719)"
            this.toggleToLowerCase()
            this.properties.shiftKey = false
          } else if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && (this.properties.shiftKey == true) && (this.properties.capsLock == true) && (i.id === 'shift') && this.keydownEvent) {
            i.style.background = "lightblue"
            i.style.color = "rgba(43, 42, 42, 0.719)"
            this.toggleToUpperCase()
            this.properties.shiftKey = false
          } else if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && (this.properties.shiftKey == false) && (this.properties.capsLock == true) && (i.id === 'shift') && !this.keydownEvent) {
            i.style.background = "rgba(0, 0, 0, 0.4)"
            i.style.color = "white"
            this.toggleToLowerCase()
            this.properties.shiftKey = true


          } else if (event.code === 'Space' && i.id === 'space') {
            i.style.background = "#0cbbf0"
          } else if (event.code === 'ArrowLeft' && i.id === 'arrowLeft') {
            i.style.background = "yellow"
          } else if (event.code === 'ArrowRight' && i.id === 'arrowRight') {
            i.style.background = "yellow"
          }
          for (let i = 1; i < this.elements.keys.length; i++) {
            if (event.code === `Digit${i}`) {
              this.elements.keys[i - 1].style.background = "yellow"
            }
            if (event.code === 'Digit0') {
              this.elements.keys[9].style.background = "yellow"
            }
          }

          let row2 = 'QWERTYUIOP'.split('')
          let row2Symbols = 'Minus,Equal,BracketLeft,BracketRight,Semicolon,Quote'.split(',')
          let row3 = 'ASDFGHJKL'.split('')
          let row4 = 'ZXCVBNM'.split('')
          let row5 = ['Comma', 'Period', 'Slash']
          for (let i = 0; i < row2.length; i++) {
            if (event.code === `Key${row2[i]}`) {
              this.elements.keys[i + 13].style.background = "yellow"
            }
          }
          for (let i = 0; i < row3.length; i++) {
            if (event.code === `Key${row3[i]}`) {
              this.elements.keys[i + 26].style.background = "yellow"
            }
          }
          for (let i = 0; i < row4.length; i++) {
            if (event.code === `Key${row4[i]}`) {
              this.elements.keys[i + 39].style.background = "yellow"
            }
          }
          for (let i = 0; i < row5.length; i++) {
            if (event.code === `${row5[i]}`) {
              this.elements.keys[i + 46].style.background = "yellow"
            }
          };
          for (let i = 0; i < 2; i++) {
            if (event.code === `${row2Symbols[i]}`) {
              this.elements.keys[i + 10].style.background = "yellow"
            }
          };
          for (let i = 2; i < 4; i++) {
            if (event.code === `${row2Symbols[i]}`) {
              this.elements.keys[i + 21].style.background = "yellow"
            }
          };
          for (let i = 4; i < 6; i++) {
            if (event.code === `${row2Symbols[i]}`) {
              this.elements.keys[i + 31].style.background = "yellow"
            }
          };
        });
      });

      element.addEventListener("keyup", (event) => {
        this.keydown = !this.keydown
        this.elements.keys.forEach(i => {

          if (event.code === 'Backspace' && i.id === 'backspace') {
            i.style.background = "lightblue"
          } else if (event.code === 'Enter' && i.id === 'enter') {
            i.style.background = "lightblue"
          } else if (event.code === 'Space' && i.id === 'space') {
            i.style.background = "lightblue"
          } else if (event.code === 'ArrowLeft' && i.id === 'arrowLeft') {
            i.style.background = "lightblue"
          } else if (event.code === 'ArrowRight' && i.id === 'arrowRight') {
            i.style.background = "lightblue"
          }

          for (let i = 1; i < this.elements.keys.length; i++) {
            if (event.code === `Digit${i}`) {
              this.elements.keys[i - 1].style.background = "lightblue"
            }
            if (event.code === 'Digit0') {
              this.elements.keys[9].style.background = "lightblue"
            }
          }


          let row2 = 'QWERTYUIOP'.split('')
          let row2Symbols = 'Minus,Equal,BracketLeft,BracketRight,Semicolon,Quote'.split(',')
          let row3 = 'ASDFGHJKL'.split('')
          let row4 = 'ZXCVBNM'.split('')
          let row5 = ['Comma', 'Period', 'Slash']
          for (let i = 0; i < row2.length; i++) {
            if (event.code === `Key${row2[i]}`) {
              this.elements.keys[i + 13].style.background = "lightblue"
            }
          }
          for (let i = 0; i < row3.length; i++) {
            if (event.code === `Key${row3[i]}`) {
              this.elements.keys[i + 26].style.background = "lightblue"
            }
          }
          for (let i = 0; i < row4.length; i++) {
            if (event.code === `Key${row4[i]}`) {
              this.elements.keys[i + 39].style.background = "lightblue"
            }
          }
          for (let i = 0; i < row5.length; i++) {
            if (event.code === `${row5[i]}`) {
              this.elements.keys[i + 46].style.background = "lightblue"
            }
          };
          for (let i = 0; i < 2; i++) {
            if (event.code === `${row2Symbols[i]}`) {
              this.elements.keys[i + 10].style.background = "lightblue"
            }
          };
          for (let i = 2; i < 4; i++) {
            if (event.code === `${row2Symbols[i]}`) {
              this.elements.keys[i + 21].style.background = "lightblue"
            }
          };
          for (let i = 4; i < 6; i++) {
            if (event.code === `${row2Symbols[i]}`) {
              this.elements.keys[i + 31].style.background = "lightblue"
            }
          };
        });
      });

    });
  },
  eve() {
    if (event.type === 'keydown') {
      document.querySelector(".display").focus()
    }
  },

  keyLayout: [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
    'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'",
    'shift', 'enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
    'en/ru', 'voice', 'sound', 'space', 'left', 'right', 'done',
  ],

  createKeys() {
    const fragment = document.createDocumentFragment();

    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    this.keyLayout.forEach(key => {
      const keyElement = document.createElement("button");

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("key-element");
      keyElement.addEventListener('click', () => {
        textarea.focus();
      })
      switch (key) {
      case "backspace":
        keyElement.classList.add("key-element-wide");
        keyElement.id = "backspace";
        keyElement.innerHTML = createIconHTML("backspace");

        keyElement.addEventListener("click", () => {
          this.delTextAtCaret(textarea);
          if (this.properties.keySound) {
            this.elements.audio.setAttribute('src', './assets/sounds/clap.wav')
            this.elements.audio.play()
          }
        });

        break;

      case "caps":
        keyElement.classList.add("key-element-wide");
        keyElement.id = "caps";
        keyElement.innerHTML = createIconHTML("keyboard_capslock");
        keyElement.addEventListener("click", () => {
          this.properties.capsLock = !this.properties.capsLock;
          this.toggleCapsShift()
          if (this.properties.keySound) {
            this.elements.audio.setAttribute('src', './assets/sounds/kick.wav')
            this.elements.audio.play()
          };
          if (this.properties.capsLock) {
            keyElement.style.background = "rgba(0, 0, 0, 0.4)"
            keyElement.style.color = "white"
          } else {
            keyElement.style.background = "lightblue"
            keyElement.style.color = "rgba(43, 42, 42, 0.719"
          };
        });
        break;

      case "enter":
        keyElement.id = "enter"
        keyElement.classList.add("key-element-wide");
        keyElement.innerHTML = createIconHTML("keyboard_return");
        keyElement.addEventListener("click", () => {
          this.insertTextAtCaret(textarea, "\n");
          if (this.properties.keySound) {
            this.elements.audio.setAttribute('src', './assets/sounds/ride.wav')
            this.elements.audio.play()
          }
        });
        break;

      case "en/ru":
        keyElement.innerHTML = "EN/ru"
        keyElement.classList.add("toggle-lang");
        keyElement.addEventListener("click", () => {
          this.properties.languageRu = !this.properties.languageRu;
          this.toggleLanguage();
          this.addSound()
          keyElement.classList.toggle("key-active");
        });
        break;

      case "voice":
        keyElement.innerHTML = createIconHTML("settings_voice");
        keyElement.id = "voice";
        keyElement.addEventListener("click", () => {
          this.properties.voiceRecorder = !this.properties.voiceRecorder
          this.addSound()

          beginRecording = !beginRecording
          if ((this.properties.languageRu)) {
            toggleStartStopRu()
          } else if ((!this.properties.languageRu)) {
            toggleStartStopEng()
          }
          keyElement.classList.toggle("key-record-active")
        });

        break;
      case "sound":
        keyElement.innerHTML = createIconHTML("audiotrack");
        keyElement.id = "sound";
        keyElement.addEventListener("click", () => {
          this.properties.keySound = !this.properties.keySound
          this.addSound()
          keyElement.classList.toggle("key-active")
        });
        break;

      case "shift":
        keyElement.innerHTML = "shift"

        keyElement.id = "shift";
        keyElement.addEventListener("click", () => {
          this.properties.shiftKey = !this.properties.shiftKey;
          this.toggleCapsShift();
          this.pushShift();
          if (this.properties.keySound) {
            this.elements.audio.setAttribute('src', './assets/sounds/hihat.wav')
            this.elements.audio.play()
          };
          if (this.properties.shiftKey) {
            keyElement.style.background = "rgba(0, 0, 0, 0.4)"
            keyElement.style.color = "white"
          } else {
            keyElement.style.background = "lightblue"
            keyElement.style.color = "rgba(43, 42, 42, 0.719"
          };
          if (this.properties.shiftKey) { keyElement.innerHTML = keyElement.innerHTML.toLowerCase() }
        });

        break;
      case "left":
        keyElement.id = "arrowLeft";
        keyElement.innerHTML = createIconHTML("arrow_back");
        keyElement.addEventListener("click", () => {
          this.moveCaretLeft()
          this.addSound()
        });
        break;

      case "right":
        keyElement.id = "arrowRight";
        keyElement.innerHTML = createIconHTML("arrow_forward");
        keyElement.addEventListener("click", () => {
          this.moveCaretRight()
          this.addSound()
        });

        break;
      case "space":
        keyElement.classList.add("key-element-extra-wide");
        keyElement.id = "space";
        keyElement.innerHTML = createIconHTML("space_bar");
        keyElement.addEventListener("click", () => {
          this.insertTextAtCaret(textarea, ' ');
          this.addSound()
        });
        break;

      case "done":
        keyElement.classList.add("key-element-dark");
        keyElement.innerHTML = createIconHTML("check_circle");
        keyElement.addEventListener('click', () => {
          textarea.blur();
        })
        keyElement.addEventListener("click", () => {
          this.close();
          this.triggerEvent("onclose");
          this.addSound()
        });
        break;

      default:
        keyElement.textContent = key.toLowerCase();
        keyElement.addEventListener("click", () => {
          this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
          this.insertTextAtCaret(textarea, keyElement.textContent);
          this.addSound()
        });
        break;
      }

      fragment.appendChild(keyElement);
    });

    return fragment;
  },


  addSound() {
    if (this.properties.keySound) {
      if (this.properties.languageRu) {
        this.elements.audio.setAttribute('src', './assets/sounds/ru.wav')
        this.elements.audio.play()
      } else {
        this.elements.audio.setAttribute('src', './assets/sounds/eng.wav')
        this.elements.audio.play()
      }
    }
  },


  toggleLanguage() {
    let abcEng = "qwertyuiop[]asdfghjkl;'zxcvbnm,.".split('')
    let abcRu = "йцукенгшщзхъфывапролджэячсмитьбю".split('')
    if (this.properties.languageRu) {
      for (let i = 0; i < 12; i++) {
        this.elements.keys[i + 13].textContent = abcRu[i]
      }
      for (let i = 0; i < 11; i++) {
        this.elements.keys[i + 26].textContent = abcRu[i + 12]
      }
      for (let i = 0; i < 9; i++) {
        this.elements.keys[i + 39].textContent = abcRu[i + 23]
      }
      this.elements.keys[49].textContent = "en/RU"

    } else if (!this.properties.languageRu) {
      for (let i = 0; i < 12; i++) {
        this.elements.keys[i + 13].textContent = abcEng[i]
      }
      for (let i = 0; i < 11; i++) {
        this.elements.keys[i + 26].textContent = abcEng[i + 12]
      }
      for (let i = 0; i < 9; i++) {
        this.elements.keys[i + 39].textContent = abcEng[i + 23]
      }
      this.elements.keys[49].textContent = "EN/ru"
    }
  },

  pushShift() {
    let symbols = `!@#$%^&*()_+-={}[]:";'<>,.хъжэбю/?`.split('')
    let symbolsRow1 = '!"№;%:?*()_+-=,.'.split('')
    console.log(symbolsRow1)
    if (this.properties.languageRu) {
      if (this.properties.shiftKey) {
        for (let i = 0; i < 10; i++) {
          this.elements.keys[i].textContent = symbolsRow1[i]
        }
      } else if (!this.properties.shiftKey) {
        for (let i = 0; i < 10; i++) {
          this.elements.keys[i].textContent = `${i+1}`
          this.elements.keys[9].textContent = 0
        }
      }
      if (this.properties.shiftKey) {
        for (let i = 0; i < 3; i++) {
          this.elements.keys[i + 9].textContent = symbolsRow1[i + 9]
        }
      } else if (!this.properties.shiftKey) {
        for (let i = 0; i < 2; i++) {
          this.elements.keys[i + 10].textContent = symbolsRow1[i + 12]
        }
      }
      if (this.properties.shiftKey) {
        this.elements.keys[48].textContent = symbolsRow1[14]
      } else if (!this.properties.shiftKey) {
        this.elements.keys[48].textContent = symbolsRow1[15]
      }
    } else {
      if (this.properties.shiftKey) {
        for (let i = 0; i < 10; i++) {
          this.elements.keys[i].textContent = symbols[i]
        }
      } else if (!this.properties.shiftKey) {
        for (let i = 0; i < 10; i++) {
          this.elements.keys[i].textContent = `${i+1}`
          this.elements.keys[9].textContent = 0
        }
      }
      if (this.properties.shiftKey) {
        for (let i = 0; i < 3; i++) {
          this.elements.keys[i + 9].textContent = symbols[i + 9]
        }
      } else if (!this.properties.shiftKey) {
        for (let i = 0; i < 2; i++) {
          this.elements.keys[i + 10].textContent = symbols[i + 12]
        }
      }
      if (this.properties.shiftKey) {
        for (let i = 0; i < 2; i++) {
          this.elements.keys[i + 23].textContent = symbols[i + 14]
        }
      } else if (!this.properties.shiftKey) {
        if (this.properties.languageRu) {
          for (let i = 0; i < 2; i++) {
            this.elements.keys[i + 23].textContent = symbols[i + 26]
          }
        } else
          for (let i = 0; i < 2; i++) {
            this.elements.keys[i + 23].textContent = symbols[i + 16]
          }
      }
      if (this.properties.shiftKey) {
        for (let i = 0; i < 2; i++) {
          this.elements.keys[i + 35].textContent = symbols[i + 18]
        }
      } else if (!this.properties.shiftKey) {
        if (this.properties.languageRu) {
          for (let i = 0; i < 2; i++) {
            this.elements.keys[i + 35].textContent = symbols[i + 28]
          }
        } else
          for (let i = 0; i < 2; i++) {
            this.elements.keys[i + 35].textContent = symbols[i + 20]
          }
      }
      if (this.properties.shiftKey) {
        for (let i = 0; i < 2; i++) {
          this.elements.keys[i + 46].textContent = symbols[i + 22]
        }
      } else if (!this.properties.shiftKey) {
        if (this.properties.languageRu) {
          for (let i = 0; i < 2; i++) {
            this.elements.keys[i + 46].textContent = symbols[i + 30]
          }
        } else
          for (let i = 0; i < 2; i++) {
            this.elements.keys[i + 46].textContent = symbols[i + 24]
          }
      }
      if (this.properties.shiftKey) {
        this.elements.keys[48].textContent = symbols[32]
      } else if (!this.properties.shiftKey) {
        this.elements.keys[48].textContent = symbols[33]
      }
    }
  },

  toggleToUpperCase() {
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = key.textContent.toUpperCase()
      }
    }
    this.elements.keys[37].innerHTML = 'shift'
  },

  toggleToLowerCase() {
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = key.textContent.toLowerCase()
      }
    }
  },

  moveCaretLeft() {
    textarea.selectionStart !== 0 ? textarea.selectionEnd -= 1 : null
    var textLength = textarea.value.length;
    textLength -= 1
  },

  moveCaretRight() {
    textarea.selectionStart += 1
  },

  getInputSelection(el) {
    var start = 0,
      end = 0,
      normalizedValue, range,
      textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
      start = el.selectionStart;
      end = el.selectionEnd;
    } else {
      range = document.selection.createRange();

      if (range && range.parentElement() == el) {
        len = el.value.length;
        normalizedValue = el.value.replace(/\r\n/g, "\n");

        textInputRange = el.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());

        endRange = el.createTextRange();
        endRange.collapse(false);

        if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
          start = end = len;
        } else {
          start = -textInputRange.moveStart("character", -len);
          start += normalizedValue.slice(0, start).split("\n").length - 1;

          if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
            end = len;
          } else {
            end = -textInputRange.moveEnd("character", -len);
            end += normalizedValue.slice(0, end).split("\n").length - 1;
          }
        }
      }
    }

    return {
      start: start,
      end: end
    };
  },

  offsetToRangeCharacterMove(el, offset) {
    return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
  },

  setSelection(el, start, end) {
    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
      el.selectionStart = start;
      el.selectionEnd = end;
    } else if (typeof el.createTextRange != "undefined") {
      var range = el.createTextRange();
      var startCharMove = this.offsetToRangeCharacterMove(el, start);
      range.collapse(true);
      if (start == end) {
        range.move("character", startCharMove);
      } else {
        range.moveEnd("character", this.offsetToRangeCharacterMove(el, end));
        range.moveStart("character", startCharMove);
      }
      range.select();
    }
  },

  insertTextAtCaret(el, text) {
    var pos = this.getInputSelection(el).end;
    var newPos = pos + text.length;
    var val = el.value;
    el.value = val.slice(0, pos) + text + val.slice(pos);
    this.setSelection(el, newPos, newPos);
  },

  delTextAtCaret(el) {
    var pos = this.getInputSelection(el).end;
    var newPos = pos - 1;
    var val = el.value;
    if (el.selectionStart !== 0) {
      el.value = val.slice(0, newPos) + val.slice(newPos + 1);
      this.setSelection(el, newPos, newPos);
    }

  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsShift() {
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if (!this.properties.capsLock && !this.properties.shiftKey) {
          key.textContent = key.textContent.toLowerCase()
        } else if (this.properties.capsLock && this.properties.shiftKey) {
          key.textContent = key.textContent.toLowerCase()
        } else if (!this.properties.capsLock && this.properties.shiftKey) {
          key.textContent = key.textContent.toUpperCase()
        } else if (this.properties.capsLock && !this.properties.shiftKey) {
          key.textContent = key.textContent.toUpperCase()
        }
      }
    }
    this.properties.languageRu ? this.elements.keys[49].textContent = "en/RU" :
      this.elements.keys[49].textContent = "EN/ru"
    this.elements.keys[37].innerHTML = 'shift'
  },


  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard-hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard-hidden");
  }
};


window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});