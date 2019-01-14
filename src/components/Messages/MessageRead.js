import React from 'react'

const MessageRead = (props) => {
  // console.log("??", props.id)

  return (
    <div className="MessageRead">
      <div className="row message read">
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" onClick={props.checkboxClick} />
            </div>
            <div className="col-xs-2">
              <i className="star fa fa-star-o"></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11" onClick={props.messageClick}><a key={props.id} id={props.id} href="#">{props.subject}</a></div>
      </div>

    </div>
  )
}

export default MessageRead;
//