'use strict';
// https://github.com/Slowyn/react-native-underline-tabbar
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    ScrollView,
    Dimensions
} from 'react-native';

const window = Dimensions.get('window');
export const height = window.height;
export const width = window.width;
let naviButtonWidth = width / 3;    //计算导航条每个宽度
let naviButtonHeight = width * 0.75;   // 导航条每个高度

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height:46,
    width: naviButtonWidth,

  },
  scrollContainer: {
    paddingRight: 0,
  },
  tabs: {
    height:47,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#d2d2d2'
  },

  badgeBubble: {
    width: 15,
      height:15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    top: -0.5
  }
});

class TabBar extends Component {

  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    underlineColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    tabBarTextStyle:PropTypes.object,
    scrollContainerStyle: PropTypes.object,
    tabStyles: PropTypes.object
  };


  static defaultProps = {
    tabStyles: {}
  };

  constructor(props) {
    super(props);
    this.tabState = {};
    this.state = {
      renderUnderline: false,
      tabScrollValue: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeTab !== this.props.activeTab) {
      this._checkViewportOverflows();
    }
  }

  _checkViewportOverflows() {
    const getScreenMargin = (props) => {
      return StyleSheet.flatten([styles.tab, props.tabStyles.tab]).marginLeft;
    };

    const screenMargin = getScreenMargin(this.props);
    const currentTabLayout = this.tabState[this.props.activeTab];
    const rightOverflow = currentTabLayout.x + currentTabLayout.width - SCREEN_WIDTH;
    const hasRightViewportOverflow = rightOverflow > this.state.tabScrollValue;
    const hasLeftViewportOverflow = (currentTabLayout.x < this.state.tabScrollValue);

    if (hasRightViewportOverflow) {      
      const isLastTab = this.props.tabs.length === this.props.activeTab + 1;
      const n = isLastTab ? 1 : 2;
      const x = rightOverflow + screenMargin * n;
      const y = 0;
      return this.scrollTabs.scrollTo({x , y});
    }

    if (hasLeftViewportOverflow) {
      const isFirstTab = this.props.activeTab === 0;
      const x = isFirstTab? 0 : currentTabLayout.x - screenMargin * 2;
      const y = 0;
      return this.scrollTabs.scrollTo({x, y});
    }
  }

  onTabLayout(event, page) {
    var {x, y, width, height} = event.nativeEvent.layout;
    this.tabState[page] = {x, y, width, height};
    if (this.props.tabs.length === Object.keys(this.tabState).length) {
      this.setState({renderUnderline: true});
    }
  }

  renderTab = (tab, page) => {
      console.log("==renderTab=="+page);
      // this.props.callback(page);
      const {activeTab, tabBadgeColor} = this.props;
    const {label,  badge,badgeColor,theLast} = tab;
    const isTabActive = activeTab === page;
    const activeTextColor = this.props.activeTextColor || "navy";
    const inactiveTextColor = this.props.inactiveTextColor || "black";
    const textStyle = this.props.tabBarTextStyle || {};
    return (
        <TouchableOpacity key={page}
                          onPress={() => this.props.goToPage(page)}
                          onLayout={(event) => this.onTabLayout(event, page)}>
          <View style={[styles.tab, this.props.tabStyles.tab]}>
            <View style={{
                justifyContent:'space-between',
                flexDirection:'row',
                alignItems:'center',
                width:naviButtonWidth-2,
                height:46,
            }}>
              <View style={{width:theLast,height:20,backgroundColor:'#d2d2d2'}}/>
              <Text style={[{color: isTabActive ? activeTextColor : inactiveTextColor, alignSelf:'center',fontWeight: isTabActive ? '400' : '400'}, textStyle]}>{label}</Text>
              <View style={{width:theLast,height:20,backgroundColor:'#d2d2d2'}}/>
              <View style={{position: 'absolute',
                  marginLeft:naviButtonWidth-35,
                  paddingTop:8,
                  width: 15,
                  height:46,}}>
                {badge != null && badge > 0 && badge<100&&
                <View style={[styles.badgeBubble,
                    this.props.tabStyles.badgeBubble,
                    {backgroundColor: badgeColor || activeTextColor},{width:10+5*(badge+"").length}]}>
                  <Text style={[styles.badgeText, this.props.tabStyles.badgeText]}>{badge || 0}</Text>
                </View>}

                {badge != null && badge > 99&&
                <View style={[styles.badgeBubble,
                    this.props.tabStyles.badgeBubble,
                    {backgroundColor: badgeColor || activeTextColor},{width:10+5*(badge+"").length}]}>
                  <Text style={[styles.badgeText, this.props.tabStyles.badgeText]}>99+</Text>
                </View>}
              </View>
            </View>

            </View>


        </TouchableOpacity>

    );
  }

  renderUnderline() {
    var inputRange = Object.keys(this.tabState);
    var outputRangeLeft = [];
    var outputRangeWidth = [];

    for (var k in this.tabState) {
      if (this.tabState.hasOwnProperty(k)) {
        outputRangeLeft.push(this.tabState[k].x);
        outputRangeWidth.push(this.tabState[k].width);
      }
    }

    var left = this.props.scrollValue.interpolate({
      inputRange: inputRange, outputRange: outputRangeLeft
    });

    var width = this.props.scrollValue.interpolate({
      inputRange: inputRange, outputRange: outputRangeWidth
    });

    var tabUnderlineStyle = {
      position: 'absolute',
      backgroundColor: this.props.underlineColor || "navy",
      height: 2,
      bottom: 0,
    };

    return <Animated.View style={[tabUnderlineStyle, {left}, {width}]}/>
  }

  render() {
    return (
        <Animated.View style={[styles.tabs, {backgroundColor : this.props.backgroundColor}, this.props.style, this.props.tabBarStyle]}>
          <ScrollView horizontal={true}
                      contentContainerStyle={[styles.scrollContainer, this.props.scrollContainerStyle]}
                      showsHorizontalScrollIndicator={false}
                      ref={(node) => this.scrollTabs = node}
                      bounces={false}
                      scrollEventThrottle={16}
                      onScroll={(e) => this.setState({tabScrollValue: e.nativeEvent.contentOffset.x})}>
            {this.props.tabs.map(this.renderTab)}
            {this.state.renderUnderline && this.renderUnderline()}
          </ScrollView>
        </Animated.View>
    );
  }
}

module.exports = TabBar; 
