Ext.define("NotesApp.view.NoteEditor",{
		extend:"Ext.form.Panel",
		requires:"Ext.form.FieldSet",
		alias:"widget.noteeditor",
		config:{
			scrollable:'vertical'
		},
		initialize:function(){

		console.log("NoteEditor view initialize..");

		this.callParent(arguments);
		
		var backButton={
				xtype:"button",
				ui:"back",
				text:"Home",
				handler: this.onBackButtonTap,
				scope: this
			};

		var saveButton={
				xtype:"button",
				ui:"action",
				text:"Save",
				handler:this.onSaveButtonTap,
				scope:this
			};
			

		var topToolBar={
				xtype:"toolbar",
				docked:"top",
				title:"Edit Note",
				items:[
					backButton,
					{
					 xtype: "spacer"	
					},
					saveButton]
			};

		
		var noteTitleEditor={
				xtype:'textfield',
				label:'Title',
				name:'title',
				required: true
		};		

		var noteNarrativeEditor={
				xtype:'textareafield',
				label:'Narrative',
				name:'narrative'
		};		
			
			
		var deleteButton={
				xtype:"button",
				iconCls:"trash",
				iconMask:"true",
				handler: this.onDeleteButtonTap,
				scope:this
			};
		
		var bottomToolBar={
				xtype:"toolbar",
				docked:"bottom",
				items:[
					{
					 xtype: "spacer"	
					},
					deleteButton]
			};
			
		this.add([topToolBar,
			{
				xtype:"fieldset",
				items:[noteTitleEditor,noteNarrativeEditor]
			},
			bottomToolBar]);		
			
		
		},
		
		onSaveButtonTap:function(){
		  console.log("Save button clicked..firing save Event..");
		  this.fireEvent("saveNoteCommand",this);	
		},
		
		onDeleteButtonTap:function(){
		  console.log("Delete button clicked..firing delete Event..");
		  this.fireEvent("deleteNoteCommand",this);	
		},
		
		onBackButtonTap:function(){
		  console.log("Back button clicked..firing back Event..");
		  this.fireEvent("backToHomeCommand",this);	
		}
		


});