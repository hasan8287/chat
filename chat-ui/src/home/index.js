import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import HomeContainer from './containder/Home'
import Login from './containder/Login'

class Home extends React.Component {
  constructor() {
    super()
  }

  render() {
    if (localStorage.getItem('user') == null) {
      return <HomeContainer {...this.props} />
    }
    return <HomeContainer {...this.props} />
  }
}

const mapStateToProps = ({ category }) => ({
  // ...category,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  // getDataCategory,
  changePage: () => push('/')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
