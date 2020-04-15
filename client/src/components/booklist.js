import React, { PureComponent } from 'react';
import { View, Text, SectionList, ScrollView } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import { useQuery } from '@apollo/react-hooks'; 
import { Actions } from 'react-native-router-flux';
import {getBooksQuery} from '../queries/queries'

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
 
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>; 
  const { books } = data; 
  return (
    <>
      <Header
         centerComponent={{ text: 'MY TITLE', style: { color: '#fff', fontWeight: 'bold' } }}
        rightComponent={{ icon: 'add', color: '#fff',onPress: () =>Actions.addBook()}}
      />
      <ScrollView>
        {books.map((book, i) => <ListItem
          key={i}
          title={book.name}
          rightTitle={book.genre}
          bottomDivider
          chevron
        />)}
      </ScrollView>
    </>
  );
};

export default BookList;