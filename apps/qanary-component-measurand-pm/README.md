# Qanary Component Measurand PM

This is a Qanary component for checking via a regular expression if a given question contains a measurand. The component receives the question via the knowledge graph. It also receives the known measurands via the knowledge graph, which get seeded when asking the question.

## Usage

The component should be started as an service in a docker container.

The following environment variables can be set:
|Environment Variable| Description|
|---|---|
|SPRING_BOOT_ADMIN_URL| the url to register the component to the qanary pipeline|
|SPRING_BOOT_ADMIN_CLIENT_INSTANCE_SERVICE_BASE_URL|the url to reach the component|
|QANARY_ORIGIN|the origin of the qanary pipeline to query questions|

Example:

```bash
  qanary-component-measurand-pm:
    container_name: qanary-component-measurand-pm
    networks:
      - rasa-network
    ports:
      - "40500:40500"
    restart: always
    build:
      context: .
      dockerfile: ./apps/qanary-component-measurand-pm/Dockerfile
    environment:
      - SPRING_BOOT_ADMIN_URL=http://user:password@qanary-pipeline:40111
      - SPRING_BOOT_ADMIN_CLIENT_INSTANCE_SERVICE_BASE_URL=http://qanary-component-measurand-pm:40500
      - QANARY_ORIGIN=http://qanary-pipeline:40111
    volumes:
      - ./apps/qanary-component-measurand-pm:/app/apps/qanary-component-measurand-pm
      - /app/apps/qanary-component-measurand-pm/node_modules
      - /app/node_modules
```

## Functionality

The component fetches every rdf triple with is a `<urn:measurand>`, maps it to an internal representation and checks if the question contains measurands. If so, it adds the measurand to the knowledge graph.

Note that all matches are added to the knowledge graph. This means that if the question contains multiple measurands, all of them will be added to the knowledge graph.

Additionally the component logs found measurands to the console.

No error handling is implemented as this component simply does not add annotations to the knowledge graph if errors occur.

## Annotation

The component adds the following annotation to the knowledge graph:

```turtle
?annotation a qa:AnnotationAnswer .
?annotation oa:hasTarget [
    a oa:SpecificResource ;
    oa:hasSource <${question-uri}> ;
    oa:hasSelector [
        a oa:TextPositionSelector ;
        oa:start "${range-start}"^^xsd:nonNegativeInteger ;
        oa:end "${range-end}"^^xsd:nonNegativeInteger
    ]
] ;
    oa:bodyValue "${annotation.value}" ;
    oa:score "${annotation-confidence}"^^xsd:double ;
    oa:annotatedBy <urn:qanary:${component-name}> ;
    oa:annotatedAt ?time .
}
```
