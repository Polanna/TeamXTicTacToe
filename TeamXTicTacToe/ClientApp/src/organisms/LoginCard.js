import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import './LoginCard.css';

const LoginCard = () => {
    return (
        <React.Fragment>
            <Card className="loginCard">
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Play!
                </Button>
                </Form>
            </Card>
        </React.Fragment>
    );
}

export default LoginCard;