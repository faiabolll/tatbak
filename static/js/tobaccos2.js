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

// var pikcha_path = "C://Users//EGOR//FAIABOLLL//Tatbak//tatbak//static//images//pikcha.jpg";
// var pikcha_path = "file:///C:/Users/EGOR/FAIABOLLL/Tatbak/tatbak/static/images/pikcha.jpg"
var pikcha_path = "https://sun9-28.userapi.com/c629428/v629428916/1858b/YtHLqdj1SI8.jpg";

$(document).ready(function(){
// # - means id
  var csrf_token = $("input[name=csrfmiddlewaretoken]").val();

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
                // adding a new card
                $("#mixes_list").append(
                  '<div class="row"><div class="col s12 m12 l12"><div class="card small hoverable" id="mix_card" data-id="' + response.new_mix.id +
                  '"><div class="card-image"><img src="' + pikcha_path + '">' +
                  '<span class="card-title"><b> ' + response.new_mix.author_name + ' </b>' + response.new_mix.structure + '</span></div>' +
                  '<div class="card-content"><p>' + response.new_mix.description + '</p></div><div class="card-action">' +
                  '<a href="#" class="right" id="delete_mix" data-id="' + response.new_mix.id + '">Delete mix</a></div></div></div></div>'
                )
                // full reset of form
                alert("Mix added!");
                $("#mix_create_form")[0].reset();
                var chips_to_delete = $("#mix_create_form")[0].getElementsByClassName("chip");
                while (chips_to_delete.length>0){
                  chips_to_delete[0].remove();
                }
                // sliding animation
                $("#mix_card[data-id="+ response.new_mix.id +"]").hide().slideDown('slow');
            },
            error: function(){
              alert("Submit error");
            }
        });
    });

    $("#mix_create_button").click(function(){
        $.ajax({
            url: $("#mix_create_button").data('url'),
            success: function(response){
                var form_is_hidden = $("#mix_create_button").html().slice(0,7) == "Add mix"
                if (form_is_hidden){
                    $("#form_container").slideDown('slow');
                    $("#mix_create_button").html("Close form");
                }
                else {
                    $("#form_container").slideUp('slow');
                    $("#mix_create_button").html("Add mix");
                }
            }
        });
    });

    $('a[id="delete_mix"]').click(function(event){
      event.stopPropagation();
      var data_id = $(event.target).data('id');
      $.ajax({
        url: $(event.target).data('url') + 'delete/' + data_id + '/',
        data: {
          csrfmiddlewaretoken: csrf_token,
          mix_id: data_id
        },
        type: 'post',
        dataType: 'json',
        success: function(response){
          $("#mix_card[data-id="+ data_id +"]").remove();
        }
      });
    });

});
