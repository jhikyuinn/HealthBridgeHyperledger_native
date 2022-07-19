import { useState, useEffect } from 'react';
import RequestModal from './UserRequestModal';
import axios from 'axios';

function ItemResult({ item }) {
    const BASE_URL = "http://203.247.240.226:8080/fhir"
    const [show, setShow] = useState();
    const [patient, setPatient] = useState({
        name: "",
        phone: "",
    });

    const closeHandler = () => {
        setShow(false);
    }

    const showHandler = () => {
        setShow(true);
    }

    const btnHandler = (e) => {
        showHandler();
    }

    const getPatientInfo = async () => {
        await axios.get(`${BASE_URL}/${item.resource.subject.reference}`).then((res) => {
            if(res.data.name[0] !== undefined) {
                setPatient({
                    ...patient,
                    name: res.data.name[0].text,
                    phone: res.data.telecom[0].value
                })
            }
        })
    }

    useEffect(() => {
        getPatientInfo();
    }, [])

    return (
        <>
            <RequestModal 
                show={show}
                closeHandler={closeHandler}
                showHandler={showHandler}
                name={patient.name}
                phone={patient.phone}
                item={item}
            />

            <div className="item_result">
                <div className="pid">
                    PID: {item.resource.id}
                </div>
                <div className="symptom">
                    Symptom: {item.resource.code.text}
                </div>
                <div className="doctor">
                    Doctor: {item.resource.extension[0] && item.resource.extension[0].valueString}
                </div>
                <div className="assigner">
                    Assigner: {item.resource.extension[1] && item.resource.extension[1].valueString}
                </div>
                <div className='colum_2_item'>
                    <div className='createdAt'>
                        {item.resource.extension[2] && item.resource.extension[2].valueString}
                    </div>
                    <a className='my_view' style={{marginLeft:"auto"}} onClick={btnHandler}>Request</a>
                </div>
            </div>
        </>
    )
}

export default ItemResult;  