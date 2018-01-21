import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
import './style.css';
import '../../../node_modules/rc-slider/assets/index.css';
//import Slider from 'react-rangeslider'

const opts = { width: '500', }

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
            sliderStartPos: 0,
            sliderEndPos: 0,
            currentVidEvent: null,
            inputStartMin: 0,
            inputStartSec: 0,
            inputEndMin: 0,
            inputEndSec: 0
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
        const { sliderStartPos, sliderEndPos } = this.state;
        duration = Math.round(duration)
        return (
            <Range
              allowCross={false}
              value={[sliderStartPos, sliderEndPos]}
              max={duration}
              onChange={([sliderStartPos, sliderEndPos]) => this.onSliderChange(sliderStartPos, sliderEndPos)}
              tipProps={{
                  placement: 'top',
                  prefixCls: 'rc-slider-tooltip',
                }}
              tipFormatter={duration => this.secondsToMinutes(duration)}
            />
        )
    }

    onSliderChange(startPos, endPos) {
        const { sliderStartPos, sliderEndPos } = this.state;
        const { secondsToMinutes } = this;

        const initialStart = sliderStartPos;
        const initialEnd = sliderEndPos;

        if(startPos === initialStart) {
            this.state.currentVidEvent.pauseVideo()
            this.state.currentVidEvent.seekTo(endPos)
            this.setState({
                inputEndMin: secondsToMinutes(endPos).split(':')[0],
                inputEndSec: secondsToMinutes(endPos).split(':')[1],
                sliderEndPos: endPos
            })
        }

        if(endPos === initialEnd) {
            this.state.currentVidEvent.pauseVideo()
            this.state.currentVidEvent.seekTo(startPos)
            this.setState({
                inputStartMin: secondsToMinutes(startPos).split(':')[0],
                inputStartSec: secondsToMinutes(startPos).split(':')[1],
                sliderStartPos: startPos
            })
        }
    }

    sliderUpdate(event, flag) {
        const { secondsToMinutes } = this;
        const currentTime = Math.round(event.target.getCurrentTime());

        if(flag === 'play') {
            this.setState({
                inputStartMin: secondsToMinutes(currentTime).split(':')[0],
                inputStartSec: secondsToMinutes(currentTime).split(':')[1],
                sliderStartPos: currentTime
            })
        }

        if (flag === 'pause') {
            this.setState({
                inputEndMin: secondsToMinutes(currentTime).split(':')[0],
                inputEndSec: secondsToMinutes(currentTime).split(':')[1],
                sliderEndPos: currentTime
            })
        }
    }

    render() {
        const { inputStartMin, inputStartSec, inputEndMin, inputEndSec } = this.state;

        return (
            <div className="gif-cutting-form-container">
                <h2>T7 Chicken Giffer</h2>
                <h3>Make Gifs for T7 Chicken</h3>
                <form onSubmit={this.props.handleGifCutter} noValidate>
                    <label>
                        YouTube: <input id="vidUrl" type="text" name="url" placeholder="Paste link here" onChange={(e) => this.updateUrl(e)} />
                    </label>
                                    <YouTube
                    opts={opts}
                    videoId={this.state.url}
                    onStateChange={(event) => this.onReady(event, this.state.url)}
                    onPlay={(event) => this.sliderUpdate(event, 'play')}
                    onPause={(event) => this.sliderUpdate(event, 'pause')}
                />
                    <div className="slider-container">
                        {this.state.videoDuration === 0 ? null : this.renderSlider(this.state.videoDuration)}
                        <div className="input-container">
                        <span>
                            <h3>Start Time</h3>
                            <input className="minute-input" type="number" name="startMinutes" maxLength="2" value={inputStartMin} />
                            :
                            <input className="seconds-input" type="number" name="startSeconds" maxLength="2" value={inputStartSec} />
                        </span>
                        <span>
                            <h3>End Time</h3>
                            <input className="minute-input" type="number" name="endMinutes" value={inputEndMin} />
                            :
                            <input className="seconds-input" type="number" name="endSeconds" value={inputEndSec} />
                        </span>
                        </div>
                    </div>
                    <div className="labeling-container">
                        <span>
                            <div>
                                Character? <input type="text" name="charName" />
                            </div>
                            <div>
                                Notation? <input type="text" name="title" />
                            </div>
                        </span>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}



export default GifCuttingForm;