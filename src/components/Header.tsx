import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/next.svg';
import { FaHome, FaBookReader } from 'react-icons/fa';
import ToggleTheme from './ToggleTheme';
import { useRouter } from 'next/router';
import { GoThreeBars } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { atom, useAtom } from 'jotai';
import MobileMenu from './MobileMenu';

export const mobileAtom = atom(false);

function Header() {
  const router = useRouter();
  const [mobileVisible, setMobileVisible] = useAtom(mobileAtom);
  const { pathname } = router;
  
  return (
    <div>
      <header className='
          flex justify-between items-center
          w-screen h-40 bg-slate-500 p-4
          min-h-[144px]
          max-md:flex-col max-md:items-end
          max-md:h-36
          '
      >
        <ToggleTheme />
        <div className='max-md:hidden'>
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
          />
        </div>
        <nav className='
            flex justify-center items-center
            gap-3 font-bold text-slate-900
            max-md:hidden
            '
        >
          {pathname === '/' && (
            <Link
              href='#users'
              className='
                hover:text-blue-100 hover:font-bold
                transition duration-300 ease-in-out
                flex items-center gap-2'
            >
              <FaBookReader size={25}/>
              Top Leitores
            </Link>
          )}
          <Link
            href='/'
            className='
                hover:text-blue-100
                hover:font-bold transition
                duration-300 ease-in-out
                flex items-center gap-2'
          >
            <FaHome size={25}/>
              Home
          </Link>
        </nav>
        <div className='md:hidden'>
          {mobileVisible ? (
            <IoClose size={25} onClick={() => setMobileVisible(!mobileVisible)}/>
          ) : (
            <GoThreeBars size={25} onClick={() => setMobileVisible(!mobileVisible)}/>
          )}
        </div>
      </header>
      <div className={`transition-all ${mobileVisible ? 'translate-x-0' : '-translate-x-10' }`}>
        {mobileVisible && (
          <MobileMenu />
        )}
      </div>
    </div>
  );
}

export default Header;