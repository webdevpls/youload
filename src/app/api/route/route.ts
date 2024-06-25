// app/api/route.ts
import { NextRequest, NextResponse } from 'next/server'; // Use NextRequest e NextResponse
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { nome, email, dataNascimento, tituloEleitor, bairro } = await req.json();

    try {
        const pessoa = await prisma.pessoa.create({
            data: {
                nome,
                email,
                dataNascimento: new Date(dataNascimento),
                tituloEleitor,
                bairro,
            },
        });
        return NextResponse.json(pessoa);
    } catch (error) {
        console.error('Erro ao cadastrar pessoa:', error);
        return NextResponse.json({ error: 'Erro ao cadastrar pessoa' }, { status: 500 });
    }
}

