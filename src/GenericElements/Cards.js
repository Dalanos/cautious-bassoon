import React from 'react'
import {
  Container,
  Card,
  Grid,
} from 'semantic-ui-react'
import {
  Link
} from "react-router-dom";

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
         {props.data_card_2 &&
           <Grid.Column>
             <GenericCard
               image={props.data_card_2.image}
               header={props.data_card_2.header}
               meta={props.data_card_2.meta}
               description={props.data_card_2.description}
               link={props.data_card_2.link}
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
