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
                            {/* TODO: update social links */}
                            <div className="center-text">
                                <a href="https://twitter.com/douglasrcjames" target="_blank" rel="noopener noreferrer" className="black">
                                    <i className="fab fa-twitter" />
                                </a>
                                &nbsp;&nbsp;
                                <a href="https://www.facebook.com/douglasrcjames" target="_blank" rel="noopener noreferrer" className="black">
                                    <i className="fab fa-facebook"/>
                                </a>
                                &nbsp;&nbsp;
                                <a href="https://www.instagram.com/douglasrcjames" target="_blank" rel="noopener noreferrer" className="black">
                                    <i className="fab fa-instagram"/>
                                </a>
                            </div>
                            &copy;
                            {' '}
                            {this.state.year}
                            {' '}
                            {/* TODO: update name */}
                            Doug's React Boiler
                        </div>

                        <div className="right">
                            <i className="fas fa-tools"/>&nbsp;Webmaster <a href="https://www.douglasrcjames.com" target="_blank" rel="noopener noreferrer">douglasrcjames</a> 
                            &nbsp;&nbsp;
                        </div>
                    </MediaQuery>
                    <MediaQuery maxWidth={900}>
                        <div>
                            {/* TODO: update social links */}
                            <a href="https://twitter.com/douglasrcjames" target="_blank" rel="noopener noreferrer" className="black">
                                <i className="fab fa-twitter" />
                            </a>
                            &nbsp;&nbsp;
                            <a href="https://www.facebook.com/douglasrcjames" target="_blank" rel="noopener noreferrer" className="black">
                                <i className="fab fa-facebook"/>
                            </a>
                            &nbsp;&nbsp;
                            <a href="https://www.instagram.com/douglasrcjames" target="_blank" rel="noopener noreferrer" className="black">
                                <i className="fab fa-instagram"/>
                            </a>
                        </div>
                        <div>
                            &copy;
                            {' '}
                            {this.state.year}
                            {' '}
                            {/* TODO: update name */}
                            Doug's React Boiler
                        </div>
                        <div>
                            <i className="fas fa-tools"/>&nbsp;Webmaster <a href="https://www.douglasrcjames.com" target="_blank" rel="noopener noreferrer">douglasrcjames</a> 
                        </div>
                        <div className="s-padding-b">
                            <Link to="/about">About</Link> | <Link to="/terms">Terms &amp; Conditions</Link> | <Link to="/more">More</Link> 
                        </div>
                    </MediaQuery>
                </div>
                


            </footer>
        )
    }
}
