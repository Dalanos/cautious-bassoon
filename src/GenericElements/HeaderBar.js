import React from 'react'
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react'
import {
  Link
} from "react-router-dom";
import { withCookies } from 'react-cookie';


import "./GenericCSS.css"

var images = require.context('../img', true);

class HeaderBar extends React.Component {
  constructor(props){
    super(props);
    const { cookies } = props;

    this.state = {
      user_info: cookies.get('user_info'),
    }
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { cookies } = this.props;
    cookies.remove("logged_in");
    cookies.remove("user_info");
  }


  render() {
    return(
      <div>
        <Menu fixed='top' className="header_bar" >
          <Container>
            <Menu.Item as={Link} to="/" header className="header_bar_hide_border_left_main_button">
              <Image size='mini' src={images("./logo.png")} style={{ marginRight: '1.5em' }} />
              Aurora
            </Menu.Item>
            <Menu.Item as={Link} to="/">Liste des sujets</Menu.Item>

            <Menu.Item position="right" className="remove_padding_profile_pic">
              <Image size='mini' src={images(this.state.user_info.photo)}  circular />
            </Menu.Item>
            <Dropdown item simple text={this.state.user_info.first_name + " " + this.state.user_info.last_name}>
              <Dropdown.Menu>
                <Dropdown.Item>Mon compte</Dropdown.Item>
                <Dropdown.Item onClick={this.logout}>Déconnexion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
      </div>
    );
  }
// src={require("./../img/profile_pic/3.png")}
}


export default withCookies(HeaderBar)






//
//
//
// import PropTypes from 'prop-types'
// import React, { Component } from 'react'
// import * as ConstantsCSS from './../ConstantsCSS';
//
// import './HeaderBar.css';
// import {
//   Button,
//   Container,
//   Divider,
//   Grid,
//   Header,
//   Icon,
//   Image,
//   List,
//   Menu,
//   Responsive,
//   Segment,
//   Sidebar,
//   Visibility,
// } from 'semantic-ui-react'
//
//
// const HomepageHeading = ({ mobile }) => (
//   <Container text>
//     <Header
//       as='h1'
//       content='Imagine-a-Company'
//       inverted
//       style={{
//         fontSize: mobile ? '2em' : '4em',
//         fontWeight: 'normal',
//         marginBottom: 0,
//         marginTop: mobile ? '1.5em' : '3em',
//       }}
//     />
//     <Header
//       as='h2'
//       content='Do whatever you want when you want to.'
//       inverted
//       style={{
//         fontSize: mobile ? '1.5em' : '1.7em',
//         fontWeight: 'normal',
//         marginTop: mobile ? '0.5em' : '1.5em',
//       }}
//     />
//     <Button primary size='huge'>
//       Get Started
//       <Icon name='right arrow' />
//     </Button>
//   </Container>
// )
//
// HomepageHeading.propTypes = {
//   mobile: PropTypes.bool,
// }
//
// /* Heads up!
//  * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
//  * It can be more complicated, but you can create really flexible markup.
//  */
// class DesktopContainer extends Component {
//   state = {}
//
//   hideFixedMenu = () => this.setState({ fixed: false })
//   showFixedMenu = () => this.setState({ fixed: true })
//
//   render() {
//     const { children } = this.props
//     const { fixed } = this.state
//
//     return (
//       <Responsive minWidth={Responsive.onlyTablet.minWidth}>
//         <Visibility
//           once={false}
//           onBottomPassed={this.showFixedMenu}
//           onBottomPassedReverse={this.hideFixedMenu}
//         >
//           <Segment
//             inverted
//             textAlign='center'
//             className='segment'
//             vertical
//           >
//             <Menu
//               fixed={fixed ? 'top' : null}
//               inverted={!fixed}
//               pointing={!fixed}
//               secondary={!fixed}
//               size='large'
//             >
//               <Container
//                 style={ConstantsCSS.HEADER_MARGIN}
//               >
//                 <Menu.Item as='a' active>
//                   Home
//                 </Menu.Item>
//                 <Menu.Item as='a'>Work</Menu.Item>
//                 <Menu.Item as='a'>Company</Menu.Item>
//                 <Menu.Item as='a'>Careers</Menu.Item>
//                 <Menu.Item position='right'>
//                   <Button as='a' inverted={!fixed}>
//                     Log in
//                   </Button>
//                   <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
//                     Sign Up
//                   </Button>
//                 </Menu.Item>
//               </Container>
//             </Menu>
//           </Segment>
//         </Visibility>
//         {children}
//       </Responsive>
//     )
//   }
// }
//
// DesktopContainer.propTypes = {
//   children: PropTypes.node,
// }
//
// class MobileContainer extends Component {
//   state = {}
//
//   handlePusherClick = () => {
//     const { sidebarOpened } = this.state
//
//     if (sidebarOpened) this.setState({ sidebarOpened: false })
//   }
//
//   handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })
//
//   render() {
//     const { children } = this.props
//     const { sidebarOpened } = this.state
//
//     return (
//       <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
//         <Sidebar.Pushable>
//           <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
//             <Menu.Item as='a' active>
//               Home
//             </Menu.Item>
//             <Menu.Item as='a'>Work</Menu.Item>
//             <Menu.Item as='a'>Company</Menu.Item>
//             <Menu.Item as='a'>Careers</Menu.Item>
//             <Menu.Item as='a'>Log in</Menu.Item>
//             <Menu.Item as='a'>Sign Up</Menu.Item>
//           </Sidebar>
//
//           <Sidebar.Pusher
//             dimmed={sidebarOpened}
//             onClick={this.handlePusherClick}
//             style={{ minHeight: '100vh' }}
//           >
//             <Segment
//               inverted
//               textAlign='center'
//               style={{ minHeight: 350, padding: '1em 0em' }}
//               vertical
//             >
//               <Container>
//                 <Menu inverted pointing secondary size='large'>
//                   <Menu.Item onClick={this.handleToggle}>
//                     <Icon name='sidebar' />
//                   </Menu.Item>
//                   <Menu.Item position='right'>
//                     <Button as='a' inverted>
//                       Log in
//                     </Button>
//                     <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
//                       Sign Up
//                     </Button>
//                   </Menu.Item>
//                 </Menu>
//               </Container>
//               <HomepageHeading mobile />
//             </Segment>
//
//             {children}
//           </Sidebar.Pusher>
//         </Sidebar.Pushable>
//       </Responsive>
//     )
//   }
// }
//
// MobileContainer.propTypes = {
//   children: PropTypes.node,
// }
//
// const ResponsiveContainer = ({ children }) => (
//   <div>
//     <DesktopContainer>{children}</DesktopContainer>
//     <MobileContainer>{children}</MobileContainer>
//   </div>
// )
//
// ResponsiveContainer.propTypes = {
//   children: PropTypes.node,
// }
//
// const HeaderBar = () => (
//   <ResponsiveContainer>
//   </ResponsiveContainer>
// )
//
// export default HeaderBar
