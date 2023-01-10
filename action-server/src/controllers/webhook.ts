import { Request, Response } from "express";

export const handleCustomAction = async (req: Request, res: Response) => {
  res
    .json({
      events: [],
      responses: [
        {
          text: `Hi from the webhook: ${new Date().toISOString()}`,
          buttons: [
            { title: "Sad!", payload: "Sad" },
            { title: "Happy", payload: "Fine" },
          ],
        },
      ],
    })
    .end();
};
