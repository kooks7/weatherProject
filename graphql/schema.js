const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Forecast {
        city: String!
        gu: String!
        weathers: [Weather!]
    }

    type Weather {
        id: String!
        time: String!
        temp: Int!
        feels_like: Int!
        condition: String!
        humidity: Int!
        wind_speed: Float!
        temp_min: Int!
        temp_max: Int!
        rain: String!

    }
    type ClotheType{
        outer: [Clothe]
        top: [Clothe]
        bottom: [Clothe]
        acc: [Clothe]
        shoes: [Clothe]
        casual_shoes: [Clothe]
    }

    type Clothe {
        name: String!
        type: String!
        temp: String!
        level: [Int]
    }

    type CityId {
        id: Int!
        name: String!
        state: String!
        country: String!
        coord: Coord!
    }

    type Coord {
        lon: String!
        lat: String!
    }

    input ClothesInputData {
        name: String!
        type: String!
        temp: String!
        level: Int!
    }


    type RootQuery {
        getWeather(latitude: String!, longitude: String!): Forecast!
        getClothes(temp: Float!): ClotheType
        getCityId(city: String): [CityId]
    }

    type RootMutation{
        putClothes(inputData: ClothesInputData): Clothe!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
