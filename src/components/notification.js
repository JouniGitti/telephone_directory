import React from 'react'

var classString = 'notification'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    } else if (message.includes('deleted')) {
        classString = 'error'
    }
    return (
        <div className = {classString}>
            {message}
        </div>
    )
}

export default Notification