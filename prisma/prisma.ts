import { PrismaClient } from "./prisma/client";

let captivadPrisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  captivadPrisma = new PrismaClient();
} else {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(global as any).prisma) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).captivadPrisma = new PrismaClient();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  captivadPrisma = (global as any).captivadPrisma;
}

export { captivadPrisma };
