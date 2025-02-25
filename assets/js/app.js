particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.47980807676929244,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1.5,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": false
        },
        "modes": {
            "grab": {
                "distance": 170.0914444003467,
                "line_linked": {
                    "opacity": 0.6071794871794872
                }
            },
            "repulse": {
                "distance": 100,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        let elements = document.querySelectorAll(".element");
        elements.forEach(function (el) {
            new Typed(el, {
                strings: ["a Web Developer.", "Aleksey Rudenko"],
                typeSpeed: 30,
                startDelay: 500,
                backDelay: 250,
                callback: function () {
                    lift(el);
                }
            });
        });

        function lift(element) {
            element.classList.add("heading");
            fadeInOut(element, [150, 50, 100, 50, 100, 50, 500], function () {
                let hiddenElements = document.querySelectorAll('.hidden');
                hiddenElements.forEach(function (hidden) {
                    setTimeout(function () {
                        hidden.classList.add('visible');
                    }, 100);
                });
            });
        }

        function fadeInOut(element, durations, callback) {
            if (!durations.length) {
                if (callback) callback();
                return;
            }
            let duration = durations.shift();
            element.style.opacity = element.style.opacity === "1" ? "0" : "1";
            setTimeout(function () {
                fadeInOut(element, durations, callback);
            }, duration);
        }
    });
})();
