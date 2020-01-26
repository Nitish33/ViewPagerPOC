import React, {Component} from 'react';
import {
  Text,
  View,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
} from 'react-native';
import TransitionManager from './PagerTransitionManager/TransitionManager';

const {width} = Dimensions.get('window');

const TransitionState = {
  IDEAL: 'ideal',
  SCROLLING: 'scrolling',
  SETTLING: 'settling',
};

export default class ViewPager extends Component {
  constructor(props) {
    super(props);

    this.currentPage = 0;
    this.offsetValue = 0;
    this.offset = new Animated.Value(0);
    this.offsetWhileInterruption = 0;
    this.transitionState = TransitionState.IDEAL;

    this.setPanResponder();
    this.addAnimationListener();

    this.transitionManager = new TransitionManager();

    this.state = {
      currentPage: 0,
      offsetValue: 0,
      currentOffset: 0,
    };
  }

  addAnimationListener = () => {
    this.offset.addListener(({value}) => {
      this.setState({
        currentPage: Math.floor(value),
        currentOffset: value,
      });
    });
  };

  setPanResponder = () => {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.offset.stopAnimation(value => {
          this.offsetWhileInterruption = value;
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        const {dx} = gestureState;

        if (dx < 0 && this.currentPage >= this.props.children.length - 1) {
          this.setState({
            offsetValue: 0,
          });
          return;
        }
        if (dx > 0 && this.currentPage === 0) {
          this.setState({
            offsetValue: 0,
          });
          return;
        }

        this.transitionState = TransitionState.SCROLLING;
        const fraction = -dx / width;

        if (
          this.transitionState === TransitionState.IDEAL &&
          Math.abs(fraction) < 0.05
        ) {
          return;
        }

        this.setState({
          offsetValue: fraction,
        });
        this.offset.setValue(this.currentPage + fraction);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, {vx}) => {
        if (this.state.offsetValue != 0) this.settleToFinalValue();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        if (this.state.offsetValue != 0) this.settleToFinalValue();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  };

  settleToFinalValue = () => {
    const finalValue = Math.round(this.state.offsetValue + this.currentPage);
    this.transitionState = TransitionState.SETTLING;

    Animated.timing(this.offset, {
      toValue: finalValue,
      duration: 300,
    }).start(() => {
      this.currentPage = finalValue;
      this.offsetValue = 0;
      this.offsetWhileInterruption = 0;
      this.transitionState = TransitionState.IDEAL;
    });
  };

  componentDidMount() {
    this.setTransitionManager();

    if (this.props.currentPage) {
      this.smoothScrollToPage(this.props.currentPage - 1);
    }
  }

  smoothScrollToPage = toPage => {
    this.transitionManager = new TransitionManager();
    Animated.timing(this.offset, {
      toValue: toPage,
      duration: 500,
    }).start(() => {
      this.setTransitionManager();
      this.setState({
        currentPage: toPage,
        offsetValue: toPage,
      });
    });
  };

  setTransitionManager = () => {
    if (this.props.transitionManager) {
      this.transitionManager = this.props.transitionManager;
    } else {
      this.transitionManager = new TransitionManager();
    }
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
        {/* Initially rendering empty view to get the dimension of the
         screen */}
        {!this.state.hasLayout && (
          <View
            style={{width: '100%', height: '100%', zIndex: 0, opacity: 0}}
            onLayout={({
              nativeEvent: {
                layout: {width, height},
              },
            }) => {
              this.setState({
                width: width,
                height: height,
                hasLayout: true,
              });
            }}
          />
        )}

        {/* Only rendering the child after we have dimension of the screen */}
        {this.state.hasLayout &&
          this.props.children.map((child, index) => {
            const pageInfo = {
              currentPage: this.state.currentPage,
              offset: this.state.currentOffset,
              width: this.state.width,
              height: this.state.height,
            };

            return (
              <View
                key={index}
                style={[
                  this.transitionManager.getTransitionStyleFor(index, pageInfo),
                  localStyle.pagerContainerStyle,
                ]}>
                {child}
              </View>
            );
          })}
      </View>
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
