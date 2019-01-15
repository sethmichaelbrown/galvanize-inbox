import React, { Component } from 'react';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core'
import '@fortawesome/react-fontawesome'
import '@fortawesome/free-solid-svg-icons'
import './App.css';

// Components
import Loading from './components/Loading'
import MessageList from './components/MessageList'
import Toolbar from './components//Toolbar'
import { faCommentDollar } from '@fortawesome/free-solid-svg-icons';



class App extends Component {

  state = {
  }

  componentDidMount = async () => {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({ messages: json })
  }

  patchServer = async (idArr, cmd, read) => {
   await fetch('http://localhost:8082/api/messages', {
    method: 'PATCH',
    headers: {
      'Acawaitcept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "messageIds": idArr,
      "command": cmd,
      "read": read
      })
    })
  }

messageClick = (event) => {
  const newState = { ...this.state }
  const messageID = parseInt(event.target.id)

  const findMessage = this.state.messages.filter(item => (item.id === messageID))[0]
  findMessage.read = true
  this.patchServer([messageID], "read", true)
  this.setState({ state: newState })
}

checkboxClick = (event) => {
  const newState = { ...this.state }
  const messageID = parseInt(event.target.id)

  const findMessage = this.state.messages.filter(item => (item.id === messageID))[0]
  findMessage.selected = !findMessage.selected
  this.patchServer([messageID], "selected")
  this.setState({ state: newState })
}

starMessage = (event) => {
  const newState = { ...this.state }
  const messageID = parseInt(event.target.id)

  const findMessage = this.state.messages.filter(item => (item.id === messageID))[0]
  findMessage.starred = !findMessage.starred
  this.patchServer([messageID], "starred")
  this.setState({ state: newState })
}

selectAll = (event) => {
  const newState = { ...this.state }
  const allMessages = this.state.messages.map(item => item.selected).every(item => item)
  
  if(!allMessages){
    newState.messages.map(message => (message.selected = true))
  }
  else{
    newState.messages.map(message => (message.selected = false))
  }

  this.setState({ state: newState })
}

markAsRead = (event) => {
  console.log(event.target.id)
  const selected = this.state.messages.filter(message => (message.selected === 'true'))
  console.log(selected)
}

markAsUnead = (event) => {

}


render() {
  return (
    <div className="App">
      {(this.state.messages) ?
        <React.Fragment>
          <Toolbar 
            messages={this.state.messages} 
            selectAll={this.selectAll}
            markAsRead={this.markAsRead}
            markAsUnread={this.markAsUnread}/>
          <MessageList
            messages={this.state.messages}
            messageClick={this.messageClick}
            checkboxClick={this.checkboxClick}
            starMessage={this.starMessage}/>
        </React.Fragment> :
        <Loading />
      }
    </div>
  );
}
}

export default App;