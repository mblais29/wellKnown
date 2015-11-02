$( document ).ready(function() {
	$(function() {
    	$( "#dialog" ).dialog();
	});
	$(function() {
    $( "input[type=submit]" )
      .button()
      .click(function( event ) {
        event.preventDefault();
	      });
	  });
});

function enter(){
	var radio1 = document.getElementById("radio1");
	var radio2 = document.getElementById("radio2");
	
	if (radio1.checked){
	    window.location.href = 'bcindex.html';
	}else if (radio2.checked) {
	    window.location.href = 'saskindex.html';
	}
};



















