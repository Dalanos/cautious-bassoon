import React from 'react'
import axios from 'axios';
import {
  Container,
  Menu,
  Grid,
  Image,
  Item,
  Icon,
  Button,
  Card,
  Form,
  Checkbox,
  Divider
} from 'semantic-ui-react'
// import {
//   Link
// } from "react-router-dom";
import HeaderBar from "./../GenericElements/HeaderBar"
import Footer from "./../GenericElements/Footer"
import Body from "./../GenericElements/Body"
import TopPanel from "./../GenericElements/TopPanel"
import "./ConsultationDetail.css"

const InfoBar = props => {
  return (
    <Container>
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width={3}>
            <Image src={require('./../img/circle.png')} size='tiny'/>
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
      <p>
        {props.desc}
      </p>
    </Container>
  )
};

const NavigationBar = props => {
    return (
      <Menu pointing secondary >
        <Menu.Item
          name='Description'
          active={props.active === 'Description'}
          onClick={() => props.onClick("Description")} />
        <Menu.Item
          name='Opinions'
          active={props.active === 'Opinions'}
          onClick={() => props.onClick("Opinions")}
        />
        <Menu.Item
          name='Vote'
          active={props.active === 'Vote'}
          onClick={() => props.onClick("Vote")}
        />
      </Menu>
    );
};

class OpinionView extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Grid>
          <Grid.Row stretched className="margin_opinion_row">
            <Grid.Column width={3} className="encadrer_bloc">
              Filtres:
              <Form>
                <Form.Field>
                  <label>First Name</label>
                  <input placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                  <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
              </Form>
            </Grid.Column>
            <Grid.Column width={9} textAlign='left'>


              <Item.Group>
                <Item className="encadrer_bloc">

                        <Item.Image size='tiny' src={require('./../img/circle.png')} circular/>

                        <Item.Content verticalAlign='middle'>
                          <Item.Header>
                            Je suis tout à fait d'accord avec ce sujet
                          </Item.Header>
                          <Item.Meta>
                            Jean-Luc Crapouillou
                          </Item.Meta>
                          <Item.Description>
                            <p>Franchement, vous avez raison, et voila pourquoi...</p>
                          </Item.Description>
                        </Item.Content>

                        <Item.Content verticalAlign='middle' className="buttons_alignement">
                          <Button.Group vertical labeled icon>
                            <Button icon='like' content='2014' className="button_like_fav"/>
                            <Button icon='favorite' content='Favorite' className="button_like_fav"/>
                            {/* <Button icon='time' content='Read Later' /> */}
                          </Button.Group>
                        </Item.Content>


                </Item>


              </Item.Group>


            </Grid.Column>
            <Grid.Column width={4}>
              <Card className="reactions_box">
                <Card.Content>
                  <Card.Header>Réactions</Card.Header>
                  <Card.Meta>Que pensez vous de cette consultation?</Card.Meta>
                  <Card.Description>
                    Ajouter un truc visuel qui montre les votes
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button  color='green'>
                      <Icon  size='large' name='smile outline' />
                    </Button>
                    <Button  color='red'>
                      <Icon  size='large' name='frown outline' />
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

class ConsultationDetail extends React.Component {
  constructor(props){
    super(props);
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    this.state = {
      current_navigation: "Opinions",
      id: parsed.id,
      consultation_details: {},
    };
    this.handleNavigationClick = this.handleNavigationClick.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:3001/consultation_details/")
      .then(res => {
        var consultation_info = res.data.consultation_list[this.state.id-1];
        var tmp_state =
          {
            consultation_name: consultation_info.consultation_name,
            consultation_pitch_sentence: consultation_info.consultation_pitch_sentence,
            consultation_description: consultation_info.consultation_description,
            consultation_organisator_id: consultation_info.consultation_organisator_id,
            start_date: consultation_info.start_date,
            end_date: consultation_info.end_date,
            blockchain_vote: consultation_info.blockchain_vote,
            media_video: consultation_info.media_video,
            media_blog: consultation_info.media_blog,
            media_comments: consultation_info.media_comments,
            media_yammer: consultation_info.media_yammer,
            detail_image: consultation_info.detail_image
          }

        this.setState({
          consultation_details: tmp_state,
        });
      });
  }

  handleNavigationClick(e) {
    switch(e) {
    case "Description":
        this.setState({
          current_navigation: "Description",
        });break;
    case "Opinions":
      this.setState({
        current_navigation: "Opinions",
      });break;
    case "Vote":
      this.setState({
        current_navigation: "Vote",
      });break;
    default:
      this.setState({
        current_navigation: "Description",
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <HeaderBar/>
        <Body>
          <TopPanel
            image="./consultation_detail/4_Renouvellement du prestataire du restaurant dentreprise.jpg"/>
          <TopPanel
            image={this.state.consultation_details.detail_image}/>
          <InfoBar info={this.state}/>
          <Divider />
          <NavigationBar active={this.state.current_navigation} onClick={(e) => this.handleNavigationClick(e)}/>
          {/* <Divider /> */}
          { this.state.current_navigation === "Description" ?
            <DescriptionView desc={this.state.consultation_description}/> : null }
          { this.state.current_navigation === "Opinions" ?
            <OpinionView /> : null }
        </Body>
        <Footer/>
      </React.Fragment>
    );
  }

}

export default ConsultationDetail
