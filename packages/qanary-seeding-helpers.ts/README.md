# Qanary Seeding Helpers

This package contains helper functions to seed a Qanary triplestore with data when sending a POST request to start a Qanary pipeline.

## Usage

```typescript
import {generateAdditionalTriples} from "qanary-seeding-helpers";
import {stations, measurands, calculations, representations} from "qanary-lubw-data


const additionalTriples = generateAdditionalTriple({
    stations,
    measurands,
    calculations,
    representations
});


fetch("http://qanary-pipeline:8080/qanary", {
    method: "POST",
    body: new URLSearchParams({
        "question": "What is the water level of the river Main?",
        "componentlist": ["my-components"],
        "additionalTriples": additionalTriples
    })
});
```

## API

### generateAdditionalTriples

Generates additional triples for a Qanary pipeline with all the stations, measurands, calculations and representations encoded as rdf triples.
The domains describe the above mentioned entities. Those are represented as rdf classes.

| Property        | Type             | Description                                          |
| --------------- | ---------------- | ---------------------------------------------------- |
| domains         | Domain[]         | An array of domains to generate classes for.         |
| stations        | Station[]        | An array of stations to generate triples for.        |
| measurands      | Measurand[]      | An array of measurands to generate triples for.      |
| calculations    | Calculation[]    | An array of calculations to generate triples for.    |
| representations | Representation[] | An array of representations to generate triples for. |

### getPrefixes

Gets the prefixes for the rdf additioanl triples query.

### getClassDefinitions

Gets the class definitions for the rdf additioanl triples by defining the domains as rdf classes.

### getStationTriples

Gets the stations encoded as rdf triples

| Property | Type      | Description                                   |
| -------- | --------- | --------------------------------------------- |
| stations | Station[] | An array of stations to generate triples for. |

### getMeasurandTriples

Gets the measurands encoded as rdf triples

| Property   | Type        | Description                                     |
| ---------- | ----------- | ----------------------------------------------- |
| measurands | Measurand[] | An array of measurands to generate triples for. |

### getCalculationTriples

Gets the calculations encoded as rdf triples

| Property     | Type          | Description                                       |
| ------------ | ------------- | ------------------------------------------------- |
| calculations | Calculation[] | An array of calculations to generate triples for. |

### getRepresentationTriples

Gets the representations encoded as rdf triples

| Property        | Type             | Description                                          |
| --------------- | ---------------- | ---------------------------------------------------- |
| representations | Representation[] | An array of representations to generate triples for. |