import { assertSchema } from '@cypress/schema-tools'
import { api } from '../schemas'

describe('Weather Forecast GET Response', () => {
  it('should return a 200 status code', () => {
    cy.request('/WeatherForecast').its('status').should('equal', 200);
  });

  it('should conform to schema', () => {
    cy.request('/WeatherForecast').then((forecastResponse) => {
        forecastResponse.body.forEach(api.assertSchema('GetWeatherForecastRequest', '1.0.0'));
      });
  });

  it('should return five days worth of forecast data', () => {
    cy.request('/WeatherForecast').then((forecastResponse) => {
      expect(forecastResponse.body.length).to.equal(5);
    });
  });

  it('should return valid dates', () => {
    cy.request('/WeatherForecast').then((forecastResponse) => {
      getNextFiveDates().forEach((expectedDate, index) => {
        expect(forecastResponse.body[index].date).to.equal(expectedDate);
      });
    });
  });

  it('should return matching Celcius and Fahrenheit temperatures', () => {
    cy.request('/WeatherForecast').then((forecastResponse) => {
      forecastResponse.body.forEach((forecast) => {
        expect(forecast.temperatureC).to.equal(Math.round((5/9) * (forecast.temperatureF - 32)));
      });
    });
  });
});

function getNextFiveDates() {
  let dates = [];
  let day = new Date();
  for (let i = 1; i < 6; i++) {
    day.setDate(day.getDate()+1);
    dates.push(formatDateUTC(day));
  }
  return dates;
}

function formatDateUTC(date) {
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth()+1;
  let day = date.getUTCDate();
  let formattedDay = `${year}-${month}-${day}`;
  return formattedDay;
}