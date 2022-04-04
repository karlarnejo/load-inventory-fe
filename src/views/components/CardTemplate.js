import React from 'react';
import { Card, Button } from 'react-bootstrap';

let CardTemplate = (props) => {
    return (
        <Card style={{ alignContent:'center' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title>{props.cardTitle}</Card.Title>
                <Card.Text>
                    {props.cardDesc}
                </Card.Text>
                <Button variant="primary" onClick={props.onclick ? () => {props.onclick()} : null} >{props.cardButtonName}</Button>
            </Card.Body>
        </Card>
    )
}

export default CardTemplate;