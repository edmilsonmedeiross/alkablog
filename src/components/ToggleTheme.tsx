import { useTheme } from 'next-themes';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';


const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => theme === 'dark'? setTheme('light'): setTheme('dark')}
      className='mx-auto right-3 top-3 absolute'
    >
      {theme === 'dark' ? <MdDarkMode size={30}/> : <MdOutlineLightMode size={30}/>}
    </button>
  );
};

export default ToggleTheme;