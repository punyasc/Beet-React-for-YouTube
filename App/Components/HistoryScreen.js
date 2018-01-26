import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Button, KeyboardAvoidingView, StatusBar, AsyncStorage, FlatList } from 'react-native';
import { Images, Colors, Metrics } from '../Themes';
import TabNavigator from 'react-navigation';
import ListItem from './ListItem';

export class HistoryScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'History',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={Images.history}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  state = {
    query: '',
    history: [],
    searchResults: [],
    refreshing: false
  }

  constructor(props) {
    super(props);
    this.updateHistory();
  }

  componentWillReceiveProps(nextProps) {
    this.updateHistory();
  }

  processRatings = async () => {
    try {
      var history = this.state.history;
      for (item of history) {
        let likesResponse = await AsyncStorage.getItem('likes');
        let likes = await JSON.parse(likesResponse) || [];
        var image = (likes.indexOf(item.id) >= 0) ? Images.fire : null;
        item.ratingImage = image;
      }
      this.setState({history: history});
    } catch (error) {
    }
  }

  updateHistory = async() => {
    try {
      let response = await AsyncStorage.getItem('history');
      let currentHistory = await JSON.parse(response) || [];
      this.setState({
        history: currentHistory
      });
      this.processRatings();
    } catch (error) {
      console.log("Error getting history", error);
    }
  }

  onRefresh = async() => {
    this.updateHistory();
  }

  render() {

    return (
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView style={{flex:1}} behavior="padding">
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.beetTitle}>History</Text>
              </View>
              <View>
              </View>
              <FlatList
                style={{}}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                data={this.state.history}
                renderItem={({item}) => <ListItem item={item}/>}
                keyExtractor={(item, index) => index}
                ItemSeparatorComponent={() => <View style={{height: 0.5, backgroundColor: '#B065A2'}}></View>}
                ListFooterComponent={() => <View style={{height: 20}}></View>}
                ListHeaderComponent={() => <View style={{height: 20}}></View>}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8A357A'
  },
  icon: {
    width: 26,
    height: 26,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  beetTitle: {
    fontSize: 50,
    fontWeight: '600',
    color: '#B065A2',
    margin: 10,
    flex: 1,
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  listItem: {
    color: '#B065A2',
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16
  }
});
