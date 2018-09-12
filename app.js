$(document).ready(function() {

  // Go through each property in localStorage to display the to do list on page refresh/start-up
  for (var key in localStorage) {
    if (key !== "length" && key !== "key" && key !== "getItem" && key !== "setItem" && key !== "removeItem" && key !== "clear") {
      let itemHtml = '<div class="display-item" data-storage-key="'+key+'"> ' + key + ' - ' + '<span class="description">' + localStorage.getItem(key) + '</span></div>';
      $(itemHtml).appendTo("#display");
    }
  }

  $("#add-text-btn").on("click", function(){

    // store values from input boxes
    let inputKey = $("#user-input-title").val();
    let inputValue = $("#user-input-body").val();

    // clear values from input boxes
    $("#user-input-title").val("");
    $("#user-input-body").val("");

    // add new property to local storage from input boxes
    localStorage.setItem(inputKey, inputValue);

    // add inputKey and inputValue to the #display container
    let itemHtml = '<div class="display-item" data-storage-key="'+inputKey+'"> ' + inputKey + ' - ' + '<span class="description">' + localStorage.getItem(inputKey) + '</span></div>';
    $(itemHtml).appendTo("#display");

  });

   $("#del-text-btn").on("click", function() {
     alert('item deleted? check the console'); // maybe change to a window.confirm
     localStorage.removeItem( $('#user-input-title').val() ); // grab the title and plop here
     $("#user-input-title").val("");
     $("#user-input-body").val("");
   });

   // clear local storage and refresh the #display container
   $("#clear-all-btn").on("click", function() {
     localStorage.clear();
     $("#user-input-title").val("");
     $("#user-input-body").val("");
     $("#display").html("");
   });

});

// Random heading and text colors
function getColor() {
  return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}

function randomizeSpans() {
  $('span').each(function() {
    $(this).css('color', getColor());
  });
}

function randomizeHeadings() {
  $('h1').each(function() {
    $(this).css('color', getColor());
  });
}

var span;

var colors = setInterval(function() {
  span === 0 ? span = 1 : span = 0;
  span === 0 ? randomizeSpans() : randomizeHeadings();
}, 1000);