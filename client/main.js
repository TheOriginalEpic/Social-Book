import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.description.helpers({
	descAll(){
		return userDB.find({});
	},
});

// Template.editUser.helpers({
// 	editAll(){
// 		return userDB.find({});
// 	},
// });

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

	'click #edit'(event, instance) {
		
	},
});

Template.addUser.events({
	'click .js-save'(event, instance){
		var fName = $('#addUser input[name="firstName"]').val();
		var lName = $('#addUser input[name="lastName"]').val();
		var image = $('#addUser input[name="imageURL"]').val();			

		if (image == ""){
			image = "Undertale 2.jpg";
		}

		$('#addUser input[name="firstName"]').val('');
		$('#addUser input[name="lastName"]').val('');
		$('#addUser input[name="imageURL"]').val('');

		$('#addUser').modal('hide');

		userDB.insert({'firstName':fName, 'lastName':lName, 'img':image,});


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
		$('#editing').modal('handleUpdate');

	},

	'click .js-saveEdit'(event, instance){

	},

	'click .js-close'(event, instance){
		$('#editing').modal('hide');
	},
});

