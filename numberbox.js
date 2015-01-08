var root = (typeof global) === 'object' ? global : window;
var r = React.DOM;
root.NumberBox = ReactMeteor.createClass({
	getMeteorState: function(){
		//this.setState({frequency: 1});
		//this.setState({numbers: ''});
		return {
			history: RollHistory.find().fetch()
		}
	},
	setFrequency: function(e){ 
		this.setState({frequency: e.target.value});
	},
	setName: function(e){
		this.setState({name: e.target.value});
	},
	sendRoll: function(rolls){
		console.log(this.state.history);
		RollHistory.insert({name: this.state.name, rolls: rolls});
	},
	roll: function(e){
		if(!this.state.frequency) {
			this.state.frequency = 1;
		} 
		console.log('Rolled D' + e.target.id + ' ' + this.state.frequency + ' times.');
		var rolls = this.state.frequency;
		var maxNumber = parseInt(e.target.id);
		var result = [];
		for (var i = 0; i < rolls; i++) {
			result.push(Math.floor(Math.random() * maxNumber) + 1);
		};
		var formattedResult = result.join(', ');
		this.setState({numbers: formattedResult});
		this.sendRoll(formattedResult);
	},
	renderRollHistory: function(roll){
		return r.span({
			className: 'roll'
		},[
		r.strong({}, roll.name + ': '),
		roll.rolls
		])
	},
	render: function(){
		if(!this.state.numbers) this.state.numbers = '';
		if(!this.state.name) this.state.name = 'Caleb';
		return r.div({},[
			r.input({
				placeholder: 'Name',
				onChange: this.setName
			}),
			r.h1({}, 'Dice output: ' + this.state.numbers),
			r.input({
				onChange: this.setFrequency,
				placeholder: 'Custom roll frequency'
			}),
			r.br({}),
			r.br({}),
			r.select({
				onChange: this.setFrequency
			},
				r.option({}, 1),
				r.option({}, 2),
				r.option({}, 3),
				r.option({}, 4),
				r.option({}, 5),
				r.option({}, 6),
				r.option({}, 7),
				r.option({}, 8),
				r.option({}, 9),
				r.option({}, 10)
			),
			r.br({}),
			r.br({}),
			r.button({
				onClick: this.roll,
				id: 2
			}, 'D2'),
			r.button({
				onClick: this.roll,
				id: 3
			}, 'D3'),
			r.button({
				onClick: this.roll,
				id: 6
			}, 'D6'),
			r.button({
				onClick: this.roll,
				id: 8
			}, 'D8'),
			r.button({
				onClick: this.roll,
				id: 10
			}, 'D10'),
			r.button({
				onClick: this.roll,
				id: 20
			}, 'D20'),
			r.button({
				onClick: this.roll,
				id: 100
			}, 'D100'),
			r.div({
				className: 'rollHistory'
			}, this.state.history.map(this.renderRollHistory))
		])
	}
})