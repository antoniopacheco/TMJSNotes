

if(typeof(Storage) !== "undefined") {
	var allMyNotes =  localStorage.getItem("myNotes");
	if(allMyNotes == null){
		console.log("hey");
		var allMyNotes = [];
		var nextID=1;
		localStorage.setItem("myNotes", JSON.stringify(allMyNotes));
	}else{ //already exist

		allMyNotes =  JSON.parse(allMyNotes);
		var lookup = {}
		for (var i = 0; i< allMyNotes.length; i++) {
			if(allMyNotes[i])
		    	lookup[allMyNotes[i].id] = allMyNotes[i];
		}
		var nextID=allMyNotes.length+1;
	}
} else {
    console.log(":(");
}

	addEvent(window,"load",function(){
  		var idDoc = window.location.search.substring(1);
	  	document.getElementById("editor").value =  lookup[idDoc].text.replace(/<br\s*\/?>/mg,"\n");;
		name =document.getElementById("name").value = lookup[idDoc].name;
		var saveBtn = document.getElementById("save");

		var handler = addEvent(saveBtn, "click", function(){
			//get the new data
			var text =document.getElementById("editor").value;
			lookup[idDoc].text = text.replace(/\n\r?/g, '<br />');
			localStorage.setItem("myNotes", JSON.stringify(allMyNotes));
		});
});