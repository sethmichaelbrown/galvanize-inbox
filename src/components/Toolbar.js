import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

const Toolbar = (props) => {
  const unreadCount = (props.messages.filter(item => !item.read)).length
  console.log(unreadCount)


  return (
    <div className="Toolbar container">
      <div class="row toolbar">
        <div class="col-md-12">
         {unreadCount > 0 ? <div><p class="pull-right"><span class="badge badge">{unreadCount}</span>unread messages</p></div> : ''}
          <button class="btn btn-default">
            <i class="fa fa-check-square-o"></i>
          </button>

          <button class="btn btn-default">
            Mark As Read
    </button>

          <button class="btn btn-default">
            Mark As Unread
    </button>

          <select class="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select class="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button class="btn btn-default">
            <i class="fa fa-trash-o"></i>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Toolbar;