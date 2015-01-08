var root = (typeof global) === 'object' ? global : window;
root.RollHistory = new Meteor.Collection('rollhistory');
if (Meteor.isClient){
	Meteor.startup(function(){
		return React.renderComponent(Main(), document.getElementById('main'));
	})
}