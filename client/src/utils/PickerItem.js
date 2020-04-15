import React, { PureComponent } from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SearchBar, Icon, normalize, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native-gesture-handler';
import { colors } from './colors';
class Picker extends  PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            data: [],
            flatlistData: props.data,
        };
    }

    updateSearch = async search => {
  /*       if (this.props.data) {
            const flatlistData = await SearchItems(this.props.data, 20, search);
            this.setState({ flatlistData, search });
        } */
    };
    select(item) {
        console.log('modal select', this.props); 
         this.props.select(item);
         Actions.pop();
    }
    close() {
        Actions.pop();
    }
    render() {
        const { search, flatlistData } = this.state;
        const {
            titleColName,
            subtitleColName,
            imgColName,
            onPress,
            withAvatar,
            rightSubtitle,
            rightTitle,
        } = this.props;
        return (
            <SafeAreaView style={styles.container} testID="PickerContainer">
                <View style={styles.searchContainer}>
                    <Icon
                        name="close"
                        type="fontAwesome"
                        color={colors.grey}
                        onPress={() => this.close()}
                    />
                    <SearchBar
                        round
                        lightTheme
                        placeholder="Search"
                        onChangeText={this.updateSearch}
                        value={search}
                        inputContainerStyle={styles.inputContainerStyle}
                        containerStyle={styles.containerStyle}
                        showCancel
                        platform={Platform.OS}
                    />
                </View>

                <FlatList
                    testID="List"
                    data={flatlistData}
                    renderItem={({ item }) => (
                        <ListItem
                            leftAvatar={
                                withAvatar && item[imgColName] && { source: item[imgColName] }
                            }
                            title={item[titleColName]}
                            subtitle={item[subtitleColName]}

                            rightTitle={rightTitle}
                            rightSubtitle={rightSubtitle}
                            onPress={()=>this.select(item)}
                            bottomDivider
                        />
                    )}
                    keyExtractor={item => {
                        console.log(item);
                        return item.id;
                    }}
                />
            </SafeAreaView>
        );
    }
}
Picker.propTypes = {
    showItemCount: PropTypes.number,
    titleColName: PropTypes.string,
    subtitleColName: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
    data: PropTypes.array,
    imgColName: PropTypes.string,
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    withAvatar: PropTypes.bool,
    rightTitle: PropTypes.string,
    rightSubtitle: PropTypes.string,
    dropdownTitle: PropTypes.string,
    dropDownSubTitle: PropTypes.string,
    dropDownImg: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        () => null,
    ]),
};
Picker.defaultProps = {
    showItemCount: 3,
    titleColName: 'title',
    subtitleColName: 'subtitle',
    dropdownTitle: '',
    dropDownImg: null,
    data: [],
    imgColName: 'img',
    title: '',
    dropDownSubTitle: null,
    withAvatar: false,
    onPress: () => console.log('please add a onpress function'),
};
export default Picker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.active,
        ...StyleSheet.absoluteFill,
    },
    inputContainerStyle: {
        backgroundColor: colors.active,
    },
    containerStyle: {
        backgroundColor: colors.active,

        width: '90%',
    },
    searchContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: normalize(0.3),
        borderBottomColor: colors.grey,
        paddingHorizontal: normalize(10),
    },
});
