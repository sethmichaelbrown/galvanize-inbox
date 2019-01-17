import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

const Toolbar = (props) => {
  const unreadCount = (props.messages.filter(item => !item.read)).length
  const selectedCount = (props.messages.filter(item => item.selected)).length
  const messageCount = (props.messages.filter(item => item)).length
  const selectedAndRead = (props.messages.filter(item => (!item.read && item.selected))).length

  return (
    <div className="Toolbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Messenger</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">

            {<button className="nav-btn mt-2 btn btn-outline-light">
              <i className={!props.composeView ? "fa fa-plus" : 'fa fa-minus'} id={!props.composeView ? "compose" : 'close'} onClick={props.handleCompose}></i>
            </button>}


            <button className="nav-btn mt-2 ml-2 btn btn-outline-light" id="select-all" onClick={props.selectAll}>
              {selectedCount === messageCount ? <i className="fa fa-check-square-o"></i> :
                selectedCount > 0 ? <i className="fa fa-minus-square-o"></i> : <i className="fa fa-square-o"></i>}
            </button>

            {<button
              id='read'
              className="nav-btn mt-2 ml-1 btn btn-outline-light mark-btn"
              disabled={`${(selectedCount > 0 && selectedAndRead) ? '' : 'disabled'}`}
              onClick={props.markAsRead}>
              Mark As Read</button>}

            {<button
              id='unread'
              className="nav-btn mt-2 mr-1 btn btn-outline-light mark-btn"
              disabled={`${(selectedCount > 0 && !selectedAndRead) ? '' : 'disabled'}`}
              onClick={props.markAsUnread}>
              Mark As Unread</button>}

            {<select onChange={props.addLabel} class="form-control label-select mt-2" disabled={`${selectedCount > 0 ? '' : 'disabled'}`}>
              <option>Apply</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>}

            {<select onChange={props.removeLabel} class="form-control label-select mt-2 ml-1" disabled={`${selectedCount > 0 ? '' : 'disabled'}`}>
              <option>Remove</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>}

            {<button onClick={props.toTrash} id='trash' class="btn btn-outline-light mt-2 ml-1" disabled={`${selectedCount > 0 ? '' : 'disabled'}`}>
            <i class="fa fa-trash-o"></i>
          </button>}

          </ul>
          <div>
            {unreadCount > 0 ? <button type="button" className="btn btn-primary float-right mt-2">Unread Messages <span class="badge badge-light">{unreadCount}</span></button> : ''}
          </div>
        </div>
      </nav>



      {/* <div class="row toolbar">
        <div class="col-md-12">
          {unreadCount > 0 ? <div><p class="pull-right"><span class="badge badge">{unreadCount}</span>unread messages</p></div> : ''}
          {selectedCount === 0 ?  <a class="btn btn-danger"><i class={!props.composeView ? "fa fa-plus" : 'fa fa-minus'} id={!props.composeView ? "compose" : 'close'} onClick={props.handleCompose}></i></a> : ''}
          <button class="btn btn-default" id="select-all" onClick={props.selectAll}>
            {selectedCount === messageCount ? <i class="fa fa-check-square-o"></i> :
              selectedCount > 0 ? <i class="fa fa-minus-square-o"></i> : <i class="fa fa-square-o"></i>}
          </button>

          {<button
            id='read'
            class="btn btn-default"
            disabled={`${(selectedCount > 0 && selectedAndRead)? '' : 'disabled'}`}
            onClick={props.markAsRead}>
              Mark As Read</button>}
          
          {<button
            id='unread'
            class="btn btn-default"
            disabled={`${(selectedCount > 0 && !selectedAndRead)? '' : 'disabled'}`}
            onClick={props.markAsUnread}>
              Mark As Unread</button>}


          {<select onChange={props.addLabel} class="form-control label-select" disabled={`${selectedCount > 0 ? '' : 'disabled'}`}>
            <option>Apply Label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>}

          {<select onChange={props.removeLabel} class="form-control label-select" disabled={`${selectedCount > 0 ? '' : 'disabled'}`}>
            <option>Remove Label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>}

          {<button onClick={props.toTrash} id='trash' class="btn btn-default" disabled={`${selectedCount > 0 ? '' : 'disabled'}`}>
            <i class="fa fa-trash-o"></i>
          </button>}
        </div>
      </div> */}

    </div>
  )
}

export default Toolbar;