import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../styles/Landing.css'


const Landing = () => {
    return (
        <Container>
            <Row className='align-items-center justify-content-center landing text-center'>
                <Col xs='12' md='6'>
                    <h3 className='capitalize'>Welcome, Build your network</h3>
                    <p className='py-3 theme_grey'>Login or Register to get started</p>
                    <Row className='justify-content-center pt-4'>
                        <Col xs='12' md='3'>
                            <Link to='/login'>
                                <Button className='custom-button uppercase green-button'>Login</Button>
                            </Link>
                        </Col>
                        <Col xs='12' md='3'>
                            <Link to='/register'>
                                <Button className='custom-button uppercase grey-button'>Register</Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Landing