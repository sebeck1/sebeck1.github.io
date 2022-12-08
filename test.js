  function make_task(id, corr_answ ){
    console.log("Hello")
    $(id).bind('click', function(){
        try{
          console.log("Button wurde gedrückt")
          if ($(this).text() == corr_answ){
            $(this).removeClass("list-group-item list-group-item-action list-group-item-primary")
            $(this).addClass("list-group-item list-group-item-action list-group-item-success")
            console.log("Jep")
          }
        }
        catch(e) {
              console.log('Applet noch nicht geladen? ⇒ '+e);
          }

   

      });
  }

  function lade_seite() {


      $('#b1').bind('click', function() {
          try {
              applet1.evalCommand('M = (1,5)');
          } catch(e) {
              console.log('Applet noch nicht geladen? ⇒ '+e);
          }
      });

      $('#b2').bind('click', function(){
        try{
          let a = applet1.getValue("a")
          console.log(a)
          $('#test').text(a)
        }
        catch(e) {
              console.log('Applet noch nicht geladen? ⇒ '+e);
          }


      });

      make_task(".answer1", "Button")

      
  }
  $(document).ready(function(){
      console.log("Hello")
      lade_seite();
  });


