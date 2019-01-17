import React from 'react'
import Message from './Message'

const MessageList = (props) => {
  let count = 1
  let key = 4999

  return (
    <div className="MessageList">
      <div className="container">
        <h1>Message List</h1>
        <div className="mt-1">
          <Message
            displayBody={props.displayBody}
            messages={props.messages}
            subject={props.subject}
            messageClick={props.messageClick}
            checkboxClick={props.checkboxClick}
            starMessage={props.starMessage}
            id={count++}
            key={key++} />
        </div>
      </div>
    </div>
  )
}

export default MessageList