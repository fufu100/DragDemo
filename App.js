/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
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
	x: number,
	y: number
};
type State = {
	position: Array<Position>
};
@observer
export default class App extends Component<Props, State> {
	@observable
	_count: number = 0;

	constructor() {
		super();

		let position = [];
		let width = Dimensions.get('window').width;
		let line = 1;
		let margin = 12;
		for (let i = 0; i < tags.length; i++) {
			let w = tags[i].length * 15 + 32;
			let h = 30;
			let x =
				i == 0 ? margin : position[i - 1].x + position[i - 1].width + margin;
			let y = (line - 1) * (h + margin);

			if (x + w > width) {
				x = margin;
				y += h + margin;
				line += 1;
			}
			position[i] = {width: w, height: h, x, y};
		}
		console.log(position);
		this.state = {
			position
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
	render() {
		const {position} = this.state;
		return (
			<View style={styles.container}>
				{tags.map((item: string, i: number) => (
					<Text
						key={item}
						style={[
							styles.item,
							{
								width: position[i].width,
								height: position[i].height,
								left: position[i].x,
								top: position[i].y
							}
						]}
					>
						{item}
					</Text>
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
