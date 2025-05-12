import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './tableu.css'; // Assuming the styling is in this file

export default function TableU() {
    const [maidHires, setMaidHires] = useState([]);
    const [userType, setUserType] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user type from localStorage
        const type = localStorage.getItem('userType');
        setUserType(type);

        // Fetch data based on user type
        const fetchData = async () => {
            try {
                const apiUrl =
                    type === 'MAID'
                        ? 'http://localhost:5000/api/maids/hire/maid'
                        : 'http://localhost:5000/api/maids/hire/user';
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setMaidHires(response.data.maidHires || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleView = (hireId) => {
        navigate(`/hire-preview/${hireId}`);
    };

    const nameTemplate = (rowData) => {
        return userType === 'MAID' ? rowData.user.full_name : rowData.maid.full_name;
    };

    const emailTemplate = (rowData) => {
        return userType === 'MAID' ? rowData.user.email : rowData.maid.email;
    };

    const actionTemplate = (rowData) => {
        return (
            <Button
                label="View"
                icon="pi pi-eye"
                className="p-button-rounded p-button-info"
                onClick={() => handleView(rowData.id)}
            />
        );
    };

    return (
        <div className="table-container">
            <h1>Hire Details</h1>
            <DataTable
                value={maidHires}
                paginator
                rows={10}
                loading={loading}
                className="p-datatable-striped"
                responsiveLayout="scroll"
                emptyMessage="No hire details found."
            >
                <Column field="id" header="ID" sortable></Column>
                <Column body={nameTemplate} header="Name" sortable></Column>
                <Column body={emailTemplate} header="Email" sortable></Column>
                <Column field="payment_status" header="Payment" sortable></Column>
                <Column field="acceptance_status" header="Status" sortable></Column>
                <Column
                    field={userType === 'MAID' ? 'user_rating' : 'maid_rating'}
                    header="Reviews"
                    sortable
                ></Column>
                <Column body={actionTemplate} header="Actions"></Column>
            </DataTable>
        </div>
    );
}