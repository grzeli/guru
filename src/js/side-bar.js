(function($) {
    $(function() {
        $('.side-post ul li  > p').click(function(e) {           
            $(this).siblings('#services-list').toggle();
            $('#services-list').not($(this).siblings()).hide();
            e.stopPropagation();           
        });
        $('html').click(function() {           
            $('#services-list').hide();           
        });
    });
  
})(jQuery);