import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const noteRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.note.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        authorId: z.string(),
        title: z.string(),
        content: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({ data: input });
    }),
});
