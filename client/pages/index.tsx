import Layout from '../components/Layout';
import SearchPerson from '../components/SearchPerson';
import { PplResultsSection } from '../components/SearchPerson/styled';
import Results from '../components/Results';
import PeopleContainer from '../components/PeopleContainer';
import { SharedProvider } from '../context/sharedCredits';
import { CreditsProvider } from '../context/credits';
import { SelectedProvider } from '../context/selectedPeople';
import Compose from '../utils/compose';
import Title from '../components/Title';
import Modal from '../components/Modal';
import { ModalProvider } from '../context/modal';

export default () => {
  return (
    <ModalProvider>
      <Layout>
        <Title />
        <Compose components={[SharedProvider, CreditsProvider, SelectedProvider]}>
          <SearchPerson />
          <PplResultsSection>
            <PeopleContainer />
            <Results />
          </PplResultsSection>
        </Compose>
      </Layout>
      <Modal />
    </ModalProvider>
  )
}
