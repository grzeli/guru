(function($) {
    $(function() {
        $('nav ul li > a').click(function(e) {
            $(this).siblings('#nav-dropdown').toggle();
            $('#nav-dropdown').not($(this).siblings()).hide();
            e.stopPropagation();
        });
        $('html').click(function() {
            $('#nav-dropdown').hide();
        });
    });
  
    $('#nav-toggle').click(function() {
        $('nav > ul').toggle();
    });
})(jQuery);