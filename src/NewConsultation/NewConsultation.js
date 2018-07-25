import React, {Component} from 'react'
import axios from 'axios';
import {
  Container,
  Form,
  Input,
  Select,
  Radio,
  TextArea,
  Checkbox,
  Button,
  Label,
} from 'semantic-ui-react'
import HeaderBar from "./../GenericElements/HeaderBar"
import Footer from "./../GenericElements/Footer"
import Body from "./../GenericElements/Body"
import TopPanel from "./../GenericElements/TopPanel"
//Important for the rich text editor
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

import * as ConstantsCSS from "./../ConstantsCSS"
import FavoriteImg  from './../img/favorite.png'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class NewConsultationForm extends Component {

  state = {
    cons_creating_entity: []
  }

  componentDidMount() {
    axios.get("http://localhost:3001/cons_creating_entity/")
      .then(res => {
        this.setState({
          cons_creating_entity : res.data,
        })
      });
  }

  create_dropdown_entite = () => {
    let table = []

    for (let i = 0; i < 4; i++) {
      if(this.state.cons_creating_entity[i]) {
        table.push(<option key={this.state.cons_creating_entity[i].id}>{this.state.cons_creating_entity[i].name}</option>)
      }
    }
    return table
  }



  render() {
    //TODO: AJOUTER MOCK API
    const tmp = {editorState: EditorState.createEmpty()};

    return (
      <Container>
        <Editor editorState={tmp} onChange={this.onChange} />
        <Form>
          {/* <Grid columns={2}>
            <Grid.Row >
              <Grid.Column>
                <Form.Field control={Input} label='Nom de la consultation' placeholder='Nom de la consultation' />
              </Grid.Column>
            </Grid.Row>
          </Grid> */}
          <Form.Field
            control={Input}
            label='Nom de la consultation'
            placeholder='Nom de la consultation' />
          <Form.Field
            control={Input}
            label='Phrase de description'
            placeholder='Phrase de description' />
            <Form.Field label='Entité organisatrise' control='select'>
              {this.create_dropdown_entite()}
            </Form.Field>
          <Label
            as="label"
            basic
            htmlFor="upload">
              <Button
                icon="upload"
                label={{
                    basic: true,
                    content: 'Select file(s)'
                }}
                labelPosition="right"/>
              <input
                hidden
                id="upload"
                multiple
                type="file"/>
          </Label>
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='First name' placeholder='First name' />
            <Form.Field control={Input} label='Last name' placeholder='Last name' />
            <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' />
          </Form.Group>
          <Form.Field control={TextArea} label='About' placeholder='Tell us more about you...' />
          <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' />
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </Container>

    )
  }
}

class NewConsultation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    return (
      // <React.Fragment>
      //   <HeaderBar/>
      //   <Body>
      //     <TopPanel message="Création d'une nouvelle consultation"/>
      //     <NewConsultationForm/>
      //   </Body>
      //   <Footer/>
      // </React.Fragment>
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    );
  }

}


export default NewConsultation
