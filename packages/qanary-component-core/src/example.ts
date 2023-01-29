import { IQanaryComponentCoreRequestHandler } from "./interfaces/request-handler";
import { QanaryComponentCore } from "./qanary-component-core";

const handler: IQanaryComponentCoreRequestHandler = (req, res) => {
  res.send({
    endpoint: "",
    inGraph: "",
    outGraph: "",
  });
};

// automatically registers the component at the Spring Boot Admin server
QanaryComponentCore({ handler }).catch(console.log);
