import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Button,
  TextInput, Keyboard, KeyboardAvoidingView, WebView, Dimensions, AsyncStorage,
  ActivityIndicator } from 'react-native';
import { Images, Colors, Metrics } from '../Themes';
import TabNavigator from 'react-navigation';
import Controls from './Controls';

export class PlayerScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Player',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={Images.player}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  state = {
    query: '',
    chosenId: '',
    chosenTitle: ' ',
    history: [],
    likes: [],
    dislikes: [],
    defaultButtonColor: '#af67a1',
    trashColor: '#af67a1',
    fireColor: '#af67a1',
    liked: false,
    disliked: false,
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.screenProps.loading) {
      this.state.queue = nextProps.screenProps.queue;
      this.nextSong();
    }
  }

  componentDidMount() {
    this.updateHistory();
    this.updateLikes();
  }

  constructor(props) {
    super(props);
  }

  async addToHistory (song) {
    const newHistory = this.state.history; //[...this.state.history, song];
    newHistory.unshift(song);
    await AsyncStorage.setItem('history',
    JSON.stringify(newHistory));

    this.updateHistory();
  }

  async updateHistory() {
    let response = await AsyncStorage.getItem('history');
    let currentHistory = await JSON.parse(response) || [];

    this.setState({
      history: currentHistory
    });
  }

  loopPress = () => {
    this.setState({loop: !this.state.loop, chosenId: this.state.chosenId + '?'});
  }

  nextSong = () => {
    if (this.state.queue.length === 0) {
      this.props.screenProps.loadMore();
    }
    var song = this.state.queue.shift();
    if (song !== undefined) {
      this.addToHistory(song);
      this.setState({chosenId: song.id, chosenTitle: song.title, liked: false, disliked: false,
        trashColor: this.state.defaultButtonColor, fireColor: this.state.defaultButtonColor});
    }

  }


  async removeLike() {
    var index = this.state.likes.indexOf(this.state.chosenId);
    if (index >= 0) {
      var newLikes = this.state.likes.splice(index, 1);
      await AsyncStorage.setItem('likes', JSON.stringify(newLikes));
      this.setState({fireColor: this.state.defaultButtonColor, liked: false});
      this.updateLikes();
    }
  }

  async addLike() {
      const newLikes = [...this.state.likes, this.state.chosenId];

      await AsyncStorage.setItem('likes',
      JSON.stringify(newLikes));
      this.setState({fireColor: 'red', liked: true});
      this.updateLikes();

  }

  async updateLikes() {
    try {
      let response = await AsyncStorage.getItem('likes');
      let currentLikes = await JSON.parse(response) || [];
      this.setState({
        likes: currentLikes
      });
    } catch (error) {
    }
  }

  like = () => {
    if (!this.state.liked) {
      this.addLike();
    } else {
      this.removeLike();
    }
  }

  startLoading = () => {
    this.setState({loading: true});
  }

  endLoading = () => {
    this.setState({loading: false});
  }

  render() {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;

    /* No video has been selected */
    if (this.props.screenProps.query === '') {
      return (
        <SafeAreaView style={styles.blank}>
          <Text style={{color: '#B065A2'}}>Search for an artist to get started.</Text>
        </SafeAreaView>
      );
    }

    /* First video is loading */
    if (this.props.screenProps.loading) {
      return (
        <SafeAreaView style={styles.blank}>
          <ActivityIndicator />
        </SafeAreaView>
      )
    }

    /* Default view */
    return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.playerPanel}>
            <Text numberOfLines={Metrics.titleLines} style={styles.beetTitle}>{this.state.chosenTitle}</Text>
            <View style={styles.videoContainer}>
              <WebView
                source={{uri: 'https://www.youtube.com/embed/' + this.state.chosenId + '?autoplay=1&playsinline=1&loop=1&rel=0&showinfo=0'}}
                style={{opacity: this.state.loading ? 0.3 : 1.0}}
                scrollEnabled={false}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                onLoadStart={this.startLoading}
                onLoadEnd={this.endLoading}
              />
            </View>
            <Controls
              defaultButtonColor={this.state.defaultButtonColor}
              fireColor={this.state.fireColor}
              likeFn={this.like}
              nextFn={this.nextSong}
              loopFn={this.loopPress}
              />
          </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  blank: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#8A357A'
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#8A357A'
  },
  icon: {
    width: 26,
    height: 26,
  },
  playerPanel: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  videoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: Metrics.screenWidth * .8,
    width: Metrics.screenWidth * .8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginBottom: 20
  },
  beetTitle: {
    fontSize: Metrics.titleFont,
    fontWeight: '600',
    color: '#B065A2',
    margin: 20
  }
});
