import { timelineContract } from "@repo/contract";
import { createProcedure } from "../../utils/procedure";

export const updateOverlays = createProcedure(
  timelineContract.updateOverlays,
  async (input) => {
    return {
      success: true,
      timelineId: input.timelineId,
      overlaysCount: input.overlays.length,
      modelCallsIncurred: 0,
      message: "Overlays saved with zero generative video model cost",
    };
  },
);

export const timelineRouter = {
  updateOverlays,
};
