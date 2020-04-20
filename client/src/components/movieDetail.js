import React, {UseState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {ListItem} from 'react-native-elements';

import {GET_MOVIE_BY_ID} from '../queries/queries';
export default function MovieDetail({id}) {
  const {loading, error, data} = useQuery(GET_MOVIE_BY_ID, {
    variables: {id},
  });

  if (loading) return <ActivityIndicator size="large" color="green" />;
  if (error) return <Text>{error.message}</Text>;
  const {movie} = data;
  return (
    <View>
      <ListItem
        title={movie.title}
        subtitle={movie.description}
        rightTitle={movie.year.toString()}
        bottomDivider
      />
      <ListItem
        title={movie.director?.name}
        rightTitle={movie.director?.birth?.toString()}
        bottomDivider
      />
    </View>
  );
}
