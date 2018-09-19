import React from 'react'
import axios from 'axios';
import {
  Container,
  Menu,
  Grid,
  Image,
} from 'semantic-ui-react'
import {
  Link
} from "react-router-dom";
import { withCookies } from 'react-cookie';
// import {
//   Link
// } from "react-router-dom";
import HeaderBar from "./../GenericElements/HeaderBar"
import Footer from "./../GenericElements/Footer"
import Body from "./../GenericElements/Body"

import "./../ConsultationDetail/ConsultationDetail.css"

var images = require.context('../img', true);

const InfoBar = props => {
  return (
    <Container>
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width={3}>
            <Image src={images(props.info.organisator_photo)} size='tiny'/>
          </Grid.Column>
          <Grid.Column width={10} textAlign='left'>
            <h3>{props.info.consultation_details.consultation_name}</h3>

            <i>{props.info.consultation_details.consultation_pitch_sentence}</i>
          </Grid.Column>
          <Grid.Column width={3}>
            Trois jours restants avant l'ouverture des votes
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
};

const DescriptionView = props => {
  return (
    <Container>
      {/* <React.Fragment>
        {props.desc}
      </React.Fragment> */}
      {/* <div dangerouslySetInnerHTML={{ __html: this.props.match.description }} />
      <p>
        {props.desc}
      </p> */}
      <div dangerouslySetInnerHTML={{ __html: props.desc }} />
    </Container>
  )
};

const ReturnBar = props => {
    return (
      <Menu pointing secondary >
        <Menu.Item
          name= " Retour à la consultation"
          icon='arrow left'
          active={false}
          as={Link}
          to={'/consultation_detail?id=' + props.consultation_id}/>
      </Menu>
    );
};

class OpinionView extends React.Component {
  constructor(props){
    super(props);
    const { cookies } = props;
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);


    this.state = {
      current_navigation: "Description",
      id: parsed.id_consultation,
      consultation_details: {},
      organisator_photo: cookies.get('user_info').photo,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Grid>
          <Grid.Row stretched className="margin_opinion_row">

            <Grid.Column width={9} textAlign='left'>

            </Grid.Column>

          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

class OpinionDetail extends React.Component {
  constructor(props){
    super(props);
    const { cookies } = props;
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);

    this.state = {
      current_navigation: "Description",
      id_consultation: parsed.id_consultation,
      id_opinion: parsed.id_opinion,
      consultation_details: {},
      opinion_details: {},
      organisator_photo: cookies.get('user_info').photo,
    };
  }

  componentDidMount() {
    //Consultation_details
    axios.get("http://localhost:3001/consultation_details/")
      .then(res => {
        var consultation_info = res.data.consultation_list[this.state.id_consultation];
        var tmp_state =
          {
            consultation_name: consultation_info.consultation_name,
            consultation_pitch_sentence: consultation_info.consultation_pitch_sentence,
            consultation_organisator_id: consultation_info.consultation_organisator_id,
            start_date: consultation_info.start_date,
            end_date: consultation_info.end_date,
          }
        //Opinion détails
        axios.get("http://localhost:3001/opinions_of_consultation_" + this.state.id_consultation)
          .then(res => {
            this.setState({
              opinion_details: res.data.opinion_list[this.state.id_opinion]
            });
            //Author of opinion détails
            axios.get("http://localhost:3001/users")
              .then(res => {
                this.setState({
                  user_details: res.data.user_list[this.state.opinion_details.id_author],
                });
              }
            );
          }
        );

        this.setState({
          consultation_details: tmp_state,
        });
        console.log(this.state)
      });
  }


  render() {
    return (
      <React.Fragment>
        <HeaderBar/>
        <Body>
          {/* <TopPanel
            image={this.state.consultation_details.detail_image}/> */}
          <InfoBar info={this.state}/>
          <ReturnBar consultation_id={this.state.id}/>
          { this.state.current_navigation === "Description" ?
            <DescriptionView desc={this.state.consultation_details.consultation_description}/> : null }
          { this.state.current_navigation === "Opinions" ?
            <OpinionView /> : null }
        </Body>
        <Footer/>
      </React.Fragment>
    );
  }

}

export default withCookies(OpinionDetail)
