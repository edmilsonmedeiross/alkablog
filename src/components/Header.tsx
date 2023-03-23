import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <div>
      <div>
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={200}
          height={200}
          priority={true}
        />
      </div>
      <nav>
        <Link href='#users'>Top Leitores</Link>
        <Link href='/'>Home</Link>
      </nav>
    </div>
  );
}

export default Header;