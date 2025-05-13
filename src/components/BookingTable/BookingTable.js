import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Rating} from 'primereact/rating';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './BookingTable.css'; // Assuming the styling is in this file

export default function BookingTable() {
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

    const maidRatingTemplate = (rowData) => {
        return <Rating value={rowData.maid_rating} readOnly cancel={false}/>;
    };

    const userRatingTemplate = (rowData) => {
        return <Rating value={rowData.user_rating} readOnly cancel={false}/>;
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
            <h2>
                {userType === 'MAID' ? 'Hiring requests received' : 'Maids You Requested to Hire'}
            </h2>
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
                <Column
                    body={nameTemplate}
                    header={userType === 'MAID' ? 'User Name' : 'Maid Name'}
                    sortable
                ></Column>
                <Column
                    body={emailTemplate}
                    header={userType === 'MAID' ? 'User Email' : 'Maid Email'}
                    sortable
                ></Column>
                <Column field="acceptance_status" header="Acceptance Status" sortable></Column>
                <Column field="payment_status" header="Payment Status" sortable></Column>
                <Column body={maidRatingTemplate} header="Maid Rating" sortable></Column>
                <Column body={userRatingTemplate} header="User Rating" sortable></Column>
                <Column body={actionTemplate} header="Actions"></Column>
            </DataTable>
        </div>
    );
}