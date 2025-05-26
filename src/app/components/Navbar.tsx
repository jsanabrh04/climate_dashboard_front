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
<nav className="bg-gray-900 text-white px-6 py-4 shadow-lg flex justify-between items-center border-b border-gray-800">
  <div className="flex space-x-6 text-sm font-medium">
    <Link href="/protected/weather" className="hover:text-blue-400 transition-colors">
      Inicio
    </Link>
    <Link href="/protected/records" className="hover:text-blue-400 transition-colors">
      Registros
    </Link>
  </div>
  <button
    onClick={handleLogout}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
  >
    Cerrar sesión
  </button>
</nav>
  );
};

export default Navbar;
