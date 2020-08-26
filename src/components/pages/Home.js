import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Helmet } from 'react-helmet';
import ContactForm from '../misc/ContactForm';

export default class Home extends Component {
    render() {
        return (
            <div className="wrapper">
                <Helmet>
                    <title>Home | Doug's React Boiler</title>
                </Helmet>
                <h1>Home</h1>
                {/* TODO: update content */}
                <p>Welcome to Doug's React Boiler! Click around a bit, it's a clean slate for you!</p>
                <br/>
                <Grid fluid>
                    <Row center="xs">
                        <Col xs={12} sm={4}>
                            <i className="fas fa-seedling xl-icon" />
                            <h3>Column 1</h3>
                            <p>More information below</p>
                        </Col>
                        <Col xs={12} sm={4}>
                            <i className="fas fa-tree xl-icon" />
                            <h3>Column 2</h3>
                            <p>More information below</p>
                        </Col>
                        <Col xs={12} sm={4}>
                            <i className="fas fa-globe-africa xl-icon" />
                            <h3>Column 3</h3>
                            <p>More information below</p>
                        </Col>
                    </Row>
                </Grid>
                <br/>
                <h1>Contact</h1>
                <ContactForm />
            </div>
        )
    }
}
