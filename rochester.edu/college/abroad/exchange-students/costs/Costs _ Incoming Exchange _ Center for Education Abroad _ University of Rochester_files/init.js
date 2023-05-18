(() => {

    // Initialize Foundation
    // ----------------------------------------
    $(document).foundation();


    // Helper functions
    // ----------------------------------------
    function toggleContainerSearchIsActiveClass() {
      $('#container').toggleClass('search-is-active');
    }


    // Setup mobile search modal
    // ----------------------------------------
    $('#university-search')
      // close search modal when scrim is touched
      .on('click', function closeSearchModalScrim(event) {
        if (event.target.id == 'university-search') {
          // programatically fire the Toggler to trigger callback functions
          $('#university-search').foundation('toggle');
        }
      })
      // search is active
      .on('on.zf.toggler', function activateMobileSearch(event) {
        // toggle neccesary classes
        toggleContainerSearchIsActiveClass();
        // focus on text input after toggling search button. must wait for the transition to complete
        setTimeout(function focusOnSearchInput() {
          $('#search-form-input').focus();
        }, 250);
      })
      // search is inactive
      .on('off.zf.toggler', function deactivateMobileSearch(event) {
        // turn off classes. remove input focus
        toggleContainerSearchIsActiveClass();
        $('#search-form-input').blur();
      });


    // Augment the Off-canvas effect
    // ----------------------------------------
    $('#off-canvas-site-nav')
      .on('opened.zf.offCanvas', toggleContainerSearchIsActiveClass)
      .on('close.zf.offCanvas', toggleContainerSearchIsActiveClass);


    // Catch a possible situation
    // ----------------------------------------
    $(window).on('changed.zf.mediaquery', function(event, newSize, oldSize) {
      // catch situations where the search modal is open while the viewport changes
      if (Foundation.MediaQuery.is('large up') && $('#container').hasClass('search-is-active')) {
        $('#university-search').foundation('toggle');
      }
    });


    // "Temporary" fix
    // ----------------------------------------
    // there's no CSS-only way of getting the figcaption to stay with an image
    // that has the .left or .right float classes directly applied to it.
    // so we're using some JS until the WYSIWYG editor configs get updated
    // - another option would be a page-level XSLT
    $('figure.image img.left').each(function(i, el) {
      $(el).removeClass().parent().addClass('float-left');
    });
    $('figure.image img.right').each(function(i, el) {
      $(el).removeClass().parent().addClass('float-right');
    });

    // set a max-width on figcaptions via JS for now
    $('figure figcaption').each(function(i, el) {
      const $caption = $(el);
      const imgWidth = $caption.prev('img').attr('width');
      if (imgWidth) {
        $caption.css('width', imgWidth);
      }
    })

})();
