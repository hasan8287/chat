import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import FormLogin from './containder/FormLogin'

class Login extends React.Component {
  render() {
    return(
      <div>
        <h4>Login</h4>
        <FormLogin {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = ({ category }) => ({})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
