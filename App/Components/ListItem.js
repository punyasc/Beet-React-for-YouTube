import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Linking } from 'react-native';
import { Images, Colors, Metrics } from '../Themes';

export default class ListItem extends React.Component {

  state = {
  }

  constructor(props) {
    super(props);
  }

  openLink = () => {
    Linking.openURL(`https://youtube.com/watch?v=${this.props.item.id}`);
  }

  render() {
    const radius = this.props.radius;

    return (
      <TouchableOpacity onPress={this.openLink}>
        <View style={styles.container}>
          <View style={{flex: 2, marginLeft: 20, marginRight: 10, marginTop: 10, marginBottom: 10}}>
            <Text style={styles.title}>{this.props.item.title || ''}</Text>
          </View>
          <Image
            source={this.props.item.ratingImage || null}
            style={styles.image}
            />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth
  },
  title: {
    color: '#B065A2',
    fontSize: 16
  },
  image: {
    tintColor: '#B065A2',
    width: 20,
    height: 20,
    marginRight: 10
  }
});
