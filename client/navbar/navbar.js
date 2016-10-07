
/*Template.mainNav.helpers({
	'isOwner':function(){
		return this.owner === Meteor.userId();
	},
});*/
Template.mainNav.onCreated(function(){
	var self=this;
	this.autorun(function(){
		self.myval = "BUY";
	});
});

Template.mainNav.events({
	'click .drpdown_rent':function (event,t) {
		//var t.myval = "RENT";
		//Meteor.call("buy_helper_func",name);
		var $this = $(event.target);
	},
	'click .drpdown_buy':function(event,t){
		//var t.myval = "BUY";
		//var name = "BUY";
		//console.log(t.myval);
		//Meteor.call("buy_helper_func",name);
		var $this = $(event.target);		
	},
	'mouseenter .dropdown':function(event){
		$(".dropdown-content").fadeIn(1500);
	},
	'mouseleave .dropdown': function(event) {
		$(".dropdown-content").fadeOut();
	},
	'mouseenter .contentMenu1':function(event){
		$(".contentMenu1").css("border-bottom", "3px solid #000000");
		$(".contentMenu1").css("background-color", "#F39C12");
	},
	'mouseleave .contentMenu1':function(event){
		$(".contentMenu1").css("border-bottom", "none");
		$(".contentMenu1").css("background-color", "#ffffff");
	},
	'mouseenter .contentMenu2':function(event){
		$(".contentMenu2").css("border-bottom", "3px solid #000000");
		$(".contentMenu2").css("background-color", "#F39C12");
	},
	'mouseleave .contentMenu2':function(event){
		$(".contentMenu2").css("border-bottom", "none");
		$(".contentMenu2").css("background-color", "#ffffff");
	},
	'click .navbar-toggle':function(event){
		$("#navbarCollapse").css("background-color", "#F39C12");
	}
});