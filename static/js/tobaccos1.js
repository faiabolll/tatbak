$(document).ready(function(){
// # - means id
    $("#mix_create_submit").click(function(){
        var serializedData = $("#mix_create_form").serialize();
        
        $.ajax({
            url: $("#mix_create_form").data('url'),
            data: serializedData,
            type: 'post',
            success: function(response){
                $("#mixes_list").append(
                    '<div class="col s12 m12 l4"><div class="card small hoverable"><div class="card-image"><img src="{% static "images/pikcha.jpg" %}">' + 
                    '<span class="card-title"><b>' + response.new_mix.author_name + '</b>' + response.new_mix.structure + 
                    '</span></div><div class="card-content"><p>' + response.new_mix.description + 
                    '</p></div><div class="card-action"><a href="#">This is a link</a>  </div></div></div>'
                )
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

});