/*Template.banner.helpers({
	'buyrent_category':function () {
		var cat = bannerdb.find({},{_id:0,category:1});
		if(cat){
			//$("#container_desc_root_ul").css('color':'red');
			return cat;
		}
	}
});*/
Template.banner.onCreated(function(){
    var self= this;
    this.autorun( function() {
        self.subscribe('bannerdb');
        self.subscribe('Images0')
        //self.subscribe('searchui');
    });
});

Template.banner.helpers({
	'Img':function(){
		// return Images.find();
		var banner_content =  Images.find({},{sort:{uploadedAt:-1}},{limit: 1});
    	return banner_content;
	}
})


Template.banner.events({
	'click #update_delete_option>.glyphicon-remove': function(e){
		var $this = $(e.target);
		//$($this).
		// prompt("Are you sure you want to delete this Post");
		// if(true)
		// {
		// 	alert("ok");
		// }

		
		//var id = this._id;
		//alert(id);
		//var dis = bannerdb.findOne({_id:id},{_id:1,title:1});
		//alert(dis.category);
		//var dis = bannerdb.remove({_id:id});
		Toast.info("Post deleted successfully");
	},
	'click #update_delete_option>.glyphicon-pencil': function(e){
		//alert("Are you sure you want to edit");
		var title = $("#banner_title").text();
		var loc = $("#banner_location").text();
		var price = $("#banner_price").text();
		var rooms = $("#banner_rooms").text();
		var sqFts = $("#banner_sq_ft").text();
		var rescomm = $("#banner_res_comm").text();
		var descriptions = $("#banner_description").text();

		var txtTitle = $('<input id="txtTitle" type="text" value="' + title + '" /> ' );
		$("#banner_title").replaceWith(txtTitle);
		var txtLoc = $('<input id="txtLocation" type="text" value="' + loc + '" style="width:80px"/>');
		$("#banner_location").replaceWith(txtLoc);
		var txtPrice = $('<input id="txtPrice" type="text" pattern="\d+" value="' + price + '" style="width:60px"/>');
		$("#banner_price").replaceWith(txtPrice);
		var txtRooms = $('<input id="txtRooms" type="text" value="' + rooms + '" style="width:50px"/>');
		$("#banner_rooms").replaceWith(txtRooms);
		var txtSqFts = $('<input id="txtSq_ft" type="text" value="' + sqFts + '" style="width:70px"/>');
		$("#banner_sq_ft").replaceWith(txtSqFts);
		//var txtrescomm = $('<input id="txtResComm" type=text value="' + rescomm + '" style="width:100px"/> ');
		var txtrescomm =$('<label class="sr-only" for="property_category"></label><select class="form-control" id="txtRescomm"><option>Residential</option><option>Commercial</option></select>')
		$("#banner_res_comm").replaceWith(txtrescomm); 
		var txtDescription = $('<input id="txtDescription" type="text" value="' + descriptions + '" style="width:250px"/>');
		$("#banner_description").replaceWith(txtDescription);

		$("#update_delete_option>.glyphicon-pencil").prop('value', 'Save');
		$("#update_delete_option>.glyphicon-pencil").prop('class', 'pull-right glyphicon glyphicon-file');
		$("#update_delete_option>.glyphicon-pencil").prop('id', 'save');
	},
	'click #update_delete_option>.glyphicon-file': function(e){
		var txtTitle = $("#txtTitle").val();
		var txtLoc = $("#txtLocation").val();
		var txtPrice = $("#txtPrice").val();
		var txtRooms = $("#txtRooms").val();
		var txtSqFts = $("#txtSq_ft").val();
		var txtResComm = $("#txtRescomm").val();
		
		$("#update_delete_option>.glyphicon-file").prop('value', 'file');
		$("#update_delete_option>.glyphicon-file").prop('class', 'pull-right glyphicon glyphicon-pencil');
		$("#update_delete_option>.glyphicon-file").prop('id', 'edit');	

		var h1Title= document.createElement('span');
		var lblTitle= $(h1Title).attr({
			'id': "banner_title",
			'style': "font-weight: bold; color:#104E8B; font-size: 20px;"
		});
		$('#txtTitle').replaceWith(lblTitle);
		$("#banner_title").text(txtTitle);

		var h1Loc = document.createElement('span');
		var lblLoc= $(h1Loc).attr({
			'id': "banner_location",

		});
		$('#txtLocation').replaceWith(lblLoc);
		$("#banner_location").text(txtLoc);

		var h1Price= document.createElement('span');
		var lblPrice= $(h1Price).attr({
			'id': "banner_price",
			
		});
		$('#txtPrice').replaceWith(lblPrice);
		$("#banner_price").text(txtPrice);

		var h1Rooms= document.createElement('span');
		var lblRooms= $(h1Rooms).attr({
			'id': "banner_rooms"
		});
		$('#txtRooms').replaceWith(lblRooms);
		$("#banner_rooms").text(txtRooms);

		var h1SqFts= document.createElement('span');
		var lblSqfts= $(h1SqFts).attr({
			'id': "banner_sq_ft"
		});
		$('#txtSq_ft').replaceWith(lblSqfts);
		$("#banner_sq_ft").text(txtSqFts);

		var h1Category = document.createElement('span');
		var lblCategory = $(h1Category).attr({
			'id':"banner_res_comm"
		});
		$("#banner_res_comm").replaceWith(lblCategory);
		$("#banner_res_comm").text(txtRescomm);

		var h1Desc= document.createElement('span');
		var lblDesc= $(h1Desc).attr({
			'id': "banner_description"
		});
		$('#txtDescription').replaceWith(lblDesc);
		$("#banner_description").text(txtDescriptions);

		bannerdb.update(this._id, {$set:{
			title: txtTitle,
        	location : txtLoc,
        	price : txtPrice,
        	rooms : txtRooms,
        	sq_ft : txtSqFts,
        	category : this.category,
        	description : txtDescriptions,
        	uploadedAt: new Date().toLocaleString()}
		});
	}
});
/*Template.banner.helpers({
	'buyrent_category':function () {
		var cat = bannerdb.find({},{_id:0,category:1});
		//cat = "rent";
		if(cat.category == "Rent" || cat.category == "RENT"){
			//$("#container_desc_root_ul").css('color':'red');

			return true;
		}
	}
});*/