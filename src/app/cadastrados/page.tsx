'use client'

import { usePathname } from "next/navigation";
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navabr";

interface Pessoa {
  nome: string;
  email: string;
  dataNascimento: string;
  tituloEleitor: string;
  bairro: string;
}

function Cadastrados() {
  const pathname = usePathname();
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    // Dados fictícios para simular o carregamento de pessoas
    const dadosIniciais: Pessoa[] = [
      {
        nome: "João Silva",
        email: "joao.silva@example.com",
        dataNascimento: "1990-05-15",
        tituloEleitor: "1234 5678 9012",
        bairro: "Valentina"
      },
      {
        nome: "Maria Souza",
        email: "maria.souza@example.com",
        dataNascimento: "1985-08-25",
        tituloEleitor: "9876 5432 1098",
        bairro: "Geisel"
      },
      {
        nome: "Carlos Santos",
        email: "carlos.santos@example.com",
        dataNascimento: "1978-03-10",
        tituloEleitor: "4567 8901 2345",
        bairro: "Mangabeira"
      },
      {
        nome: "Ana Oliveira",
        email: "ana.oliveira@example.com",
        dataNascimento: "1995-11-20",
        tituloEleitor: "3210 9876 5432",
        bairro: "Bessa"
      },
      {
        nome: "Pedro Pereira",
        email: "pedro.pereira@example.com",
        dataNascimento: "1982-07-18",
        tituloEleitor: "7890 1234 5678",
        bairro: "Centro"
      },
      {
        nome: "Fernanda Costa",
        email: "fernanda.costa@example.com",
        dataNascimento: "1993-02-28",
        tituloEleitor: "2345 6789 0123",
        bairro: "Manaíra"
      }
    ];

    // Definindo os dados no estado
    setPessoas(dadosIniciais);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 py-0 bg-[#050506]">
      <Navbar />
      <div className="flex items-center justify-between py-4">
        <form action="" className="flex items-center gap-2">
          <input
            id="nome"
            placeholder="Pesquise por nome"
            className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343] w-[520px]"
          />
          <input
            id="titulo"
            placeholder="Pesquise por Título de eleitor"
            className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343] w-[520px]"
          />
          <button
            className="w-[200px] h-9 rounded-sm bg-white text-[#050506]"
            type="button"
          >
            Buscar resultados
          </button>
        </form>
      </div>
      <div className="py-20">
        <Table className="w-[1260px]">
          <TableHeader className="rounded-md">
            <TableRow className="border-b border-b-[#27272A] bg-[#050506] hover:bg-text-neutral-600">
              <TableHead className="text-neutral-600 w-[200px] font-bold whitespace-nowrap">
                Nome
              </TableHead>
              <TableHead className="text-neutral-600 w-[250px] font-bold whitespace-nowrap">
                Email
              </TableHead>
              <TableHead className="text-neutral-600 w-[200px] font-bold whitespace-nowrap">
                Data de nascimento
              </TableHead>
              <TableHead className="text-neutral-600 w-[200px] font-bold whitespace-nowrap">
                Título de eleitor
              </TableHead>
              <TableHead className="text-right text-neutral-600 w-[150px] font-bold whitespace-nowrap">
                Bairro
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pessoas.map((pessoa, index) => (
              <TableRow key={index} className="text-white bg-[#050506] hover:bg-[#0f0f12] rounded-md border-b border-b-[#27272A]">
                <TableCell className="font-medium">{pessoa.nome}</TableCell>
                <TableCell>{pessoa.email}</TableCell>
                <TableCell>{pessoa.dataNascimento}</TableCell>
                <TableCell>{pessoa.tituloEleitor}</TableCell>
                <TableCell className="text-right">{pessoa.bairro}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

export default Cadastrados;
