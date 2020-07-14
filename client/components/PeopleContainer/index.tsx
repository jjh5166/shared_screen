import React from 'react';

import { PplContainer } from './styled';
import PersonCard from './PersonCard';
import { useSelectedState } from '../../context/selectedPeople';

const PeopleContainer = React.memo(function PeopleContainer() {
  const selectedPeople = useSelectedState();

  return (
    <PplContainer>
      {
        !!Object.keys(selectedPeople).length &&
        Object.values(selectedPeople).map((per: any) => (
          <PersonCard key={"card" + per.id} person={per} />
        ))
      }
    </PplContainer>
  )
})

export default PeopleContainer;