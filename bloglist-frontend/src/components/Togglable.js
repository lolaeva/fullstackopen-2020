import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {

  const [ visible, setVisible ] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  // it is used for defining functions in a component which can be invoked from outside of the component
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className='toggle__section'>
      <div style={hideWhenVisible}> {/* when true, hide */}
        <button onClick={toggleVisibility}> { props.buttonLabel } </button>
      </div>
      <div style={showWhenVisible}> {/* when true, show */}
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

// define the buttonLabel prop as a mandatory or required string-type prop
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
// define a display name
Togglable.displayName = 'Togglable'

export default Togglable