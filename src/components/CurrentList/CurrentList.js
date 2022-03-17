import React, { useState, useEffect } from "react";
import { ListGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getExchangeRates } from '../../services/services';
import './CurrentList.css'

function CurrentList() {
    const [rates, setRates] = useState([]);

    function addRates(data) {
        setRates(Object.values(data.Valute));
    };

    function getRates() {
        getExchangeRates()
            .then(addRates);
    }

    useEffect(() => {
        getRates()
    }, []);

    const ChangeRates = ({ prevValue, currentValue }) => {
        let res = (100 * prevValue / currentValue - 100).toFixed(1);

        return (
            <div>
                {res}%
                {res > 0 ?
                    <FontAwesomeIcon className="changeIcon changeIcon-up" icon="fa-solid fa-angle-up" />
                    : <FontAwesomeIcon className="changeIcon changeIcon-down" icon="fa-solid fa-angle-down" />}
            </div>
        )
    }

    const renderTooltip = (props) => (
        <Tooltip id="tooltip" {...props}>
            Simple tooltip
        </Tooltip>
    );

    return (
        <div className="currentList">
            <div className="headerList">
                <div>Код валюты</div>
                <div>Значение в рублях</div>
                <div>Изменение от прошлого дня</div>
            </div>
            <ListGroup className="listBlock">
                {rates.map(rate => {
                    return (
                        <OverlayTrigger
                            placement='right-end'
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                            key={rate.ID}
                        >
                            <ListGroup.Item className="listItem" >
                                <div>{rate.CharCode}</div>
                                <div>{rate.Value}</div>
                                <ChangeRates prevValue={rate.Previous} currentValue={rate.Value} />
                            </ListGroup.Item>
                        </OverlayTrigger>
                    )
                })}
            </ListGroup>
        </div>
    )
}

export default CurrentList;