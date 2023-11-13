import { ObjectSchema, versionSchemas } from '@cypress/schema-tools'


type GetForecastExample = {
    date: string
    temperatureC: number
    temperatureF: number
    summary: string
}

const getForecastExample: GetForecastExample = {
    date: '2023-11-10',
    temperatureC: 0,
    temperatureF: 0,
    summary: 'string'
}

const GetForecastRequest: ObjectSchema = {
    version: {
        major: 1,
        minor: 0,
        patch: 0,
    },
    schema: {
        title: 'GetWeatherForecastRequest',
        type: 'object',
        description: 'Weather data for a particular date',
        properties: {
            date: { 
                type: 'string',
                description: 'The date for the weather forecast',
            },
            temperatureC: {
                type: 'number',
                description: 'The temperature in Celcius',
            },
            temperatureF: {
                type: 'number',
                description: 'The temperature in Fahrenheit',
            },
            summary: {
                type: 'string',
                description: 'A text summary of the weather conditions'
            },
        },
        required: true,
        additionalProperties: false,
    },
    example: getForecastExample,
}

export const GetWeatherForecastRequest = versionSchemas(GetForecastRequest);