import React from 'react'
import {
  Container,
  Card,
  Grid,
} from 'semantic-ui-react'
import {
  Link
} from "react-router-dom";
import HeaderBar from "./../GenericElements/HeaderBar"
import Footer from "./../GenericElements/Footer"
import Body from "./../GenericElements/Body"
import TopPanel from "./../GenericElements/TopPanel"
import "./Dashboard.css"
import FavoriteImg  from './../img/favorite.png'
import PopularImg  from './../img/flame.png'
import CreateImg  from './../img/new_project.png'
import NotificationImg  from './../img/notification.png'
import ProfileImg  from './../img/profile.png'
import AllAvailableImg  from './../img/world.png'


const ImageDashboard = () => (
    <TopPanel style_props='header_custom' message="Dashboard"/>
)

const GenericCard = (props) => {
    return (
      <Card
        image= {props.image}
        header={props.header}
        meta={props.meta}
        description={props.description}
        extra={props.extra}
        as={Link}
        to={props.link}
      />
    );
}

const TripleCardGroup = (props) => {
    return (
     <Grid columns={3}>
       <Grid.Row stretched className="triple_card_row">
         <Grid.Column>
           <GenericCard
             image={props.data_card_1.image}
             header={props.data_card_1.header}
             meta={props.data_card_1.meta}
             description={props.data_card_1.description}
             link={props.data_card_1.link}
           />
         </Grid.Column>
         <Grid.Column>
           <GenericCard
             image={props.data_card_2.image}
             header={props.data_card_2.header}
             meta={props.data_card_2.meta}
             description={props.data_card_2.description}
             link={props.data_card_2.link}
           />
         </Grid.Column>
         <Grid.Column>
           <GenericCard
             image={props.data_card_3.image}
             header={props.data_card_3.header}
             meta={props.data_card_3.meta}
             description={props.data_card_3.description}
             link={props.data_card_3.link}
           />
         </Grid.Column>
       </Grid.Row>
     </Grid>
    );
}

class CardsDashboard extends React.Component {
  render () {
    const card_data = {
      data_card_1 : {
        image : NotificationImg,
        header:'Mes notifications',
        description:'Tenez vous au courant des nouveautés de vos sujets favoris',
        link:'/temp'
      },
      data_card_2 : {
        image : FavoriteImg,
        header:'Mes consultations favorites',
        description:'Ca semble assez évident non?                      ',
        link:'/temp'
      },
      data_card_3 : {
        image : CreateImg,
        header:'Créer une consultation',
        description:'Proposez un nouveau sujet à vos collaborateurs',
        link:'/new_consultation'
      },
      data_card_4 : {
        image : AllAvailableImg,
        header:'Consultations disponibles',
        description:'Découvrez les sujets sur lesquels vous pouvez apporter votre voix',
        link:'/temp'
      },
      data_card_5 : {
        image : PopularImg,
        header:'Consultations populaires',
        description:"Les sujets qui vont discuter l'entreprise",
        link:'/temp'
      },
      data_card_6 : {
        image : ProfileImg,
        header:'Mon profil',
        description:'Reglages, bugs et autres niaiseries',
        link:'/temp'
      },
    }

    return (
      <Container>
        <TripleCardGroup
          data_card_1={card_data.data_card_1}
          data_card_2={card_data.data_card_2}
          data_card_3={card_data.data_card_3}
        />
        <TripleCardGroup
          data_card_1={card_data.data_card_4}
          data_card_2={card_data.data_card_5}
          data_card_3={card_data.data_card_6}
        />
      </Container>
    );
  }
}

class Dashboard extends React.Component {

  render() {
    return (
      <React.Fragment>
          <HeaderBar/>
          <Body>
          <ImageDashboard/>
          <CardsDashboard/>
          </Body>
          <Footer/>
      </React.Fragment>
    );
  }

}

export default Dashboard
