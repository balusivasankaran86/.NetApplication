/**
 * Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/* exported initSample */

if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
	CKEDITOR.tools.enableHtml5Elements( document );

// The trick to keep the editor in the sample quite small
// unless user specified own height.
CKEDITOR.config.height = 150;
CKEDITOR.config.width = 'auto';

var initSample = ( function() {
	var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );
		
		

	return function() {
		var editorElement = CKEDITOR.document.getById( 'editor' );
		
		

		// :(((
		if ( isBBCodeBuiltIn ) {
			editorElement.setHtml(
				
			);
		}

		// Depending on the wysiwygare plugin availability initialize classic or inline editor.
		if ( wysiwygareaAvailable ) {
			CKEDITOR.replace( 'editor',{ toolbar: 'MyBasic'} );
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			CKEDITOR.inline( 'editor' );

			// TODO we can consider displaying some info box that
			// without wysiwygarea the classic editor may not work.
		}
		
		CKEDITOR.editorConfig = function(config){
	config.uiColor = '#AADC6E';
    config.language = 'zh';
    config.skin = 'kama';
    config.width = 700;
    config.height = 300;

    config.toolbar = 'MyBasic';

    config.toolbar_MyFull =[
    { name: 'document', items : ['Source','-','Save','NewPage','DocProps','Preview','Print','-','Templates'] },
    { name: 'clipboard', items : ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo'] },
    { name: 'editing', items : ['Find','Replace','-','SelectAll','-','SpellChecker', 'Scayt'] },
    { name: 'forms', items : ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
    { name: 'basicstyles', items : ['Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat'] },
    { name: 'links', items : ['Link','Unlink','Anchor'] },
    { name: 'colors', items : ['TextColor','BGColor'] },
    '/',
    { name: 'insert', items : ['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe'] },
    { name: 'paragraph', items : ['NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv','-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl'] },
    { name: 'styles', items : ['Styles','Format','Font','FontSize'] },
    ];

		 config.toolbar_MyBasic=[
     { name: 'document', items : ['Source','NewPage','Preview'] },
     { name: 'basicstyles', items : ['Bold','Italic','Strike','-','RemoveFormat'] },
     { name: 'clipboard', items : ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo'] },
     { name: 'editing', items : ['Find','Replace','-','SelectAll','-','Scayt'] },
     '/',
     { name: 'styles', items : ['Styles','Format'] },
     { name: 'paragraph', items : ['NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote'] },
     { name: 'insert', items :['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe'] },
     { name: 'links', items : ['Link','Unlink','Anchor'] },
     { name: 'tools', items : ['Maximize'] }
     ];
};
	};

	function isWysiwygareaAvailable() {
		// If in development mode, then the wysiwygarea must be available.
		// Split REV into two strings so builder does not replace it :D.
		if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
			return true;
		}

		return !!CKEDITOR.plugins.get( 'wysiwygarea' );
	}
} )();

