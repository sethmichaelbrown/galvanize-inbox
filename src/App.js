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
    displayBody: null
  }

  componentDidMount = async () => {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({ messages: json })
  }

  patchServer = async (idArr, cmd, tf) => {
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: {
        'Acawaitcept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "messageIds": idArr,
        "command": cmd,
        [cmd]: tf
      })
    })
  }

  labelPatchServer = async (idArr, cmd, tf) => {
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: {
        'Acawaitcept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "messageIds": idArr,
        "command": cmd,
        label: tf
      })
    })
  }

  postServer = async (subject, body) => {
    await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      headers: {
        'Acawaitcept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        body
      })
    })
  }

  messageClick = (event) => {
    const newState = { ...this.state }
    const messageID = parseInt(event.target.id)
    let filteredItem = newState.messages.filter(item => item.id === messageID)[0]
    if (!filteredItem.read) {
      filteredItem.read = true
    }

    newState.displayBody = messageID
    this.patchServer([messageID], "read", true)
    this.setState(newState)
  }

  checkboxClick = (event) => {
    const newState = { ...this.state }
    const messageID = parseInt(event.target.id)

    const findMessage = this.state.messages.filter(item => (item.id === messageID))[0]
    findMessage.selected = !findMessage.selected
    this.setState(newState)
  }

  starMessage = (event) => {
    const newState = { ...this.state }
    const messageID = parseInt(event.target.id)

    const findMessage = this.state.messages.filter(item => (item.id === messageID))[0]
    findMessage.starred = !findMessage.starred

    this.patchServer([messageID], "star")
    this.setState(newState)
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
    let label = event.target.value
    const selected = newState.messages.filter(message => message.selected)
    const selectedIDs = selected.map(message => message.id)
    const labels = selected.map(message => message.labels)

    if (!labels.includes(label)) {
      labels.map(message => message.push(label))
    }

    this.labelPatchServer(selectedIDs, "addLabel", label)
    this.setState(newState)
  }

  removeLabel = (event) => {
    const newState = { ...this.state }
    let label = event.target.value
    const selected = newState.messages.filter(message => message.selected)
    const selectedIDs = selected.map(message => message.id)
    const labels = selected.map(message => message.labels)
    let index
    let result = []

    labels.map(item => {
      item.filter(item2 => {
        if (item2 === label) {
          index = item.indexOf(item2)
          result = item.splice(index, index + 1)
        }
      })
    })

    this.labelPatchServer(selectedIDs, "removeLabel", label)
    this.setState(newState)

  }

  handleCompose = (event) => {
    const newState = { ...this.state }
    if (event.target.id === 'compose') {
      newState.composeView = true
      this.setState(newState)
    }

    if (event.target.id === 'close') {
      newState.composeView = false
      this.setState(newState)
    }
  }

  sendMessage = (event) => {
    const newState = { ...this.state }
    let subject = event.target.subject.value
    let body = event.target.body.value

    if (body && subject) {
      let newMessage = {
        subject,
        body,
        read: false,
        starred: false,
        labels: [],
      }
      newState.messages.push(newMessage)

      this.postServer(subject, body)
      newState.composeView = false
      this.setState(newState)
    }
    else{
      newState.composeView = false
      this.setState(newState)
    }

  }

  toTrash = (event) => {
    if (event.target.id === 'trash') {
      const newState = { ...this.state }
      const selectedIDs = newState.messages.filter(message => message.selected).map(message => message.id)
      let nonSelected = newState.messages.filter(message => !message.selected)
      newState.messages = nonSelected

      this.patchServer(selectedIDs, "delete")
      this.setState(newState)
    }
  }

  render() {
    return (
      <div className="App">
        {(this.state.messages) ?
          <React.Fragment>
            <Toolbar
              composeView={this.state.composeView}
              messages={this.state.messages}
              selectAll={this.selectAll}
              handleCompose={this.handleCompose}
              markAsRead={this.markAsRead}
              markAsUnread={this.markAsUnread}
              addLabel={this.addLabel}
              removeLabel={this.removeLabel}
              toTrash={this.toTrash} />
            {this.state.composeView ? <Compose sendMessage={this.sendMessage} /> : ''}
            <MessageList
              displayBody={this.state.displayBody}
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