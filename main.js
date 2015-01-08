var root = (typeof global) === 'object' ? global : window;
var r = React.DOM;
root.Main = ReactMeteor.createClass({
	getMeteorState: function(){
		//RollHistory: RollHistory.find().fetch();
	},
	render: function(){
		return  NumberBox();
	}
});
