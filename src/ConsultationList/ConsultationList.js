import React from 'react'
import {
  Grid,
  Input,
  Container,
  Button
} from 'semantic-ui-react'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import axios from 'axios';

import HeaderBar from "./../GenericElements/HeaderBar"
import Footer from "./../GenericElements/Footer"
import Body from "./../GenericElements/Body"
import TopPanel from "./../GenericElements/TopPanel"
import CardsDashboard from "./../GenericElements/Cards"
import FavoriteImg  from './../img/syndicat.jpg'

import "./ConsultationList.css"


class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searching: false,
      searchDetails: {
        searchInput: "",
        favorite: false,
        popular: false,
      },
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  sendSearchDetails() {
    this.props.callbackFromParent(this.state.searchDetails);
  }

  handleChange(event) {
    var current_state = this.state.searchDetails;
    current_state.searchInput= event.target.value;
    this.setState ({
      searchDetails: current_state,
    });
    this.sendSearchDetails();
  }

  handleClick(button_name) {
    var current_state = this.state.searchDetails;
    switch (button_name) {
      case "Favoris":
        current_state.favorite = !current_state.favorite;
        break;
      case "Populaires":
        current_state.popular = !current_state.popular;
        break;
      default:
    }
    this.setState ({
      searchDetails: current_state,
    });
    this.sendSearchDetails();
  }

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width={4} >
              <Input
                icon='search'
                type="text"
                loading={this.state.searching}
                placeholder='Search...'
                value={this.state.searchDetails.searchInput}
                onChange={this.handleChange}/>
            </Grid.Column>
            <Grid.Column width={1} ></Grid.Column>
            <Grid.Column width={3} >
              <Button
                icon='star'
                size="large"
                content='Favoris'
                className={this.state.searchDetails.favorite ?
                  "button_search favorite button_favorite_clicked" : "button_search favorite "}
                onClick={this.handleClick.bind(this, "Favoris")}/>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button
                icon='fire'
                size="large"
                content='Populaires'
                className={this.state.searchDetails.popular ?
                  "button_search popular button_popular_clicked" : "button_search popular "}
                onClick={this.handleClick.bind(this, "Populaires")}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

}



class ConsultationList extends React.Component {
  // static propTypes = {
  //   cookies: instanceOf(Cookies).isRequired
  // };

  constructor(props){
    super(props);

    // const { cookies } = this.props;

    this.state = {
      number_of_consultations: 0,
      consultation_list: [],
      // name: cookies.get('name') || 'Ben',
    }
    this.getSearchDetails = this.getSearchDetails.bind(this);
  }


  componentDidMount() {
    axios.get("http://localhost:3001/consultation_details/")
      .then(res => {
        var tmp_state = [];

        for(let i in res.data.consultation_list){
          tmp_state.push(
            {
              image: FavoriteImg,
              header: res.data.consultation_list[i].consultation_name,
              description: res.data.consultation_list[i].consultation_pitch_sentence,
              link:'/consultation_detail?id=' + res.data.consultation_list[i].id,
              popularity: res.data.consultation_list[i].popularity,
            }
          );
        }
        this.setState({
          consultation_list: tmp_state,
        });
      });
  }


  getSearchDetails(searchDetails) {
      console.log(searchDetails);
      //TODO Faire l'algorithme de recherche
  }

  render() {

    return (
      <React.Fragment>
          <HeaderBar/>
          <TopPanel
            title="Liste des sujets disponibles"
            subtitle="Parcourez les opinions de votre entreprise"
            image="/img/rsz_brainstorming_sombre.jpg"/>
          <Body>
            <SearchBar callbackFromParent={this.getSearchDetails}/>
            <CardsDashboard card_list={this.state.consultation_list}/>
          </Body>
          <Footer/>
      </React.Fragment>
    );
  }

}

export default ConsultationList
