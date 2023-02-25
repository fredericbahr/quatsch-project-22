import { ILUBWData } from "shared";

/**
 * Custom verification error that should be thrown if the LUBW data is not valid/complete.
 */
export class VerificationError extends Error {
  private _unvalidLUBWData: Partial<ILUBWData>;
  private _invalidProperty: keyof ILUBWData;

  constructor(message: string, unvalidLUBWData: Partial<ILUBWData>, invalidProperty: keyof ILUBWData) {
    super(message);
    this.name = "VerificationError";
    this._unvalidLUBWData = unvalidLUBWData;
    this._invalidProperty = invalidProperty;
  }

  /**
   * The unvalid LUBW data which caused the error.
   */
  public get unvalidLUBWData(): Partial<ILUBWData> {
    return this._unvalidLUBWData;
  }

  /**
   * The invalid property which caused the error.
   */
  public get invalidProperty(): keyof ILUBWData {
    return this._invalidProperty;
  }
}
