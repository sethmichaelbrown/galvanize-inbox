import React from 'react'

const MessageUndread = (props) => {

  return (
    <div className="MessageUndread">
      <div className="row message unread">
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

export default MessageUndread;