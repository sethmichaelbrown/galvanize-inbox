import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

const ToolbarCompose = (props) => {
  const unreadCount = (props.messages.filter(item => !item.read)).length

  return (
    <div className="ToolbarCompose container">
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadCount}</span>unread messages
                    </p>

          <a className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default">
            <i className="fa fa-minus-square-o"></i>
          </button>

          <button className="btn btn-default">Mark As Read</button>

          <button className="btn btn-default">Mark As Unread</button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToolbarCompose;