import React, { useState, useEffect } from "react";
import { ListGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { getExchangeRates } from '../../services/services';
import { getDateData } from '../DateUtils/DateUtils';
import './CurrentList.css';

function CurrentList() {
    const [rates, setRates] = useState([]);
    const [dateNow, setDateNow] = useState({});
    const [loading, setLoading] = useState(true);

    const changeLoading = () => setLoading(!loading);

    function addRates(data) {
        let date = getDateData(new Date(data.Date));
        setDateNow(date);
        setRates(Object.values(data.Valute));
        changeLoading();
    };

    function getRates() {
        getExchangeRates()
            .then(addRates);
    }

    useEffect(() => {
        getRates()
    }, []);

    const ChangeRates = ({ prevValue, currentValue, name }) => {
        let res = (100 * prevValue / currentValue - 100).toFixed(1);

        return (
            <div>
                <OverlayTrigger
                    placement={"bottom"}
                    overlay={renderTooltip(name)}
                >
                    <span>{res}%</span>
                </OverlayTrigger>

                {res > 0 ?
                    <FontAwesomeIcon className="changeIcon changeIcon-up" icon="fa-solid fa-angle-up" />
                    : <FontAwesomeIcon className="changeIcon changeIcon-down" icon="fa-solid fa-angle-down" />}
            </div>
        )
    }

    const renderTooltip = (text) => (
        <Tooltip id="tooltip" className="tooltipCst">
            {text}
        </Tooltip>
    );

    return (
        <div className="currentList">
            {dateNow ? <div className="currentList-date">{dateNow.day}.{dateNow.month}.{dateNow.year}</div> : null}
            <div className="headerList">
                <div>Код валюты</div>
                <div>Значение в рублях</div>
                <div>Изменение от прошлого дня</div>
            </div>
            {loading ? <FontAwesomeIcon icon="fa-solid fa-spinner" className="spiner" size='2x' /> : null}
            <ListGroup className="listBlock">
                {rates.map(rate => {
                    return (
                        <Link to={`/archive/${rate.CharCode}`} className="listBlock-link" key={rate.ID}>
                            <ListGroup.Item className="listItem" >
                                <div >
                                    <OverlayTrigger
                                        placement={"bottom"}
                                        overlay={renderTooltip(rate.Name)}
                                    >
                                        <span>{rate.CharCode}</span>
                                    </OverlayTrigger>
                                </div>
                                <div>
                                    <OverlayTrigger
                                        placement={"bottom"}
                                        overlay={renderTooltip(rate.Name)}
                                    >
                                        <span>{rate.Value}</span>
                                    </OverlayTrigger>
                                </div>
                                <ChangeRates prevValue={rate.Previous} currentValue={rate.Value} name={rate.Name} />
                            </ListGroup.Item>
                        </Link>
                    )
                })}
            </ListGroup>
        </div >
    )
}

export default CurrentList;