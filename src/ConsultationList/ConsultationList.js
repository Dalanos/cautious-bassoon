import React from 'react'
import { Message } from 'semantic-ui-react'
import HeaderBar from "./../GenericElements/HeaderBar"
import Footer from "./../GenericElements/Footer"
import Body from "./../GenericElements/Body"
import TopPanel from "./../GenericElements/TopPanel"
import CardsDashboard from "./../GenericElements/Cards"
// import "./Dashboard.css"
import FavoriteImg  from './../img/syndicat.jpg'
import axios from 'axios';


const ImageDashboard = () => (
    <TopPanel style_props='header_custom' message="Dashboard"/>
)



class ConsultationList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      number_of_consultations: 0,
      consultation_list: [],
    }
  }


  componentDidMount() {
    axios.get("http://localhost:3001/consultation_header/")
      .then(res => {
        var tmp_state = [];

        for(let i in res.data.consultation_list){
          tmp_state.push(
            {
              image: FavoriteImg,
              header: res.data.consultation_list[i].consultation_name,
              description: res.data.consultation_list[i].consultation_pitch_sentence,
              link:'/consultation_detail?id=' + res.data.consultation_list[i].id,
            }
          );
        }
        this.setState({
          consultation_list: tmp_state,
        });
        console.log(this.state)

      });
  }


  render() {

    return (
      <React.Fragment>
          <HeaderBar/>
          <Body>
            <Message>
              <Message.Header>Ajouter interface de filtre et recherche</Message.Header>
            </Message>
            <CardsDashboard card_list={this.state.consultation_list}/>
          </Body>
          <Footer/>
      </React.Fragment>
    );
  }

}

export default ConsultationList
