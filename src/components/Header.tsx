import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/next.svg';
import { FaHome, FaBookReader } from 'react-icons/fa';
import ToggleTheme from './ToggleTheme';



function Header() {
  return (
    <div className='
      flex justify-between
      w-full h-40 pl-4 bg-slate-500
      '
    >
      <ToggleTheme />
      <div className='flex'>
        <Image
          className=''
          src={logo}
          alt="logo"
          width={200}
          height={200}
          priority={true}
        />
      </div>
      <nav className='
        flex justify-center items-center
        gap-3 pr-4 font-bold text-slate-900
        '
      >
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
    </div>
  );
}

export default Header;