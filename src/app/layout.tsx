import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { AuthContextProvider } from '../context/authProvider'
import './globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'YouLoad',
  description: 'Baixe seus vídeos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
