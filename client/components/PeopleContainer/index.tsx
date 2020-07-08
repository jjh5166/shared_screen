import React from 'react';

import { PplContainer } from './styled';
import { PersonData } from '../../interfaces';
import PersonCard from './PersonCard';
import { useSelectedState } from '../SearchPerson/selected-context';

const PeopleContainer = React.memo(function PeopleContainer() {
  const selectedPeople = useSelectedState()
  console.log(selectedPeople)
  return (
    <PplContainer>
      {!!selectedPeople.length && selectedPeople.map((per: PersonData) => {
        return <PersonCard key={"card" + per.id} person={per} />
      })}
    </PplContainer>
  )
})

export default PeopleContainer;