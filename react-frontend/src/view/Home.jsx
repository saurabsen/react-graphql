import React from "react";
import { Divider, Typography } from "antd";
import PersonForm from "../components/forms/PersonForm";
import CarForm from "../components/forms/CarForm";
import PersonCard from "../components/cards/PersonCard";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [cars, people, dataActions] = useOutletContext();

  const filterCars = (personId) => {
    const car = cars.filter((car) => car.personId === personId);
    return car;
  };

  return (
    <>
      <Typography.Title level={3}>PEOPLE AND THEIR CARS</Typography.Title>
      <Divider>Add Person</Divider>
      <PersonForm dataActions={dataActions} variant="add" />
      {people.length !== 0 ? (
        <>
          <Divider>Add Car</Divider>
          <CarForm people={people} dataActions={dataActions} variant="add" />
        </>
      ) : (
        <></>
      )}
      <Divider>Records</Divider>
      {people.map((person) => (
        <PersonCard
          person={person}
          personCars={filterCars(person.id)}
          dataActions={dataActions}
          people={people}
          key={person.id}
        />
      ))}
      {people.length === 0 ? (
        <Typography>
          Nothing to display. Please add a person to start.
        </Typography>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
