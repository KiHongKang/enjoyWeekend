 
  $( function() {
    var state = true;
    $( "#togglebutton" ).on( "click", function() {
      if ( state ) {
        $( "#toggleeffect" ).animate({
          backgroundColor: "#aa0000",
          color: "#fff",
          width: 500
        }, 1000 );
      } else {
        $( "#toggleeffect" ).animate({
          backgroundColor: "#fff",
          color: "#000",
          width: 240
        }, 1000 );
      }
      state = !state;
    });
  } );
  





  $( function() {
    $( "#datepicker" ).datepicker();
  } );
 