import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MenuBar = () => {
  return (
    <div className='py-4 teal-bg mx-auto px-5' style={{position: "fixed", bottom: "20px", left: "20px", height: "100px", width: "98%", borderRadius: "50px"}}>
        <Row className='align-items-center justify-content-between' style={{height: "100%"}}>
            <Col xs={12} md={2}>
                <Link to="/dashboard">
                    <div className='d-flex flex-column align-items-center'>
                        <i class="large material-icons large theme_white p-0 m-0" style={{fontSize: "35px"}}>dashboard</i>
                        <p className='theme_white'>Dashboard</p>
                    </div>
                </Link>
            </Col>
            <Col xs={12} md={2}>
                <Link to="/analytics">
                    <div className='d-flex flex-column align-items-center'>
                        <i class="large material-icons large theme_white p-0 m-0" style={{fontSize: "35px"}}>insert_chart</i>
                        <p className='theme_white'>Analytics</p>
                    </div>
                </Link>
            </Col>
            <Col xs={12} md={2}>
                <Link to="/timeline">
                    <div className='d-flex flex-column align-items-center'>
                        <i class="large material-icons large theme_white p-0 m-0" style={{fontSize: "35px"}}>timeline</i>
                        <p className='theme_white'>Timeline</p>
                    </div>
                </Link>
            </Col>
            <Col xs={12} md={2}>
                <Link to="/messaging">
                    <div className='d-flex flex-column align-items-center'>
                        <i class="large material-icons large theme_white p-0 m-0" style={{fontSize: "35px"}}>message</i>
                        <p className='theme_white'>Messaging</p>
                    </div>
                </Link>
            </Col>
            <Col xs={12} md={2}>
                <Link to="/map">
                    <div className='d-flex flex-column align-items-center'>
                        <i class="large material-icons large theme_white p-0 m-0" style={{fontSize: "35px"}}>map</i>
                        <p className='theme_white'>Map</p>
                    </div>
                </Link>
            </Col>
        </Row>
    </div>
  )
}

export default MenuBar