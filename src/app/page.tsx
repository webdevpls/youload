'use client'
import {  useRouter } from "next/navigation";
import { useAuthContext } from "../context/authContext";
import { Button } from "@/components/ui/button";

function Page() {
  const { userAuth, logout } = useAuthContext();
  const router = useRouter();


  console.log(userAuth);

  if (userAuth == null) {
    router.push("/signIn");
  }

  return (
    <>
      {userAuth && (
        <section className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#050506]">
          <h1 className="font-bold text-[20px] text-white">Aqui será a pagina de cadastro, somente quem tem login terá acesso!</h1>
          <Button className="w-[205px] mt-7 bg-white text-[#050506]" onClick={() => logout()}>Sair</Button>
        </section>
      )}
    </>
  );
}

export default Page;