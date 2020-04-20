import React, {useState} from 'react';
import {Text, ActivityIndicator, View} from 'react-native';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {Input, Button} from 'react-native-elements';
import {colors} from '../utils/colors';

import {
  ADD_MOVIE,
  getMovieListQuery,
  getDirectoriesQuery,
} from '../queries/queries';
import DropDown from '../utils/selectOption';
import {Actions} from 'react-native-router-flux';
export default function addMovies() {
  const {loading, error, data} = useQuery(getDirectoriesQuery);
  const [addMovie, {movieData}] = useMutation(ADD_MOVIE);
  const [value, onChangeText] = useState('');
  const [year, onChangeTextYear] = useState('');
  const [descValue, onChangeTextDesc] = useState('');
  const [id, setID] = useState('');
  console.log('movieData', movieData);
  const addNewMovie = () => {
    const addMovieValue = {
      title: value,
      description: descValue,
      directorID: id,
      year: parseInt(year),
    };
    console.log('addMovlieValue', addMovieValue);
    addMovie({
      variables: addMovieValue,
      refetchQueries: [{query: getMovieListQuery}],
    });
  };
  if (loading) return <ActivityIndicator size={'large'} color={'green'} />;
  if (error) return <Text>{error?.message || 'Error'}</Text>;
  const {directors} = data;
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Input
        placeholder="Movie Title"
        onChangeText={(text) => onChangeText(text)}
        value={value}
        containerStyle={{
          borderColor: colors.primary,
          borderWidth: 0,
          paddingBottom: 20,
        }}
      />
      <Input
        placeholder="Description"
        onChangeText={(text) => onChangeTextDesc(text)}
        value={descValue}
        containerStyle={{
          borderColor: colors.primary,
          borderWidth: 0,
          paddingBottom: 20,
        }}
      />
      <Input
        placeholder="year"
        onChangeText={(text) => onChangeTextYear(text)}
        value={year}
        containerStyle={{
          borderColor: colors.primary,
          borderWidth: 0,
          paddingBottom: 20,
        }}
      />
      <DropDown
        dropdownTitle={'Select Director'}
        data={directors}
        title="Select Director"
        titleColName="name"
        onPress={(item) => setID(item.id)}
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
        onPress={addNewMovie}
        type="outline"
      />
    </View>
  );
}
