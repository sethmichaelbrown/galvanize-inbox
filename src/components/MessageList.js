import React from 'react'
import MessageExpanded from './Messages/MessageExpanded'
import MessageLabel from './Messages/MessageLabel'
import MessageRead from './Messages/MessageRead'
import MessageSelected from './Messages/MessageSelected'
import MessageStarred from './Messages/MessageStarred'
import MessageUnread from './Messages/MessageUnread'

const MessageList = (props) => {
  // console.log("!!", props.messages.map(item => item))
  let count = 1
  let key = 4999

  return (
    <div className="MessageList">
      <div className="container">
        <h1>Message List</h1>
        {props.messages.map(item => item.read ?
          <div className="mt-1">
            <MessageRead
              messages={props.messages}
              subject={item.subject}
              messageClick={props.messageClick}
              checkboxClick={props.checkboxClick}
              id={count++}
              key={key++} />
          </div>
          :
          <div className="mt-1">
            <MessageUnread
              messages={props.messages}
              subject={item.subject}
              messageClick={props.messageClick}
              checkboxClick={props.checkboxClick}
              id={count++}
              key={key++} />
          </div>

        )}

      </div>
    </div>
  )
}

export default MessageList