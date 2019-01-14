import React, { Component } from 'react';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core'
import '@fortawesome/react-fontawesome'
import '@fortawesome/free-solid-svg-icons'
import './App.css';

// Components
import Compose from './components/Compose'
import Loading from './components/Loading'
import MessageList from './components/MessageList'
import MessageExpanded from './components/Messages/MessageExpanded'


import ToolbarAll from './components/Toolbar/ToolbarAll'
import ToolbarCompose from './components/Toolbar/ToolbarCompose'
import ToolbarNone from './components/Toolbar/ToolbarNone'
import ToolbarSome from './components/Toolbar/ToolbarSome'


class App extends Component {

  state = {
  }

  componentDidMount = async () => {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    // console.log(json.map(item => item.selected))
    this.setState({ messages: json })
    console.log(this.state)
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
    findMessage.selected = true
    this.setState({ state: newState })
  }


  render() {
    return (
      <div className="App">
        {(this.state.messages) ?
          <React.Fragment>
            <ToolbarCompose messages={this.state.messages} />
            <MessageList
              messages={this.state.messages}
              messageClick={this.messageClick}
              checkboxClick={this.checkboxClick}
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