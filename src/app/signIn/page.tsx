'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import signIn from '@/firebase/auth/signIn'
import { FirebaseError } from 'firebase/app'
import { usePathname, useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    usePathname();

    const handleForm = async (event: FormEvent) => {
        event.preventDefault()
        setLoading(true)
        setErrorMessage('')
        setSuccess(false)
        try {
            const { result, error } = await signIn(email, password);

            if (error) {
                const firebaseError = error as FirebaseError;
                if (firebaseError.message) {
                    console.log(firebaseError.message);
                    throw new Error(firebaseError.message);
                } else {
                    console.log('Unknown Error:', firebaseError);
                    throw new Error('Unknown Error');
                }
            }

            console.log(result)
            setSuccess(true)
            setTimeout(() => {
                router.push("/cadastro");
            }, 2000);
        } catch (error) {
            console.error('Error: ', error);
            setErrorMessage('Credenciais incorretas. Por favor, verifique-as e tente novamente.');
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#050506]">
            <Card className="w-[530px] bg-[#050506] border border-[#27272A]">
                <CardHeader>
                    <CardTitle className="font-bold text-white text-[20px]">Faça seu login</CardTitle>
                    <CardDescription className="text-[#434343] w-[400px]">Entre no nosso mundo de downloads de videos do youtube!</CardDescription>
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
                                <div className="relative">
                                    <input 
                                        id="pass" 
                                        placeholder="Sua senha" 
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                        className="bg-[#050506] border border-[#27272A] rounded-[5px] px-3 py-2 text-sm text-white placeholder-[#434343] w-full"
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#434343] cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                </div>
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="mt-4 text-red-500 text-sm">
                                {errorMessage}
                            </div>
                        )}
                        <CardFooter className="flex justify-center mt-5 p-0">
                            <Button type="submit" className="bg-white text-[#434343] w-full rounded flex items-center justify-center hover:bg-slate-200">
                                {loading ? (
                                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full border-t-transparent border-[#434343]"></div>
                                ) : success ? (
                                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                ) : (
                                    'Entrar'
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>

           
        </main>
    )
}

export default SignIn
