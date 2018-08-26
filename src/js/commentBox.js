function render(data){
    var html =   "<div class='comment'><div class='leftPanelImg'><img src='img/person.jpg' alt='avatar'/></div><div class='rightPanel'><span>"+data.name+"</span><div class='email'>"+data.email+"</div><p>"+data.body+"</p></div></div></div>";
    $('#commentBox').append(html);
}

$(document).ready(function(){

    var coment = [];

    if(!localStorage.comentData){
        localStorage.comentData = [];        
    }else{
        coment = JSON.parse(localStorage.comentData);
    }

    for ( var i=0;i<coment.length;i++){
        render(coment[i]);
    }

    $('#addComent').click(function(){
        var addObj = {
            "name": $('#name').val(),
            "email": $('#email').val(),
            "body": $('#bodyText').val()
        };
        coment.push(addObj);
        localStorage.comentData = JSON.stringify(coment);
        render(addObj);
        $('#name').val('');
        $('#email').val('');
        $('#bodyText').val('');

    });

});