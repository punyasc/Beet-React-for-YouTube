import React from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import { Images, Colors, Metrics } from '../Themes';
import PlayerButton from './PlayerButton';

export default class Controls extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
  }

  render() {
    return (
      <View style={styles.container}>
        <PlayerButton
          radius={Metrics.screenWidth * .1}
          source={Images.fire}
          onPress={this.props.likeFn}
          color={this.props.fireColor}
          elevation={3}
          />
        <PlayerButton
          radius={Metrics.screenWidth * .1}
          source={Images.loop}
          onPress={this.props.loopFn}
          color={this.props.defaultButtonColor}
          elevation={5}
          />
        <PlayerButton
          radius={Metrics.screenWidth * .1}
          source={Images.next}
          onPress={this.props.nextFn}
          color={this.props.defaultButtonColor}
          elevation={2}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
    flex: 1,
    width: Metrics.screenWidth
  }
});
