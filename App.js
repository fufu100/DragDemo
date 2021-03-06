/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
	StyleSheet,
	Animated,
	Text,
	View,
	PanResponder,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native';
import {observable, action, computed} from 'mobx';
import {observer} from 'mobx-react/native';

// const instructions = Platform.select({
// 	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
// 	android:
// 		'Double tap R on your keyboard to reload,\n' +
// 		'Shake or press menu button for dev menu'
// });

const tags = [
	'中央税收法规',
	'地方税收法规',
	'个人所得税',
	'土地增值税',
	'环境法规',
	'增值税',
	'金融法规',
	'企业所得税',
	'房产税',
	'印花税',
	'社保法规',
	'住建法规',
	'财政法规',
	'国土法规'
];

type Props = {};
type Position = {
	width: number,
	height: number,
	p: Animated.ValueXY
	// x: number,
	// y: number
};
type State = {
	position: Array<Position>
	// currentIndex: number
};
@observer
export default class App extends Component<Props, State> {
	@observable
	_count: number = 0;
	isMovePanResponder: boolean = false;
	currentIndex: number = 1;
	_panResponder: Object;
	constructor() {
		super();

		let position = [];
		let width = Dimensions.get('window').width;
		console.log(width);
		let line = 1;
		let margin = 12;
		for (let i = 0; i < tags.length; i++) {
			let w = tags[i].length * 15 + 32;
			let h = 30;
			let x =
				i == 0
					? margin
					: position[i - 1].p.x._offset + position[i - 1].width + margin;
			let y = (line - 1) * (h + margin);

			if (x + w > width) {
				x = margin;
				y += h + margin;
				line += 1;
			}
			position[i] = {
				width: w,
				height: h,
				p: new Animated.ValueXY()
			};
			position[i].p.setOffset({x, y});
			// position[i].p.flattenOffset();
			position[i].p.addListener((callback: any) =>
				console.log('callback', i, callback)
			);
		}
		console.log(position);
		this.state = {
			position,
			currentIndex: 0
		};
	}

	@action
	setCount() {
		this._count++;
	}

	@computed
	get count() {
		return this._count;
	}

	UNSAFE_componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onStartShouldSetPanResponderCapture: () => {
				this.isMovePanResponder = false;
				return false;
			},

			onMoveShouldSetResponderCapture: () => this.isMovePanResponder,
			onMoveShouldSetPanResponderCapture: () => this.isMovePanResponder,

			onPanResponderGrant: (e: any, gestureState: Object) => {
				console.log('onPanResponderGrant', this.currentIndex);
			},
			onPanResponderMove: ({nativeEvent}: any, gestureState: Object) => {
				console.log(nativeEvent, gestureState);
				const {dx, dy} = gestureState;
				this.state.position[this.currentIndex].p.setValue({x: dx, y: dy});
				// Animated.event([
				// 	null,
				// 	{
				// 		dx: this.state.position[this.currentIndex].p.x,
				// 		dy: this.state.position[this.currentIndex].p.y
				// 	}
				// ]);
			},

			onPanResponderRelease: (e, {vx, vy}) => {}
		});
	}

	_startDrag = (index: number) => {
		console.log('start drag', index);
		// this.setState({currentIndex: index});
		this.currentIndex = index;
		this.isMovePanResponder = true;
	};

	render() {
		const {position} = this.state;
		return (
			<View style={styles.container}>
				{tags.map((item: string, i: number) => (
					<Animated.View
						key={item}
						style={{
							position: 'absolute',
							width: position[i].width,
							height: position[i].height,
							transform: [
								{translateX: position[i].p.x},
								{translateY: position[i].p.y}
							]
						}}
						{...this._panResponder.panHandlers}
						// useNativeDriver={true}
					>
						<TouchableWithoutFeedback onLongPress={() => this._startDrag(i)}>
							<Text
								style={[
									styles.item,
									{
										width: position[i].width,
										height: position[i].height
										// left: position[i].x,
										// top: position[i].y,
									}
								]}
							>
								{item}
							</Text>
						</TouchableWithoutFeedback>
					</Animated.View>
				))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		backgroundColor: '#F5FCFF',
		marginTop: 48
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	item: {
		position: 'absolute',
		textAlign: 'center',
		paddingTop: 6,
		paddingBottom: 8,
		fontSize: 15,
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 5
	}
});
