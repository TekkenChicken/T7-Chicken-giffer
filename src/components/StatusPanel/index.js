import React, { Component } from 'react';

const GifLink = ({linkName, status}) => (
    <div>
        <a href={linkName}>{linkName}</a>
        <div>{status}</div>
    </div>
)

class StatusPanel extends Component {

    renderLinks(links) {
        return links.map((l, key) => {
           return <GifLink key={l.linkName} linkName={l.linkName} status={l.status} />
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