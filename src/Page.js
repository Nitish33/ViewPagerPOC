import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Page extends Component {
  render() {
    console.log('Re-rendering');

    return (
      <View style={{width: '100%', height: '100%'}}>
        <Text> this is a single page </Text>
      </View>
    );
  }
}
