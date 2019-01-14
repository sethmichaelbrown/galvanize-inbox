import React, { Component } from 'react'

class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        <div className="progress">
            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    );
  }
}

export default Loading;