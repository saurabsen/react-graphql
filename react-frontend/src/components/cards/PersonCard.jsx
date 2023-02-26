import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import Typography from "antd/es/typography/Typography";
import PersonForm from "../forms/PersonForm";
import { Link } from "react-router-dom";

const PersonCard = ({ person, personCars, dataActions, people }) => {
  const [editMode, setEditMode] = useState(false);
  const [isDetailPage,] = useState(window.location.pathname.includes('/person/'));
  
  const [carsOwned, setCarsOwned] = useState([])
  useEffect(()=>{
    setCarsOwned(personCars)
  }, [personCars])
  
  const handleEdit = () => {
    setEditMode(true)
  }

  const handleDelete = () => {
    dataActions.deletePerson(person)
  }


  return (
    <>
      <Card
        size="small"
        title={`${person.firstName} ${person.lastName}`}
        headStyle={{ textAlign: "left" }}
        style={{ marginBottom: "1rem" }}
        actions={
          !editMode
            ? [
                <EditOutlined onClick={handleEdit} key="edit" />,
                <DeleteOutlined onClick={handleDelete} key="delete" style={{ color: "red" }} />,
              ]
            : []
        }
      >
        {!editMode ? (
          carsOwned.map((car) => <CarCard people={people} car={car} dataActions={dataActions} key={car.id} />)
        ) : (
          <PersonForm dataActions={dataActions} variant="edit" editInfo={person} setEditMode={setEditMode} />
        )}
        {!editMode && !isDetailPage ? (
          <Link to={`person/${person.id}`}><Typography style={{ textAlign: "left", color: 'blue' }}>Learn More</Typography></Link>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
};

export default PersonCard;
