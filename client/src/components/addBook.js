import React, {PureComponent, useState} from 'react';
import {View, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useQuery, useMutation} from '@apollo/react-hooks';
import DropDown from '../utils/selectOption';
import {colors} from '../utils/colors';
import {getAuthorsQuery, ADD_BOOK, getBooksQuery} from '../queries/queries';
import {Actions} from 'react-native-router-flux';
const genres = [
  {title: 'fantastic', id: '1'},
  {title: 'science', id: '2'},
  {title: 'biography', id: '3'},
  {title: 'funny', id: '4'},
];

const addBookComponent = () => {
  const {loading, error, data} = useQuery(getAuthorsQuery);
  const [id, setID] = useState('');
  const [genre, setGenre] = useState('');
  const [value, onChangeText] = useState('');
  const [addTodo, addBookData] = useMutation(ADD_BOOK);
  const addbook = () => {
    const bookData = {
      name: value,
      authorId: id,
      genre,
    };
    addTodo({
      variables: bookData,
      refetchQueries: [
        {
          query: getBooksQuery,
        },
      ],
    });

    onChangeText('');
    Actions.pop();
  };
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;
  const {authors} = data;

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Input
        placeholder="Book Name"
        onChangeText={(text) => onChangeText(text)}
        value={value}
        containerStyle={{
          borderColor: colors.primary,
          borderWidth: 0,
          paddingBottom: 20,
        }}
      />
      <DropDown
        dropdownTitle={'Select Author'}
        data={authors}
        title="Select Author"
        titleColName="name"
        onPress={(item) => setID(item.id)}
      />
      <DropDown
        dropdownTitle={'Select Genre'}
        data={genres}
        title="Select Genre"
        onPress={(item) => setGenre(item.title)}
      />
      <Button
        containerStyle={{
          paddingVertical: 40,
          bottom: 0,
          position: 'absolute',
          left: 10,
          right: 10,
        }}
        title="Add Book"
        onPress={addbook}
        type="outline"
      />
    </View>
  );
};

export default addBookComponent;
