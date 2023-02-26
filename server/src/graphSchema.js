import { gql } from "apollo-server-express";
import { find, remove, filter } from "lodash";
import { people, carsArray } from "./peopleCarsScheme";

const typeDefs = gql`
  type Person {
    id: String!
    firstName: String
    lastName: String
  }

  type Car {
    id: String!
    personId: String!
    year: String
    company: String
    model: String
    price: Float
  }

  type Query {
    people: [Person]
    person(id: String!): Person
    cars: [Car]
    car(id: String!): Car
    personWithCars(personId: String!): [Car]
  }

  type Mutation {
    addPerson(firstName: String!, lastName: String, id: String): Person
    updatePerson(id: String!, firstName: String!, lastName: String): Person
    deletePerson(id: String!): Person
    addCar(
      personId: String!
      year: String!
      company: String!
      model: String!
      price: Float!
      id: String
    ): Car
    updateCar(
      id: String!
      personId: String!
      year: String!
      company: String!
      model: String!
      price: Float!
    ): Car
    deleteCar(id: String!): Car
  }
`;

const resolvers = {
  Query: {
    people: () => people,
    person: (root, args) => {
      return find(people, { id: args.id });
    },
    cars: () => carsArray,
    car: (root, args) => {
      return find(carsArray, { id: args.id });
    },
    personWithCars: (root, args) => {
      return filter(carsArray, { personId: args.personId });
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id || `${Date.now()}`,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (root, args) => {
      const person = find(people, { id: args.id });
      if (!person) throw new Error(`Couldn't find person with id: ${args.id}`);

      person.firstName = args.firstName || person.firstName;
      person.lastName = args.lastName || person.lastName;

      return person;
    },
    deletePerson: (root, args) => {
      const deletedPerson = find(people, { id: args.id });
      if (!deletedPerson)
        throw new Error(`Couldn't find person with id: ${args.id}`);

      remove(people, (person) => {
        return person.id === deletedPerson.id;
      });
      return deletedPerson;
    },
    addCar: (root, args) => {
      const newCar = {
        id: args.id || `${Date.now()}`,
        personId: args.personId,
        year: args.year,
        company: args.company,
        model: args.model,
        price: args.price,
      };
      carsArray.push(newCar);
      return newCar;
    },
    updateCar: (root, args) => {
      const car = find(carsArray, { id: args.id });
      if (!car) throw new Error(`Couldn't find car with id: ${args.id}`);

      car.personId = args.personId || car.personId;
      car.year = args.year || car.year;
      car.company = args.company || car.company;
      car.model = args.model || car.model;
      car.price = args.price || car.price;

      return car;
    },
    deleteCar: (root, args) => {
      const car = find(carsArray, { id: args.id });
      if (!car) throw new Error(`Couldn't find car with id: ${args.id}`);

      remove(carsArray, (elem) => {
        return elem.id === car.id;
      });

      return car;
    },
  },
};

export { typeDefs, resolvers };
