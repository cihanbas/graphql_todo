import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { StackViewStyleInterpolator } from 'react-navigation-stack';

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
import AddBook from '../components/addBook';
import SelectItem from '../utils/selectOption';
import PickerItems from '../utils/PickerItem';
const transitionConfig = () => ({
    screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
});
const Example = () => (
    <Router
        sceneStyle={styles.scene}
    >
        <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>

            <Stack>
                <Scene
                    key="booklist"
                    component={BookList}
                    hideNavBar
                    onLeft={Actions.pop}
                    initial
                />
                <Scene
                    key="addBook"
                    component={AddBook}
                    title='Add Book'
                    onLeft={Actions.pop}

                />
            </Stack>
            <Scene
                key="picker"

                component={SelectItem}
            />
            <Scene
                key="PickerItem"

                component={PickerItems}
            />
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