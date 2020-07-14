import React from 'react';

import { PplContainer } from './styled';
import { PersonData } from '../../interfaces';
import PersonCard from './PersonCard';
import { useSelectedState } from '../../context/selectedPeople';

const PeopleContainer = React.memo(function PeopleContainer() {
  const selectedPeople = useSelectedState();
  return (
    <PplContainer>
      {!!selectedPeople.length && selectedPeople.map((per: PersonData) => (
        <PersonCard key={"card" + per.id} person={per} />
      ))}
    </PplContainer>
  )
})

export default PeopleContainer;