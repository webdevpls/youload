'use client'

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
// import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function Cadastro() {
  const router = useRouter();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tituloEleitor, setTituloEleitor] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [bairro, setBairro] = useState('');
  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (nome && email && tituloEleitor && dataNascimento && bairro) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  }, [nome, email, tituloEleitor, dataNascimento, bairro]);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/route/pessoas', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, dataNascimento, tituloEleitor, bairro }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Pessoa cadastrada:', data);
        router.push('/cadastrados'); // Navegue para a página de cadastrados após o cadastro
      } else {
        console.error('Erro ao cadastrar pessoa');
      }
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
    }
  };

  const handleTituloEleitorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    const formattedValue = value
      .replace(/(\d{4})(\d)/, '$1 $2') // Adds a space after the first 4 digits
      .replace(/(\d{4}) (\d{4})(\d)/, '$1 $2 $3') // Adds a space after the second set of 4 digits
      .slice(0, 14); // Restrict to 14 characters (including spaces)
    setTituloEleitor(formattedValue);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-24 py-0 bg-[#050506]">
      {/* <Navbar /> */}
      <Card className="w-[530px] bg-[#050506] border border-[#27272A]">
        <CardHeader>
          <CardTitle className="font-bold text-white text-[20px]">Cadastro de pessoa</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="nome" className="font-bold text-white">Nome</label>
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
                <label htmlFor="email" className="font-bold text-white">Email</label>
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
                <label htmlFor="dataNascimento" className="font-bold text-white">Data de nascimento</label>
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
                <label htmlFor="tituloEleitor" className="font-bold text-white">Título de eleitor</label>
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
                <label htmlFor="bairro" className="font-bold text-white">Bairro</label>
                <Select onValueChange={setBairro}>
                  <SelectTrigger id="bairro">
                    <SelectValue placeholder="Selecione o bairro" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Valentina">Valentina</SelectItem>
                    <SelectItem value="Geisel">Geisel</SelectItem>
                    <SelectItem value="Mangabeira">Mangabeira</SelectItem>
                    <SelectItem value="Bessa">Bessa</SelectItem>
                    <SelectItem value="Centro">Centro</SelectItem>
                    <SelectItem value="Manaíra">Manaíra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardFooter className="flex justify-center mt-5 p-0">
              <Button
                type="submit"
                className="bg-white text-[#434343] w-full rounded-[5px] flex items-center justify-center hover:bg-slate-200"
                disabled={!formComplete}
              >
                Cadastrar
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default Cadastro;
