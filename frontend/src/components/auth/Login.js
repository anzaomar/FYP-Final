import React, { useState, useContext, useEffect, useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../UserContext'
import axios from '../../api/axios'

const LOGIN_URL = '/api/login'

const Login = () => {

    const { setUserInfo, isAMember } = useContext(UserContext)

    const nav = useNavigate()
    const userRef = useRef()
    const [user, setUser] = useState({
        email: '',
        password: ''
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

    useEffect(() => {
        document.getElementById('login-form').reset()

        const timer = setTimeout(() => {
            if (success === true) {
                if (isAMember) {
                    nav('/dashboard')
                }
                else {
                    nav('/academic-info')
                }
            }
        }, 2000)


        return () => {
            clearTimeout(timer)
        }
    }, [success])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMsg('')
            setErrMsg('')
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [successMsg, errMsg])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(LOGIN_URL, JSON.stringify(user),
                {
                    headers: { 'Content-Type': 'application/json' },
                })
            console.log(response.data)

            const accessToken = response?.data?.token
            const username = response?.data?.username
            const { email, password } = user
            setUserInfo({ email, password, accessToken, username })
            setUser(
                {
                    email: '',
                    password: '',
                }
            )
            setSuccess(true)
            setSuccessMsg('Redirecting to Dashboard')
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                setErrMsg('No Server Response')
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Email or Password')
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized')
            }
            else {
                setErrMsg('Login Failed')
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
                        <h3><span className='bold'>Login</span> below</h3>
                        <p className='pt-3'>Don&apos;t have an account?
                            <Link to='/register'>
                                <span className='theme_teal'> Register</span>
                            </Link>
                        </p>
                    </div>
                    <Form onSubmit={(e) => (handleSubmit(e))} id='login-form'>
                        <Form.Group>
                            <Form.Control placeholder='Email' type='email' className='py-3 px-0 border-0 border-bottom border-2 rounded-0' name='email' ref={userRef} required onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control placeholder='Password' type='password' className='mt-4 py-3 px-0 border-0 border-bottom border-2 rounded-0' name='password' required onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                        </Form.Group>
                        <Row className='justify-content-center mt-5'>
                            <Col xs='12' md='3'>
                                <Button className='custom-button green-button uppercase' type='submit'>
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login