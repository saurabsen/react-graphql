import { Col, Row, Button, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PersonForm = ({
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

  const handleFinish = (e) => {
    setEditMode(false);
    if (variant === "edit") {
      dataActions.editPerson(formData.current);
      toast("Form Updated");
    } else {
      dataActions.addPerson(formData.current);
      toast("Person Added");
    }
  };

  const handleFinishFailed = () => {
    toast("Submission failed");
  };

  useEffect(() => {
    if (variant === "edit") {
      setSubmitDisabled(false);
    }
  }, [variant]);

  return (
    <Form
      name="basic"
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
        <Col xs={{ span: 6 }}>
          <Form.Item
            label="First Name"
            name="firstName"
            style={{ flexBasis: "260px" }}
            initialValue={editInfo ? editInfo.firstName : ""}
            rules={[
              {
                required: true,
                message: "Please enter your firstname",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 6, offset: 1 }}>
          <Form.Item
            label="Last Name"
            name="lastName"
            initialValue={editInfo ? editInfo.lastName : ""}
            style={{ flexBasis: "260px" }}
            rules={[
              {
                required: true,
                message: "Please enter your lastname",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={{ span: 4 }}>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={submitDisabled}>
              {variant === "edit" ? "Save" : "Add Person"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PersonForm;
