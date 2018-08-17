(function($) {
    $(function() {
        $('.footer ul li  > h5').click(function(e) {
            if($( window ).width() < 767){
            $(this).siblings('#services-list').toggle();
            $('#services-list').not($(this).siblings()).hide();
            e.stopPropagation();
            }
        });
        $('html').click(function() {
            if($(window).width() < 767 ){
            $('#services-list').hide();
            }
        });
    });
  
})(jQuery);