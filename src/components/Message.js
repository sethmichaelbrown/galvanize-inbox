import React from 'react'
import '../App.css';

const Message = (props) => {

  return (
    <div className="Message">
      {props.messages.map(message => {
        return (
          <div className={`row message ${message.read ? 'read' : 'unread'} ${message.selected ? 'selected' : ''}`}>
            <div className="col-xs-1">
              <div className="row">
                <div className="col-xs-2">
                  < input type="checkbox" o
                    onClick={props.checkboxClick}
                    id={message.id}
                    checked={`${message.selected ? 'checked' : ''}`} />
                </div>
                <div className="col-xs-2">
                  <i onClick={props.starMessage} id={message.id} className={`star fa ${message.starred ? 'fa-star' : 'fa-star-o'}`}></i>
                </div>
              </div>
            </div>
            <div className="col-xs-11" onClick={props.messageClick}>
              <a key={props.id} id={message.id} href="#">{message.subject}</a>
            </div>
          </div>
        )
      })}

    </div>
  )
}


export default Message;
