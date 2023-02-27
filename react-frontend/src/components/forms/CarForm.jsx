import { Col, Row, Button, Form, Input, InputNumber, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarForm = ({
  people,
  dataActions,
  editInfo = {},
  setEditMode = () => {},
  variant,
}) => {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const formData = useRef({ ...editInfo });

  const handleChange = (changedValues, allValues) => {
    formData.current = { ...formData.current, ...allValues };

    let countEntries = 0;
    Object.values(allValues).forEach((value) => {
      if (value) {
        countEntries += 1;
      }
    });
    if (countEntries === Object.keys(allValues).length) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };

  const handleFinish = () => {
    setEditMode(false);
    if (variant === "edit") {
      dataActions.editCar(formData.current);
      toast("Form Updated");
    } else {
      dataActions.addCar(formData.current);
      toast("Car Details added");
    }
  };

  const handleFinishFailed = () => {
    toast("Form submission failed");
  };

  const peopleOptions = [];
  people.forEach((person) => {
    const personObj = {
      value: person.id,
      label: `${person.firstName} ${person.lastName}`,
    };
    peopleOptions.push(personObj);
  });

  useEffect(() => {
    if (variant === "edit") {
      setSubmitDisabled(false);
    }
  }, [variant]);

  return (
    <Form
      name="basic"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "center",
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      onValuesChange={handleChange}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Row justify="center">
        <Col xs={{ span: 4 }}>
          <Form.Item
            label="Year"
            name="year"
            initialValue={editInfo ? editInfo.year : ""}
            style={{ flexBasis: "120px" }}
            rules={[
              {
                required: true,
                message: "Please input model year",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 4 }}>
          <Form.Item
            label="Make"
            name="Make"
            initialValue={editInfo ? editInfo.company : ""}
            style={{ flexBasis: "180px" }}
            rules={[
              {
                required: true,
                message: "Please input car company details",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 4 }}>
          <Form.Item
            label="Model"
            name="model"
            initialValue={editInfo ? editInfo.model : ""}
            style={{ flexBasis: "180px" }}
            rules={[
              {
                required: true,
                message: "Please input car model",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 4 }}>
          <Form.Item
            label="Price"
            name="price"
            initialValue={editInfo ? editInfo.price : ""}
            style={{ flexBasis: "150px" }}
            rules={[
              {
                required: true,
                message: "Please input car price",
              },
            ]}
          >
            <InputNumber prefix="$" controls={false} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 4 }}>
          <Form.Item
            label="Person"
            name="personId"
            initialValue={editInfo ? editInfo.personId : ""}
            style={{ flexBasis: "200px" }}
            rules={[
              {
                required: true,
                message: "Please input car owner",
              },
            ]}
          >
            <Select options={peopleOptions} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 4 }}>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={submitDisabled}>
              {variant === "edit" ? "Save" : "Add Car"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CarForm;
