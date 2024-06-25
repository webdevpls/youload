'use client'; // Indica que este é um componente Client Component (Next.js 13)

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Para obter o pathname da página atual
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from '@/components/ui/table'; // Componentes da tabela
// import Navbar from '@/components/navbar'; // Componente de navegação

// Interface para definir a estrutura dos dados de uma pessoa
interface Pessoa {
  id: number; 
  nome: string;
  email: string;
  dataNascimento: string; // Data no formato ISO (YYYY-MM-DD)
  tituloEleitor: string;
  bairro: string;
}

function Cadastrados() {
  const pathname = usePathname(); // Obtém o pathname da página atual (não usado neste exemplo)
  const [pessoas, setPessoas] = useState<Pessoa[]>([]); // Estado para armazenar a lista de pessoas
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
  const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar mensagens de erro

  useEffect(() => { // Efeito colateral que será executado quando o componente for montado
    async function fetchPessoas() { // Função assíncrona para buscar os dados
      try {
        const response = await fetch('/api/route', { method: 'GET' }); 
        if (response.ok) { // Verifica se a requisição foi bem-sucedida
          const data = await response.json(); // Converte a resposta para JSON
          setPessoas(data); // Atualiza o estado com os dados recebidos
        } else {
          setErrorMessage('Erro ao buscar pessoas cadastradas'); // Define a mensagem de erro
        }
      } catch (error) {
        setErrorMessage('Erro ao buscar pessoas cadastradas'); // Define a mensagem de erro em caso de falha na requisição
      } finally {
        setIsLoading(false); // Indica que o carregamento terminou
      }
    }

    fetchPessoas(); // Chama a função para buscar os dados
  }, []); // O array vazio indica que o efeito será executado apenas uma vez, quando o componente for montado

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 py-0 bg-[#050506]">
      {/* <Navbar /> Renderiza o componente de navegação */}

      {/* ... (código dos filtros de busca) ... */}

      <div className="py-20"> {/* Espaçamento */}
        {isLoading ? ( // Se estiver carregando, exibe a mensagem "Carregando..."
          <p>Carregando...</p> 
        ) : errorMessage ? ( // Se houver um erro, exibe a mensagem de erro
          <p className="text-red-500">{errorMessage}</p> 
        ) : ( // Se não estiver carregando e não houver erro, exibe a tabela
          <Table className="w-[1260px]">
            <TableHeader className="rounded-md">
              <TableRow className="border-b border-b-[#27272A] bg-[#050506] hover:bg-text-neutral-600">
                {/* Cabeçalho da tabela */}
                <TableHead className="text-neutral-600 w-[200px] font-bold whitespace-nowrap">Nome</TableHead>
                <TableHead className="text-neutral-600 w-[250px] font-bold whitespace-nowrap">Email</TableHead>
                <TableHead className="text-neutral-600 w-[200px] font-bold whitespace-nowrap">Data de nascimento</TableHead>
                <TableHead className="text-neutral-600 w-[200px] font-bold whitespace-nowrap">Título de eleitor</TableHead>
                <TableHead className="text-right text-neutral-600 w-[150px] font-bold whitespace-nowrap">Bairro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pessoas.map((pessoa) => ( // Mapeia a lista de pessoas para criar as linhas da tabela
                <TableRow key={pessoa.id} className="text-white bg-[#050506] hover:bg-[#0f0f12] rounded-md border-b border-b-[#27272A]">
                  <TableCell className="font-medium">{pessoa.nome}</TableCell>
                  <TableCell>{pessoa.email}</TableCell>
                  <TableCell>{pessoa.dataNascimento}</TableCell>
                  <TableCell>{pessoa.tituloEleitor}</TableCell>
                  <TableCell className="text-right">{pessoa.bairro}</TableCell>
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
