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

  messageClick = (event) => {
    const newState = { ...this.state }
    const messageID = parseInt(event.target.id)
    const findMessage = this.state.messages.filter(item => (item.id === messageID))[0]
    findMessage.read = true
    this.setState({ state: newState })
  }

  markAsRead = (event) => {
    console.log(event.target.checked)
  }

  markAsUnead = (event) => {

  }

  checkboxClick = (event) => {
    const newState = { ...this.state }
    const messageID = parseInt(event.target.id)
    const findMessage = this.state.messages.filter(item => (item.id === messageID))[0]
    findMessage.selected = !findMessage.selected
    this.setState({ state: newState })
  }

  starMessage = (event) => {
    const newState = { ...this.state }
    const messageID = parseInt(event.target.id)
    const findMessage = this.state.messages.filter(item => (item.id === messageID))[0]
    findMessage.starred = !findMessage.starred
    this.setState({ state: newState })
  }


  render() {
    return (
      <div className="App">
        {(this.state.messages) ?
          <React.Fragment>
            <Toolbar messages={this.state.messages} />
            <MessageList
              messages={this.state.messages}
              messageClick={this.messageClick}
              checkboxClick={this.checkboxClick}
              starMessage={this.starMessage}
              markAsRead={this.markAsRead}
              markAsUnread={this.markAsUnread} />
          </React.Fragment> :
          <Loading />
        }
      </div>
    );
  }
}

export default App;