import { useRef, useState } from 'react';
import search_icon from '../assets/search_icon_small.png'

type PrivateProps = {
  onCityChange: CallableFunction
  onThemeChange: CallableFunction
}

function SearchBar({ onCityChange, onThemeChange }: PrivateProps) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const ClearInput = () => {
    if (inputRef.current != null) {
      inputRef.current.value = "";
    }
  };

  const handleOnChange = (event: any) => {
    setSearch(event ? event.target.value : '');
  };

  const handleClick = async (event: any) => {
    onCityChange(search);
    ClearInput();
  };

  const handleKey = (event: any) => {
    if (event.key == 'Enter') {
      onCityChange(search);
      ClearInput();
    }
  }

  const [isToggled, setIsToggled] = useState<boolean>(false);

  return (
    <>
      <div className="w-full h-fit rounded flex justify-center items-center">
        <div className="w-4/6 m-2 overflow-hidden bg-bar-bg p-0 rounded-3xl border border-bar-border-c flex justify-center text-fs-medium">
          <input ref={inputRef} type="search" id="city-search" placeholder="Nazwa Miasta" onChange={handleOnChange}
            className="w-full bg-bar-bg rounded-l-3xl px-2 text-medium-font-c" onKeyDown={handleKey}></input>
          <button className="px-2 w-max text-center flex justify-center items-center bg-bar-bg rounded-none hover:bg-bar-button-hover-bg"
            onClick={handleClick}>
            <img src={search_icon} className='w-8 h-8 lg:w-7 lg:h-7 xl:w-10 xl:h-10 m-2' />
          </button>
        </div>

        <button
          onClick={() => { setIsToggled(!isToggled); onThemeChange() }}
          className={`flex items-center w-16 h-8 p-1 rounded-full transition-colors duration-300 bg-bar-button-bg`}
        >
          <div className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isToggled ? 'bg-black translate-x-8' : 'bg-white translate-x-0'}`} />
        </button>

      </div>
    </>
  )
}

export default SearchBar
