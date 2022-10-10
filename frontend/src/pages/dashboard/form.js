import React, { useEffect } from "react";
import * as yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { skills } from "../../utils/skills";
import { formatDate, calculate_age } from '../../utils/formatTime';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { MultiSelect } from 'primereact/multiselect';
import { Row, Col, Form, Button } from '@themesberg/react-bootstrap';

const defaultValues = {
    firstName: "",
    lastName: "",
    dob: "",
    age: "",
    standard: "",
    city: "",
    skills: "",
    description: "",
    enrollmentFrom: "",
    enrollmentTo: "",
    status: false,
    isActive: false
}

const ERROR_MESSAGE = "This field is required";

const StudentForm = ({ getData, setOpen, edit, setEdit, subjects }) => {

    const validateSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        dob: yup.date().required(),
        age: yup.number().required(),
        standard: yup.number().required(),
        city: yup.string().required(),
        description: yup.string().required(),
        enrollmentFrom: yup.date().required(),
        enrollmentTo: yup.date().required(),
        status: yup.bool().required(),
        isActive: yup.bool().required()
    })

    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: { ...defaultValues },
        resolver: yupResolver(validateSchema)
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "subjects"
    })

    useEffect(() => {
        if (edit) {
            setOpen(true);
            reset({
                ...defaultValues,
                firstName: edit?.firstName,
                lastName: edit?.lastName,
                dob: formatDate(edit?.dob),
                age: edit?.age,
                standard: edit?.standard,
                city: edit?.city,
                skills: edit?.skills,
                description: edit?.description,
                enrollmentFrom: formatDate(edit?.enrollmentFrom),
                enrollmentTo: formatDate(edit?.enrollmentTo),
                status: edit?.status,
                isActive: edit?.isActive,
                subjects: edit?.subjects
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit])

    const onSubmit = async (data, e) => {
        try {
            let response;
            if (edit) {
                response = await axios.put("/api/candidate", { id: edit?._id, ...data });
            } else {
                response = await axios.post("/api/candidate", data);
            }
            if (response?.data?.status === 'success') {
                toast.success(`Student ${edit ? 'updated' : 'created'} successfully`);
                getData();
                setEdit(null);
                reset({ ...defaultValues });
                setValue('subjects', []);
                setOpen(false);
            }
        } catch (e) { console.log(e) }
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)} id="student_form">
                <div className="bg-white p-4 border border-rounded">
                    <Row>
                        <Col sm='12' md="3" className='mb-4'>
                            <Form.Label className='form-label'>
                                First Name*
                            </Form.Label>
                            <Controller
                                id="firstName"
                                name="firstName"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        maxLength={100}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.firstName ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>
                        <Col sm='12' md="3" className='mb-4'>
                            <Form.Label className='form-label'>
                                Lase Name*
                            </Form.Label>
                            <Controller
                                id="lastName"
                                name="lastName"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        maxLength={100}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.lastName ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>
                        <Col sm='12' md="3" className='mb-4'>
                            <Form.Label className='form-label'>
                                Date of Birth*
                            </Form.Label>
                            <Controller
                                id="dob"
                                name="dob"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Form.Control
                                        type="date"
                                        onChange={e => {
                                            onChange(e);
                                            setValue('age', calculate_age(new Date(e.target.value)))
                                        }}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.dob ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>
                        <Col sm='12' md="3" className='mb-4'>
                            <Form.Label className='form-label'>
                                Age*
                            </Form.Label>
                            <Controller
                                id="age"
                                name="age"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="number"
                                        maxLength={100}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.age ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>
                        <Col sm='12' md="3" className='mb-4'>
                            <Form.Label className='form-label'>
                                Standard*
                            </Form.Label>
                            <Controller
                                id="standard"
                                name="standard"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="number"
                                        maxLength={100}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.standard ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>
                        <Col sm='12' md="3" className='mb-4'>
                            <Form.Label className='form-label'>
                                city*
                            </Form.Label>
                            <Controller
                                id="city"
                                name="city"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        maxLength={100}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.city ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>

                        <Col sm='12' md="3" className='mb-4'>
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
                            {errors.enrollmentFrom ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>
                        <Col sm='12' md="3" className='mb-4'>
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
                            {errors.enrollmentTo ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>
                        <Col sm='12' md="9" className='mb-4'>
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
                            {errors.skills ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>
                        <Col sm='12' md="10" className='mb-4'>
                            <Form.Label className='form-label'>
                                Brief Introduction*
                            </Form.Label>
                            <Controller
                                id="description"
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        as="textarea"
                                        rows={6}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.description ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>
                        <Col sm='12' md="3" className='mb-4'>
                            <Form.Label className='form-label'>
                                Status*
                            </Form.Label>
                            <Controller
                                id="status"
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Form.Select
                                        {...field}
                                    >
                                        <option>Select</option>
                                        <option value={true}>Live</option>
                                        <option value={false}>Suspended</option>
                                    </Form.Select>
                                )}
                            />
                            {errors.status ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>
                        <Col sm='12' md="3" className='mb-4'>
                            <Form.Label className='form-label'>
                                Is Active*
                            </Form.Label>
                            <Controller
                                id="isActive"
                                name="isActive"
                                control={control}
                                render={({ field }) => (
                                    <Form.Check
                                        className="mt-3"
                                        type="switch"
                                        checked={field.value}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.isActive ? <small>{ERROR_MESSAGE}</small> : null}
                        </Col>
                    </Row>
                </div>
                <h5 className="mt-3 mb-2">Subject</h5>
                <div className="bg-white p-4 border border-rounded">
                    {fields.map((item, index) => (
                        <Row key={index}>
                            <Col sm='12' md="2" className='mb-3 d-flex justify-content-center align-items-center'>
                                {`${index + 1}`}
                            </Col>
                            <Col sm='12' md="6" className='mb-4'>
                                <Controller
                                    name={`subjects.${index}.name`}
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Select
                                            {...field}
                                        >
                                            <option value={""}>Select</option>
                                            {subjects?.map((subject, i) => <option key={i} value={subject.name}>{subject.name}</option>)}
                                        </Form.Select>
                                    )}
                                />
                                {errors?.subjects?.[index]?.name ? <small>{ERROR_MESSAGE}</small> : null}
                            </Col>
                            <Col sm='12' md="4" className='mb-4'>
                                <Button onClick={() => remove(index)} size="sm" className="mt-2">
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    <Button onClick={() => append({ name: "" })} className="px-4 py-2">
                        Add More +
                    </Button>
                </div>
                <div className="d-flex flex-row-reverse">
                    <Button onClick={() => reset({ ...defaultValues })} className="my-4 px-4 py-2  bg-primary">
                        Cancel
                    </Button>
                    <Button type="submit" className="my-4 me-3 bg-info px-4 py-2 ">
                        {`${edit ? "Update" : "Create"} Student`}
                    </Button>
                </div>
            </form>
        </React.Fragment>
    )
}
export default StudentForm;
