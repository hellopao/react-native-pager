"use strict";

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ViewPagerAndroid
} from 'react-native';
import Dimensions from "Dimensions";

const {width, height} = Dimensions.get('window');

class ViewPager extends Component {

	constructor(props) {
		super(props);
		this.state = {
            index: 0
        };
	}

	onPageSelected(e) {
	    const index = e.nativeEvent.position
		this.setState({index});

        this.props.onPageChanged && this.props.onPageChanged(index);
	}

	onPageScrollStateChanged(state) {
		const total = this.props.children.length;

		this.setState({
			reachStart: this.state.index === 0 && state === "dragging",
			reachEnd: this.state.index === total - 1 && state === "dragging"
		});

		if (this.state.index === total - 1 && state === "idle" && this.state.reachEnd) {
			this.onReachEnd();
		}

		if (this.state.index === 0 && state === "idle" && this.state.reachStart) {
			this.onReachStart();
		}
	}

	setPage(index) {
		this.viewPager.setPageWithoutAnimation(index);
		this.setState({index});
		this.props.onPageChanged && this.props.onPageChanged(index);
	}

	onReachStart() {
		if (this.props.loop) {
			this.setPage(this.props.children.length - 1);
		} else {
			this.props.onReachStart && this.props.onReachStart(this.viewPager);
		}
	}

	onReachEnd() {
		if (this.props.loop) {
			this.setPage(0);
		} else {
			this.props.onReachStart && this.props.onReachStart(this.viewPager);
		}
	}

	render() {
		return (
            <ViewPagerAndroid
                style={{width, height}}
                ref={viewPager => this.viewPager = viewPager}
                initialPage={this.props.index}
                onPageScrollStateChanged={(state) => this.onPageScrollStateChanged(state)}
                onPageSelected={(e)=> this.onPageSelected(e)}>
                {this.props.children}
            </ViewPagerAndroid>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default ViewPager;
