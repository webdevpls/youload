import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  console.log('Handler GET chamado'); // Adicione este log

  try {
    
    const pessoas = await prisma.pessoa.findMany();
    return NextResponse.json(pessoas);
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error);
    return NextResponse.json({ error: 'Erro ao buscar pessoas' }, { status: 500 });
  }
}
