/* eslint-disable @typescript-eslint/no-explicit-any */

interface IButton {
  /** The text on the button */
  title: string;
  /** Payload which is sent if the button is pressed */
  payload: string;
}

export type IResponse = IBasicResponse & ICustomProperties;

interface IBasicResponse {
  /** The text which should be uttered. */
  text: string;
  /** Array of buttons */
  buttons: IButton[];
  elements: any[];
  custom: object;
  image: string;
  attachment: string;
  /** Name of the template */
  template: string;
  /** Name of the response */
  response_name: string;
}

interface ICustomProperties {
  /** Keyword argument to fill the template */
  [key: string]: string;
}
