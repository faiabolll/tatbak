$('.chips').chips();
  $('.chips-initial').chips({
    data: [{
      tag: 'Apple',
    }, {
      tag: 'Microsoft',
    }, {
      tag: 'Google',
    }],
  });
  $('.chips-placeholder').chips({
    placeholder: 'Enter a tag',
    secondaryPlaceholder: '+Tag',
  });
  $('.chips-autocomplete').chips({
    autocompleteOptions: {
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': null
      },
      limit: Infinity,
      minLength: 1
    }
  });

// var pikcha_path = "C:\\Users\\EGOR\\FAIABOLLL\\Tatbak\\tatbak\\static\\images\\pikcha.jpg";
var pikcha_path = ""

$(document).ready(function(){
// # - means id
    $("#mix_create_submit").click(function(){
        // exctracting text from chips and transform them into single string
        var chips_data_array = $(".chips.input-field")[0].M_Chips.chipsData;
        var structure_text = "";
        for (var i=0; i<chips_data_array.length; i++) 
          structure_text += chips_data_array[i].tag + ",";
        document.getElementsByName("structure")[0].value = structure_text   
        // form is prepared to send to server
        var serializedData = $("#mix_create_form").serialize();    
        $.ajax({
            url: $("#mix_create_form").data('url'),
            data: serializedData,
            type: 'post',
            success: function(response){
                $("#mixes_list").append(
                    '<div class="col s12 m12 l4"><div class="card small hoverable"><div class="card-image"><img src="' + pikcha_path + '">' + 
                    '<span class="card-title"><b>' + response.new_mix.author_name + '</b>' + response.new_mix.structure + 
                    '</span></div><div class="card-content"><p>' + response.new_mix.description + 
                    '</p></div><div class="card-action"><a href="#">This is a link</a></div></div></div>'
                )
                $("#mix_create_form")[0].reset();
            }
        });
    });

    $("#mix_create_button").click(function(){
        $.ajax({
            url: $("#mix_create_button").data('url'),
            success: function(response){
                var form_is_hidden = $("#mix_create_button").html().slice(0,7) == "Add mix"
                if (form_is_hidden){
                    $("#form_container")[0].style.display = "inline";
                    $("#mix_create_button").html("Close form");
                }
                else {
                    $("#form_container")[0].style.display = "none";
                    $("#mix_create_button").html("Add mix");
                }
            }
        });
    });

    $("#delete_mix").click(function(){
      $.ajax({
        url: $("#delete_mix").data('url'),
        success: function(response){

        }
      });
    });
});
