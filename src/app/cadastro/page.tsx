'use client'

import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
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

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tituloEleitor, setTituloEleitor] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (nome && email && tituloEleitor && dataNascimento) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [nome, email, tituloEleitor, dataNascimento]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Dados do formulário:");
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Data de Nascimento:", dataNascimento);
    console.log("Título de Eleitor:", tituloEleitor);

    // Aqui você pode enviar os dados para onde precisar (por exemplo, API, armazenamento local, etc.)
    // Após enviar os dados, navegue para a página de listagem ou faça qualquer outra ação necessária

    // Exemplo de navegação usando useRouter
    // router.push("/cadastrados"); // Substitua com a rota para sua página de cadastrados
  };

  const handleTituloEleitorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    const formattedValue = value
      .replace(/(\d{4})(\d)/, "$1 $2") // Adds a space after the first 4 digits
      .replace(/(\d{4}) (\d{4})(\d)/, "$1 $2 $3") // Adds a space after the second set of 4 digits
      .slice(0, 14); // Restrict to 14 characters (including spaces)
    setTituloEleitor(formattedValue);
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
          <form onSubmit={handleFormSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="nome" className="font-bold text-white">
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
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
                  value={tituloEleitor}
                  onChange={handleTituloEleitorChange}
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
                    className="bg-white text-[#434343] w-full rounded-[5px] flex items-center justify-center hover:bg-slate-200"
                    disabled={!formComplete}
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
                        type="button"
                        className="bg-[#050506] border border-[#27272A] text-white rounded flex items-center justify-center hover:bg-[#000000]"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <DialogClose>
                      <Button
                        type="submit"
                        className="bg-white text-[#434343] rounded flex items-center justify-center hover:bg-slate-200"
                      >
                        Tenho certeza
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default Cadastro;
