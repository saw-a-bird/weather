export var autumn = {
    "particles": {
      "number": {
        "value": 10,
        "density": {
          "enable": true,
          "value_area": 1000
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "images",
        "stroke": {
          "width": 0,
          "color": "#000"
        },
        "polygon": {
          "nb_sides": 6
        },
        "images": [
          {
            "src": "./imgs/autumn/autumn1.png"
          },
          {
            "src": "./imgs/autumn/autumn2.png"
          },
          {
            "src": "./imgs/autumn/autumn3.png"
          },
          {
            "src": "../imgs/autumn/autumn4.png"
          },
        ]
      },
      "opacity": {
        "value": 1,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 0.25,
          "opacity_min": 0.4,
          "sync": false
        }
      },
      "size": {
        "value": 20,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 4,
          "size_min": 2,
          "sync": true
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 1,
        "width": 20
      },
      "move": {
        "enable": true,
        "speed": 10,
        "direction": "bottom-right",
        "random": false,
        "straight": true,
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 12,
          "speed": 6
        },
        "repulse": {
          "distance": 200,
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
  }