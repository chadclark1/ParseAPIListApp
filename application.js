Parse.initialize("fMaBxZIBdcykO3ubkE44ktDfVG21pk0GxuLWF0YL", "TP9fPp3WJB5A5L593RQsAH5oVM508R4HuDqGl9Dg");

var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
  alert("yay! it worked");
});

















$(document).ready(function() {
	$("logout").click(function(e){
		console.log(e);
	});

	$("#loginbutton").click( function () {

		var username = $("#loginUN").val();
		var password = $("#logInPassword").val();

		Parse.User.logIn(username, password, {
  		success: function(user) {


    		// toggle login/list
    		var currentUser = Parse.User.current();

			if (currentUser) {
				$(".Forms").css("display", "none")
    			$("#banner").css("display", "block")
			} else {
   				$(".Forms").css("display", "block")
   				$("#banner").css("display", "none")
			};
    		

    		//populate
    		var List = Parse.Object.extend("List");
			var query = new Parse.Query(List);
			query.equalTo("username", currentUser);
			query.find({
  			success: function(results) {
    			alert("Successfully retrieved " + results.length + " items.");
    			// Do something with the returned Parse.Object values
    			console.log(results);
    			for (var i = 0; i < results.length; i++) { 
      				var object = results[i];
      				$("#list").append( "<li><input type='checkbox' value='None' id='checkbox' name='check' />" + 
						"<label for='checkbox'>" + object.get("item") + "</label></li>");
      				$("#name").text(username)
      				alert(object.id + ' - ' + object.get('item'));
    				}
  				},
  			error: function(error) {
    			alert("Error: " + error.code + " " + error.message);
  				}
			});




    		console.log(username);
  		},
  		error: function(user, error) {
   			// The login failed. Check error to see why.
   			console.log(error);
  		}

		});
		
	});



	$("#signupbutton").click( function () {
		var username = $("#signUpUN").val()
		var password = $("#signUpPassword").val()

		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
 		

 
		user.signUp(null, {
  			success: function(user) {
   
  			},
  			error: function(user, error) {
  
    		alert("Error: " + error.code + " " + error.message);
  			}
		});
		console.log("sign up")
	});

	$("#logout").click( function () {
		console.log("logout click")
		Parse.User.logOut();
	});

	//help


	//help
	//var listItems = List.get("username");

	
	$("#add").click(function() {
		console.log("add");
		var item = $("#input").val();

		var List = Parse.Object.extend("List");
		var list = new List();
		var currentUser = Parse.User.current();
 
		list.set("item", item);
		list.set("checked", "no");
		list.set("username", currentUser);


 
		list.save(null, {
  		success: function(list) {
    		// Execute any logic that should take place after the object is saved.
    		alert('New object created with objectId:' + list.id);
  		},
  		error: function(list, error) {
    		// Execute any logic that should take place if the save fails.
    		// error is a Parse.Error with an error code and description.
    		alert('Failed to create new object, with error code: ' + error.description);
  		}
		});

		console.log(item)
	

		if(item.length < 1) {
			alert("Tell us what you need")
		} else {
			$("#list").append( "<li><input type='checkbox' value='None' id='checkbox' name='check' />" + 
				"<label for='checkbox'>" + item + "</label></li>");
			$("#input").val("");
			console.log("clear")
		};
	});
	



	function updateData () {
		console.log("checkbox changed")

		var isChecked = $("input[type='checkbox']").val();

		var List = Parse.Object.extend("List");
		var list = new List();
		var currentUser = Parse.User.current();
		// KR - item has not been defined and thows an error
		list.set("item", item);
		list.set("checked", "no");
		list.set("username", currentUser);

		list.save(null, {
  		success: function(list) {
    		// Now let's update it with some new data. 
    		list.set("checked", isChecked);
    		list.save();
    		}
    	});
    }	
	




	$("#clear").click(function() {
		$("#checkbox:checked").parent("li").remove();
	});


	$("#list").on('change', 'input[type=checkbox]', function() {
		// KR - you need to tell update which list item to update
		// the code for update doesn't seem to be correct
		// you want to update the item so that it reflects the
		// current state for the list item.
		updateData();
    	if($(this).is(':checked')) {
        	$(this).parent().css("text-decoration", "line-through");
    	} else {
        	$(this).parent().css("text-decoration", "none");
    	}
	});
    


});