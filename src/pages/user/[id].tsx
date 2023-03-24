import crypto from 'crypto';
import Image from 'next/image';
import Header from '@/components/Header';
import { MdEmail } from 'react-icons/md';
import { AiOutlineGlobal } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { fetchUserById } from '@/services/helpers';
import { GetServerSidePropsContext } from 'next';
import { UserProps } from '@/types/userTypes';
import Head from 'next/head';

function UserDetail({ person }: { person: UserProps }) {
  return (
    <div className='flex flex-col items-center h-screen gap-10'>
      <Head>
        <title>Detalhes | {person.name}</title>
      </Head>
      <Header />
      {person && (
        <div className='
          flex gap-3
          items-center justify-center
          justify-self-center
          p-4 shadow-lg rounded-md
          w-96 my-auto mx-8
          dark:bg-gray-700
          max-md:w-auto
          max-md:flex-col
          max-md:gap-10
          '
        >
          <div className='
            flex flex-col items-center justify-center 
          '
          >
            <Image
              className='
                rounded-full
              '
              src={person.avatar}
              alt={person.name}
              width={200}
              height={200}
              priority={true}
            />
            <p className='font-semibold text-base dark:text-gray-300'>
              {person.username}
            </p>
          </div>
          <div className='
            flex flex-col items-center justify-center
            gap-3
          '
          >
            <h1 
              className='
                font-medium flex items-center gap-2 w-full
                dark:text-gray-300
              '
            >
              <FaUserAlt size={30} />
              {person.name}
            </h1>
            <p className='
              flex items-center gap-2
              w-full text-blue-600
            dark:text-blue-500
              dark:font-extrabold
              '
            >
              <MdEmail size={30}/>
              {person.email}
            </p>
            <p className='
              flex items-center gap-2
              w-full text-blue-600
              dark:text-blue-500
              dark:font-extrabold
              '
            >
              <AiOutlineGlobal size={30}/>
              {person.website}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query; // pega o valor do ID da URL
  const person: UserProps = await fetchUserById(id as string);

  function generateGravatarHash(email: string) {
    // converte o endereço de e-mail para minúsculas e remove espaços em branco
    email = email.trim().toLowerCase();
    // cria um hash MD5 do endereço de e-mail
    const hash = crypto.createHash('md5').update(email).digest('hex');
    // retorna o hash como uma string em minúsculas
    return hash;
  }

  person.avatar = `https://robohash.org/${generateGravatarHash(person.email)}.png?size=200x200`;

  return {
    props: {
      person,
    },
  };
}

export default UserDetail;