import React, { Component } from 'react';

import './style.css';

const GifLink = ({linkName, status, title, startTime}) => (
    <div>
        <h4>Attack Notation: {title}</h4>
        <a target="_blank" href={linkName}>{linkName}</a>
        <div>{status}</div>
    </div>
)

class StatusPanel extends Component {

    renderLinks(links) {
        return Object.keys(links).map((l, key) => {
            return <GifLink key={links[l].linkName} linkName={links[l].linkName} status={links[l].status} title={links[l].title} startTime={links[l].startTime}/>
        })
    }

        
    render() {
        return (
            <div className="status-panel-container">
                <h1>Status Panel</h1>
                {this.renderLinks(this.props.links)}
            </div>
        )
    }
}

export default StatusPanel;