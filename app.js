$(document).ready(function() {

  var addCloseButton = function() {

  // Create a "close" button and append it to each list item
  var myNodelist = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

  // Click on a close button to hide the current list item
  var close = document.getElementsByClassName("display-item");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this;
      div.style.display = "none";
    }
  }
}

  // Go through each property in localStorage to display the to do list on page refresh/start-up
  var refreshPage = function() {
    $("#display").html("");
    for (var key in localStorage) {
      if (key !== "length" && key !== "key" && key !== "getItem" && key !== "setItem" && key !== "removeItem" && key !== "clear") {
        let itemHtml = '<li class="display-item" style="display: none;" data-storage-key="'+key+'"> ' + key + ' - ' + '<span class="description">' + localStorage.getItem(key) + '</span></li>';
        $(itemHtml).appendTo("#display").show('slow');
      }
    }
    addCloseButton();
  }
refreshPage();

  // Add an item to the list
  $("#add-text-btn").on("click", function(){

    // Store values from input boxes
    let inputKey = $("#user-input-title").val();
    let inputValue = $("#user-input-body").val();

    if ($("#user-input-title").val() === "") {
      alert("Task needs a name.")
    } else {
      // Clear values from input boxes
      $("#user-input-title").val("");
      $("#user-input-body").val("");

      // Add new property to local storage from input boxes
      localStorage.setItem(inputKey, inputValue);

      // Add inputKey and inputValue to the #display container
      let itemHtml = '<li class="display-item" style="display: none;" data-storage-key="'+inputKey+'"> ' + inputKey + ' - ' + '<span class="description">' + localStorage.getItem(inputKey) + '</span></li>';
      $(itemHtml).appendTo("#display").show('slow');
    }
    addCloseButton();
  });

   // Apply styling to clicked list items
    $("#display").on("click", '*', function() {
      if (this.className === "display-item checked") {
        $(this).removeClass("checked");
      } else {
         $(this).addClass( "checked" );
       }
    });

    // Hide a list item on double click
    $("#display").on("dblclick", '*', function() {
      $(this).hide("slow");
    });

    // Delete a list item
    $("#del-text-btn").on("click", function() {
      if (localStorage.getItem($('#user-input-title').val()) === null) {
        alert("Please enter a valid task name to delete.")
      } else {
      if ($("#user-input-title").val() !== "") {
        localStorage.removeItem( $('#user-input-title').val() );
        $("#user-input-title").val("");
        $("#user-input-body").val("");
        refreshPage();
      }
    }
  });

    // Clear local storage and refresh the #display container
    $("#clear-all-btn").on("click", function() {
      localStorage.clear();
      $("#user-input-title").val("");
      $("#user-input-body").val("");
      $("#display").html("");
    });

    $("#show-hidden").click(function(){
      location.reload(true);
    });

});


// Random heading and text colors
function getColor() {
  return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}

function randomizeSpans() {
  $('li').each(function() {
    $(this).css('color', getColor());
  });
}

function randomizeHeadings() {
  $('h1').each(function() {
    $(this).css('color', getColor());
  });
}

var swtch;

var colors = setInterval(function() {
  swtch === 0 ? swtch = 1 : swtch = 0;
  swtch === 0 ? randomizeSpans() : randomizeHeadings();
}, 1000);