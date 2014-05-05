Ext.define("NotesApp.controller.Notes",{
			extend:"Ext.app.Controller",
			config:{
			
				refs:{
						notesListContainer: "noteslistcontainer",
						noteEditor: "noteeditor"
					},
				control:{
					notesListContainer:{
						newNoteCommand: "onNewNoteCommand",
						editNoteCommand: "onEditNoteCommand"
					},
					noteEditor:{
						saveNoteCommand: "onSaveNoteCommand",
						deleteNoteCommand: "onDeleteNoteCommand",
						backToHomeCommand: "onBackToHomeCommand"
					}
				}
			},	
			onNewNoteCommand:function(){
				console.log("Button New note clicked");
				var now=new Date();
				var noteId= (now.getTime()).toString()+(this.getRandomInt(0,100)).toString();
				
				var newNote=Ext.create("NotesApp.model.Note",{
							id:noteId,
							dateCreated:now,
							title:"",
							narrative:""
						});
				this.activateNoteEditor(newNote);	
			},
			onSaveNoteCommand:function(){
				console.log("save consumed")
				var noteEditor=this.getNoteEditor();
			//	console.log(noteEditor);
				
				var currentNote=noteEditor.getRecord();
			//	console.log(currentNote)
				var newValues=noteEditor.getValues();
			//	console.log(newValues);
				
				currentNote.set("title",newValues.title);
				currentNote.set("narrative",newValues.narrative);
				
				var errors=currentNote.validate();
				
				if(!errors.isValid()){
					Ext.Msg.alert('Wait!',errors.getByField("title")[0].getMessage(),Ext.emptyFn);
					currentNote.reject();
					return;
				}
				
				
				var notesStore = Ext.getStore("Notes");
				
				if(null==notesStore.findRecord('id',currentNote.data.id)){
				
					notesStore.add(currentNote);
				}
				
				notesStore.sync();
				notesStore.sort([{property: 'dateCreated',direction: 'DESC'}]);
				this.activateNotesList();
				
			},
			
			slideLeftTransition:{
				type:'slide',
				direction:'left'
			},

			slideRightTransition:{
				type:'slide',
				direction:'right'
			},
			
			onEditNoteCommand: function(list,record){
				console.log("Button Edit note clicked");
				this.activateNoteEditor(record);	
			},
			onDeleteNoteCommand: function(){
				console.log("Button Delete note clicked");
				
				var noteEditor=this.getNoteEditor();
				
				var currentNote=noteEditor.getRecord();
				
				
				var notesStore=Ext.getStore("Notes");
				
				notesStore.remove(currentNote);
				
				notesStore.sync();
				
				this.activateNotesList();	
			},
			
			onBackToHomeCommand: function(){
				console.log("Back button clicked");
				this.activateNotesList();	
			},
			
			
			activateNoteEditor:function(record){
			
			 var noteEditor=this.getNoteEditor();
			 noteEditor.setRecord(record);
			 Ext.Viewport.animateActiveItem(noteEditor,this.slideLeftTransition);	
			},

			activateNotesList:function(){
			
			 Ext.Viewport.animateActiveItem(this.getNotesListContainer(),this.slideRightTransition);	
			},
			
			getRandomInt:function(min,max){
			
				return  Math.floor(Math.random()*(max-min)+1)+min;
			
			},
			
			init:function(){
				this.callParent(arguments);
				console.log("Notes Controller init");
				},
			launch:function(){
				this.callParent(arguments);
				Ext.getStore("Notes").load();
				console.log("Notes Controller launch");
				}
				});