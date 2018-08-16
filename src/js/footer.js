(function($) {
    $(function() {
        $('.footer ul li  > h5').click(function(e) {
            $(this).siblings('.p').toggle();
            $('.p').not($(this).siblings()).hide();
            e.stopPropagation();
        });
        $('html').click(function() {
            $('.p').hide();
        });
    });
  
})(jQuery);