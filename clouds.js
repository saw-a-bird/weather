export var clouds = {
    "particles": {
      "number": {
        "value": 100,
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
            "src": "/weather/imgs/clouds/cloud1.png"
          },
          {
            "src": "/weather/imgs/clouds/cloud2.png"
          },
          {
            "src": "/weather/imgs/clouds/cloud3.png"
          }
        ]
      },
      "opacity": {
        "value": 0.25,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 0.25,
          "opacity_min": 0.05,
          "sync": false
        }
      },
      "size": {
        "value": 150,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 3,
          "size_min": 50,
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
        "speed": 1,
        "direction": "left",
        "random": true,
        "straight": false,
        "out_mode": "out",
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