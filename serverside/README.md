# org.openapitools.server - Kotlin Server library for Swagger Petstore

No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

Generated by OpenAPI Generator 5.0.0-SNAPSHOT.

## Requires

* Kotlin 1.3.21
* Gradle 4.9

## Build

First, create the gradle wrapper script:

```
gradle wrapper
```

Then, run:

```
./gradlew check assemble
```

This runs all tests and packages the library.

## Running

The server builds as a fat jar with a main entrypoint. To start the service, run `java -jar ./build/libs/kotlin-server.jar`.

You may also run in docker:

```
docker build -t kotlin-server .
docker run -p 8080:8080 kotlin-server
```

## Features/Implementation Notes

* Supports JSON inputs/outputs, File inputs, and Form inputs (see ktor documentation for more info).
* ~Supports collection formats for query parameters: csv, tsv, ssv, pipes.~
* Some Kotlin and Java types are fully qualified to avoid conflicts with types defined in OpenAPI definitions.

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://petstore.swagger.io/v1*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*PetsApi* | [**showPersonById**](docs/PetsApi.md#showpersonbyid) | **GET** /persons/{personId} | 飼い主の情報
*PetsApi* | [**showPetById**](docs/PetsApi.md#showpetbyid) | **GET** /pets/{petId} | Info for a specific pet


<a name="documentation-for-models"></a>
## Documentation for Models

 - [org.openapitools.server.models.InlineResponse200](docs/InlineResponse200.md)
 - [org.openapitools.server.models.Pet](docs/Pet.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

All endpoints do not require authorization.
