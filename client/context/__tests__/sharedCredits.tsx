import React, { useReducer } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { sharedReducer } from '../sharedCredits';

const sampleData = [
  {
    id: 23,
    films: [25423, 423523, 32532]
  }, {
    id: 245,
    films: [25423, 432, 92341]
  }, {
    id: 987,
    films: [11, 22, 224]
  }, {
    id: 345,
    films: [3455, 728, 934]
  }
]
const Example = () => {
  const [sharedState, sharedDispatch] = useReducer(
    sharedReducer, {
    shared: [],
    perPerson: {}
  })
  return (
    <div>
      <div>
        {sharedState.shared.map(id => {
          return <span key={id}>{"FILM"}</span>
        })}
      </div>
      <button onClick={
        () => sharedDispatch({
          type: 'ADD',
          payload: { id: sampleData[0].id, films: sampleData[0].films }
        })
      }>Send 1</button>

      <button onClick={
        () => sharedDispatch({
          type: 'ADD',
          payload: { id: sampleData[1].id, films: sampleData[1].films }
        })
      }>Send 2</button>

      <button onClick={
        () => sharedDispatch({
          type: 'ADD',
          payload: { id: sampleData[2].id, films: sampleData[2].films }
        })
      }>Send 3</button>

      <button onClick={
        () => sharedDispatch({
          type: 'ADD',
          payload: { id: sampleData[3].id, films: sampleData[3].films }
        })
      }>Send 4</button>
    </div>
  )
}
it('only contains shared films', () => {
  const { getByText } = render(<Example />)

  expect(() => getByText("FILM")).toThrowError()

  fireEvent.click(getByText('Send 1'))

  expect(() => getByText("FILM")).toThrowError()

  fireEvent.click(getByText('Send 2'))

  expect(getByText("FILM")).toBeInTheDocument()

  fireEvent.click(getByText('Send 3'))

  expect(() => getByText("FILM")).toThrowError()

  fireEvent.click(getByText('Send 4'))

  expect(() => getByText("FILM")).toThrowError()

  screen.debug();
})