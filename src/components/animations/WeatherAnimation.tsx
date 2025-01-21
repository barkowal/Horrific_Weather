import sun from '../../assets/sun-rays_transparent.png'
import moon from '../../assets/moon_white.png'
import { SkyColorCode } from '../../hooks/Types';
import { getHourFromStringDate } from '../../hooks/StringFormatter';
import clouds_1 from "../../assets/clouds1.png";
import clouds_2 from "../../assets/clouds2.png";
import clouds_3 from "../../assets/clouds3.png";
import clouds_4 from "../../assets/clouds4.png";

type PrivateProps = {
  skyColorCode: SkyColorCode
}

const bgColors = {
  'clearNight': 'bg-[#000000]',
  'cloudyNight': 'bg-[#1C1C1C]',
  'foggyNight': 'bg-[#3D3D3D]',
  'coldNight': 'bg-[#1C1F3F]',
  'warmNight': 'bg-[#012B5D]',
  'stormNight': 'bg-[#22252F]',
  'rainyNight': 'bg-[#0F161B]',

  'clearDay': 'bg-[#578190]',
  'cloudyDay': 'bg-[#677689]',
  'foggyDay': 'bg-[#B0ACA6]',
  'warmDay': 'bg-[#FFC66C]',
  'coldDay': 'bg-[#056892]',
  'rainyDay': 'bg-[#738680]',
  'stormDay': 'bg-[#22252F]',
  'sunset': 'bg-[#FB5B39]'
}

const WeatherAnimation = ({ skyColorCode }: PrivateProps) => {
  const raindropCount = 100;
  const cloudsCount = 35;
  const cloudsImages = [clouds_1, clouds_2, clouds_3, clouds_4];
  const isCloud = ![0, 3, 4].includes(skyColorCode.skyCode);
  const isRain = [3, 5, 7].includes(skyColorCode.skyCode);
  const isSnow = [4, 6, 8].includes(skyColorCode.skyCode);
  const icon = isDay(skyColorCode.currentTime) ? sun : moon;
  const index = getWeatherColor(skyColorCode.currentTime, skyColorCode.temperature, skyColorCode.skyCode);
  const currentBgColor = bgColors[index];

  return (
    <div id="rains" className={`absolute top-0 left-0 z-[-1] min-h-full min-w-full inset-0 m-0 overflow-hidden ${currentBgColor}`} >
      <div className='absolute top-[20px] right-[20px] w-1/12 h-1/12'><img src={`${icon}`} /></div>
      {isCloud ?
        Array.from({ length: cloudsCount }).map((_, index) => (
          <img
            src={cloudsImages[Math.round(Math.random() * 3)]}
            key={index}
            className="cloud"
            style={{
              left: `-100vw`,
              top: `${Math.random() * 60}%`,
              animationDuration: `${7 + Math.random() * 1}s`,
              animationDelay: `${Math.random() * 3}s`,
            }} />)) : null
      }
      {
        isRain || isSnow ?
          Array.from({ length: raindropCount }).map((_, index) => (
            <div
              key={index}
              className="rain"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3.5 + Math.random() * 1}s`,
                width: `${isRain ? 5 : 20}px`,
                height: `${isRain ? 100 : 20}px`,
                background: `${isRain ? "#80A6D2" : "#FFFFFF"}`,
              }}
            >
            </div>
          )) : null
      }
      <style>{`
        .rain {
          position: absolute;
          animation: fall linear infinite;
          bottom: 100%;
          border-radius: ${isRain ? 20 : 100}%;
          opacity: 0.5;
        }
        @keyframes fall {
          0 % {
            transform: translateY(0);
          }
          100% {
          transform: translateY(800vh);
          }
      }
        .cloud {
        position: absolute;
        opacity: 0.8;
        width: 100%;
        height: 100%;
        animation: move linear infinite;
        }
        @keyframes move {
          0 % {
            transform: translateX(0);
          }
          100% {
          transform: translateX(200vw);
          }
        }
      `}</style>
    </div >
  );
};

export default WeatherAnimation;

function getWeatherColor(time: string, temp: number, code: number) {
  const hour: number = getHourFromStringDate(time);
  if (isDay(time))
    return getWeatherForDay(hour, temp, code);
  else
    return getWeatherForNight(temp, code);
}

function isDay(time: string) {
  const hour: number = getHourFromStringDate(time);
  return hour > 6 && hour < 17 ? true : false;
}

function getWeatherForDay(hour: number, temp: number, code: number) {
  const weather = getGeneralWeather(temp, code);
  if (weather == "warm" || weather == "clear") {
    if (hour < 17 && hour > 16)
      return "sunset";
  }
  return weather + "Day";
}

function getWeatherForNight(temp: number, code: number) {
  const weather = getGeneralWeather(temp, code);
  return weather + "Night";
}

function getGeneralWeather(temp: number, code: number) {
  if (code == 0) {
    if (temp > 20) return "warm";
    if (temp < 0) return "cold";
    return "clear";
  }
  if (code == 1) return "cloudy";
  if (code == 2) return "foggy";
  if (code == 3) return "rainy";
  if (code == 4) return "cold";
  if (code == 5) return "rainy";
  if (code == 6) return "snow";
  if (code == 7) return "storm";
  if (code == 8) return "cold";
  return "";
}

//Weather codes:
//0 - clear without rain
//1 - cloudy without rain
//2 - foggy without rain
//3 - clear with rain
//4 - clear with snow
//5 - cloudy with rain
//6 - cloudy with snow
//7 - foggy with rain
//8 - foggy with snow

