/**
* Swagger Petstore
* No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
*
* The version of the OpenAPI document: 1.0.0
* 
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit the class manually.
*/
package org.openapitools.server

import io.ktor.locations.KtorExperimentalLocationsAPI
import io.ktor.locations.Location

object Paths {
    /**
     * 飼い主の情報
     * 
     * @param personId  
     */
    @KtorExperimentalLocationsAPI
    @Location("/persons/{personId}") class showPersonById(val personId: kotlin.String)

    /**
     * Info for a specific pet
     * 
     * @param petId The id of the pet to retrieve 
     */
    @KtorExperimentalLocationsAPI
    @Location("/pets/{petId}") class showPetById(val petId: kotlin.String)

}