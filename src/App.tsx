import { createContext, useState } from 'react'
import Tile from './components/Tile'
import SearchBar from './components/SearchBar'
import { SkyColorCode } from './hooks/Types'
import WeatherAnimation from './components/animations/WeatherAnimation'
import './App.css'

export const WeatherContext = createContext(undefined);

function App() {
  const [city, setCity] = useState();
  const [skyColorCode, setSkyColorCode] = useState<SkyColorCode>({ currentTime: "", temperature: 0, skyCode: 0 });
  const [theme, setTheme] = useState<string>("dark");

  const toggleTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  }

  return (
    <>
      <div id="root" className={`${theme} relative h-full z-10 w-full flex justify-center items-center m-0`}>

        <div id="main-window" className=' w-mediumScreen lg:w-largeScreen xl:w-xLargeScreen 2xl:w-2xLargeScreen
           '>
          <SearchBar onCityChange={setCity} onThemeChange={toggleTheme} />
          <Tile city={city} onWeatherChange={setSkyColorCode} />
        </div>
        <WeatherAnimation skyColorCode={skyColorCode} />
      </div >
    </>
  )
}

export default App
