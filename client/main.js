import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.description.helpers({

	descAll(){
		return userDB.find({});
	},
	isLikeSingle:function(num){
		return (num <= 1);
	},
	isDislikeSingle:function(num){
		return (num <= 1);
	}
});

Template.editUser.helpers({
	editAll(){
		return userDB.findOne({});
	},
});

Template.description.events({
	'click .js-like'(event, instance){				
		var descID = this._id;
		var count = userDB.findOne({_id: descID}).like;					
		var oneLike = 'Likes';
		var add;

		if (!count){
			count = 0;
			add = 0;
		}	

		count++;
		add++;

		if (add == 1){
			oneLike ='Like';

		}		

		userDB.update({_id: descID}, {$set:{'like':count, 'text2': oneLike}});
	},

	'click .js-dislike'(event, instance){
		var descID = this._id;
		var count = userDB.findOne({_id: descID}).dislike;
		var oneDislike = 'Dislikes';
		var add;

		if (!count){
			count = 0;
			add = 0;
		}	

		count++;
		add++;

		if (add == 1){
			oneDislike ='Dislike';
		}		

		userDB.update({_id: descID}, {$set:{'dislike':count, 'text': oneDislike}});
	},	

	'click .edit'(event, instance){
		var userId = this._id;
		console.log(userId);

		$('#uId').val(userId);
		$('#backImg').attr('src',userDB.findOne({_id:userId}).img);
		$('#userImg').attr('src',userDB.findOne({_id:userId}).prof);				
	},
});

Template.addUser.events({
	'click .js-save'(event, instance){
		var fName = $('#addUser input[name="firstName"]').val();
		var lName = $('#addUser input[name="lastName"]').val();
		var image = $('#addUser input[name="imageURL"]').val();
		var profileImg = $('#addUser input[name="profileImg"]').val();

		if (profileImg = ""){
			profileImg = "blank-profile.png";
		}

		if (image == ""){
			image = "Undertale 2.jpg";
		}

		$('#addUser input[name="firstName"]').val('');
		$('#addUser input[name="lastName"]').val('');
		$('#addUser input[name="imageURL"]').val('');
		//$('#addUser input[name="profileImg"]').val('');

		$('#addUser').modal('hide');

		userDB.insert({'firstName':fName, 'lastName':lName, 'img':image, 'prof': profileImg});
	},
});

Template.editUser.events({
	'click .js-delete'(event, instance){
		var descID = this._id;

		$('#editUser').modal('hide');

		$("#" + descID).fadeOut("slow", "swing", function(){
			userDB.remove({_id: descID});
		});
	},

	'click .js-edit'(event, instance){
		// var efName = $('#editing input[name="eFirstName"]').val();
		// var elName = $('#editing input[name="eLastName"]').val();
		// var eImage = $('#editing input[name="eImageURL"]').val();
		// var profileImg = $('#editing input[name="eProfileImg"]').val();

		$('#editing').modal('handleUpdate');

		//userDB.insert({'firstName':efName, 'lastName':elName, 'img':eimage, 'profileImg': profileImg});

	},

	'click .js-saveEdit'(event, instance){

	},

	'click .js-close'(event, instance){
		$('#editing').modal('hide');
	},
});

