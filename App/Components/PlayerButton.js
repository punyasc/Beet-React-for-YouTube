import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Images, Colors, Metrics } from '../Themes';
import { TabNavigator } from 'react-navigation';

export default class PlayerButton extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
  }

  render() {
    const radius = this.props.radius / 2 + 20;

    return (
        <View style={{height: radius * 2, alignItems: 'center', justifyContent:'center'}}>
          <TouchableOpacity style={{flex:1}} onPress={this.props.onPress}>
             <View style={[styles.buttonContainer, {borderRadius: radius, backgroundColor: this.props.color}]}>
                 <Image
                    source={this.props.source}
                    style={[styles.icon, {width: this.props.radius, height: this.props.radius}]}
                    />
             </View>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    tintColor: 'white',
    margin: 20,
  },
  buttonContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }
});
