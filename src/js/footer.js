(function($) {
    $(function() {
        $('.footer ul li  > h5').click(function(e) {
            if ($( window ).width() < 576) {
                $(this).siblings('.p').toggle();
                $('.p').not($(this).siblings()).hide();
                e.stopPropagation();
            }
        });
        $('html').click(function() {
            if ($( window ).width() < 576) {
                $('.p').hide();
            }
        });
    });
  
})(jQuery);