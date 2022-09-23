import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const REGISTER_URL = '/api/register'

const Register = () => {

    const nav = useNavigate()
    const userRef = useRef()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    })
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
        console.log(user);
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, password2 } = user

        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ username, email, password, password2 }),
                {
                    headers: { 'Content-Type': 'application/json' },
                })
            console.log(JSON.stringify(response?.data))
            console.log(JSON.stringify(response))

            setUser(
                {
                    username: '',
                    email: '',
                    password: '',
                    password2: '',
                }
            )
            setSuccess(true)
            setSuccessMsg('Your account has been registered')
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                setErrMsg('No Server Response')
            } else if (error.response?.status === 400) {
                setErrMsg(error.response?.data.username
                    || error.response?.data.email
                    || error.response?.data.password
                    || error.response?.data.password2)
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized')
            }
            else {
                setErrMsg('Register Failed')
            }
            // errRef.current.focus();
        }
    }

    function handleChange(name, value) {
        name !== '' &&
            setUser(prev => (
                {
                    ...prev,
                    [name]: value
                }
            ))
    }

    useEffect(() => {

        const timer = setTimeout(() => {
            if (success === true) {
                nav('/login')
            }
        }, 2000)


        return () => {
            clearTimeout(timer)
        }
    }, [success])

    return (
        <Container>
            <Row className='align-items-center justify-content-center pt-5'>
                <Col xs='12' md='6'>
                    <Link to='/'>
                        <p className='uppercase hover-black'>&larr; <span>Back to home</span></p>
                    </Link>
                    <div className='text-center pt-4'>
                        {
                            <h5>{successMsg !== '' ? successMsg : errMsg !== '' && errMsg}</h5>
                        }
                        <h3><span className='bold'>Register</span> below</h3>
                        <p className='pt-3'>Already have an account?
                            <Link to='/login'>
                                <span className='theme_teal'> Login</span>
                            </Link>
                        </p>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control placeholder='Username' type='text' className='py-3 px-0 border-0 border-bottom border-2 rounded-0' name='username' ref={userRef} required onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control placeholder='Email' type='email' className='mt-4 py-3 px-0 border-0 border-bottom border-2 rounded-0' name='email' required onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control placeholder='Password' type='password' className='mt-4 py-3 px-0 border-0 border-bottom border-2 rounded-0' name='password' required onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control placeholder='Confirm Password' type='password' className='mt-4 py-3 px-0 border-0 border-bottom border-2 rounded-0' name='password2' required onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                        </Form.Group>
                        <Row className='justify-content-center mt-5'>
                            <Col xs='12' md='3'>
                                <Button className='custom-button green-button uppercase' type='submit'>
                                    Sign up
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register