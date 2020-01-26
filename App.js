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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.transitionManager = new VerticalFlipTransition();
    this.state = {
      offsetValue: 0,
      currentPage: 0,
      value: 0,
    };

    this.pagerWidth = 0;
  }

  getOpacityFor = pageNo => {
    const {currentPage, value} = this.state;

    const diffInPage = Math.abs(value - pageNo);
    const fraction = value - currentPage;

    if (diffInPage > 1) {
      return 0;
    }

    if (pageNo === currentPage) {
      return 1 - Math.round(fraction);
    }

    return Math.round(fraction);
  };

  getRotationFor = pageNo => {
    return '0deg';

    const {currentPage, value} = this.state;

    const diffInPage = Math.abs(value - pageNo);
    const fraction = value - currentPage;

    if (diffInPage > 1) {
      return '0deg';
    }

    return `${fraction * 360}deg`;
  };

  getScaleFor = pageNo => {
    const {currentPage, value} = this.state;
    const diffInPage = Math.abs(value - pageNo);
    const fraction = value - currentPage;

    if (diffInPage > 1) {
      return 0;
    }

    if (pageNo === currentPage) {
      return 1 - fraction;
    }

    return fraction;
  };

  render() {
    const {value, currentPage, offsetValue} = this.state;
    const pageInfo = {
      currentPage,
      offset: value,
      width: this.pagerWidth,
    };

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              width: '100%',
              overflow: 'scroll',
            }}>
            <ViewPager
              onScroll={(value, offsetValue, currentPage) => {
                this.setState({
                  offsetValue: offsetValue,
                  currentPage: currentPage,
                  value: value,
                });
              }}>
              <View
                style={[
                  localStyle.pagerContainerStyle,
                  this.transitionManager.getTransitionStyleFor(0, pageInfo),
                  {
                    backgroundColor: 'red',
                  },
                ]}>
                <Text style={{}}>One</Text>
              </View>

              <View
                style={[
                  localStyle.pagerContainerStyle,
                  this.transitionManager.getTransitionStyleFor(1, pageInfo),
                  {
                    backgroundColor: 'green',
                  },
                ]}>
                <TouchableOpacity
                  style={{padding: 16, backgroundColor: 'red'}}
                  onPress={() => {
                    Alert.alert('pressed');
                  }}>
                  <Text>Press</Text>
                </TouchableOpacity>
                <Text>two</Text>
              </View>

              <View
                style={[
                  localStyle.pagerContainerStyle,
                  this.transitionManager.getTransitionStyleFor(2, pageInfo),
                  {
                    backgroundColor: 'red',
                  },
                ]}>
                <Text style={{}}>Three</Text>
              </View>

              <View
                style={[
                  localStyle.pagerContainerStyle,
                  this.transitionManager.getTransitionStyleFor(3, pageInfo),
                  {
                    backgroundColor: 'green',
                  },
                ]}>
                <Text>Four</Text>
              </View>

              <View
                onLayout={({
                  nativeEvent: {
                    layout: {width},
                  },
                }) => {
                  this.pagerWidth = width;
                }}
                style={[
                  localStyle.pagerContainerStyle,
                  this.transitionManager.getTransitionStyleFor(4, pageInfo),
                  {
                    backgroundColor: 'red',
                  },
                ]}>
                <Text style={{}}>Five</Text>
              </View>
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
});
