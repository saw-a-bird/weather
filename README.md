
# Real-Time Weather Visualization App 🌤️

This was a classroom project which I really to the top for no reason at all. I got inspiration from google resources and made my own dynamic weather indicator app.

This app visually represents real-time weather conditions, including cloud density, wind direction, temperature, and daylight progression, and with some CSS improvements, I could make the tree actually move too (but it's a unnecessary waste of time for me, so I'll leave that to anyone interested) A disclaimer is that the images are not mine.

---

## Animation

![Animation](https://github.com/user-attachments/assets/48ae5cf6-a0ad-42bc-bdd3-2fc6f5abb5fb)

Live in [saw-a-bird.github.io/weather/](https://saw-a-bird.github.io/weather/)
---

## Features

* **Dynamic Sky Background**: Transitions smoothly from day to night based on the current time.
* **Cloud Density**: Clouds move and their density reflects live cloudiness data.
* **Wind Direction**: Displays wind direction with a visual indicator.
* **Daylight Progress**: Visual representation of sunrise, sunset, and daylight brightness.
* **Season & Location Awareness**: Adjusts visuals according to the current season and location.
- **Precipitation visualization**: Visualizes rain and snow according to the weather.
* **Interactive Environment**: Includes a static tree and grassy foreground for context.
* **Temperature & Humidity Details**: Shows current temperature and humidity levels.

Whoa now i wrote that, I know how much I invested in this little project😂

--- 

## Technologies Used

* **Frontend**: Next.js, HTML5 Canvas or CSS animations
* **Weather API**: OpenWeatherMap (or any preferred API) to get current location (latitude and aptitude) and also get the weather conditions. (Warning: Not all locations are available)
* **State Management**: React hooks for dynamic updates

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-visualization.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser at `http://localhost:3000`.

---


## Future Improvements

* Include animated transitions for the tree and grass (according to wind speed)
* Include a visualization of the current temperature and humidity.
* Mobile-friendly interface
* Make it more secure... (No backend is pretty terrible for NextJS applications, ya know)
