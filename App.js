import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet, Animated} from 'react-native';
import ViewPager from './src/ViewPager';

export default class App extends Component {
  constructor(props) {
    super(props);

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
                  {
                    transform: [
                      {translateX: 0},
                      {rotate: this.getRotationFor(0)},
                      {scale: this.getScaleFor(0)},
                    ],
                    backgroundColor: 'red',
                    opacity: this.getOpacityFor(0),
                  },
                ]}>
                <Text style={{}}>One</Text>
              </View>

              <View
                style={[
                  localStyle.pagerContainerStyle,
                  {
                    backgroundColor: 'green',
                    transform: [
                      {translateX: -(this.pagerWidth * 1)},
                      {rotate: this.getRotationFor(1)},
                      {scale: this.getScaleFor(1)},
                    ],
                    opacity: this.getOpacityFor(1),
                  },
                ]}>
                <Text style={{}}>Two</Text>
              </View>

              <View
                style={[
                  localStyle.pagerContainerStyle,
                  {
                    backgroundColor: 'red',
                    transform: [
                      {translateX: -(this.pagerWidth * 2)},
                      {rotate: this.getRotationFor(2)},
                      {scale: this.getScaleFor(2)},
                    ],
                    opacity: this.getOpacityFor(2),
                  },
                ]}>
                <Text style={{}}>Three</Text>
              </View>

              <View
                style={[
                  localStyle.pagerContainerStyle,
                  {
                    backgroundColor: 'green',
                    transform: [
                      {translateX: -(this.pagerWidth * 3)},
                      {rotate: this.getRotationFor(3)},
                      {scale: this.getScaleFor(3)},
                    ],
                    opacity: this.getOpacityFor(3),
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
                  {
                    backgroundColor: 'red',
                    transform: [
                      {translateX: -(this.pagerWidth * 4)},
                      {rotate: this.getRotationFor(4)},
                      {scale: this.getScaleFor(4)},
                    ],
                    opacity: this.getOpacityFor(4),
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
