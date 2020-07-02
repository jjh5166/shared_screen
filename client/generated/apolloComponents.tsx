import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  fetchCredits: CreditList;
  searchPerson: Array<Person>;
};


export type QueryFetchCreditsArgs = {
  id: Scalars['Float'];
};


export type QuerySearchPersonArgs = {
  searchTerm: Scalars['String'];
};

export type CreditList = {
  __typename?: 'CreditList';
  credits: Array<Film>;
};

export type Film = {
  __typename?: 'Film';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  releaseDate?: Maybe<Scalars['String']>;
  posterPath?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
};

export type Person = {
  __typename?: 'Person';
  id: Scalars['ID'];
  name: Scalars['String'];
  imagePath?: Maybe<Scalars['String']>;
  credits: Array<Film>;
  knownFor: Array<Film>;
};

export type SearchPersonQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type SearchPersonQuery = (
  { __typename?: 'Query' }
  & { searchPerson: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'name' | 'id' | 'imagePath'>
    & { knownFor: Array<(
      { __typename?: 'Film' }
      & Pick<Film, 'id' | 'title' | 'releaseDate' | 'posterPath'>
    )> }
  )> }
);


export const SearchPersonDocument = gql`
    query searchPerson($searchTerm: String!) {
  searchPerson(searchTerm: $searchTerm) {
    name
    id
    imagePath
    knownFor {
      id
      title
      releaseDate
      posterPath
    }
  }
}
    `;
export type SearchPersonComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SearchPersonQuery, SearchPersonQueryVariables>, 'query'> & ({ variables: SearchPersonQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const SearchPersonComponent = (props: SearchPersonComponentProps) => (
      <ApolloReactComponents.Query<SearchPersonQuery, SearchPersonQueryVariables> query={SearchPersonDocument} {...props} />
    );
    
export type SearchPersonProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<SearchPersonQuery, SearchPersonQueryVariables>
    } & TChildProps;
export function withSearchPerson<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SearchPersonQuery,
  SearchPersonQueryVariables,
  SearchPersonProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, SearchPersonQuery, SearchPersonQueryVariables, SearchPersonProps<TChildProps, TDataName>>(SearchPersonDocument, {
      alias: 'searchPerson',
      ...operationOptions
    });
};
export type SearchPersonQueryResult = ApolloReactCommon.QueryResult<SearchPersonQuery, SearchPersonQueryVariables>;