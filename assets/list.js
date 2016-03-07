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
	    	tr.appendChild( document.createElement('td') );
	    	var link = createFragment('<a href="view.html?'+allMyNotes[i].id+'">'
					+allMyNotes[i].name+'</a>');
			tr.cells[0].appendChild( 
				link
			);
			if(allMyNotes[i].created_at){
				var created_at = new Date(allMyNotes[i].created_at);
				var updated_at = new Date(allMyNotes[i].updated_at);
			//	console.log(allMyNotes[i].created_at);
				tr.cells[1].appendChild(
					createFragment(
						created_at.getUTCMonth() + 1 + '/' +
						created_at.getUTCDate() + '/' +
						created_at.getUTCFullYear() + '  -  ' +
						updated_at.getUTCMonth() + 1 + '/' +
						updated_at.getUTCDate() + '/' +
						updated_at.getUTCFullYear()
					)
					);
			}
			else
				tr.cells[1].appendChild(createFragment(''));
			var deletelink = createFragment('<a href="#" onClick="deleteNote('+allMyNotes[i].id+'); return false">Delete</a>');
	    	//console.log(deletelink);
	    	tr.cells[2].appendChild(deletelink);
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