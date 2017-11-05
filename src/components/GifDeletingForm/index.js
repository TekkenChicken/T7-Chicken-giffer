import React, { Component } from 'react';
import YouTube from 'react-youtube';


class GifDeletingForm extends Component {


    render() {

        return (
            <div className="delete-form-container">
                <h2>Delete Gif</h2>
                <form onSubmit={this.props.handleDelete} noValidate>
                    <label>
                        Gfycat ID: <input type="text" name="gfycatid" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}



export default GifDeletingForm;