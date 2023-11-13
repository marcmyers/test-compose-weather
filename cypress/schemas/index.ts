import { SchemaCollection, bind, combineSchemas } from '@cypress/schema-tools'
import { GetWeatherForecastRequest } from './get-weather-forecast-request'
export const schemas: SchemaCollection = combineSchemas(GetWeatherForecastRequest)

export const api = bind({ schemas })