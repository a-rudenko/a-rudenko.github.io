(function () {
    "use strict";
    let Typed = function (el, options) {
        this.el = typeof el === "string" ? document.querySelector(el) : el;
        this.options = Object.assign({}, Typed.defaults, options);
        this.isInput = this.el.tagName.toLowerCase() === 'input';
        this.attr = this.options.attr;
        this.showCursor = this.isInput ? false : this.options.showCursor;
        this.contentType = this.options.contentType;
        this.typeSpeed = this.options.typeSpeed;
        this.startDelay = this.options.startDelay;
        this.backSpeed = this.options.backSpeed;
        this.backDelay = this.options.backDelay;
        this.stringsElement = this.options.stringsElement;
        this.strings = this.options.strings;
        this.strPos = 0;
        this.arrayPos = 0;
        this.stopNum = 0;
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;
        this.stop = false;
        this.cursorChar = this.options.cursorChar;
        this.sequence = [];
        this.build();
    };

    Typed.prototype = {
        constructor: Typed,
        init: function () {
            let self = this;
            setTimeout(function () {
                for (let i = 0; i < self.strings.length; ++i) {
                    self.sequence[i] = i;
                }
                self.typewrite(self.strings[self.sequence[self.arrayPos]], self.strPos);
            }, self.startDelay);
        },

        build: function () {
            let self = this;
            if (this.showCursor) {
                this.cursor = document.createElement('span');
                this.cursor.className = 'cursor';
                this.cursor.textContent = this.cursorChar;
                this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
            }

            if (this.stringsElement) {
                self.strings = [];
                this.stringsElement.style.display = 'none';
                let strings = this.stringsElement.querySelectorAll('p');
                strings.forEach(function (value) {
                    self.strings.push(value.innerHTML);
                });
            }
            this.init();
        },

        typewrite: function (curString, curStrPos) {
            if (this.stop) return;
            let humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            let self = this;
            setTimeout(function () {
                let charPause = 0;
                let substr = curString.substring(curStrPos);
                if (substr.charAt(0) === '^') {
                    let skip = 1;
                    if (/^\^\d+/.test(substr)) {
                        substr = /\d+/.exec(substr)[0];
                        skip += substr.length;
                        charPause = parseInt(substr);
                    }
                    curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
                }

                if (self.contentType === 'html') {
                    let curChar = curString.substring(curStrPos).charAt(0);
                    if (curChar === '<' || curChar === '&') {
                        let endTag = curChar === '<' ? '>' : ';';
                        while (curString.substring(curStrPos).charAt(0) !== endTag) {
                            curStrPos++;
                        }
                        curStrPos++;
                    }
                }

                setTimeout(function () {
                    if (curStrPos === curString.length) {
                        if (self.arrayPos === self.strings.length - 1) {
                            self.options.callback();
                            self.curLoop++;
                            if (!self.loop || self.curLoop === self.loopCount) return;
                        }
                        setTimeout(function () {
                            self.backspace(curString, curStrPos);
                        }, self.backDelay);
                    } else {
                        let nextString = curString.substring(0, curStrPos + 1);
                        if (self.attr) {
                            self.el.setAttribute(self.attr, nextString);
                        } else {
                            if (self.isInput) {
                                self.el.value = nextString;
                            } else if (self.contentType === 'html') {
                                self.el.innerHTML = nextString;
                            } else {
                                self.el.textContent = nextString;
                            }
                        }

                        curStrPos++;
                        self.typewrite(curString, curStrPos);
                    }
                }, charPause);
            }, humanize);
        },

        backspace: function (curString, curStrPos) {
            if (this.stop) return;
            let humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
            let self = this;
            setTimeout(function () {
                if (self.contentType === 'html') {
                    if (curString.substring(curStrPos).charAt(0) === '>') {
                        while (curString.substring(curStrPos).charAt(0) !== '<') {
                            curStrPos--;
                        }
                        curStrPos--;
                    }
                }

                let nextString = curString.substring(0, curStrPos);
                if (self.attr) {
                    self.el.setAttribute(self.attr, nextString);
                } else {
                    if (self.isInput) {
                        self.el.value = nextString;
                    } else if (self.contentType === 'html') {
                        self.el.innerHTML = nextString;
                    } else {
                        self.el.textContent = nextString;
                    }
                }

                if (curStrPos > self.stopNum) {
                    curStrPos--;
                    self.backspace(curString, curStrPos);
                } else {
                    self.arrayPos++;
                    if (self.arrayPos === self.strings.length) {
                        self.arrayPos = 0;
                        self.init();
                    } else {
                        self.typewrite(self.strings[self.sequence[self.arrayPos]], curStrPos);
                    }
                }
            }, humanize);
        },
    };

    Typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        backDelay: 500,
        loop: false,
        loopCount: false,
        showCursor: true,
        cursorChar: "|",
        attr: null,
        contentType: 'html',
        callback: function () {
        }
    };

    window.Typed = Typed;
})();
