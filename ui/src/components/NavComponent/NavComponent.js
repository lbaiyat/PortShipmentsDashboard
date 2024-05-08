import React from 'react';
import './NavComponent.css'

function NavComponent(props) {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-item-large nav-link" href="/data">Data</a>
                        <a className="nav-item nav-item-large nav-link" href="/analytics">Analytics</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavComponent;