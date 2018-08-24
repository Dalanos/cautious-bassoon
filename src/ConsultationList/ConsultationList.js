import React from 'react'
import {
  Input,
  Container,
  Button
} from 'semantic-ui-react'
import axios from 'axios';

import HeaderBar from "./../GenericElements/HeaderBar"
import Footer from "./../GenericElements/Footer"
import Body from "./../GenericElements/Body"
import TopPanel from "./../GenericElements/TopPanel"
import CardsDashboard from "./../GenericElements/Cards"

import * as constants from '../CONSTANTS';

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
        vote: false,
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
      case "Votes":
        current_state.vote = !current_state.vote;
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
      <Container className="search_bar">
        {/* <Grid>
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
            <Grid.Column >
              <Button
                icon='star'
                size="large"
                content='Favoris'
                className={this.state.searchDetails.favorite ?
                  "button_search favorite button_favorite_clicked" : "button_search favorite "}
                onClick={this.handleClick.bind(this, "Favoris")}/>
            </Grid.Column>
            <Grid.Column >
              <Button
                icon='fire'
                size="large"
                content='Populaires'
                className={this.state.searchDetails.popular ?
                  "button_search popular button_popular_clicked" : "button_search popular "}
                onClick={this.handleClick.bind(this, "Populaires")}/>
            </Grid.Column>
          </Grid.Row>
        </Grid> */}
        <Input
          icon='search'
          type="text"
          loading={this.state.searching}
          placeholder='Search...'
          value={this.state.searchDetails.searchInput}
          onChange={this.handleChange}/>
        <Button
          icon='star'
          size="large"
          content='Favoris (à faire)'
          className={this.state.searchDetails.favorite ?
            "button_search favorite button_favorite_clicked" : "button_search favorite "}
          onClick={this.handleClick.bind(this, "Favoris")}/>
          <Button
            icon='fire'
            size="large"
            content='Populaires'
            className={this.state.searchDetails.popular ?
              "button_search popular button_popular_clicked" : "button_search popular "}
            onClick={this.handleClick.bind(this, "Populaires")}/>
            <Button
              icon='deaf'
              size="large"
              content='Avec vote'
              className={this.state.searchDetails.vote ?
                "button_search vote button_vote_clicked" : "button_search vote "}
              onClick={this.handleClick.bind(this, "Votes")}/>
      </Container>
    );
  }
}

const getDaysLeft = ( date1, date2 ) => {
  var one_day=1000*60*60*24;
  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
  // Convert back to days and return
  return Math.round(difference_ms/one_day);
}

const sortByNumber = (consultation_list) => {
  return (
    consultation_list.sort(function(a, b) {
      return a.days_left - b.days_left;
    })
  );
}

class ConsultationList extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      number_of_consultations: 0,
      consultation_list: [],
      displayed_list: [],
    }
    this.getFilteredList = this.getFilteredList.bind(this);
  }


  componentDidMount() {
    axios.get("http://localhost:3001/consultation_details/")
      .then(res => {
        var tmp_state = [];

        for(let i in res.data.consultation_list){
          tmp_state.push(
            {
              image: res.data.consultation_list[i].vignette_image,
              header: res.data.consultation_list[i].consultation_name,
              description: res.data.consultation_list[i].consultation_pitch_sentence,
              link:'/consultation_detail?id=' + res.data.consultation_list[i].id,
              popularity: res.data.consultation_list[i].popularity,
              days_left: getDaysLeft(new Date(), new Date(res.data.consultation_list[i].end_date)),
              vote: res.data.consultation_list[i].vote,
            }
          );
        }

        this.setState({
          consultation_list: sortByNumber(tmp_state),
          displayed_list: sortByNumber(tmp_state),
        });
      });
  }


  getFilteredList(searchDetails) {
      let displayed_list = this.state.consultation_list;
      //Votes
      if (searchDetails.vote) {
        displayed_list = displayed_list.filter(function(a) {
          return a.vote;
        })
      }
      //Favorite
      if (searchDetails.favorite) {
        //FAIRE FAVORIS
        //TODO FAIRE FAVORIS
      }
      //Popularity
      if (searchDetails.popular) {
        displayed_list.sort(function(a, b) {
            return b.popularity - a.popularity;
        })
      }else {
        displayed_list = sortByNumber(displayed_list)
      }
      //Search input
      displayed_list = displayed_list.filter(function(a) {
        // console.log(a.header.toLowerCase().search(searchDetails.searchInput.toLowerCase()) !== -1)
        return a.header.toLowerCase().search(searchDetails.searchInput.toLowerCase()) !== -1;
      })

      this.setState({
        displayed_list: displayed_list,
      });
  }

  render() {
    return (
      <React.Fragment>
          <HeaderBar/>
          <TopPanel
            title="Liste des sujets disponibles"
            subtitle="Parcourez les opinions de votre entreprise"
            image={constants.IMAGE_BRAINSTORMING}/>
          <Body>
            <SearchBar callbackFromParent={this.getFilteredList}/>
            <CardsDashboard card_list={this.state.displayed_list}/>
          </Body>
          <Footer/>
      </React.Fragment>
    );
  }

}

export default ConsultationList
