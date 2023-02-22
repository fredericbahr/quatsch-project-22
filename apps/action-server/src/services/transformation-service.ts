import { differenceInDays } from "date-fns";
import { defaultLUBWData, Domain, IFilteredAnnotations, ILUBWData, IQanaryAnnotation, ITimeObject } from "shared";
/**
 * Service for transforming the annotations to the intermediate representation format.
 */
export class LUBWDataTransformationService {
  /**
   * Gets the transformed LUBW data from annotations.
   * @returns transformed LUBW data
   */
  public static getTransformedLUBWData(annotations: Array<IQanaryAnnotation>): ILUBWData {
    return this.transformAnnotationsToLUBWDataRepresentation(annotations);
  }

  /**
   * Transforms the annotations to the intermediate representation format
   * @param annotations the qanary annotations generated by components
   * @returns the intermediate representation format of the annotations
   */
  private static transformAnnotationsToLUBWDataRepresentation(annotations: Array<IQanaryAnnotation>): ILUBWData {
    const filteredAnnotations: IFilteredAnnotations = this.filterAnnotations(annotations);

    return this.transformAndMergeWithDefaultLUBWData(filteredAnnotations);
  }

  /**
   * Transforms the annotations to the interim internal format and merges it with the default LUBW data.
   * @param filteredAnnotations the filtered annotations
   * @returns the interim internal format of the annotations
   */
  private static transformAndMergeWithDefaultLUBWData(filteredAnnotations: IFilteredAnnotations): ILUBWData {
    const firstAnnotation = 0;
    const defaultValues: ILUBWData = defaultLUBWData;

    const transformedValues: Partial<ILUBWData> = {
      station: filteredAnnotations.stationAnnotation[firstAnnotation]?.hasBody,
      measurand: filteredAnnotations.measurandAnnotation[firstAnnotation]?.hasBody,
      representation: filteredAnnotations.representationAnnotation[firstAnnotation]?.hasBody,
      calculation: filteredAnnotations.calculationAnnotation[firstAnnotation]?.hasBody,
      time: this.transformTime(filteredAnnotations.timeAnnotation[firstAnnotation]?.hasBody),
    };

    return this.mergeWithDefaults(transformedValues, defaultValues);
  }

  /**
   * Transforms the time annotation to the interim internal format.
   * @param time the annotated time as serialized JSON
   * @returns the difference between the start and end date in days or undefined if the transformation failed
   */
  private static transformTime(time?: string): string | undefined {
    try {
      if (!time) {
        throw new Error("The time annotation is missing. Fallback to default value.");
      }

      const timeObject: ITimeObject = JSON.parse(time) as ITimeObject;

      if (!timeObject.end) {
        throw new Error("The end date is missing. Fallback to default value.");
      }

      const dayDifference = differenceInDays(new Date(timeObject.end), new Date(timeObject.start));

      return `${dayDifference}d`;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  /**
   * Merges the custom values with the default values, to ensure that all values are set.
   * @param customValues the custom values
   * @param defaultValues the default values
   * @returns the merged values
   */
  private static mergeWithDefaults(customValues: Partial<ILUBWData>, defaultValues: ILUBWData): ILUBWData {
    return {
      station: customValues.station || defaultValues.station,
      measurand: customValues.measurand || defaultValues.measurand,
      representation: customValues.representation || defaultValues.representation,
      calculation: customValues.calculation || defaultValues.calculation,
      time: customValues.time || defaultValues.time,
    };
  }

  /**
   * Filters annotation by the domain instances and returns the filtered annotations for each instance.
   * @param annotations all annotations inside the qanary knowledge graph
   * @returns filtered annottions for each domain instance
   */
  private static filterAnnotations(annotations: Array<IQanaryAnnotation>): IFilteredAnnotations {
    const stationAnnotation: Array<IQanaryAnnotation> = annotations.filter((annotation) =>
      this.filterAnnotationsByAnnotationType(annotation, Domain.Station),
    );

    const measurandAnnotation: Array<IQanaryAnnotation> = annotations.filter((annotation) =>
      this.filterAnnotationsByAnnotationType(annotation, Domain.Measurand),
    );

    const representationAnnotation: Array<IQanaryAnnotation> = annotations.filter((annotation) =>
      this.filterAnnotationsByAnnotationType(annotation, Domain.Representation),
    );

    const calculationAnnotation: Array<IQanaryAnnotation> = annotations.filter((annotation) =>
      this.filterAnnotationsByAnnotationType(annotation, Domain.Calculation),
    );

    const timeAnnotation: Array<IQanaryAnnotation> = annotations.filter((annotation) =>
      this.filterAnnotationsByAnnotationType(annotation, Domain.Time),
    );

    return {
      stationAnnotation,
      measurandAnnotation,
      representationAnnotation,
      calculationAnnotation,
      timeAnnotation,
    };
  }

  /**
   * Checks whether the given annotation is of annotation type.
   * @param annotation the annotation to check
   * @param annotationType the type to match
   * @returns true if annotation is of annotation type, false otherwise
   */
  private static filterAnnotationsByAnnotationType(annotation: IQanaryAnnotation, annotationType: string): boolean {
    return annotation.annotatedBy.includes(annotationType);
  }
}