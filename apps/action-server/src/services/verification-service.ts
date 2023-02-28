import { ILUBWData, ILUBWDataKey } from "shared";

import { VerificationError } from "../errors/VerificationError";

/**
 * Service for verifying fetched lubw data from the knowledge graph
 * Throws an {@link VerificationError} if the data is not valid
 */
export class VerificationService {
  /**
   * Verifies the fetched lubw data from the knowledge graph
   * @param lubwData the fetched lubw data
   * @returns the verified lubw data
   */
  public static verifyLUBWData(lubwData: Partial<ILUBWData> | null): ILUBWData {
    return this.getVerifiedLUBWData(lubwData);
  }

  /**
   * Gets the verified lubw data by mapping over the object and validating each property
   * @param lubwData the fetched lubw data to verify
   * @returns the verified lubw data
   */
  private static getVerifiedLUBWData(lubwData: Partial<ILUBWData> | null): ILUBWData {
    // TODO: https://dev.to/svehla/typescript-object-fromentries-389c might be better than type casting
    return Object.fromEntries(
      Object.values(ILUBWDataKey).map((key) => [key, this.validateProperty(lubwData, key)]),
    ) as unknown as ILUBWData;
  }

  /**
   * Validates a property of the lubw data
   * Throws an {@link VerificationError} if the property is not valid
   * @param data the lubw data to validate
   * @param propKey the property key of the data to validate
   * @returns the validated property
   */
  private static validateProperty(data: Partial<ILUBWData> | null, propKey: keyof ILUBWData): string {
    const propertyValue: string | undefined = data?.[propKey];

    if (this.isValidProperty(propertyValue)) {
      return propertyValue;
    }

    throw new VerificationError(`${propKey} is not valid for LUBW data`, data, propKey);
  }

  /**
   * Checks whether a property is valid
   * A type guard that checks whether a property is valid
   * @param propertyValue the property value to check
   * @returns the validity of the property
   */
  private static isValidProperty(propertyValue: string | undefined): propertyValue is string {
    return propertyValue !== undefined && propertyValue !== null && propertyValue !== "";
  }
}
