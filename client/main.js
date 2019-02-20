import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.description.helpers({
	descAll(){
		return userDB.find({});
	},
});

Template.description.events({
	'click .js-like'(event, instance){
    	console.log("You clicked like");
	},
	'click .js-dislike'(event, instance){
		console.log("You clicked dislike");
	},	
	'click .js-delete'(event, instane){
		var descID = this._id;

		$("#" + descID).fadeOut("slow", "swing", function () {
			userDB.remove({_id: descID});
		});
	},
});

Template.addUser.events({
	'click .js-save'(event, instance) {
		var fName = $('#addUser input[name="firstName"]').val();
		var lName = $('#addUser input[name="lastName"]').val();
		var image = $('#addUser input[name="imageURL"]').val();
		console.log(image);
		if (image==""){
			image="Undertale 2.jpg";
		}
		console.log("Name: ", fName, lName);
		console.log("Picture: ", image);

		$('#addUser input[name="firstName"]').val('');
		$('#addUser input[name="lastName"]').val('');
		$('#addUser input[name="imageURL"]').val('');

		$('#addUser').modal('hide');

		userDB.insert({'firstName':fName, 'lastName':lName, 'img':image});
	},
});