import React from "react";
import { downloadCSV } from '../utils/convertCSV';
import { skills } from "../utils/skills";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from 'primereact/multiselect';
import { Form, Button } from "@themesberg/react-bootstrap";

const defaultValues = {
    enrollmentFrom: "",
    enrollmentTo: "",
    skills: []
}

const Filter = ({ data, getData }) => {

    const {
        control,
        reset,
        setValue,
        handleSubmit,
    } = useForm({
        defaultValues: { ...defaultValues }
    })

    const exportCSV = () => downloadCSV(data)

    const clearFilter = () => {
        reset({ ...defaultValues })
    }

    const onSubmit = async (data, e) => {
        const filterData = {
            ...data,
            enrollmentFrom: data.enrollmentFrom.length ? data.enrollmentFrom : null,
            enrollmentTo: data.enrollmentTo.length ? data.enrollmentTo : null
        }
        try {
            getData(filterData)
        } catch (e) { console.log(e) }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="filter_form">
            <div className="d-flex flex-wrap gap-2 align-items-end mb-3">
                <div>
                    <Form.Label className='form-label'>
                        Enrollment From*
                    </Form.Label>
                    <Controller
                        id="enrollmentFrom"
                        name="enrollmentFrom"
                        control={control}
                        render={({ field }) => (
                            <Form.Control
                                type="date"
                                {...field}
                            />
                        )}
                    />
                </div>
                <div>
                    <Form.Label className='form-label'>
                        Enrollment To*
                    </Form.Label>
                    <Controller
                        id="enrollmentTo"
                        name="enrollmentTo"
                        control={control}
                        render={({ field }) => (
                            <Form.Control
                                type="date"
                                {...field}
                            />
                        )}
                    />
                </div>
                <div>
                    <Form.Label className='form-label'>
                        Skills
                    </Form.Label>
                    <br />
                    <Controller
                        id="skills"
                        name="skills"
                        control={control}
                        render={({ field: { value } }) => (
                            <MultiSelect
                                value={value}
                                options={skills}
                                onChange={(e) => setValue('skills', e.value)}
                                optionLabel="name"
                                style={{ width: "100%", border: '1px solid #d1d7e0' }}
                                display="chip"
                            />
                        )}
                    />
                </div>
                <Button variant="success" type="submit">Filter</Button>
                <Button variant="danger" onClick={clearFilter}>Clear</Button>
                <Button variant="info" onClick={exportCSV}>Export Excel</Button>
                <Button variant="primary" className="ms-auto">Total : {data?.length}</Button>
            </div>
        </form >
    )
}

export default Filter;