import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
//import Slider from 'react-rangeslider'

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
            videoDuration: 0,
            time: [0,0],
            currentVidEvent: null
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
        this.setState({
            currentVidEvent: event.target
        })
        if(event.target.getDuration() === 0) {
            event.target.playVideo()
        } else {
            this.setState({
                videoDuration: event.target.getDuration()
            })
        }
    }

    secondsToMinutes(seconds) {
        let minutes = Math.floor(seconds/60);
        let remaining = Math.floor(seconds % 60);
        remaining < 10 ? remaining = '0' + remaining : remaining;
        return `${minutes}:${remaining}`
    }

    renderSlider(duration) {
        duration = Math.round(duration)
        return (
            <Range
            allowCross={false}
              value={this.state.time}
              max={duration}
              onChange={(value) => this.onSliderChange(value)}
              tipProps={{
                  placement: 'top',
                  prefixCls: 'rc-slider-tooltip',
                }}
              tipFormatter={duration => this.secondsToMinutes(duration)}
            />
        )
    }

    onSliderChange(value) {
        const initialStart = this.state.time[0];
        const initialEnd = this.state.time[1];

        if(value[0] === initialStart) {
            console.log('grabbing end handle')
            this.state.currentVidEvent.seekTo(value[1])
            this.setState({
                time: value
            })
        }

        if(value[1] === initialEnd) {
            console.log('grabbing start handle')
            this.state.currentVidEvent.seekTo(value[0])
            this.setState({
                time: [value[0], initialEnd]
            })
        }
    }

    sliderUpdate(event, flag) {
        if(flag === 'play') {
            console.log('play', Math.round(event.target.getCurrentTime()), this.state.time)
            this.setState({
                time: [Math.round(event.target.getCurrentTime()), this.state.time[1]]
            })
        }

        if (flag === 'pause') {
            console.log('pause', Math.round(event.target.getCurrentTime()), this.state.time)
            this.setState({
                time: [this.state.time[0], Math.round(event.target.getCurrentTime())]
            })
        }
    }

    render() {
        const opts = { width: '500', }
        return (
            <div className="gif-cutting-form-container">
                <h2>Paste YouTube link below</h2>
                <YouTube
                    opts={opts}
                    videoId={this.state.url}
                    onStateChange={(event) => this.onReady(event, this.state.url)}
                    onPlay={(event) => this.sliderUpdate(event, 'play')}
                    onPause={(event) => this.sliderUpdate(event, 'pause')}
                />
                <form onSubmit={this.props.handleGifCutter} noValidate>
                    <label>
                        Video URL: <input id="vidUrl" type="text" name="url" onChange={(e) => this.updateUrl(e)} />
                    </label>
                    <label>
                        Notation: <input type="text" name="title" />
                    </label>
                        {this.state.videoDuration === 0 ? null : this.renderSlider(this.state.videoDuration)}
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