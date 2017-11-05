import React, { Component } from 'react';

const GifLink = ({linkName, status, title, startTime}) => (
    <div>
        <div>{title}</div>
        <div>{startTime}</div>
        <a href={linkName}>{linkName}</a>
        <div>{status}</div>
    </div>
)

class StatusPanel extends Component {

    renderLinks(links) {
        console.log('status panel links', links)
        return Object.keys(links).map((l, key) => {
            return <GifLink key={links[l].linkName} linkName={links[l].linkName} status={links[l].status} title={links[l].title} startTime={links[l].startTime}/>
        })
    }

        
    render() {
        console.log('status panel props', this.props)
        return (
            <div className="status-panel-container">
                <h1>Status Panel</h1>
                {this.renderLinks(this.props.links)}
            </div>
        )
    }
}

export default StatusPanel;