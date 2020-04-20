import React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import {StackViewStyleInterpolator} from 'react-navigation-stack';

import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
import BookList from '../components/booklist';
import MovieList from '../components/movieList';
import AddBook from '../components/addBook';
import AddMovie from '../components/addMovie';
import SelectItem from '../utils/selectOption';
import PickerItems from '../utils/PickerItem';
import MovieDetail from '../components/movieDetail';
import {Icon} from 'react-native-elements';
const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
});
const Example = () => (
  <Router sceneStyle={styles.scene}>
    <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
      <Stack>
        <Scene
          key="booklist"
          component={BookList}
          hideNavBar
          onLeft={Actions.pop}
        />
        <Scene
          key="movieList"
          component={MovieList}
          onLeft={Actions.pop}
          right={
            <Icon
              name="plus"
              type="font-awesome"
              size={20}
              color="#007acc"
              containerStyle={{paddingHorizontal: 10}}
              onPress={() => Actions.addMovie()}
            />
          }
          title="Movie List"
          initial
        />
        <Scene
          key="addBook"
          component={AddBook}
          title="Add Book"
          onLeft={Actions.pop}
        />
        <Scene
          key="addMovie"
          component={AddMovie}
          title="Add Movie"
          onLeft={Actions.pop}
        />
      </Stack>
      <Scene key="movieDetail" component={MovieDetail} hideNavBar={false} />
      <Scene key="picker" component={SelectItem} />
      <Scene key="PickerItem" component={PickerItems} />
    </Modal>
  </Router>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scene: {
    backgroundColor: '#F5FCFF',
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});
export default Example;
