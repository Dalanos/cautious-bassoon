import React, {Component} from 'react'
import axios from 'axios';
import {
  Container,
  Form,
  Input,
  Checkbox,
  Button,
  Label,
} from 'semantic-ui-react'
import HeaderBar from "./../GenericElements/HeaderBar"
import Footer from "./../GenericElements/Footer"
import Body from "./../GenericElements/Body"
import TopPanel from "./../GenericElements/TopPanel"
import RichEditorExample from  "./../GenericElements/RichTextEditor"


class NewConsultation extends React.Component {
  //TODO Add image to the TopPanel

  render() {
    return (
      <React.Fragment>
        <HeaderBar/>
        <Body>
          <TopPanel message="Création d'une nouvelle consultation"/>
          <NewConsultationForm/>
        </Body>
        <Footer/>
      </React.Fragment>
    );
  }

}

export default NewConsultation
