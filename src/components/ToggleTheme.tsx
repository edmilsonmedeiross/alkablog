import { isResolvedAtom } from '@/jotai/aplicationAtoms';
import { useAtom } from 'jotai';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

const ToggleTheme = () => {
  const [isResolved, setIsResolved] = useAtom(isResolvedAtom);
  const { resolvedTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setIsResolved(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const icon = theme === 'light' ? <MdOutlineLightMode size={30}/> : <MdDarkMode size={30}/>;

  return (
    <button
      className='md:absolute md:right-3 md:top-3'
      onClick={() => setTheme(resolvedTheme ==='light' ? 'dark' : 'light')}
    >
      {isResolved && icon}
    </button>
  );
};

export default ToggleTheme;