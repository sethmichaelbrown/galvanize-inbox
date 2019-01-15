import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

const Toolbar = (props) => {
  const unreadCount = (props.messages.filter(item => !item.read)).length
  const selectedCount = (props.messages.filter(item => item.selected)).length
  const messageCount = (props.messages.filter(item => item)).length

  return (
    <div className="Toolbar container">
      <div class="row toolbar">
        <div class="col-md-12">
          {unreadCount > 0 ? <div><p class="pull-right"><span class="badge badge">{unreadCount}</span>unread messages</p></div> : ''}
          <button class="btn btn-default" id="select-all" onClick={props.selectAll}>
            {selectedCount === messageCount ? <i class="fa fa-check-square-o"></i> :
              selectedCount > 0 ? <i class="fa fa-minus-square-o"></i> : <i class="fa fa-square-o"></i>}
          </button>

          {<button
            id='read'
            class="btn btn-default"
            disabled={`${selectedCount > 0 ? '' : 'disabled'}`}
            onClick={props.markAsRead}>
              Mark As Read</button>}
          
          {<button
            id='unread'
            class="btn btn-default"
            disabled={`${selectedCount > 0 ? '' : 'disabled'}`}
            onClick={props.markAsUnread}>
              Mark As Unread</button>}


          {<select class="form-control label-select" disabled={`${selectedCount > 0 ? '' : 'disabled'}`}>
            <option>Apply Label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>}

          {<select class="form-control label-select" disabled={`${selectedCount > 0 ? '' : 'disabled'}`}>
            <option>Remove Label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>}

          {<button class="btn btn-default" disabled={`${selectedCount > 0 ? '' : 'disabled'}`}>
            <i class="fa fa-trash-o"></i>
          </button>}
        </div>
      </div>

    </div>
  )
}

export default Toolbar;