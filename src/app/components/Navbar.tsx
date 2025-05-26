'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '../api/auth';


const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex space-x-4">
        <Link href="/protected/weather" className="hover:underline">
          Inicio
        </Link>
        <Link href="/protected/records" className="hover:underline">
          Registros
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Navbar;
