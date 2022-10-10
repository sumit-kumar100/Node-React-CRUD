import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { deleteAlert } from '../../components/Alert';
import { Button, Alert } from '@themesberg/react-bootstrap';
import toast from 'react-hot-toast';
import axios from 'axios';
import Filter from '../../components/filters';
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from 'react-data-table-component';


const StudentList = ({ getData, data, setEdit }) => {

    const [selectedRows, setSelectedRows] = useState([]);

    const handleRowSelected = useCallback(state => {
        if (state?.selectedRows?.length) {
            setSelectedRows(state.selectedRows);
            return;
        }
        setSelectedRows({});
    }, []);

    const handleDelete = async (id) => {
        const confirm = await deleteAlert();
        if (confirm) {
            let response;
            if (id) {
                response = await axios.delete(`/api/candidate/${id}`)
            } else {
                response = await axios.delete('/api/candidate', { data: { ids: selectedRows.map((row) => row?._id) } })
            }
            if (response?.data?.status === "success") {
                getData();
                toast.success("Student Deleted Successfully")
            }
        }
    }

    const handleEdit = row => setEdit(row);

    const columns = [
        {
            name: 'S.no',
            selector: (row, index) => index + 1
        },
        {
            name: 'Name',
            selector: (row) => row?.firstName + " " +row?.lastName
        },
        {
            name: 'City',
            selector: (row) => row?.city
        },
        {
            name: 'Subjects',
            selector: (row) => row?.subjects?.length
        },
        {
            name: 'Status',
            selector: (row) => <Button size="sm" variant={row?.status ? "success" : "danger"}>{row?.status ? "Live" : "Suspended"}</Button>
        },
        {
            name: 'Std',
            selector: (row) => row?.standard
        },
        {
            name: "Edit",
            cell: row => (
                <div className='d-flex gap-2'>
                    <span className='actions' onClick={() => handleEdit(row)}>
                        <FontAwesomeIcon icon={faEdit} color="#0948B3" />
                    </span>
                    <span className='actions' onClick={() => handleDelete(row?._id)}>
                        <FontAwesomeIcon icon={faTrash} color="red" />
                    </span>
                </div>
            )
        }
    ];

    return (
        <div>
            <Filter
                data={data}
                getData={getData}
            />
            <Alert variant="danger" className={`d-flex justify-content-between align-items-center p-1 px-2 sc-fFeiMQ fSPQfo rdt_TableHeader ${selectedRows?.length ? 'd-block' : 'd-none'}`}>
                <span>{selectedRows?.length} items selected</span>
                <Button variant="danger" onClick={() => handleDelete(null)}>
                    Delete
                </Button>
            </Alert>
            <DataTableExtensions
                columns={columns}
                data={data || []}
                filterPlaceholder={'Search'}
                export={false}
                print={false}
                filterDigit={1}
            >
                <DataTable
                    columns={columns}
                    data={data || []}
                    highlightOnHover
                    pagination
                    selectableRows
                    onSelectedRowsChange={handleRowSelected}
                />
            </DataTableExtensions>
        </div>
    );
}

export default StudentList;