import React from 'react'
import {
  Container,
  Card,
  Grid,
  Image,
  Icon
} from 'semantic-ui-react'
import {
  Link
} from "react-router-dom";

import "./GenericCSS.css"

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

const GenericCard = (props) => {

    return (
      <Card >
        <Image src={props.image} as={Link} to={props.link} />
        <Card.Content>
          <Card.Header as={Link} to={props.link} className="text_alignements_cards">{props.header}</Card.Header>
          <Card.Meta as={Link} to={props.link} className="text_alignements_cards">{props.meta}</Card.Meta>
          <Card.Description className="text_alignements_cards">{props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a style={{float: 'left'}}>
            <Icon name='time' />
            {getDaysLeft(new Date(), new Date(props.end_date))} jours restants
          </a>
          <a style={{float: 'right'}}>
            <Icon name='fire' />
            {props.popularity}
          </a>
        </Card.Content>
      </Card>
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
             popularity={props.data_card_1.popularity}
             end_date={props.data_card_1.end_date}
           />
         </Grid.Column>
         {props.data_card_2 &&
           <Grid.Column>
             <GenericCard
               image={props.data_card_2.image}
               header={props.data_card_2.header}
               meta={props.data_card_2.meta}
               description={props.data_card_2.description}
               link={props.data_card_2.link}
               popularity={props.data_card_2.popularity}
               end_date={props.data_card_2.end_date}
             />
           </Grid.Column>}
         {props.data_card_3 &&
           <Grid.Column>
             <GenericCard
               image={props.data_card_3.image}
               header={props.data_card_3.header}
               meta={props.data_card_3.meta}
               description={props.data_card_3.description}
               link={props.data_card_3.link}
               popularity={props.data_card_3.popularity}
               end_date={props.data_card_3.end_date}
             />
           </Grid.Column>}
       </Grid.Row>
     </Grid>
    );
}

class CardsDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      number_of_cards: 0,
      card_list : [],
    }
  }

  render () {
    const card_list=this.props.card_list;

    var render = [];
    for (var i = 0; i < card_list.length; i++) {
        if((i % 3) + 1 === 3) {
          render.push(
            <TripleCardGroup
              data_card_1={card_list[i-2]}
              data_card_2={card_list[i-1]}
              data_card_3={card_list[i]}
              key={i}
            />
          );
        }else if (i + 1 === card_list.length) {
          if(i % 3 === 1) {
            render.push(
              <TripleCardGroup
                data_card_1={card_list[i-1]}
                data_card_2={card_list[i]}
                key={i}
              />
            );
          } else {
            render.push(
              <TripleCardGroup
                data_card_1={card_list[i]}
                key={i}
              />
            );
          }
        }
    }

    return (
      <Container>
        {render}
      </Container>
    );
  }
}

export default CardsDashboard
