import React, { useState, useEffect } from "react";
import { Button, Collapse } from "@themesberg/react-bootstrap";
import axios from 'axios';
import Form from "./form";
import Table from './table';

const Dashboard = () => {

  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);

  const [subjects, setSubjects] = useState([]);

  const [edit, setEdit] = useState(null);

  const getData = async (filter = {}) => {
    let response;
    if (Object.keys(filter).length) {
      response = await axios.post("/api/candidate/list", filter);
    } else {
      response = await axios.get("/api/candidate/list");
    }
    if (response?.data?.status === "success") {
      setData(response.data.candidates);
    }
  }

  const getSubject = async () => {
    const response = await axios.get("/api/subject/list");
    if (response?.data?.status === "success") {
      setSubjects(response.data.subjects);
    }
  }
  useEffect(() => {
    getData();
    getSubject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-2 mb-3">
        <div>STUDENT CRUD</div>
        <Button variant="primary" size="sm" className="px-4 py-2 mb-4" onClick={() => setOpen(!open)}>
          + {open ? "Less" : "Add"}
        </Button>
      </div>
      <Collapse in={open} >
        <div id="collapse" className="p-3" >
          <Form
            getData={getData}
            subjects={subjects}
            setOpen={setOpen}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
      </Collapse>
      <div>
        <Table
          getData={getData}
          data={data}
          setEdit={setEdit}
        />
      </div>
    </>
  )
}

export default Dashboard