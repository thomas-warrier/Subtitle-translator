(function AddButtons (){
        var btn = document.createElement
         ("input");
         btn.value = "Translate Subtitles";
         btn.id = "translate-btn";
         btn.type = "submit";
        document.querySelector("ltr-1jnlk6v").prepend(btn); //the query selector select the div where all of the right bottom button are
        //the prepend add the button before the childs example: parent.prepend(newChild)  will be [newChild, child1, child2]
    }
    function DefineTranslateButtonEvents() {
        document
          .getElementById("translate-btn")
          addEventListener("click", function
          (event) {
            fnSearch (event.target.value.split(" ")[1]);
          });
      }


)();

