/** the qanary message that is received/send by the component's handler */
export interface IQanaryMessage {
  /** the sparql endpoint as uri */
  endpoint: string;
  /** the graph uri of the sparql graph that contains information for the incoming request  */
  inGraph: string;
  /** the graph uri of the sparql graph that contains information for the outgoing response */
  outGraph: string;
}
