import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Router from './src/routers'
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    );
  }
}
