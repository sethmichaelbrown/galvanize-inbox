import React from 'react'

const MessageExpanded = (props) => {

  return(
        <div className="MessageExpanded">
            <div class="row message read">
                <div class="col-xs-1">
                    <div class="row">
                    <div class="col-xs-2">
                        <input type="checkbox" />
                    </div>
                    <div class="col-xs-2">
                        <i class="star fa fa-star"></i>
                    </div>
                    </div>
                </div>
                <div class="col-xs-11">
                    <span class="label label-warning">dev</span>
                    <span class="label label-warning">gschool</span>
                    <a href="#">
                    Here is some message text that has a bunch of stuff
                    </a>
                </div>
            </div>

                <div class="row message-body">
                    <div class="col-xs-11 col-xs-offset-1">
                        This is the body of the message.
                    </div>
            </div>
        </div>
  )
}

export default MessageExpanded;