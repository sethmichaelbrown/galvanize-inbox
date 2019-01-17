import React from 'react'
import '../App.css';

const Message = (props) => {
  const devLabel = props.messages.filter(item => item.labels.includes('dev')).map(item => item.id)
  const personalLabel = props.messages.filter(item => item.labels.includes('personal')).map(item => item.id)
  const gSchoolLabel = props.messages.filter(item => item.labels.includes('gschool')).map(item => item.id)



  return (
    <div className="Message">
      {props.messages.map(message => {
        return (
          <div className="mb-1">
            <div className={`row message ${message.read ? 'read' : 'unread'} ${message.selected ? 'selected' : ''}`}>
              <div className="col-xs-1">
                <div className="row">
                  <div className="col-xs-2">
                    < input type="checkbox"
                      onClick={props.checkboxClick}
                      id={message.id}
                      checked={`${message.selected ? 'checked' : ''}`} />
                  </div>
                  <div className="col-xs-2">
                    <i onClick={props.starMessage} id={message.id} className={`star fa ${message.starred ? 'fa-star' : 'fa-star-o'}`}></i>
                  </div>
                </div>
              </div>
              <div id={message.id} className="col-xs-11" onClick={props.messageClick}>

                {devLabel.includes(message.id) ? <span class="label label-warning">dev</span> : ''}
                {personalLabel.includes(message.id) ? <span class="label label-warning">personal</span> : ''}
                {gSchoolLabel.includes(message.id) ? <span class="label label-warning">gSchool</span> : ''}



                <a key={props.id} id={message.id} href="#">{message.subject}</a>
              </div>
            </div>

            {props.displayBody === message.id ? <div class="row message-body">
              <div class="col-xs-11 col-xs-offset-1">{message.body}</div>
            </div> : ''}
          </div>
        )
      })}

    </div>
  )
}


export default Message;
