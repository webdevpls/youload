import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/authContext';

function Navbar() {

    const { userAuth, logout } = useAuthContext();
  const router = useRouter();


  console.log(userAuth);

  if (userAuth == null) {
    router.push("/signIn");
  }

  return (
    <nav className="w-full text-white py-4 fixed top-20 left-0 z-10">
        <ul className="flex justify-center items-center space-x-8">
        
        <li>
          <Link href="/cadastro">
            Cadastrar
          </Link>
        </li>
        <li>
          <Link href="/cadastrados">
            Cadastrados
          </Link>
        </li>
       <Button className='w-24 bg-white text-[#050506]' onClick={() => logout()}>
          Sair           
        </Button>
      </ul>
    </nav>
  );
}

export default Navbar;
