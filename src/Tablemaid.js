import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import './tablemaid.css';


export const ProductService  = {
    getMaidHistory() {
        return Promise.resolve([
            {
                maidId: 'MD001',
                maidName: 'Ayesha Khan',
                totalEarnings: 15000,
                clientRating: 4,
                serviceDate: '2025-04-20',
                jobStatus: 'COMPLETED'
            },
            {
                maidId: 'MD002',
                maidName: 'Fatima Bibi',
                totalEarnings: 12000,
                clientRating: 5,
                serviceDate: '2025-03-15',
                jobStatus: 'INPROGRESS'
            },
            
            {
                maidId: 'MD003',
                maidName: 'Sana Malik',
                totalEarnings: 10000,
                clientRating: 3,
                serviceDate: '2025-02-05',
                jobStatus: 'CANCELLED'
            },
            {
                maidId: 'MD004',
                maidName: 'Nimra Shahid',
                totalEarnings: 10000,
                clientRating: 4,
                serviceDate: '2025-04-25',
                jobStatus: 'INPROGRESS'
            },
            {
                maidId: 'MD002',
                maidName: 'Fatima Sheikh',
                totalEarnings: 12000,
                clientRating: 5,
                serviceDate: '2025-04-22',
                jobStatus: 'COMPLETED'
            },
           
            {
                maidId: 'MD004',
                maidName: 'Rubina Shah',
                totalEarnings: 18000,
                clientRating: 5,
                serviceDate: '2025-01-10',
                jobStatus: 'COMPLETED'
            }
            
        ]);
    }
};


export default function MaidHistory() {
    const [maidHistory, setMaidHistory] = useState([]);

    useEffect(() => {
       ProductService.getMaidHistory().then((data) => setMaidHistory(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' });
    };

    const ratingBodyTemplate = (maid) => {
        return <Rating value={maid.clientRating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (maid) => {
        return <Tag value={maid.jobStatus} severity={getSeverity(maid.jobStatus)} />;
    };

    const actionBodyTemplate = () => {
        return (
            <Button label="Details" className="p-button-sm p-button-rounded" />
        );
    };

    const getSeverity = (status) => {
        switch (status) {
            case 'COMPLETED':
                return 'success';
            case 'INPROGRESS':
                return 'warning';
            case 'CANCELLED':
                return 'danger';
            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
          
           
        </div>
    );

    const footer = `In total there are ${maidHistory.length} maid records.`;

    return (
        <>
        <div className="page-container">
            <div className="card">
                <div className="header-container">
                    <span className="header-title">Maid History</span>
                </div>
                <DataTable value={maidHistory} header={header} footer={<div className="footer-text">{footer}</div>} tableStyle={{ minWidth: '100%' }}>
                    <Column field="maidId" header="Maid ID" />
                    <Column field="maidName" header="Maid Name" />
                    <Column field="totalEarnings" header="Earnings" body={(row) => formatCurrency(row.totalEarnings)} />
                    <Column field="clientRating" header="Client Rating" body={ratingBodyTemplate} />
                    <Column field="serviceDate" header="Service Date" />
                    <Column field="jobStatus" header="Job Status" body={statusBodyTemplate} />
                 
                </DataTable>
            </div>
        </div>
         </>
    );
}
