Ext.Loader.setConfig({
    enabled:true,          // important
    disableCaching: true // important
  
});

Ext.application({
	name:"NotesApp",
	models:["Note"],
	stores:["Notes"],
	views:["NotesList","NotesListContainer","NoteEditor"],
	controllers:["Notes"],
	launch:function(){
		console.log("Application launched...");
		var notesListContainer={
				xtype:"noteslistcontainer"
		};
		
		var noteEditor={
				xtype:"noteeditor"
		};
			
			Ext.Viewport.add([notesListContainer, noteEditor]);
	}
	});