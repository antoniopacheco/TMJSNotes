if(typeof(Storage) !== "undefined") {
	var allMyNotes =  localStorage.getItem("myNotes");
	if(allMyNotes == null){
		console.log("hey");
		var allMyNotes = [];
		localStorage.setItem("myNotes", JSON.stringify(allMyNotes));
	}else{ //already exist
		allMyNotes =  JSON.parse(allMyNotes);
		var lookup = []
		for (var i = 0; i< allMyNotes.length; i++) {
			if(allMyNotes[i])
		   		lookup[allMyNotes[i].id] = allMyNotes[i];
		}
	}
} else {
    console.log(":(");
}

addEvent(window,"load",function(){
	output = document.getElementById('files');
	for(var i =0; i< allMyNotes.length; i++){
		if(allMyNotes[i]){
			var tr = document.createElement('tr');
			tr.appendChild( document.createElement('td') );
	    	tr.appendChild( document.createElement('td') );
	    	var link = createFragment('<a href="view.html?'+allMyNotes[i].id+'">'
					+allMyNotes[i].name+'</a>');
			tr.cells[0].appendChild( 
				link
			);
			var deletelink = createFragment('<a href="#" onClick="deleteNote('+allMyNotes[i].id+'); return false">Delete</a>');
	    	tr.cells[1].appendChild(deletelink);
	    	//console.log(tr);
			output.appendChild(tr);
		}
	}
	//var res=createFragment(string);
		
		//output.appendChild(res);
});

function deleteNote(id){
	if(confirm("Are you sure you want to delete the note "+lookup[id].name)){
	
		lookup[id] = null;
		localStorage.setItem("myNotes", JSON.stringify(lookup));
		location.reload();

	}

	
}