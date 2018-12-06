/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {observable, action, computed} from 'mobx';
import {observer} from 'mobx-react/native';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu'
});

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
@observer
export default class App extends Component<Props> {
	@observable
	_count: number = 0;

	@action
	setCount() {
		this._count++;
	}

	@computed
	get count() {
		return this._count;
	}
	render() {
		// const {count} = this;
		return (
			<View style={styles.container}>
				{tags.map((item: string) => (
					<Text key={item} style={styles.item}>
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
		paddingTop: 48
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
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 8,
		paddingBottom: 8,
		fontSize: 15,
		marginLeft: 12,
		marginTop: 8,
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 5
	}
});
