import React, {Component} from 'react';
import {Text, View, Animated, PanResponder, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default class ViewPager extends Component {
  constructor(props) {
    super(props);

    this.currentPage = 0;
    this.offsetValue = 0;
    this.offset = new Animated.Value(0);

    this.setPanResponder();
    this.addAnimationListener();
  }

  addAnimationListener = () => {
    this.offset.addListener(({value}) => {
      if (this.props.onScroll) {
        this.props.onScroll(value, this.offsetValue, Math.floor(value));
      }
    });
  };

  setPanResponder = () => {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.offset.stopAnimation();
      },
      onPanResponderMove: (evt, gestureState) => {
        const {dx} = gestureState;

        if (dx < 0 && this.currentPage >= this.props.children.length - 1) {
          this.offsetValue = 0;
          return;
        }
        if (dx > 0 && this.currentPage === 0) {
          this.offsetValue = 0;
          return;
        }

        if (Math.abs(dx) < 20) {
          return;
        }

        const fraction = -dx / width;
        this.offsetValue = fraction;
        this.offset.setValue(this.currentPage + fraction);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, {vx}) => {
        if (this.offsetValue != 0) this.settleToFinalValue();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        if (this.offsetValue != 0) this.settleToFinalValue();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  };

  settleToFinalValue = () => {
    const finalValue = Math.round(this.offsetValue + this.currentPage);

    Animated.timing(this.offset, {
      toValue: finalValue,
      duration: 300,
    }).start(() => {
      this.currentPage = finalValue;
      this.offsetValue = 0;
    });
  };

  render() {
    return (
      <View
        {...this._panResponder.panHandlers}
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
        }}>
        {this.props.children}
      </View>
    );
  }
}
