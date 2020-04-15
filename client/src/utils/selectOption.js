import React, { PureComponent } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Modal from 'react-native-modal';
import { RectButton } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { Icon, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import { colors } from './colors';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      dropdownTitle: props.dropdownTitle,
      dropDownSubTitle: props.dropDownSubTitle,
      titleColName: props.titleColName,
      subtitleColName: props.subtitleColName
    };
  }

  close() {
    this.setState({ isVisible: false });
  }

  open() {
    this.setState({ isVisible: true });
  }
  more() {
    this.setState({ isVisible: false }, () => {
      Actions.PickerItem({ ...this.props, select: this.select.bind(this) });
    });
  }
  select(item) {
    const { titleColName,
      subtitleColName } = this.state
    this.setState({
      isVisible: false,
      dropdownTitle: item[titleColName],
      dropDownSubTitle: item[subtitleColName],
    });
    this.props.onPress(item)
  }
  render() {
    const {
      showItemCount,
      titleColName,
      subtitleColName,
      imgColName,
      title,
      withAvatar,
      rightSubtitle,
      rightTitle,
      dropDownImg,
      data,
    } = this.props;
    const {
      dropdownTitle,
      dropDownSubTitle } = this.state
    const flatlistData = data.slice(0, showItemCount);

    return (
      <View style={styles.container}>
        <ListItem
          testID="ListItem"
          onPress={() => this.open()}
          leftAvatar={dropDownImg}
          title={
            dropdownTitle
          }
          subtitle={
            dropDownSubTitle && (
              dropDownSubTitle
            )
          }
          rightTitle={
            <Icon name="caret-down" type="font-awesome" color="grey" />
          } 
          bottomDivider
        />
        <Modal
          testID="Modal"
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.close()}
          animationOut="fadeOutDown"
          hideModalContentWhileAnimating={true}
          useNativeDriver={true}>
          <View style={styles.modalContainer}>
            <View style={styles.actionsWrapper}>
              <ListItem
                title={data.length < 1 ? 'Do you have not any item' : null}
                subtitle={title}
                bottomDivider
              />
              <FlatList
                data={flatlistData}
                renderItem={({ item, index }) => (
                  <ListItem
                    leftAvatar={
                      withAvatar &&
                      item[imgColName] && { source: item[imgColName] }
                    }
                    title={item[titleColName]}
                    subtitle={item[subtitleColName]}
                    rightTitle={rightTitle}
                    onPress={() => this.select(item)}
                    bottomDivider
                  />
                )}
                keyExtractor={item => item.id}
              />

              {data.length > showItemCount && (
                <ListItem

                  title='More'
                  onPress={() => this.more()}
                />
              )}
            </View>

            <RectButton
              onPress={() => this.setState({ isVisible: false })}
              style={styles.cancelWrapper}>
              <Text >
                cancel
              </Text>
            </RectButton>
          </View>
        </Modal>
      </View>
    );
  }
}
Index.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  showItemCount: PropTypes.number,
  onPress: PropTypes.func,
  withAvatar: PropTypes.bool,
  titleColName: PropTypes.string,
  subtitleColName: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  imgColName: PropTypes.string,
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
Index.defaultProps = {
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
};

export default Index;
const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  cancelWrapper: {
    height: 60,
    width: '100%',
    backgroundColor: colors.active,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsWrapper: {
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: colors.active,
  },
  container: {
    width: '100%',
  },
});
