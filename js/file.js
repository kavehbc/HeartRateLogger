var currentFileName = "";

function NewDoc(){
	   var d = new Date();
	   var n = d.getTime();
	   var txtHeader = "timestamp,heartrate,rrinterval,calculatedrrinterval";
	   
	   var documentsDir;
	   function onsuccess(files) {
	     for(var i = 0; i < files.length; i++) {
	       console.log("File Name is " + files[i].name); // displays file name
	     }
	     
	     currentFileName = "HRL_" + n + ".txt";
	     var testFile = documentsDir.createFile(currentFileName);

	     if (testFile != null) {
	       testFile.openStream(
	         "w",
	         function(fs){
	           fs.write(txtHeader + "\r\n");
	           fs.close();
	         }, function(e){
	           console.log("Error " + e.message);
	         }, "UTF-8"
	       );
	       console.log("New file has been saved as " + currentFileName + " in Documents folder.");
	       //OpenDoc("NP_" + n + ".txt");
	     }
	   }

	   function onerror(error) {
	     console.log("The error " + error.message + " occurred when listing the files in the selected folder");
	   }

	   tizen.filesystem.resolve(
	     'documents', 
	     function(dir){
	       documentsDir = dir;
	       dir.listFiles(onsuccess, onerror);
	     }, function(e){
	       console.log("Error" + e.message);
	     }, "rw"
	   );
}

function AppendDoc(iFile, AppendText){
	   var d = new Date();
	   var n = d.getTime();
	   
	   var documentsDir;
	   function onsuccess(files) {
	     for(var i = 0; i < files.length; i++) {
	    	 if (files[i].name == iFile){
	    		 console.log("File Name is " + files[i].name); // displays file name
	    	 var testFile = files[i];

		     if (testFile != null) {
		       testFile.openStream(
		         "a",
		         function(fs){
		           fs.write(AppendText + "\r\n");
		           fs.close();
		         }, function(e){
		           console.log("Error " + e.message);
		         }, "UTF-8"
		       );
		       //init();
		       //window.history.back();
		     }

	    	 }
	     }
	     
   	   }

	   function onerror(error) {
	     console.log("The error " + error.message + " occurred when listing the files in the selected folder");
	   }

	   tizen.filesystem.resolve(
	     'documents', 
	     function(dir){
	       documentsDir = dir;
	       dir.listFiles(onsuccess, onerror);
	     }, function(e){
	       console.log("Error" + e.message);
	     }, "rw"
	   );
}
