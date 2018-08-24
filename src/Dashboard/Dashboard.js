import React from 'react'
import HeaderBar from "./../GenericElements/HeaderBar"
import Footer from "./../GenericElements/Footer"
import Body from "./../GenericElements/Body"
import TopPanel from "./../GenericElements/TopPanel"
import CardsDashboard from "./../GenericElements/Cards"
import "./Dashboard.css"


class Dashboard extends React.Component {

  render() {
    const dashboard_card_data = [
      {
        image : NotificationImg,
        header:'Mes notifications',
        description:'Tenez vous au courant des nouveautés de vos sujets favoris',
        link:'/temp'
      },
      {
        image : FavoriteImg,
        header:'Mes consultations favorites',
        description:'Ca semble assez évident non?                      ',
        link:'/temp'
      },
      {
        image : CreateImg,
        header:'Créer une consultation',
        description:'Proposez un nouveau sujet à vos collaborateurs',
        link:'/new_consultation'
      },
      {
        image : AllAvailableImg,
        header:'Consultations disponibles',
        description:'Découvrez les sujets sur lesquels vous pouvez apporter votre voix',
        link:'/consultation_list'
      },
      {
        image : PopularImg,
        header:'Consultations populaires',
        description:"Les sujets qui vont discuter l'entreprise",
        link:'/temp'
      },
      {
        image : ProfileImg,
        header:'Mon profil',
        description:'Reglages, bugs et autres niaiseries',
        link:'/temp'
      },
    ]

    return (
      <React.Fragment>
          <HeaderBar/>
          <Body>
          <TopPanel style_props='header_custom' message="Dashboard"/>
          <CardsDashboard card_list={dashboard_card_data}/>
          </Body>
          <Footer/>
      </React.Fragment>
    );
  }

}

export default Dashboard
