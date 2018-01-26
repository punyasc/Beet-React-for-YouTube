import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Button, TextInput, Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Images, Colors, Metrics } from '../Themes';
import { TabNavigator } from 'react-navigation';

export class SearchScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Search',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={Images.search}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  state = {
    query: ''
  }

  searchPress = () => {
    Keyboard.dismiss();
    if (this.state.query.length > 0) {
      this.props.screenProps.setQuery(this.state.query);
      this.props.navigation.navigate('Player');
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView style={{flex:1}} behavior="padding">
            <View style={styles.container}>
              <Text style={styles.beetTitle}>Beet.</Text>
              <TextInput
                placeholder={'Enter an artist'}
                placeholderColor={'#59244e'}
                style={styles.searchBar}
                onChangeText={(text) => this.setState({query: text})}
                onSubmitEditing={this.searchPress}
                value={this.state.query}
                underlineColorAndroid={Colors.clear}
                selectionColor={'#ffffff'}
              />
              <Button
                title={'Search'}
                onPress={this.searchPress}
                color='#B065A2'/>
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
  beetTitle: {
    fontSize: 80,
    fontWeight: '600',
    color: '#B065A2'
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
  searchBar: {
    height: 40,
    width: 200,
    backgroundColor: '#B065A2',
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    margin: 20,
    fontWeight:'400',
    color: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  }
});
