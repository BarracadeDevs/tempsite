import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
  try {
    return new PrismaClient();
  } catch {
    // During build or when DB is unavailable, return a stub
    return new Proxy({} as PrismaClient, {
      get: (_target, prop) => {
        if (prop === 'then') return undefined;
        return new Proxy(() => {}, {
          get: () => () => Promise.resolve(null),
          apply: () => Promise.resolve(null),
        });
      },
    });
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
