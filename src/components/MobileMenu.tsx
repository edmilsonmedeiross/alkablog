import Link from 'next/link';
import { FaBookReader, FaHome } from 'react-icons/fa';
import { useAtom } from 'jotai';
import { mobileAtom } from './Header';
import { useRouter } from 'next/router';

function MobileMenu() {
  const [, setMobileVisible] = useAtom(mobileAtom);
  const pathName = useRouter().pathname;
    
  return (
    <div className=''>
      <div className='
        flex flex-col items-center
        justify-center m-auto
        h-[calc(100vh-144px)] w-screen
        top-0 bg-gray-800
        mobile-menu z-20
        
        '
      >
        <nav className='flex flex-col gap-10'>
          <Link
            href='/'
            onClick={() => setMobileVisible(false)}
            className='
              flex items-center gap-3
              w-screen bg-gray-600
              h-20 px-4 text-gray-50'
          >
            <FaHome size={25}/>
            Home
          </Link>
          <Link
            href={pathName === '/' ? '#users' : '/#users'}
            onClick={() => setMobileVisible(false)}
            className='
              flex items-center
              gap-3 w-screen bg-gray-600
              h-20 px-4 text-gray-50'
          >
            <FaBookReader size={25}/>
            Top Leitores
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;