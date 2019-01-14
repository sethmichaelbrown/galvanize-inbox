import React from 'react'
import Message from './Message'

const MessageList = (props) => {
  // console.log("!!", props.messages.map(item => item))
  let count = 1
  let key = 4999

  const itemSelected = props.messages.map(item => item.selected)
  const itemStarred = props.messages.map(item => item.starred)
  const itemRead = props.messages.map(item => item.read)

  console.log(itemSelected)
  console.log(itemStarred)
  console.log(itemRead)



  return (
    <div className="MessageList">
      <div className="container">
        <h1>Message List</h1>
        {props.messages.map(message => {
          return (
            <div className="mt-1">
              <Message
                messages={props.messages}
                subject={message.subject}
                messageClick={props.messageClick}
                checkboxClick={props.checkboxClick}
                id={count++}
                key={key++} />
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}

export default MessageList