import { RasaResponse } from "shared";

/**
 * Handles an error gracefully by returning a response to the user.
 * @param res the response object
 */
export const handleMeasurandCompleteRequestError = (res: RasaResponse) => {
  res.json({
    responses: [
      {
        text: "Beim Bearbeiten der Anfrage ist etwas schief gelaufen. Ich kann diese nicht beantworten.",
        response: "",
      },
    ],
  });
};
