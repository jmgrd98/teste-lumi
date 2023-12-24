import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllFaturas() {
    return await prisma.faturas.findMany();
}

export async function getFaturaById(id: number) {
    return await prisma.faturas.findUnique({
        where: { id: id },
    });
}

export async function findByNumeroCliente(numeroCliente: string) {
    return await prisma.faturas.findMany({
        where: {
            numero_cliente: {
                contains: numeroCliente,
            },
        },
    });
}
