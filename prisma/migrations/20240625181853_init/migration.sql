-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "tituloEleitor" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_email_key" ON "Pessoa"("email");
