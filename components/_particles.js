import Particles from 'react-particles'
import { loadFull } from "tsparticles"
import { useCallback } from "react"
import particleCSS from '../styles/particles.module.css'
import { useEffect } from 'react'
import { weather_conditions } from '../public/weather_conditions'
import { rain } from '../public/rain'
import { clouds } from '../public/clouds'
import { snow } from '../public/snow'
import { night } from '../public/night'
import { useState } from 'react'

export function BackgroundArea ({ seasonId, api, dayPart }) {
    const [type, setType] = useState("Clear")

    useEffect(() => {
        var particleType = undefined;
        switch (api.weather.main) {
            case "Rain":
                particleType = "rain";
                switch (api.weather.description) {
                    case "light rain":
                        rain.particles.number.value = 15
                    case "moderate rain":
                        rain.particles.number.value = 30
                    default:
                        rain.particles.number.value = 50
                }

                break;
            case "Snow":
                particleType = "snow";
                switch (api.weather.description) {
                    case "light snow":
                        snow.particles.number.value = 15
                    case "Snow":
                        snow.particles.number.value = 30
                    default:
                        snow.particles.number.value = 50
                }

                break;
            default:
                if (dayPart != "Night" && (seasonId == "fall" || seasonId == "spring")) {
                    particleType = seasonId;
                }
        }

        if (particleType != undefined) {
            weather_conditions[particleType].particles.move.direction = -api.wind.deg;
            weather_conditions[particleType].particles.move.speed = api.wind.speed*5;
            setType(particleType);
        }

    }, [])

  const particlesInit = useCallback(async (engine) => {
      await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
      console.log(container);
  }, []);

  if (type != "Clear") {
    return (
        <Particles
            id="background"
            init={particlesInit}
            loaded={particlesLoaded}
            className={particleCSS.particleArea}
            params={ weather_conditions[type] }
        />
    );
  } else {
    return <></>
  }
};

export function CloudArea({ api }) {

    useEffect(() => {
        const deg = api.wind.deg, sep = api.wind.speed ;
        if ( deg > 90 && deg < 270 ) {
            clouds.particles.move.direction = "right";
        }

        clouds.particles.move.speed = sep;
        clouds.particles.number.value = 5 + api.clouds.all %10;

        // alert(clouds.particles.number.value)
    }, [])

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);
  
    const particlesLoaded = useCallback(async (container) => {
        console.log(container);
    }, []);
    
  
    return (
            <Particles
            id="clouds"
            init={particlesInit}
            loaded={particlesLoaded}
            className={particleCSS.particleArea}
            params={ clouds }
        />
    );
};


export function StarArea() {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);
  
    const particlesLoaded = useCallback(async (container) => {
        console.log(container);
    }, []);
    
  
    return (
            <Particles
            id="stars"
            init={particlesInit}
            loaded={particlesLoaded}
            className={particleCSS.particleArea}
            params={ night }
        />
    );
};