import { productsContract } from "@repo/contract";
import { db } from "@repo/database";
import { products } from "@repo/database/schema";
import { createProcedure } from "../../utils/procedure";

export const createProduct = createProcedure(
  productsContract.create,
  async (input) => {
    const id = `prod_${Date.now()}`;
    const [created] = await db
      .insert(products)
      .values({
        id,
        name: input.name,
        description: input.description,
        price: input.price,
        currency: input.currency,
        productUrl: input.productUrl,
        category: input.category,
      })
      .returning();
    return created;
  },
);

export const listProducts = createProcedure(
  productsContract.list,
  async () => {
    return await db.select().from(products);
  },
);

export const productsRouter = {
  create: createProduct,
  list: listProducts,
};
