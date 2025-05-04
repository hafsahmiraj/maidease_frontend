import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import './tableu.css';

// src/service/ProductService.js

export const ProductService = {
    getProductsMini: () => {
        return Promise.resolve([
            {
                id: 1,
                name: "Zobia",
                price: 2999,
                rating: 4,
                inventoryStatus: "Available",
                date: "2025-04-01"
            },
            {
                id: 2,
                name: "Ruksana",
                price: 9999,
                rating: 5,
                inventoryStatus: "Unavailable",
                date: "2025-04-02"
            },
            {
                id: 3,
                name: "Rihana",
                price: 4999,
                rating: 3,
                inventoryStatus: "Unavailable",
                date: "2025-04-03"
            },
            {
                id: 4,
                name: "Shamshad",
                price: 7999,
                rating: 4,
                inventoryStatus: "Available",
                date: "2025-04-04"
            },
            {
                id: 5,
                name: "Kosar",
                price: 3999,
                rating: 4,
                inventoryStatus: "Available",
                date: "2025-04-05"
            }
        ]);
    }
};

export default function TemplateDemo() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProductsMini().then((data) => setProducts(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };

    const ratingBodyTemplate = (product) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (product) => {
        return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
    };

    const actionBodyTemplate = () => {
        return (
            <Button label="View" className="p-button-sm p-button-rounded" />
        );
    };
    

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Products</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    );

    const footer = `In total there are ${products ? products.length : 0} products.`;

    return (
          <>
       <div className="page-container">
        <div className="card">
            <div className="header-container">
                <span className="header-title">History</span>
                
            </div>
            <DataTable value={products} footer={<div className="footer-text">{footer}</div>} tableStyle={{ minWidth: '100%' }}>
                <Column field="id" header="ID" bodyClassName="text-center" />
                <Column field="name" header=" Maid-Name" bodyClassName="text-center" />
                <Column field="price" header="Payment" body={priceBodyTemplate} bodyClassName="text-center" />
                <Column field="rating" header="Review" body={ratingBodyTemplate} bodyClassName="text-center" />
                <Column field="date" header="Date" bodyClassName="text-center" />
                <Column header="Status" body={statusBodyTemplate} bodyClassName="text-center" />
                <Column header="Action" body={actionBodyTemplate} bodyClassName="text-center" />
            </DataTable>

        </div>
    </div>
    </>
    );
}
