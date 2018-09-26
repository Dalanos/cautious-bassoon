import React from 'react'
import axios from 'axios';
import {
  Container,
  Menu,
  Grid,
  Image,
  Header,
  Item,
  Loader,
  Divider,
  Comment,
  Form,
  Button,
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
import "./OpinionDetail.css"

var images = require.context('../img', true);

const getDaysSincePosting = ( currenDate, postingDate ) => {
  var one_day=1000*60*60*24;
  // Convert both dates to milliseconds
  var date1_ms = currenDate.getTime();
  var date2_ms = postingDate.getTime();
  // Calculate the difference in milliseconds
  var difference_ms = date1_ms - date2_ms;
  // Convert back to days and return
  return Math.round(difference_ms/one_day);
}

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

const WaitingDisplay = props => {
  return(
    <Container>
       <Loader active inline content='Chargement' />
    </Container>
  );
}

const AuthorBar = props => {
  return(
    <Item.Group>
      <Item>
        <Item.Image size='tiny' circular src={images(props.author.photo)} />
        <Item.Content className="author_bar_alignement" verticalAlign="middle">
          <Item.Header as='a'>{props.author.first_name + " " + props.author.last_name}</Item.Header>
          <Item.Meta>Poste et département</Item.Meta>
          <Item.Extra>{"Posté il y a " + getDaysSincePosting(new Date(), new Date(props.opinion_posting_date)) + " jours"}</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

class CommentFeed extends React.Component {
  render() {
    return(
      <Comment.Group>
        <Header as='h3' dividing>
          Comments
        </Header>

        <Comment>
          <Comment.Avatar src={images("./profile_pic/sami_yacoubi_1.jpeg")} />
          <Comment.Content>
            <Comment.Author as='a'>Matt</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>How artistic!</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>

        <Comment>
          <Comment.Avatar src={images("./profile_pic/sami_yacoubi_1.jpeg")} />
          <Comment.Content>
            <Comment.Author as='a'>Elliot Fu</Comment.Author>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
          <Comment.Group>
            <Comment>
              <Comment.Avatar src={images("./profile_pic/sami_yacoubi_1.jpeg")} />
              <Comment.Content>
                <Comment.Author as='a'>Jenny Hess</Comment.Author>
                <Comment.Metadata>
                  <div>Just now</div>
                </Comment.Metadata>
                <Comment.Text>Elliot you are always so right :)</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Comment>

        <Comment>
          <Comment.Avatar src={images("./profile_pic/sami_yacoubi_1.jpeg")} />
          <Comment.Content>
            <Comment.Author as='a'>Joe Henderson</Comment.Author>
            <Comment.Metadata>
              <div>5 days ago</div>
            </Comment.Metadata>
            <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>

        <Form reply>
          <Form.TextArea />
          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    );
  }
}

class OpinionPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opinion: this.props.opinion,
      author: this.props.user_list[this.props.opinion.id_author],
    };
  }

  //Previous system before the big page loader
  // componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps && this.props.opinion && this.props.user_list) {
  //     this.setState({
  //       opinion: this.props.opinion,
  //       user_list: this.props.user_list,
  //     })
  //   }
  // }

  render() {
    return (
      <Container>
        <Header as='h1' textAlign="left">{this.state.opinion.title || ""}</Header>
        <AuthorBar author={this.state.author} opinion_posting_date={this.state.opinion.post_date}/>
        <Divider/>
        <div dangerouslySetInnerHTML={{ __html: this.state.opinion.content }} />
      </Container>
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
      dataLoaded: false,
      current_navigation: "Description",
      id_consultation: parsed.id_consultation,
      id_opinion: parsed.id_opinion,
      consultation_details: {},
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
                  user_list: res.data.user_list,
                  dataLoaded: true,
                });
              }
            );
          }
        );

        this.setState({
          consultation_details: tmp_state,
        });
      });
  }


  render() {
    let display;
    console.log(this.state.dataLoaded)
    console.log(this.state.opinion_details)
    console.log(this.state.user_list)
    if(this.state.dataLoaded) {
      display = <OpinionPanel
        opinion={this.state.opinion_details}
        user_list={this.state.user_list}/>;
    } else {
      display = <WaitingDisplay/>
    }
    return (
      <React.Fragment>
        <HeaderBar/>
        <Body>
          {/* <TopPanel
            image={this.state.consultation_details.detail_image}/> */}
          <InfoBar info={this.state}/>
          <ReturnBar consultation_id={this.state.id_consultation}/>
          {display}
          <CommentFeed/>
        </Body>
        <Footer/>
      </React.Fragment>
    );
  }

}

export default withCookies(OpinionDetail)
