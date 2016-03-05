if(typeof(Storage) !== "undefined") {
	var allMyNotes =  localStorage.getItem("myNotes");
	if(allMyNotes == null){
		console.log("hey");
		var allMyNotes = [];
		var nextID=1;
		localStorage.setItem("myNotes", JSON.stringify(allMyNotes));
	}else{ //already exist
		//console.log(allMyNotes);
		allMyNotes =  JSON.parse(allMyNotes);
		var nextID=allMyNotes.length+1;
	}
} else {
    console.log(":(");
}
addEvent(window,"load",function(){
	var saveBtn = document.getElementById("save");

	var handler = addEvent(saveBtn, "click", function(){
		//get the data
		var text =document.getElementById("editor").value;
		//get the name
		var name =document.getElementById("name").value;
		text = text.replace(/\n\r?/g, '<br />');
		var store = {
			name: name,
			text: text,
			'id': nextID
		};
		allMyNotes.push(store);
		nextID++;
		localStorage.setItem("myNotes", JSON.stringify(allMyNotes));
	});
});