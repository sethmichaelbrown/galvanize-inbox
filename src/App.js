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
import Toolbar from './components/Toolbar'
import Compose from './components/Compose'




class App extends Component {

  state = {
    composeView: false,
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
    // this.patchServer([messageID], "selected")
    this.setState({ state: newState })
  }

  starMessage = (event) => {
    const newState = { ...this.state }
    const messageID = parseInt(event.target.id)

    const findMessage = this.state.messages.filter(item => (item.id === messageID))[0]
    findMessage.starred = !findMessage.starred
    // this.patchServer([messageID], "starred")
    this.setState({ state: newState })
  }

  selectAll = (event) => {
    const newState = { ...this.state }
    const allMessages = this.state.messages.map(item => item.selected).every(item => item)

    if (!allMessages) {
      newState.messages.map(message => (message.selected = true))
    }
    else {
      newState.messages.map(message => (message.selected = false))
    }

    this.setState(newState)
  }

  markAsRead = (event) => {
    const newState = { ...this.state }
    const selected = newState.messages.filter(message => message.selected && !message.read)
    const selectedIDs = selected.map(message => message.id)
    selected.map(message => (message.read = true))

    this.patchServer(selectedIDs, "read", true)
    this.setState(newState)
  }

  markAsUnread = (event) => {
    const newState = { ...this.state }
    const selected = newState.messages.filter(message => message.selected && message.read)
    const selectedIDs = selected.map(message => message.id)
    selected.map(message => (message.read = false))

    this.patchServer(selectedIDs, "read", false)
    this.setState(newState)
  }

  addLabel = (event) => {
    const newState = { ...this.state }
    let newLabel = event.target.value
    const selected = newState.messages.filter(message => message.selected)
    const labels = selected.map(message => message.labels)
    if (!labels.includes(newLabel)) {
      labels.map(message => message.push(newLabel))
    }
    this.setState(newState)
  }

  removeLabel = (event) => {
    const newState = { ...this.state }
    let labelToRemove = event.target.value
    const selected = newState.messages.filter(message => message.selected).map(message => message.labels)
    const labels = selected.map(label => label).filter(item => item.find(item => {
      if (item === labelToRemove) {
        console.log('to remove')
      }
    }))
    console.log(labels)
    console.log(labelToRemove)

  }

  handleCompose = (event) => {
    const newState = { ...this.state }
    if (event.target.id === 'compose') {
      newState.composeView = true

      this.setState(newState)
    }
  }

  sendMessage = (event) => {
    event.preventDefault()
    console.log(event)
    // newState.composeView = false
  }



  render() {
    return (
      <div className="App">
        {(this.state.messages) ?
          <React.Fragment>
            <Toolbar
              messages={this.state.messages}
              selectAll={this.selectAll}
              handleCompose={this.handleCompose}
              markAsRead={this.markAsRead}
              markAsUnread={this.markAsUnread}
              addLabel={this.addLabel}
              removeLabel={this.removeLabel} />
            {this.state.composeView ? <Compose sendMessage={this.sendMessage} /> : ''}
            <MessageList
              messages={this.state.messages}
              messageClick={this.messageClick}
              checkboxClick={this.checkboxClick}
              starMessage={this.starMessage} />
          </React.Fragment> :
          <Loading />
        }
      </div>
    );
  }
}

export default App;