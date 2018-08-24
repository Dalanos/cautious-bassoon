// import PropTypes from 'prop-types'
import React from 'react'
import {
  Header,
} from 'semantic-ui-react'
import "./GenericCSS.css"

var images = require.context('../img', true);

class TopPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: this.props.image,
    }
  }

  render() {
    var style = {};
    console.log(this.state.image)
    console.log(this.props.image)
    console.log(this.state.image === undefined)
    if(this.state.image !== undefined) {
      style = {
        // background-image: url("../img/structural/nature_sombre.jpg");
        // backgroundImage: "url("+ window.location.origin + this.props.image +")",
        backgroundImage: "url("+ images("./consultation_detail/test.jpg") + ")",
        // backgroundImage: "url("+ images(this.state.image) + ")",
        // ./consultation_detail/4_Renouvellement du prestataire du restaurant dentreprise.jpg
        // /img/rsz_brainstorming_sombre.jpg
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }
    }
    // else {
    //   style = {
    //     // backgroundColor: "white",
    //     backgroundSize: "cover",
    //     backgroundPosition: "top center",
    //   }
    // }
    console.log(style)

    return (
      <div
        className="top_panel"
        style={style}
      >
        <Header
          as='h2'
          className="top_panel_text_color"
        >
          {this.props.title}
        </Header>
        <Header
          as='h3'
          className="top_panel_text_color"
        >
          {this.props.subtitle}
        </Header>
      </div>
    );
  }

}

//
// const TopPanel = (props) => (
//   <div className="top_panel" + {props.style_props}>
//     <Header
//       as='h2'
//       className={props.style_props}
//     >
//       Liste des sujets disponibles {props.title}
//     </Header>
//     <Header
//       as='h3'
//       className={props.style_props}
//     >
//       Parcourez les opinions de votre entreprise {props.subtitle}
//     </Header>
//   </div>
// );
//
// TopPanel.propTypes = {
//   style_props: PropTypes.string,
//   title: PropTypes.string,
//   subtitle: PropTypes.string,
//
// };
//
// TopPanel.defaultProps = {
//   style_props: 'top_panel_text_color',
//   title: '',
//   subtitle: '',
// };


export default TopPanel
