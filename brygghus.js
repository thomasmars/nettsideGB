/**
 * Created by Thomas Marstrander on 20.08.2015.
 */
;(function ( $ ) {

  $(document).ready(function(){
    var $wrapper = $('.wrapper');
    var $imgHome = $('.img-home');
    var $imgProducts = $('.img-products');
    var $imgContact = $('.img-contact');

    var resizeWrapper = (function () {
      var width = $(window).width();
      var height = $(window).height();

      $wrapper.width(width).height(height);
      $wrapper.children().width(width).height(height);
    })();

    var imageResize = function ($img) {
      var natWidth = $img.get(0).naturalWidth;
      var natHeight = $img.get(0).naturalHeight;
      var imgRatio = natWidth / natHeight;

      var width = $(window).width();
      var height = $(window).height();

      $wrapper.width(width).height(height);

      var windowRatio = width / height;

      if (imgRatio > windowRatio) {
        // Must scale image to wrapper height
        $img.css({
          'height': height,
          'width': 'auto',
          'top': ''
        });
      } else {
        // Height too big, must center image
        var newHeight = width / imgRatio;

        // Position img in middle by increasing top position
        var top = (newHeight - height) / 2;

        // Or remove only top height ?
        top = newHeight - height;

        $img.css({
          'width': width,
          'height': 'auto',
          'top': -top
        })
      }
    };

    $(window).resize(function () {
      imageResize($imgHome);
      imageResize($imgProducts);
      imageResize($imgContact);
    });

    $imgHome.load(function () {
      console.log("img home loaded");
      imageResize($imgHome);
    });

    $imgProducts.load(function () {
      console.log("img products loaded");
      imageResize($imgProducts);
    });

    $imgContact.load(function () {
      imageResize($imgContact);
    });

    $('.button-home').click(function () {
      $wrapper.removeClass('show-products').removeClass('show-contact');
    });

    $('.button-products').click(function () {
      $wrapper.removeClass('show-contact').addClass('show-products');
    });

    $('.button-contact').click(function () {
      $wrapper.removeClass('show-products').addClass('show-contact');
    });
  });


})(jQuery);
