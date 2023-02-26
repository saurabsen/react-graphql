import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  query People {
    people {
      id
      firstName
      lastName
    }
  }
`;

export const GET_CARS = gql`
  query Cars {
    cars {
      id
      personId
      year
      company
      model
      price
    }
  }
`;

export const GET_PERSON = gql`
  query Person($personId: String!) {
    person(id: $personId) {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson(
    $firstName: String!
    $lastName: String
    $addPersonId: String
  ) {
    addPerson(firstName: $firstName, lastName: $lastName, id: $addPersonId) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson(
    $updatePersonId: String!
    $firstName: String!
    $lastName: String
  ) {
    updatePerson(
      id: $updatePersonId
      firstName: $firstName
      lastName: $lastName
    ) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_PERSON_FRAGMENT = gql`
  fragment UpdatePersonFragment on Person {
    firstName
    lastName
  }
`;

export const DELETE_PERSON = gql`
  mutation DeletePerson($deletePersonId: String!) {
    deletePerson(id: $deletePersonId) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar(
    $updateCarId: String!
    $personId: String!
    $year: String!
    $company: String!
    $model: String!
    $price: Float!
  ) {
    updateCar(
      id: $updateCarId
      personId: $personId
      year: $year
      company: $company
      model: $model
      price: $price
    ) {
      id
      personId
      year
      company
      model
      price
    }
  }
`;

export const UPDATE_CAR_FRAGMENT = gql`
  fragment UpdateCarFragment on Car {
    personId
    year
    company
    model
    price
  }
`;

export const GET_PERSON_WITH_CARS = gql`
  query PersonWithCars($personId: String!) {
    personWithCars(personId: $personId) {
      id
      personId
      year
      company
      model
      price
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar(
    $personId: String!
    $year: String!
    $company: String!
    $model: String!
    $price: Float!
    $addCarId: String
  ) {
    addCar(
      personId: $personId
      year: $year
      company: $company
      model: $model
      price: $price
      id: $addCarId
    ) {
      id
      personId
      year
      company
      model
      price
    }
  }
`;

export const DELETE_CAR = gql`
  mutation DeletePerson($deleteCarId: String!) {
    deleteCar(id: $deleteCarId) {
      id
    }
  }
`;
