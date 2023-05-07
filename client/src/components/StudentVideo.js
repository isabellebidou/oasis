import React from 'react';

class StudentVideo extends React.Component {

    render() {
        return (
            <div className='page'>
                <p className="itemp">
                    {this.props.location.state.side} eye pic sent on: {new Date(this.props.location.state.dateSent).toLocaleDateString()}
                </p>

                <img className="item"
                    id={this.props.location.state.id}
                    src={this.props.location.state.src}
                    alt={this.props.location.state.alt}
                    studentVideo={this.props.location.state.studentVideo}
                />
                <a className='closeWindow' href='/studentprofile'>x</a>
            </div>
        );
    }
}

export default StudentVideo;
