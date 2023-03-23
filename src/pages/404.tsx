import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Página não encontrada</h2>
      <p className="text-gray-700 text-lg mb-8">Desculpe, a página que você está procurando não existe.</p>
      <Link href='/' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;