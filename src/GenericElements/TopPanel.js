import PropTypes from 'prop-types'
import React from 'react'
import {
  Header,
} from 'semantic-ui-react'
import "./GenericCSS.css"

const TopPanel = (props) => (
    <Header
      as='h2'
      className={props.style_props}
    >
      {props.message}
    </Header>
);

TopPanel.propTypes = {
  style_props: PropTypes.string,
  message: PropTypes.string,
};

TopPanel.defaultProps = {
  style_props: 'top_panel',
  message: '',
};

export default TopPanel
