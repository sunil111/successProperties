Meteor.publish('images0', function(){
	return Images.find();
});
Meteor.publish('bannerdb', function(){
	return bannerdb.find();
});
Meteor.publish('searchui',function(){
	return searchuidb.find();
});
