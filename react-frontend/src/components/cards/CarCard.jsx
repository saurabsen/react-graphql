import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import CarForm from "../forms/CarForm";

const CarCard = ({ people, car, dataActions }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    dataActions.deleteCar(car);
  };

  const localeStringOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  const formattedPrice = parseFloat(car.price).toLocaleString(
    "en-US",
    localeStringOptions
  );

  return (
    <Card
      size="small"
      type="inner"
      title={`${car.year} ${car.company} ${car.model} -> $ ${formattedPrice}`}
      headStyle={{ textAlign: "left" }}
      style={{ marginBottom: "1rem" }}
      actions={
        !editMode
          ? [
              <EditOutlined onClick={handleEdit} key="edit" />,
              <DeleteOutlined
                onClick={handleDelete}
                key="delete"
                style={{ color: "red" }}
              />,
            ]
          : []
      }
    >
      {!editMode ? (
        <></>
      ) : (
        <CarForm
          people={people}
          dataActions={dataActions}
          editInfo={car}
          variant="edit"
          setEditMode={setEditMode}
        />
      )}
    </Card>
  );
};

export default CarCard;
