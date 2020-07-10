import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from "react-responsive";

export default class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = { 
          year: new Date().getFullYear(),
        };
    }

    render() {
        return (
            <footer>
                <div className="f-container">
                    <MediaQuery minWidth={901}>
                        <div className="left">
                            &nbsp;&nbsp;<Link to="/about">About</Link> | <Link to="/terms">Terms &amp; Conditions</Link> | <Link to="/more">More</Link>&nbsp;&nbsp;
                        </div>


                        <div className="center">
                            &copy;
                            {' '}
                            {this.state.year}
                            {' '}
                            {/* TODO: update name */}
                            Doug's React Boiler
                        </div>

                        <div className="right">
                            <a href="https://twitter.com/" className="black">
                                <i className="fab fa-twitter" />
                            </a>
                            &nbsp;&nbsp;
                            <a href="https://www.facebook.com/" className="black">
                                <i className="fab fa-facebook"/>
                            </a>
                            &nbsp;&nbsp;
                            <a href="https://www.yelp.com/" className="black">
                                <i className="fab fa-yelp"/>
                            </a>
                            &nbsp;&nbsp;
                        </div>
                    </MediaQuery>
                    <MediaQuery maxWidth={900}>
                        <div className="s-padding-t-b">
                            <a href="https://twitter.com/" className="black">
                                <i className="fab fa-twitter" />
                            </a>
                            &nbsp;&nbsp;
                            <a href="https://www.facebook.com/" className="black">
                                <i className="fab fa-facebook"/>
                            </a>
                            &nbsp;&nbsp;
                            <a href="https://www.yelp.com/" className="black">
                                <i className="fab fa-yelp"/>
                            </a>
                        </div>
                        <div className="s-padding-t-b">
                            &copy;
                            {' '}
                            {this.state.year}
                            {' '}
                            {/* TODO: update name */}
                            Doug's React Boiler
                        </div>
                        <div className="s-padding-t-b">
                            <Link to="/about">About</Link> | <Link to="/terms">Terms &amp; Conditions</Link> | <Link to="/more">More</Link> 
                        </div>
                    </MediaQuery>
                </div>
                


            </footer>
        )
    }
}
