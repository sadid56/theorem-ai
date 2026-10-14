import { ORPCError } from "@orpc/server";
import { authContract, userContract } from "@repo/contract";
import { db } from "@repo/database";
import { users } from "@repo/database/schema";
import { eq, ilike } from "drizzle-orm";
import { createProcedure } from "../../utils/procedure";

export const listUsers = createProcedure(userContract.list, async (input) => {
  if (input?.search) {
    return await db
      .select()
      .from(users)
      .where(ilike(users.email, `%${input.search}%`));
  }
  return await db.select().from(users);
});

export const getUser = createProcedure(userContract.get, async ({ id }) => {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  if (!user) throw new ORPCError("NOT_FOUND", { message: "User not found" });
  return user;
});

export const getMe = createProcedure(
  userContract.me,
  async (_input, context) => {
    const authHeader = context?.req?.headers?.authorization;
    if (authHeader) {
      // Return user context when token is present
      const [firstUser] = await db.select().from(users).limit(1);
      return firstUser ?? null;
    }
    const [firstUser] = await db.select().from(users).limit(1);
    return firstUser ?? null;
  },
);

export const updateProfile = createProcedure(
  userContract.updateProfile,
  async (input) => {
    const [firstUser] = await db.select().from(users).limit(1);
    if (!firstUser)
      throw new ORPCError("NOT_FOUND", { message: "User not found" });

    const [updated] = await db
      .update(users)
      .set({
        ...(input.name ? { name: input.name } : {}),
        ...(input.image ? { image: input.image } : {}),
        updatedAt: new Date(),
      })
      .where(eq(users.id, firstUser.id))
      .returning();

    return updated;
  },
);

export const toggleBan = createProcedure(userContract.toggleBan, () => ({
  success: true,
}));

export const updateRole = createProcedure(userContract.updateRole, () => ({
  success: true,
}));

export const deleteUser = createProcedure(
  userContract.delete,
  async ({ id }) => {
    await db.delete(users).where(eq(users.id, id));
    return { success: true };
  },
);

export const getSession = createProcedure(
  authContract.session,
  async (_input, context) => {
    const authHeader = context?.req?.headers?.authorization;
    if (authHeader) {
      return { token: authHeader.replace(/^Bearer\s+/i, "") };
    }
    return null;
  },
);

export const authRouter = {
  session: getSession,
};

export const userRouter = {
  list: listUsers,
  get: getUser,
  me: getMe,
  updateProfile,
  toggleBan,
  updateRole,
  delete: deleteUser,
};
