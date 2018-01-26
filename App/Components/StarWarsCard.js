import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Button } from 'react-native';
import { Images, Colors, Metrics } from '../Themes';

export default class StarWarsCard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
           <View style={styles.card}>
           <View style={styles.pictureView}>
               <Image style={ { height: Metrics.images.large, width: Metrics.images.large, borderRadius: 18 } }
                 source={Images.jedi3}/>
                 <View style={styles.pictureDetails}>
                   <Text style={{fontWeight:"bold"}}>{this.props.jedi.name}</Text>
                   <Text>{this.props.jedi.gender}</Text>
                 </View>
           </View>
           <View style={styles.detailRow}>
             <Text style={{fontWeight:"bold"}}>Birth Year</Text>
             <Text style={{fontWeight:"bold"}}>Height</Text>
             <Text style={{fontWeight:"bold"}}>Weight</Text>
           </View>
           <View style={[styles.detailRow, {marginTop: 0}]}>
             <Text>{this.props.jedi.birthYear}</Text>
             <Text>{this.props.jedi.height}</Text>
             <Text>{this.props.jedi.weight}</Text>
           </View>
            <View style={styles.detailRow}>
                <Text style={{fontWeight:"bold"}}>Hair Color</Text>
                <Text style={{fontWeight:"bold"}}>Eye Color</Text>
                <Text style={{fontWeight:"bold"}}>Skin Color</Text>
              </View>
              <View style={[styles.detailRow, {marginTop: 0}]}>
                <Text>{this.props.jedi.hairColor}</Text>
                <Text>{this.props.jedi.eyeColor}</Text>
                <Text>{this.props.jedi.skinColor}</Text>
              </View>
          </View>

    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: Metrics.baseMargin,
    borderWidth: 2,
    borderRadius: 18,
    width: Metrics.screenWidth * .9
  },
  pictureView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pictureDetails: {
    marginLeft: Metrics.marginHorizontal
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: Metrics.marginHorizontal,
    marginVertical: Metrics.marginVertical
  }
});
