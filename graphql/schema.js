const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Forecast {
        city: String!
        country: String!
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
        _id: ID!
        name: String!
        type: String!
        temp: String!
        like: Int!
        unlike: Int!
        level: [Int]
    }

    type CityId {
        name: String!
        country: String!
        coord: Coord!
    }

    type Coord {
        lon: Float!
        lat: Float!
    }

    input ClothesInputData {
        name: String!
        type: String!
        temp: String!
        level: Int!
    }

    

    type RootQuery {
        getWeather(latitude: String!, longitude: String!): Forecast!
        getClothes(temp: Float!, city: String!, time: String!): ClotheType
        getCityId(city: String): [CityId]!
    }

    type RootMutation{
        putClothes(inputData: ClothesInputData): Clothe!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
