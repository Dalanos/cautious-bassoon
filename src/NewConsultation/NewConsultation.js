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


class NewConsultationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      list_consultation_organisators_possibility: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    axios.get("http://localhost:3001/list_consultation_organisators_possibility/")
      .then(res => {
        this.setState({
          list_consultation_organisators_possibility : res.data,
        })
      });
  }

  create_dropdown_entite = () => {
    let table = []

    for (let i = 0; i < 4; i++) {
      if(this.state.list_consultation_organisators_possibility[i]) {
        table.push(<option key={this.state.list_consultation_organisators_possibility[i].id}>{this.state.list_consultation_organisators_possibility[i].name}</option>)
      }
    }
    return table
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit() {
    //TODO Better system with a database
    axios.get("http://localhost:3001/consultation_header")
      .then(res => {
        console.log(this.state)
        const new_consultation_header = res.data;
        new_consultation_header.number_of_consultations = new_consultation_header.number_of_consultations +1;
        const new_consultation = {
          "id": new_consultation_header.number_of_consultations,
          "consultation_name": this.state.consultation_name,
        };
        new_consultation_header.consultation_list.push(new_consultation);

        axios.post('http://localhost:3001/consultation_header', new_consultation_header)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      });
  }

  render() {
    //TODO: AJOUTER MOCK API
    //TODO Better layout
    //TODO Customize RichTextField
    //TODO Cutomize Picture Button
    //TODO Make Button functional
    //TODO Add type of media to API
    //TODO Warning with blockchain
    //TODO Real date picker
    //TODO Auto-completion with profiles
    //TODO Accept Rich text in api call

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            control={Input}
            label='Nom de la consultation'
            placeholder='Nom de la consultation'
            name="consultation_name"
            onChange={this.handleChange} />
          <Form.Field
            control={Input}
            label="Phrase d'accroche de description"
            placeholder="Phrase d'accroche de description"
            name="consultation_pitch_sentence"
            onChange={this.handleChange}/>
          <RichEditorExample
            name="consultation_description"
            onChange={this.handleChange}/>
          <Form.Field
            label='Entité organisatrise'
            control='select'
            name="consultation_organisator"
            onChange={this.handleChange}>
            {this.create_dropdown_entite()}
          </Form.Field>
          <Form.Group grouped>
            <label>Image de la consultation</label>
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
          </Form.Group>

          <Form.Group grouped>
            <label>Quels types de médias autorisés pour la consultation?</label>
            <Form.Field label='Vidéos' control='input' type='checkbox' name='htmlRadios' />
            <Form.Field label='Articles' control='input' type='checkbox' name='htmlRadios' />
            <Form.Field label='Yammer' control='input' type='checkbox' name='htmlRadios' />
            <Form.Field label='Commentaires' control='input' type='checkbox' name='htmlRadios' />
          </Form.Group>

          <Form.Field control={Checkbox} toggle label='Utiliser la blockchain' />
          <Form.Group widths='equal'>
            <Form.Field control={Input} label='Date début' placeholder='jj/mm/aa' />
            <Form.Field control={Input} label='Date fin' placeholder='jj/mm/aa' />
          </Form.Group>
          <Form.Field control={Input} label='profiles' placeholder='TODO Ajouter profils' />
          <Form.Field control={Button}>Valider</Form.Field>
        </Form>
      </Container>

    )
  }
}

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
