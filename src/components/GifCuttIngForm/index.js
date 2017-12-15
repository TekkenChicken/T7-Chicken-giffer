import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Slider, { Range } from 'rc-slider';

const youtubeParse = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

class GifCuttingForm extends Component {
    constructor() {
        super();
        this.state = {
            url: "",
            sliderMax: 0
        }
    }

    updateUrl(e) {
        e.preventDefault();
        const vidUrl = document.getElementById('vidUrl').value;

        this.setState({
            url: youtubeParse(vidUrl)
        })
    }

    onReady(event, url) {
        if(event.target.getDuration() === 0) {
            event.target.playVideo()
        } else {
            this.setState({
                sliderMax: event.target.getDuration()
            })
        }
    }

    renderSlider(duration) {
        console.log('duration', duration);
        return <p>Test wtf</p>
    }

    render() {
        this.state.sliderMax === 0 ? console.log('0 is true') : ('not 0')
        const opts = {
            width: '500',
        }
        return (
            <div className="gif-cutting-form-container">
                <h2>Paste YouTube link below</h2>
                <YouTube
                    opts={opts}
                    videoId={this.state.url}
                    onStateChange={(event) => this.onReady(event, this.state.url)}
                />
                <form onSubmit={this.props.handleGifCutter} noValidate>
                    <label>
                        Video URL: <input id="vidUrl" type="text" name="url" onChange={(e) => this.updateUrl(e)} />
                    </label>
                    <label>
                        Notation: <input type="text" name="title" />
                    </label>
                        {this.state.sliderMax === 0 ? <p>WTF</p> : <Range />}
                    <label>
                        Start Time:
          <input className="minute-input" type="number" name="startMinutes" maxLength="2" />
                        :
          <input className="seconds-input" type="number" name="startSeconds" maxLength="2" />
                    </label>
                    <label>
                        End Time:
          <input className="minute-input" type="number" name="endMinutes" />
                        :
          <input className="seconds-input" type="number" name="endSeconds" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}



export default GifCuttingForm;