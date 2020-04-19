var pikcha_path = "https://sun9-28.userapi.com/c629428/v629428916/1858b/YtHLqdj1SI8.jpg";

$(document).ready(function(){
  var csrf_token = $("input[name=csrfmiddlewaretoken]").val();
  var current_string_id = $("#structure_field").data('id');


  function get_data_for_canvas(mix_card_id){
    var structure_text = $("p[data-id='" + mix_card_id + "']").html();
    var structure_elements = structure_text.split('#');
    var list_of_brand_flavour =[];
    var list_of_percents =[];
    for (var elem in structure_elements){
      var brand_flavour = structure_elements[elem].split('%')[0];
      brand_flavour = brand_flavour.replace(':', ' ');
      list_of_brand_flavour.push(brand_flavour);

      var percents = structure_elements[elem].split('%')[1];
      list_of_percents.push(percents);
    }
    return {'brand_flavour':list_of_brand_flavour, 'percents':list_of_percents};
  };

  // drawing charts on cards
  var canvases_to_draw = $("canvas.card_chart");
  for (var ix = 0; ix < canvases_to_draw.length; ix++){
    var mix_card_id = canvases_to_draw[ix]['id'];
    var chart_data = get_data_for_canvas(mix_card_id);
    var ctx = canvases_to_draw[ix].getContext('2d');
    var chart = new Chart(ctx, {
      type: 'doughnut',

      data: {
        labels: chart_data['brand_flavour'],
        datasets: [{
          data: chart_data['percents'],
        }],
      },

      options: {
        legend: {
          display: false,
        },
        cutoutPercentage:30,
      },
    })
  }

  // setting autocomplete options
  function set_autocomplete_options(){
    $.ajax({
      url: $("#structure_field").data('url'),
      type: 'get',
      success: function(response){
        var autocomplete_options_brand = {};
        for (var brand in response.autocomplete_options)
          autocomplete_options_brand[brand] = null;
        $(".autocomplete#tobacco_brand").autocomplete({
          data: autocomplete_options_brand,
        });

        var autocomplete_options_flavour = {};
        for (var brand in response.autocomplete_options){
          var tobacco_flavours = response.autocomplete_options[brand];
          for (var ix in tobacco_flavours){
            var tobacco_flavour = tobacco_flavours[ix];
            autocomplete_options_flavour[tobacco_flavour] = null;
          }
        }
        $(".autocomplete#tobacco_flavour").autocomplete({
          data: autocomplete_options_flavour,
        });
      },
    });
  };
  set_autocomplete_options();

  // setting chips in mix cards
  function set_chips_in_mix_card(mix_card){
    var mix_card_stucutre = mix_card.innerHTML.split('#');
    var mix_card_structure_to_replace = '';
    for (var ix = 0; ix < mix_card_stucutre.length-1; ix++){
      var brand_flavour = mix_card_stucutre[ix].split('%')[0];
      brand_flavour = brand_flavour.replace(':', ' ');
      mix_card_structure_to_replace += "<div class='chip'>" + brand_flavour + "</div>";
    } 
    mix_card.innerHTML = mix_card_structure_to_replace;
  }

  var mix_cards_structures = $(".mix_card_structure");
  for (var ix = 0; ix < mix_cards_structures.length; ix++)
    set_chips_in_mix_card(mix_cards_structures[ix]);
      
  // submit form
  $("#mix_create_submit").click(function(){
    // extracting data from strings with tobaccos's brands and names and putting it into MixForm field
    var structure_input_strings = $(".row#tobacco_string");
    // form of structure to send: brand:name%percents#brand:name%percents# etc.
    var structure_text = '';
    for (var i=0; i < structure_input_strings.length; i++){
      structure_text += structure_input_strings[i].getElementsByTagName('input')[0].value + ':';//brand
      structure_text += structure_input_strings[i].getElementsByTagName('input')[1].value + '%';//name
      structure_text += structure_input_strings[i].getElementsByTagName('input')[2].value + '#';//percents
    }
    document.getElementsByName("structure")[0].value = structure_text;
    var serialized_data = $("#mix_create_form").serialize();
    
    $.ajax({
      url: $("#mix_create_form").data('url'),
      data: serialized_data,
      type: 'post',
      success: function(response){
          // adding a new card
          $("#mixes_list").append(
            '<div class="row"><div class="col s12 m12 l12"><div class="card small hoverable" id="mix_card" data-id="' + response.new_mix.id +
            '"><div class="card-image"><img src="' + pikcha_path + '">' +
            '<span class="card-title"><b> ' + response.new_mix.author_name + ' </b>' + response.new_mix.structure + '</span></div>' +
            '<div class="card-content"><p>' + response.new_mix.description + '</p></div><div class="card-action">' +
            '<a href="#" class="right" id="delete_mix" data-id="' + response.new_mix.id + '">Delete mix</a></div></div></div></div>'
          );
          // full reset of form
          $("#mix_create_button").html("Add mix");
          $("#form_container").slideUp('slow');
          $("#mix_create_form")[0].reset();
          
          // sliding animation
          $("#mix_card[data-id="+ response.new_mix.id +"]").hide().slideDown('slow');
        },
      error: function(){
        alert("Submit error");
      } 
    });
  });

  // sliding animation of form
  $("#mix_create_button").click(function(){
      $.ajax({
          success: function(){
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

  // delete card 
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

  // adding string while filling form
  $("a#tobacco_add_in_mix_card").click(function(){
    $.ajax({
      success: function(){
        ++current_string_id;
        $("#structure_field").append(
          '<div class="row" data-id="'+ current_string_id +'" id="tobacco_string" style="margin-bottom: 0;"><div class="col s1 m1 l1">'+
          '<div class="container" style="padding-top: 8px; padding-left: 30px;"><a class="btn-floating btn-small waves-effect waves-light right red" '+
          'id="tobacco_close_string" data-id="'+ current_string_id +'"><i class="material-icons">close</i></a></div></div><div class="col l3 input-field" style="margin:0">'+
          '<input type="text" id="tobacco_brand" class="autocomplete"></div><div class="col l6 input-field" style="margin:0">'+
          '<input type="text" id="tobacco_flavour" class="autocomplete" data-id="'+ current_string_id +'"></div><div class="col l2 input-field" style="margin:0">'+
          '<input type="text" id="tobacco_percents" maxlength="2"></div><div>'
        );
        $("#structure_field").attr('data-id', current_string_id);
        set_autocomplete_options();
      }
    })
  });

  // delete string while filling form
  $(".row").on('click', '#tobacco_close_string', (function(){
    var under_delete_string_id = $(this).data('id');
    $.ajax({
      success: function(){
        $(".row[data-id='"+ under_delete_string_id +"']").remove();
      }
    })
  }));

  
});



