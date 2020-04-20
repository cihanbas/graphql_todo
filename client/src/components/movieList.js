import React, {PureComponent} from 'react';
import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import {useQuery} from '@apollo/react-hooks';
import {Actions} from 'react-native-router-flux';
import {getMovieListQuery} from '../queries/queries';
export default function getMovieList() {
  const {loading, error, data} = useQuery(getMovieListQuery);
  if (loading) return <ActivityIndicator size={'large'} color={'green'} />;
  if (error) return <Text>{error}</Text>;
  const {movies} = data;
  return (
    <>
      <View>
        <ScrollView>
          {movies.map((movie, i) => (
            <ListItem
              key={i}
              title={movie.title}
              bottomDivider
              onPress={() =>
                Actions.movieDetail({id: movie.id, title: movie.title})
              }
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
}
