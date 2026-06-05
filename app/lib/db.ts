import { PrismaClient, Prisma } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const isTransientPrismaError = (error: unknown) => {
  if (!error || typeof error !== 'object') return false;
  const err = error as { code?: string; name?: string };
  if (err.code === 'P1001' || err.code === 'P1002' || err.code === 'P1008' || err.code === 'P1017') {
    return true;
  }
  return err.name === 'PrismaClientInitializationError';
};

const retryExtension = Prisma.defineExtension({
  name: 'retry-on-transient',
  query: {
    $allOperations: async ({ args, query }) => {
      const maxAttempts = 4;
      let attempt = 0;
      let lastError: unknown;

      while (attempt < maxAttempts) {
        try {
          return await query(args);
        } catch (error) {
          lastError = error;
          if (!isTransientPrismaError(error)) {
            throw error;
          }
          attempt += 1;
          if (attempt >= maxAttempts) break;
          await sleep(250 * 2 ** (attempt - 1));
        }
      }

      throw lastError;
    },
  },
});

const createPrismaClient = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  }).$extends(retryExtension);

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const globalForExtended = globalThis as unknown as {
  prismaExtended?: ExtendedPrismaClient;
};

export const prisma: ExtendedPrismaClient =
  globalForExtended.prismaExtended ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForExtended.prismaExtended = prisma;
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prisma as unknown as PrismaClient;
  }
}
