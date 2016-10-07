// events = new Meteor.Collection('events');
// /*Files = new Meteor.Collection(null);

// Template.fileUpload1.events({
// 	'change	input[type=file]': function (e,tmpl) {
// 		var input = tmpl.find('input[type=file]');
// 		var files = input.files;
// 		var file;
// 		var mfile;
// 		for (var i = 0; i <files.length; i++) {
// 			mfile = new MeteorFile(files[i],{collection:Files});
// 			Files.insert(mfile,function(err,res){
// 				mfile.uppload(files[i],"uploadFile");
// 			});
// 		}
// 	}
// });

// Template.fileUpload1.helpers({

// 	files:function(){
// 		return Files.find();
// 	}
// });
// Template.fileUploadRow.helpers({
// 	uploadCompleteClass:function(){
// 		return this.uploadProgress == 100 ? 'progress-success':'';
// 	}
// });*/

// /* Code below is referred from :- https://github.com/CollectionFS/Meteor-CollectionFS*/
// Template.fileUpload1.events({
//   'change .myFileInput': function(event, template) {
//     FS.Utility.eachFile(event, function(file) {

//       Images.insert(file, function (err, fileObj) {
//         // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
//         if(err){
//         		//
//         }
//         else{
//         	var imagesURL={
//         		'fileUpload1.image0': '/cfs/files/images/' + fileObj._id
//         	};
//         Meteor.users.insert(userId, {$set: imagesURL});
//         }
//       });
//     });
//   },
  
//   /*Below code is taken from :-  https://github.com/Sanjo/collectionFS_test/blob/ejson-file-reference/collectionFS_test.js*/
//   /*'click input[type="submit"]': function () {
//       var file = $('#file').get(0).files[0];
//       var fileObj = eventPhotos.insert(file);
//       console.log('Upload result: ', fileObj);
//       events.insert({
//         name: 'event',
//         file: fileObj
//       });
//     }*/
   
// });
// // Template.fileUpload1.helpers({
// //     files: function () {
// //       return Images.find();
// //     }
// //   });
// imagesURL.fileUpload1.onCreated(function(){
//   var self= this;
//   this.autorun( function() {
//     self.subscribe('images0');
//   });
// });

// Template.fileUpload1.helpers({
//   images: function () {
//     return Images.find(); 
//   }
// });


Template.fileUpload.events({
  'submit': function(event, template) {

    var title = event.target.title.value;
    var loc = event.target.location.value;
    var price_value = event.target.price.value;
    var select_price = $("#select_price").find(':selected').text();
    //var price = price_value;
    //var price_char = select_price;
    //alert(price_value+price_char);
    var roomtype_value = event.target.rooms.value;
    var select_roomtype = $("#select_room").find(':selected').text(); 
    //var roomtype = roomtype_value+" "+select_roomtype;
    //alert(roomtype);
    var sqft_value = event.target.sq_ft.value;
    //var select_sqft = $("#sq_ft_content").text();
    var sqft = sqft_value;//+" "+select_sqft;
    //alert(sqft);
    //var category = event.target.rentbuy.value;
    var category_res_comm = $("#option_resi_commercial").find(':selected').text();
    var category_buy_rent = $("#option_buy_rent").find(':selected').text();
    var txtdesc = event.target.description.value;
    // //var count = 0; 
    // //count++;
    //alert(title,loc,price,roomtype,sqft,category,txtdesc);
    // //Meteor.call("insert",title,loc,price,roomtype,sqft,category,txtdesc);
    SessionStore.clear();
    
    var BId = bannerdb.insert({
        title: title,
        location : loc,
        price : {
                  price_value:price_value,
                  select_price:select_price
                },
        rooms : {
                  roomtype_value:roomtype_value,
                  select_roomtype:select_roomtype
                },
        sq_ft : sqft,
        category_res_comm : category_res_comm,
        category : category_buy_rent,
        description : txtdesc,
        uploadedAt: new Date().toLocaleString()
      
    });
    SessionStore.set("BID",BId);
    alert(BId);
    // Toast.info("Data insert successfully"+"ID:"+BId);
    
  }
});

Template.fileUpload.helpers({
  'bannercontent':function(){
    var banner_content =  bannerdb.find({},{sort:{uploadedAt:-1},limit:1});
    return banner_content;
  }
});

Template.fileUpload.onCreated(function(){
  var self= this;
  this.autorun( function() {
    self.subscribe('bannerdb');
  });
});




Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    return Images.find();
  }
});

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  images: function () {
    return Images.find();
  }
});

Template.uploadForm.events({

  'change #fileInput': function (e, template) {

    var BannerID = SessionStore.get("BID");
    alert(BannerID);

    var file = e.target.files[0];
    //var file = $('#fileInput').get(0).files[0];

    var files =e.currentTarget.files.length;
    var Uid = Meteor.userId();
    alert(files);

    _.each(e.currentTarget.files, function (file) {
        Images.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic',
          meta: { UserId: Uid,
                  bannerID: BannerID
                }
        });
    });

  }
})
    // if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // there was multiple files selected
      // var file = $('#fileInput').get(0).files[0];
      // for(var i=0;i<e.currentTarget.files.length;i++){
      //   var Uid = Meteor.userId();
      //   var uploadInstance = Images.insert({
      //     file: file,
      //     streams: 'dynamic',
      //     chunkSize: 'dynamic',
      //     meta: {Uid: Uid}
      //   }, false);
      // }

      //var file =$('#fileInput').get(0).files[0];



      // if (file) {
      // for(var i=0; i<file.length ; i++){
      //   var uploadInstance = Images.insert({
      //     file: file,
      //     streams: 'dynamic',
      //     chunkSize: 'dynamic',
      //     meta: {Uid: Uid}
      //   }, false);
      // }


      // _.forEach(Images, function(file,i){}

      // _.eachFile(event, function(file) {
      //    var uploadInstance = Images.insert({
      //     file: file,
      //     streams: 'dynamic',
      //     chunkSize: 'dynamic',
      //     meta: {Uid: Uid}
      //   }, false);
      // });

      // for (var i = 0, ln = file.length; i < ln; i++) {
      //   Images.insert({
      //     file: file[i],
      //     streams: 'dynamic',
      //     chunkSize: 'dynamic',
      //     meta: {Uid: Uid}
      //   }, false);
      // }
        // uploadInstance.on('start', function() {
        //   template.currentUpload.set(this);
        // });

        // uploadInstance.on('end', function(error, fileObj) {
        //   if (error) {
        //     alert('Error during upload: ' + error.reason);
        //   } else {
        //     //alert('File "' + fileObj.name + '" successfully uploaded');
        //   }
        //   template.currentUpload.set(false);
        // });

        // uploadInstance.start();


      // }
    // }
