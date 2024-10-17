'use client'; // Indica que este é um Client Component (Next.js)

import { useRouter } from 'next/navigation'; // Hook para navegação entre páginas
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'; // Hooks do React
import { Button } from '@/components/ui/button'; // Componente de botão
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Componentes de card
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Componentes de seleção
import axios from 'axios'; // Biblioteca para requisições HTTP
import Navbar from '@/components/navabr';
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { InputFocusBlur } from '@/components/inputFocus';
import Particles from 'react-tsparticles';
import SnowParticles from '@/components/particles';

function Cadastro() {
  const router = useRouter(); // Instância do useRouter para navegação


  const [url, setUrl] = useState('');
  const [formComplete, setFormComplete] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    setFormComplete(url.trim() !== '');
  }, [url]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Impede o envio padrão do formulário
    console.log('URL para download:', url); // Verifica a URL capturada
  
    try {
      const response = await axios.post('/api/download', { url });
      console.log('Download iniciado:', response.data);
    } catch (error) {
      console.error('Erro ao baixar o vídeo:', error.response?.data?.error || 'Erro desconhecido');
    }
  };
  
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-center px-24 py-0 bg-[#050506]">
      <SnowParticles/>
      <Card className="w-[530px] bg-white/2 backdrop-blur-lg  border border-[#27272A]">
        <CardHeader>
          <CardTitle className="font-bold text-white text-[20px]">Digite a URL</CardTitle>
          <CardDescription className="text-[#434343] w-[400px]">Digite a url do vídeo que deseja baixar</CardDescription>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center">

              <div className="flex flex-col w-full ">
                <InputFocusBlur
                  id="url"
                  name="url"
                  value={url}
                  placeholder="https://www.youtube.com/@devhelloworld"
                  onChange={handleChange}
                  autoComplete='off'
                  required
                  
                />
              </div>
             
              
            </div>
            <CardFooter className="flex justify-center mt-5 p-0 ">
              <Button
                type="submit"
                className="bg-white text-[#434343] w-full rounded-[5px] flex items-center justify-center hover:bg-slate-200"
                disabled={!formComplete}>
                Continuar
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      
    </main>
  );
}

export default Cadastro;
