"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar, } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import signIn from "@/firebase/auth/signIn";
import { cn } from "@/lib/utils";
import { FirebaseError } from "firebase/app";
import { CalendarIcon } from "@radix-ui/react-icons"
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { format } from "date-fns"
import { ptBR } from "date-fns/locale";


function Cadastro() {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const router = useRouter();
  const [date, setDate] = React.useState<Date>()


  usePathname();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#050506]">
      <Card className="w-[530px] bg-[#050506] border border-[#27272A]">
        <CardHeader>
          <CardTitle className="font-bold text-white text-[20px]">
            Cadastro de pessoa
          </CardTitle>
          <CardDescription className="text-[#434343] w-[400px]">
            Olá, @usuário! Siga passo a passo para o cadastro ser efetuado com
            sucesso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="Nome" className="font-bold text-white">
                  Nome
                </label>
                <input
                  id="nome"
                  placeholder="Nome"
                  // value={name}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343]"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="password" className="font-bold text-white">
                  Email
                </label>
                <input
                  id="pass"
                  placeholder="Sua senha"
                  type="password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343]"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email" className="font-bold text-white">
                  Data de nascimento
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-[#050506] border border-[#27272A] text-white",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#434343]" />
                      {date ? format(date, "P", { locale: ptBR }) : <span className="text-[#434343]">Escolha a data</span>}
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0  " align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email" className="font-bold text-white">
                  Titulo de eleitor
                </label>
                <input
                  id="email"
                  placeholder="Seu email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343]"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email" className="font-bold text-white">
                  Bairro
                </label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Selecione o bairro" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Valentina">Valentina</SelectItem>
                    <SelectItem value="Geisel">Geisel</SelectItem>
                    <SelectItem value="Bessa">Bessa</SelectItem>
                    <SelectItem value="Intermares">Intermares</SelectItem>
                    <SelectItem value="Altiplano">Altiplano</SelectItem>
                    <SelectItem value="Alto do Matheus">
                      Alto do Matheus
                    </SelectItem>
                    <SelectItem value="Centro">Centro</SelectItem>
                    <SelectItem value="José Américo">José Américo</SelectItem>
                    <SelectItem value="Cristo">Cristo</SelectItem>
                    <SelectItem value="Miramar">Miramar</SelectItem>
                    <SelectItem value="Rangel">Rangel</SelectItem>
                    <SelectItem value="Gramame">Gramame</SelectItem>
                    <SelectItem value="Paratibe">Paratibe</SelectItem>
                    <SelectItem value="Jaguaribe">Jaguaribe</SelectItem>
                    <SelectItem value="Mangabeira">Mangabeira</SelectItem>
                    <SelectItem value="Cruz das arma">Cruz das armas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* {errorMessage && ( */}
            <div className="mt-4 text-red-500 text-sm">
              {/* {errorMessage} */}
            </div>
            {/* )} */}
            <CardFooter className="flex justify-center mt-5 p-0">
              <Button
                type="submit"
                className="bg-white text-[#434343] w-full rounded flex items-center justify-center hover:bg-slate-200"
              >
                {/* {loading ? ( */}
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full border-t-transparent"></div>
                {/* ) : ( */}
                Cadastrar
                {/* )} */}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default Cadastro;
