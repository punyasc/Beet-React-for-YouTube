import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import { Images, Colors, Metrics } from './App/Themes';
import { TabNavigator } from 'react-navigation';
import { SearchScreen } from './App/Components/SearchScreen';
import { PlayerScreen } from './App/Components/PlayerScreen';
import { HistoryScreen } from './App/Components/HistoryScreen';

export default class Beet extends React.Component {

  state = {
    query: '',
    queue: [],
    currentId: '',
    nextPageToken: ''
  };

  queryYoutube = async (newQuery) => {
    try {
      let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=10&q=${newQuery}%20type%20beat&key=${Metrics.ytKey}&pageToken=${this.state.nextPageToken}`);

      let responseJson = await response.json();
      var newItems = []

      for (item of responseJson.items) {
        newItems.push({id: item.id.videoId, title: item.snippet.title, thumbUrl: item.snippet.thumbnails.default});
      }


      this.setState({queue: newItems, loading: false, nextPageToken: responseJson.nextPageToken});

    } catch (error) {
      console.error(error);
    }
  }

  setQuery = (newQuery) => {
    this.setState({ query: newQuery, loading: true });
    this.queryYoutube(newQuery);
  }

  loadMore = () => {
    console.log("Load more, token: ", this.state.nextPageToken);
    this.queryYoutube(this.state.query);
  }

  clearHistory = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {

    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (<TabNav screenProps={{loading: this.state.loading,
                                  query: this.state.query,
                                  setQuery: this.setQuery,
                                  queue: this.state.queue,
                                  token:this.state.nextPageToken,
                                  loadMore: this.loadMore}} />
          )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.clear

  },
  container: {
    flex: 1,
    backgroundColor: Colors.clear,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    width: 26,
    height: 26,
  }
});

const TabNav = TabNavigator({
  Search: {
    screen: SearchScreen,
  },
  Player: {
    screen: PlayerScreen,
  },
  History: {
    screen: HistoryScreen,
  }
}, {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: '#893879',
    scrollEnabled: false,
    style: {
      backgroundColor: '#af67a1',
      paddingTop: Metrics.tabBarPadding,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
  },
});
