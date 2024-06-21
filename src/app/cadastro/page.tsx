'use client'

import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import Navbar from "@/components/navabr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Pessoa {
  nome: string;
  email: string;
  dataNascimento: string;
  tituloEleitor: string;
  bairro: string;
}

function Cadastro() {
  const router = useRouter();
  usePathname();

  const [pessoa, setPessoa] = useState<Pessoa>({
    nome: "",
    email: "",
    dataNascimento: "",
    tituloEleitor: "",
    bairro: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPessoa({ ...pessoa, [name]: value });
  };

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    const formattedValue = value
      .replace(/(\d{4})(\d)/, "$1 $2") // Adds a space after the first 4 digits
      .replace(/(\d{4}) (\d{4})(\d)/, "$1 $2 $3") // Adds a space after the second set of 4 digits
      .slice(0, 14); // Restrict to 14 characters (including spaces)
    setPessoa({ ...pessoa, tituloEleitor: formattedValue });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulação de envio de dados
    // Aqui você pode enviar os dados para onde precisar (por exemplo, API, armazenamento local, etc.)
    // Após enviar os dados, navegue para a página de listagem
      
  };

  const handleConfirmCadastro = () => {
    // Lógica para confirmar o cadastro
    // Exemplo de redirecionamento para a página de listagem após o cadastro
    router.push("/cadastrados");
  };

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 py-0 bg-[#050506]">
      <Navbar />
      <Card className="w-[530px] bg-[#050506] border border-[#27272A]">
        <CardHeader>
          <CardTitle className="font-bold text-white text-[20px]">
            Cadastro de pessoa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="nome" className="font-bold text-white">
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  placeholder="Nome"
                  value={pessoa.nome}
                  onChange={handleInputChange}
                  required
                  className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email" className="font-bold text-white">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={pessoa.email}
                  onChange={handleInputChange}
                  required
                  className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label
                  htmlFor="dataNascimento"
                  className="font-bold text-white"
                >
                  Data de nascimento
                </label>
                <input
                  id="dataNascimento"
                  name="dataNascimento"
                  placeholder="Data de nascimento"
                  type="date"
                  value={pessoa.dataNascimento}
                  onChange={handleInputChange}
                  required
                  className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="tituloEleitor" className="font-bold text-white">
                  Título de eleitor
                </label>
                <input
                  id="tituloEleitor"
                  name="tituloEleitor"
                  placeholder="Título de eleitor"
                  value={pessoa.tituloEleitor}
                  onChange={handleTituloChange}
                  required
                  type="text"
                  className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="bairro" className="font-bold text-white">
                  Bairro
                </label>
                <Select>
                  <SelectTrigger id="bairro">
                    <SelectValue placeholder="Selecione o bairro" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Valentina">Valentina</SelectItem>
                    <SelectItem value="Geisel">Geisel</SelectItem>
                    {/* Adicione outros bairros aqui */}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardFooter className="flex justify-center mt-5 p-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="submit"
                    className="bg-white text-[#434343] w-full rounded flex items-center justify-center hover:bg-slate-200"
                  >
                    Cadastrar
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[635px] bg-[#050506] border border-[#27272A]">
                  <DialogHeader>
                    <DialogTitle className="text-white font-bold">
                      Tem certeza que deseja cadastrar esta pessoa?
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                      Certifique-se se todos os dados estão corretos antes de
                      finalizar o processo de cadastramento.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose>
                      <Button
                        type="submit"
                        className="bg-[#050506] border border-[#27272A] text-white rounded flex items-center justify-center hover:bg-[#000000]"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <DialogClose>
                    <Button
                      type="submit"
                      className="bg-white text-[#434343] rounded flex items-center justify-center hover:bg-slate-200"
                      onClick={handleConfirmCadastro}

                    >
                      Tenho certeza
                    </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
            <button type="submit" className="hidden">
              Submit
            </button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default Cadastro;
