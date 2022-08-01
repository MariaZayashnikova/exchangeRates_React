import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function NoFound() {
    return (
        <div>
            <FontAwesomeIcon icon="fa-solid fa-face-sad-tear " size="9x" />
            <div>Страница не найдена</div>
            <Link to="/">
                <Button variant="dark">На главную</Button>
            </Link>
        </div>

    )
}

function Failed() {
    return (
        <div>
            <FontAwesomeIcon icon="fa-solid fa-face-sad-cry" size="9x" />
            <div>Сервер ЦБ РФ сейчас не доступен</div>
            <div>Пожалуйста, попробуйте позже</div>
        </div>
    )
}

export { NoFound };
export { Failed };