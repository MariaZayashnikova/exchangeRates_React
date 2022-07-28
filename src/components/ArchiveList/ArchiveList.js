import React, { useState, useEffect } from "react";
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { getArchiveRates } from '../../services/services';
import { getExchangeRates } from '../../services/services';
import { getDateData } from '../DateUtils/DateUtils';

function ArchiveList() {
    let params = useParams();
    const [valueRate, setValueRate] = useState([]);
    const [loading, setLoading] = useState(true);

    const changeLoading = () => setLoading(!loading);

    const addRates = data => {
        setValueRate(data);
        changeLoading();
    };

    function modifyData(arrData) {
        let dataForState = [];
        arrData.forEach(elem => {
            if (elem.value) {
                dataForState.push(elem)
            } else {
                let dataCurDate = getDateData(new Date(elem.Date));

                let objRate = elem.Valute[params.itemId];
                let obj = {
                    date: `${dataCurDate.day}.${dataCurDate.month}.${dataCurDate.year}`,
                    value: objRate.Value
                }
                dataForState.push(obj)
            }
        })
        addRates(dataForState);
    }

    async function getRates() {
        let result = [];
        let currentDate;

        await getExchangeRates()
            .then(data => {
                result.push(data);
                currentDate = getDateData(new Date(data.Date));
            });

        for (let i = 1; i < 10; i++) {
            let oldDate = getDateData(new Date(currentDate.year, currentDate.month - 1, currentDate.day - i));

            await getArchiveRates(`https://www.cbr-xml-daily.ru/archive/${oldDate.year}/${oldDate.month}/${oldDate.day}/daily_json.js`)
                .then(data => {
                    if (!data) {
                        let obj = {
                            date: `${oldDate.day}.${oldDate.month}.${oldDate.year}`,
                            value: 'Нет данных'
                        }
                        result.push(obj);
                    } else {
                        result.push(data);
                    }
                });
        }
        modifyData(result);
    };

    useEffect(() => {
        getRates()
    }, []);

    return (
        <div className="currentList">
            <div className="headerList">
                <div>Данные за последние 10 дней по валюте: {params.itemId}</div>
                <Link to="/">
                    <Button variant='secondary'>На главную</Button>
                </Link>
            </div>
            <div className="headerList">
                <div>Дата</div>
                <div>Значение в рублях</div>
            </div>

            {loading ? <FontAwesomeIcon icon="fa-solid fa-spinner" className="spiner" size='2x' /> : null}
            <ListGroup className="listBlock">
                {valueRate.map(item => {
                    return (
                        <ListGroup.Item id="listItem" key={item.date}>
                            <div>{item.date}</div>
                            <div>{item.value}</div>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    )
}

export default ArchiveList;