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
		var likeCount = userDB.findOne({_id:userId}).like;
		var disCount = userDB.findOne({_id:userId}).dislike
		console.log(userId);

		$('#uId').val(userId);
		$('#backImg').attr('src',userDB.findOne({_id:userId}).img);
		$('#first').text(userDB.findOne({_id:userId}).firstName);
		$('#last').text(userDB.findOne({_id:userId}).lastName);

		if (likeCount == 1){
			$('#like').text("Like " + likeCount);
		} else {
			$('#like').text("Likes " + likeCount);
		}
		
		if (disCount == 1){
			$('#dislike').text("Dislike " + disCount);
		} else {
			$('#dislike').text("Dislikes " + disCount);
		}		

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
		// var fName = $('#addUser input[name="firstName"]').val();
		// var lName = $('#addUser input[name="lastName"]').val();
		// var image = $('#addUser input[name="imageURL"]').val();
		// var profileImg = $('#addUser input[name="profileImg"]').val();

		$('#editing').modal('handleUpdate');

		//userDB.insert({'firstName':efName, 'lastName':elName, 'img':eimage, 'profileImg': profileImg});

	},

	'click .js-saveEdit'(event, instance){

	},

	'click .js-close'(event, instance){
		$('#editing').modal('hide');
	},
});

