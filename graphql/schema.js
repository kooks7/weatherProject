const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Forecast {
        city: String!
        gu: String!
        weathers: [Weather!]
    }

    type Weather {
        time: String!
        temp: Int!
        feels_like: Int!
        condition: String!
    }

    input UserInputData {
        latitude: String!
        longitude: String!
    }


    type RootQuery {
        getWeather(latitude: String!, longitude: String!): Forecast!
    }

    schema {
        query: RootQuery
    }
`);
