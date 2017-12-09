import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, cutGif, checkStatuses } from '../redux/actions/gfycat';

import GifCuttingForm from './GifCuttingForm/index';
import StatusPanel from './StatusPanel/index';


class App extends Component {
    constructor() {
        super()
        this.state = {
            moveNotation: ""
        }
    }
    componentDidMount() {
        this.props.fetchAuth(this.props.auth)
    }

    componentDidUpdate() {
        !this.props.links ? console.log('nothing to check') : this.props.checkStatuses(this.props.links)
    }

    handleGifCutter(e) {
        e.preventDefault()
        const auth = this.props.auth;
        const {
            url,
            title,
            startMinutes,
            startSeconds,
            endMinutes,
            endSeconds,
            length,
            charName,
        } = e.target;
        let totalStartSeconds = parseInt(startMinutes.value) * 60 + parseInt(startSeconds.value);
        let totalEndSeconds = parseInt(endMinutes.value) * 60 + parseInt(endSeconds.value);
        let timeLength = totalEndSeconds - totalStartSeconds;

        if (this.state.moveNotation === title.value) {
            alert(`Don't forget to change the notation!`)
            return;
        }
        this.props.cutGif(
            url.value,
            title.value,
            startMinutes.value,
            startSeconds.value,
            timeLength,
            auth)
        }

    render() {
        return (
            <div className="main-container">
                <GifCuttingForm handleGifCutter={(e) => this.handleGifCutter(e)} />
                    {
                    !this.props.links ? console.log('nothing to show status for') : <StatusPanel links={this.props.links} />
                    }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { auth, links, isLoading } = state.gfycat;
    return {
        auth,
        isLoading,
        links
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAuth: () => dispatch(getAuth()),
        cutGif: (
            url,
            title,
            startMinutes,
            startSeconds,
            length,
            auth) => dispatch(cutGif(url, title, startMinutes, startSeconds, length, auth)),
            checkStatuses: (links) => dispatch(checkStatuses(links))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

