# Qanary Component PM

This is a Qanary component for checking via a regular expression if a given question contains specific lubw domain instances. The component receives the question via the knowledge graph. It also receives the domain knowledge via the knowledge graph, which get seeded when asking the question.

## Usage

The component should be started as an service in a docker container.

The following environment variables can be set:

| Environment Variable                               | Description                                              |
| -------------------------------------------------- | -------------------------------------------------------- |
| SPRING_BOOT_ADMIN_URL                              | the url to register the component to the qanary pipeline |
| SPRING_BOOT_ADMIN_CLIENT_INSTANCE_SERVICE_BASE_URL | the url to reach the component                           |
| QANARY_ORIGIN                                      | the origin of the qanary pipeline to query questions     |
| LUBW_DOMAIN                                        | the lubw domain to check for                             |

The following domains are applicable:
| Domain | Description |
| --- |--- |
| station| the lubw domain representing measuring stations |
| measurand| the lubw domain representing measurements |
| calculation| the lubw domain representing calculations types (e.g. avg, max, min) |
| representation| the lubw domain representing representations types (e.g text, chart) |

Example:

```bash
  qanary-component-calculation-pm:
    container_name: qanary-component-calculation-pm
    networks:
      - rasa-network
    ports:
      - "40500:40500"
    restart: always
    build:
      context: .
      dockerfile: ./apps/qanary-component-pm/Dockerfile
    environment:
      - SPRING_BOOT_ADMIN_URL=http://user:password@qanary-pipeline:40111
      - SPRING_BOOT_ADMIN_CLIENT_INSTANCE_SERVICE_BASE_URL=http://qanary-component-calculation-pm:40500
      - QANARY_ORIGIN=http://qanary-pipeline:40111
      - LUBW_DOMAIN=representation
    volumes:
      - ./apps/qanary-component-pm:/app/apps/qanary-component-pm
      - /app/apps/qanary-component-pm/node_modules
      - /app/node_modules
```

## Functionality

The component fetches every rdf triple of the a `<urn:domain>` class, maps it to an internal representation and checks if the question contains an domain isntance. If so, it adds the domain instance as an annotation to the knowledge graph.

Note that all matches are added to the knowledge graph. This means that if the question contains multiple domain instances, all of them will be added to the knowledge graph.

Additionally the component logs found domain instances to the console.

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
