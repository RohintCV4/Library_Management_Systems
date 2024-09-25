import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
    return (
        <div>
            <Container fluid className="p-0">
                <Navbar />
                <Row className="mx-0">
                    {/* <Col xs={1} md={2} lg={1} className="bg-secondary-subtle py-2 d-none d-md-inline-flex" >
           <Sidebar/>
        </Col> */}
                    {/* <Col xs={12} md={9} lg={9} className="p-0"> */}
                    <Col xs={12} md={12} lg={12} className="p-0">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Layout