import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_CAR,
  ADD_PERSON,
  DELETE_CAR,
  DELETE_PERSON,
  GET_CARS,
  GET_PEOPLE,
  UPDATE_CAR,
  UPDATE_CAR_FRAGMENT,
  UPDATE_PERSON,
  UPDATE_PERSON_FRAGMENT,
} from "./queries";

const App = () => {
  const [people, setPeople] = useState([]);
  const [carsArray, setCars] = useState([]);

  const { loading: peopleLoading, data: peopleData } = useQuery(GET_PEOPLE);
  const {
    loading: carsLoading,
    data: carsData,
    refetch: carsRefetch,
  } = useQuery(GET_CARS);

  useEffect(() => {
    if (peopleData && !peopleLoading) {
      setPeople(peopleData.people);
    }
    if (carsData && !carsLoading) {
      setCars(carsData.cars);
    }
  }, [peopleLoading, peopleData, carsLoading, carsData]);

  const [addPerson] = useMutation(ADD_PERSON);
  const [deletePerson] = useMutation(DELETE_PERSON);
  const [addCar] = useMutation(ADD_CAR);
  const [deleteCar] = useMutation(DELETE_CAR);
  const [updatePerson] = useMutation(UPDATE_PERSON);
  const [updateCar] = useMutation(UPDATE_CAR);

  const dataActions = {
    addPerson: (person) => {
      addPerson({
        variables: {
          firstName: person.firstName,
          lastName: person.lastName,
          addPersonId: person.id,
        },
        update: (cache, { data: { addPerson } }) => {
          const data = cache.readQuery({ query: GET_PEOPLE });
          cache.writeQuery({
            query: GET_PEOPLE,
            data: {
              ...data,
              people: [...data.people, addPerson],
            },
          });
        },
      });
    },
    addCar: (car) => {
      addCar({
        variables: {
          year: car.year,
          company: car.company,
          model: car.model,
          price: car.price,
          personId: car.personId,
        },
        update: (cache, { data: { addCar } }) => {
          const data = cache.readQuery({ query: GET_CARS });
          cache.writeQuery({
            query: GET_CARS,
            data: {
              ...data,
              cars: [...data.cars, addCar],
            },
          });
        },
      });
    },
    editPerson: (person) => {
      updatePerson({
        variables: {
          updatePersonId: person.id,
          firstName: person.firstName,
          lastName: person.lastName,
        },
        update: (cache, { data: { updatePerson } }) => {
          cache.updateFragment(
            {
              id: person.id,
              fragment: UPDATE_PERSON_FRAGMENT,
            },
            (data) => ({
              ...data,
              firstName: updatePerson.firstName,
              lastName: updatePerson.lastName,
            })
          );
        },
      });
    },
    editCar: (car) => {
      updateCar({
        variables: {
          updateCarId: car.id,
          personId: car.personId,
          year: car.year,
          company: car.company,
          model: car.model,
          price: car.price,
        },
        update: (cache, { data: updateCar }) => {
          cache.updateFragment(
            {
              id: car.id,
              fragment: UPDATE_CAR_FRAGMENT,
            },
            (data) => ({
              ...data,
              personId: updateCar.personId,
              year: updateCar.year,
              company: updateCar.company,
              model: updateCar.model,
              price: updateCar.price,
            })
          );
        },
      });
    },
    deletePerson: (person) => {
      deletePerson({
        variables: { deletePersonId: person.id },
        update: (cache, { data: { deletePerson } }) => {
          const { people } = cache.readQuery({ query: GET_PEOPLE });
          cache.writeQuery({
            query: GET_PEOPLE,
            data: {
              people: people.filter((p) => p.id !== deletePerson.id),
            },
          });
        },
      });
      const carsDeleted = carsArray.filter((car) => car.personId === person.id);
      carsDeleted.forEach((car) => dataActions.deleteCar(car));
    },
    deleteCar: (car) => {
      deleteCar({
        variables: { deleteCarId: car.id },
        update: (cache, { data: deleteCar }) => {
          const { cars } = cache.readQuery({ query: GET_CARS });
          cache.writeQuery({
            query: GET_CARS,
            data: {
              cars: cars.filter((c) => c.id !== deleteCar.id),
            },
          });
          carsRefetch();
        },
      });
    },
  };

  return (
    <div className="App">
      <Outlet context={[carsArray, people, dataActions]} />
    </div>
  );
};

export default App;
