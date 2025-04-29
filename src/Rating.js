import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";

export default function MaidRatingPopup() {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(null);

    useEffect(() => {
        setVisible(true);
    }, []);

    const handleSubmit = () => {
        if (value === null) {
            alert("Please rate the maid before submitting.");
        } else {
            console.log("Rated:", value);
            setVisible(false);
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Dialog 
                visible={visible} 
                onHide={() => {}} 
                closable={false}
                header="Rate Maid (ID: 12345)"
                style={{ width: '25rem', textAlign: 'center' }}
                draggable={false}
                resizable={false}
                contentStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }} // 👈 content centering
            >
                <p>Please rate your experience with the maid:</p>

                <Rating 
                    value={value} 
                    onChange={(e) => setValue(e.value)} 
                    cancel={false} 
                    stars={5}
                    style={{ fontSize: '2rem' }} // 👈 make stars a bit bigger and better centered
                />

                <Button 
                    label="Submit" 
                    onClick={handleSubmit} 
                    className="p-button-rounded p-button-success p-button-sm"
                    style={{ width: '100px', marginTop: '1rem' }}
                />
            </Dialog>
        </div>
    );
}
