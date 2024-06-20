'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import signUp from '@/firebase/auth/signUp'
import { useRouter } from 'next/navigation'
import React from 'react'

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/signIn")
    }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#050506]">
            <Card className="w-[530px] bg-[#050506] border border-[#27272A]">
                <CardHeader>
                    <CardTitle className="font-bold text-white text-[20px]">Faça seu login</CardTitle>
                    <CardDescription className="text-[#434343] w-[400px]">Usando o nome de usuário e senha que disponibilizamos para vocês</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleForm}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="email" className="font-bold text-white">Email</label>
                                <input 
                                    id="email" 
                                    placeholder="Seu email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                    type='email'
                                    className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343]"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <label htmlFor="password" className="font-bold text-white">Senha</label>
                                <input 
                                    id="pass" 
                                    placeholder="Sua senha" 
                                    type='password' 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                    className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343]"
                                />
                            </div>
                        </div>

                    

                        <CardFooter className="flex justify-center mt-5 p-0">
                            <Button type="submit" className="bg-white text-[#434343] w-full rounded">Cadastrar</Button>
                            <Button type="button" className="bg-white text-[#434343] w-full rounded" onClick={() => router.push("/signIn")}>Voltar</Button>

                        </CardFooter>
                    
                    </form>
                </CardContent>
            </Card>
            </main>  
  )
}

export default Page
