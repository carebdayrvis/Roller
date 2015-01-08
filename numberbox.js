var root = (typeof global) === 'object' ? global : window;
var r = React.DOM;
root.NumberBox = ReactMeteor.createClass({
	getMeteorState: function(){
		return {
			singleHistory: RollHistory.find({}, {sort: {timestamp: -1}, limit:1}).fetch(),
			history: RollHistory.find().fetch()
		}
	},
	setFrequency: function(e){ 
		this.setState({frequency: e.target.value});
	},
	setName: function(e){
		this.setState({name: e.target.value});
	},
	scrollToBottom: function(){
		var rollHistoryDiv = this.refs.rollHistory.getDOMNode();
		rollHistoryDiv.scrollTop = rollHistoryDiv.scrollHeight;
	},
	sendRoll: function(rolls){
		var self = this;
		RollHistory.insert({name: this.state.name, rolls: rolls, timestamp: Date.now()}, function(){
			self.scrollToBottom();
		});
	},
	roll: function(e){
		if(!this.state.frequency) {
			this.state.frequency = 1;
		} 
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
		var time = moment(parseInt(roll.timestamp)).fromNow();
		return r.span({
			className: 'roll'
		},[
		r.strong({}, roll.name + ': '),
		roll.rolls,
		r.span({
			className: 'rollTime muted'
		}, time)
		])
	},
	expandHistory: function(){
		var single = this.refs.singleRollHistory.getDOMNode();
		var full = this.refs.rollHistory.getDOMNode();
		$(single).toggleClass('hiddenHistory');
		$(full).toggleClass('hiddenHistory');
	},
	render: function(){
		if(!this.state.numbers) this.state.numbers = '';
		if(!this.state.name) this.state.name = 'Someone';
		return r.div({
			className: 'numberBox'
		},[
			r.input({
				placeholder: 'Name',
				onChange: this.setName
			}),
			r.input({
				onChange: this.setFrequency,
				placeholder: 'Custom roll frequency'
			}),
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
			r.div({
				ref: 'singleRollHistory',
				className: 'singleRollHistory',
			}, this.state.singleHistory.map(this.renderRollHistory)),
			r.div({
				ref: 'rollHistory',
				className: 'rollHistory hiddenHistory',
				ref: 'rollHistory'
			}, this.state.history.map(this.renderRollHistory)),
			r.button({
				ref: 'historyButton',
				className: 'showHistory',
				onClick: this.expandHistory
			}, 'Toggle History')
		])
	}
});