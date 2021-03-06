function iPhone(){ return (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)); }
function setBodyClass(){ document.body.className = (document.documentElement.clientWidth<=940) ? 'small' : 'large'; }

(function($){
  $.fn.boldSelectedElement = function(i) {
    $(this).css('font-weight', 'normal').eq(i).css('font-weight', 'bold');
  };

  $.fn.highlightVisibleAnchor = function() {
    var $this = $(this),
        anchors = $this.map(function() {return $(this).attr('href'); }),
        anchorPositions = $.map(anchors, function(a){return $(a).offset().top; });

    function currentIndex(sections) {
      var scrollPosition = $(window).scrollTop(),
          i=0,
          inSection = false;

      while(!inSection) {
        i++;
        if(sections[i-1] > scrollPosition) {
          i = 1;
          inSection = true;
        } else if (i >  sections[sections.length-1]) {
          i = sections.length;
          inSection = true;
        } else {
          inSection = sections[i-1] <= scrollPosition && scrollPosition < sections[i];
        }
      }

      return i-1;
    }

    $(this).boldSelectedElement(currentIndex(anchorPositions));

    $(window).scroll(function() {
      $this.boldSelectedElement(currentIndex(anchorPositions));
    });
  };


  $.fn.scrollToAnchor = function() {
    return this.click(function(e) {
      if(iPhone()) { return; }

      e.preventDefault();
      var targetSection = $($(this).attr('href'));
      var scrollTo      = targetSection.offset().top;
      $('html,body').animate({scrollTop: scrollTo});
    });
  };


  $(function(){
    setBodyClass();
    $(window).resize(setBodyClass);
    $('#sidebar ol a').scrollToAnchor().highlightVisibleAnchor();

    $('.email_address').each(function() {
      var address   = $(this).text().replace(' [at] ', '@').replace(' [dot] ', '.');
      var emailLink = '<a href="mailto:' + address + '">' + address + '</a>';

      $(this).replaceWith(emailLink);
    });
  });
})(jQuery);
