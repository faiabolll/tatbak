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

    // $("#mix_create_button").click(function(){
    //     $.ajax({
    //         url: $("#mix_create_button").data('url'),
    //         success: function(response){
    //             $("#form_container").append(
    //                 ''
    //             )
    //         }
    //     });
    // )};

});