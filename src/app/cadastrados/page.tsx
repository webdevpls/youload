'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table';
import Navbar from '@/components/navabr';
import { format } from 'date-fns';
import { MdDelete } from 'react-icons/md';

interface Pessoa {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
  tituloEleitor: string;
  bairro: string;
}

function Cadastrados() {
  const pathname = usePathname();
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchPessoas() {
      try {
        const response = await fetch('/api/route/get', { method: 'GET' }); 
        if (response.ok) {
          const data = await response.json();
          setPessoas(data);
        } else {
          setErrorMessage('Erro ao buscar pessoas cadastradas');
        }
      } catch (error) {
        setErrorMessage('Erro ao buscar pessoas cadastradas');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPessoas();
  }, []);

  async function deletarPessoa(id: number) {
    console.log('Deletando pessoa com ID:', id);
    try {
      
      const response = await fetch(`/api/route/del/${id}`, { method: 'DELETE' }); // Corrigido
      if (response.ok) {
        setPessoas(pessoas.filter((pessoa) => pessoa.id !== id));
      } else {
        setErrorMessage('Erro ao deletar pessoa');
      }
    } catch (error) {
      setErrorMessage('Erro ao deletar pessoa');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 py-0 bg-[#050506]">
      <Navbar />
      <div className="py-20">
        {isLoading ? (
          <p>Carregando...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <Table className="w-[1260px]">
            <TableHeader className="rounded-md">
              <TableRow className="border-b border-b-[#27272A] bg-[#050506] hover:bg-text-neutral-600">
                <TableHead className="text-neutral-600 w-[200px] font-bold whitespace-nowrap">Nome</TableHead>
                <TableHead className="text-neutral-600 w-[250px] font-bold whitespace-nowrap">Email</TableHead>
                <TableHead className="text-neutral-600 w-[200px] font-bold whitespace-nowrap">Data de nascimento</TableHead>
                <TableHead className="text-neutral-600 w-[200px] font-bold whitespace-nowrap">Título de eleitor</TableHead>
                <TableHead className="text-right text-neutral-600 w-[150px] font-bold whitespace-nowrap">Bairro</TableHead>
                <TableHead className="text-right text-neutral-600 w-[150px] font-bold whitespace-nowrap">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pessoas.map((pessoa) => (
                <TableRow key={pessoa.id} className="text-white bg-[#050506] hover:bg-[#0f0f12] rounded-md border-b border-b-[#27272A]">
                  <TableCell className="font-medium">{pessoa.nome}</TableCell>
                  <TableCell>{pessoa.email}</TableCell>
                  <TableCell>{format(new Date(pessoa.dataNascimento), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{pessoa.tituloEleitor}</TableCell>
                  <TableCell className="text-right">{pessoa.bairro}</TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => deletarPessoa(pessoa.id)}>
                      <MdDelete size={24} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
}

export default Cadastrados;
