     $("#searchbutton").on("click", function(event){
          console.log("clicked")
          var input = $("#searchinput").val()
          console.log(input)
          $.ajax("/api/search/" + input, {
              type: "GET",
          }).then(function(data) {
              console.log(data);
              }
          )
      })
