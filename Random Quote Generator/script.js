var quote="";
var author="";
function GetNewQuote(){
	$('#quote').text("Loading a quote on design. Please wait...");
	$('#author').text("");
	$.ajax({
		url:'//quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
		//contentType:'application/javascript',
		dataType:'json',
		success: function(data){
			var qt = data.shift();
      $('#quote').html(qt.content);
			$('#author').html("~ "+qt.title);
      quote = $('#quote > p').text();
      author = $('#author').text();
  $('#twtLnk').attr('href','https://twitter.com/intent/tweet?hashtags=quote&related=quotebot&text=' + encodeURIComponent('"' + quote + '" ' + author));
		},
		error: function(){
			$('#quote').text("Some unexpected error occurred. Please try again later.");
			$('#author').text("~ Your Computer.");
		},
		cache:false
	});
}

$(document).ready(function(){
  GetNewQuote();
	$('#quoteBtn').on("click",function(e){
    GetNewQuote();
	});
  
});