import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Animated,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ViewPager from './src/ViewPager';
import TransitionManager from './src/PagerTransitionManager/TransitionManager';
import FadeInFadeOutTransitionStyle from './src/PagerTransitionManager/FadeInFadeOut';
import ScaleTransition from './src/PagerTransitionManager/ScaleTransition';
import DepthTransition from './src/PagerTransitionManager/DepthTransition';
import ClockTransition from './src/PagerTransitionManager/ClockTransition';
import ZoomOut from './src/PagerTransitionManager/ZoomoutTransition';
import VerticalFlipTransition from './src/PagerTransitionManager/VerticalFlipTransition';
import Page from './src/Page';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.transitionManager = new VerticalFlipTransition();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              width: '100%',
              overflow: 'scroll',
            }}>
            <ViewPager transitionManager={new ScaleTransition()}>
              <Text style={[localStyle.pageStyle, {backgroundColor: 'red'}]}>
                One
              </Text>
              <Page />
              <Text style={[localStyle.pageStyle, {backgroundColor: 'green'}]}>
                two
              </Text>
              <Text style={[localStyle.pageStyle, {backgroundColor: 'blue'}]}>
                Three
              </Text>
              <Text style={[localStyle.pageStyle, {backgroundColor: 'red'}]}>
                Four
              </Text>
              <Text style={[localStyle.pageStyle, {backgroundColor: 'yellow'}]}>
                Five
              </Text>
            </ViewPager>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const localStyle = StyleSheet.create({
  pagerContainerStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  pageStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
  },
});
