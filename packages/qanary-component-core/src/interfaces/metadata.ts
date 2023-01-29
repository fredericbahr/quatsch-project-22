/** the metadata of the component/service send to the Spring Boot Admin UI */
export interface IQanaryComponentCoreMetadata {
  /** the start time of the component as a formatted date string */
  start: string;
  /** a description of the component */
  description: string;
  /** the url to the `about`-endpoint */
  about: string;
  /** the language the component is written in, @default TypeScript */
  "written in": "TypeScript";
}
