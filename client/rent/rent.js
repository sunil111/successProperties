
Template.rent.helpers({
  
  'bannercontent':function(){
      return bannerdb.find({category:"Rent"},{sort:{uploadedAt:-1}});  
    },
    /*'areas' :function(){
      //return ["Khopoli","Vashi"];
      var arearesult =  searchuidb.find({},{_id:0,area:1});
      return arearesult;
    },
    'room_type' :function(){
      return searchuidb.find({},{_id:0,roomType:1});
    },
    'rentbuy' :function(e){
      var buyrent =  e.target.optradio.value;
      var buy="buy";
      if(buyrent === "rent")
        return buyrent;
      /*else
        return buy;*/
    /*},
    'rpriceFrom':function(){
      return searchuidb.find({},{_id:0,rentpriceFrom:1});
    },
    'bpriceFrom':function(){
      return searchuidb.find({},{_id:0,buypriceFrom:1});
    },
    'rpriceTo':function(){
      return searchuidb.find({},{_id:0,rentpriceTo:1});
    },
    'bpriceTo':function(){
      return searchuidb.find({},{_id:0,buypriceTo:1});
    }*/

})

Template.rent.onCreated(function(){
    var self= this;
    this.autorun( function() {
        self.subscribe('bannerdb');
    });
});