var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "brunofin", "habathcx", "RobotCaleb", "noobs2ninjas","comster404"];
var logo=[];
var stream=[];
var online=[];
var offline=[];
var link=[];
var beginHtml='<div class="feed" ';
var endHtml = '</div>';
var fakeData={
    display_name : '',
    logo: 'https://unsplash.it/50/50',
    _links:{
        self: '#'
    }
};
function GetAll(){
    var streamEndpoint = "https://wind-bow.glitch.me/twitch-api/streams/";
    var channelEndpoint = "https://wind-bow.glitch.me/twitch-api/channels/";
    streamers.forEach(function(val){
        var index = streamers.indexOf(val);
        var endpoint = streamEndpoint+val;
        $.ajax({
            type:'GET',
            url: endpoint,
            dataType:'json',
            success: function(data){
                if(data.stream != null){
                    online.push(val);
                    stream.push(data.stream.game);
                    logo.push(data.stream.channel.logo);
                    link.push(data.stream.channel["_links"].self);
                    Display(data.stream.channel,index);
                }
                else{
                    endpoint = channelEndpoint+val;
                    $.ajax({
                       type:'GET',
                        url: endpoint,
                        dataType: 'json',
                        success: function(cData){
                            if(Boolean(cData.error)==false){
                                offline.push(val);
                                stream.push("Offline");
                                logo.push(cData.logo);
                                link.push(cData["_links"].self);
                                Display(cData,index);
                            }
                            else{
                                fakeData.display_name = val;
                                stream.push("User does not exist");
                                logo.push("https://unsplash.it/50/50");
                                link.push("#");
                                Display(fakeData,index);
                            }
                        },
                        error: function () {
                            alert("Channel Call Failed.");
                        }
                    });
                }
            },
            error: function () {
               alert("Stream Call Failed.");
            }

        });
    });
}
function DisplayOnline(){
    $('.offlines').parent().hide();
    $('.errs').parent().hide();
    $('.onlines').parent().show();
}
function DisplayOffline(){
    $('.errs').parent().hide();
    $('.onlines').parent().hide();
    $('.offlines').parent().show();
}
function Display(inData,i){

        var block = 'b'+i;
        var idTag = '#'+block;
        var htmlStr = beginHtml+'id='+block+'>' + '<a href="https://www.twitch.tv/' + streamers[i] + '"class="lnk pull-left target="_blank">';
        htmlStr += '<img class="pic img-circle" src="' + inData.logo + '"/></a>';
        htmlStr += '<a href="https://www.twitch.tv/' + streamers[i] + '" class="lnk2" target="_blank"><h5 class="name">' + inData["display_name"] + '</h5></a>';
        if (online.indexOf(streamers[i]) >= 0) {
            htmlStr += '<p class="stat onlines">' + stream[i] + '</p>';
            htmlStr += '<span class="indi float-left" style="background:#39FF2B;">&nbsp;</span>';
        }
        else if (offline.indexOf(streamers[i]) >= 0) {
            htmlStr += '<p class="stat offlines">' + 'offline' + '</p>';
            htmlStr += '<span class="indi float-left" style="background:#FF392B;">&nbsp;</span>';
        }
        else{
            htmlStr += '<p class="stat errs">' + 'User does not exist' + '</p>';
            $(idTag).css('pointer','none');
        }
        htmlStr += endHtml;

        $('#contents').append(htmlStr)
        $(idTag).slideDown( 300 ).delay( 800 ).fadeIn( 400 );
}

$(document).ready(function(){
    GetAll();
    $('#all').on('click',function(e){
        $('#contents').html('');
        GetAll();
    });
    $('#online').on('click',function(e){
       if(Boolean(logo[0]!= false)){
            DisplayOnline();
        }
        else{
            GetAll();
            DisplayOnline();
        }
    });
    $('#offline').on('click',function(e){
        if(Boolean(logo[0]!= false)){
            DisplayOffline();
        }
        else{
            GetAll();
            DisplayOffline();
        }
    });
});
