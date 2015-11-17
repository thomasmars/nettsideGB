/**
 * Created by thoma_000 on 17.11.2015.
 */
define(['jquery', 'mix-it-up'], function ($) {


  var ResourceLoader = function () {
    var self = this;

    self.initMixItUp = function () {
      $('.products-display').mixItUp({
        animation: {
          effects: 'fade'
        }
      });
    };

    var imageResize = function ($img) {
      var natWidth = $img.get(0).naturalWidth;
      var natHeight = $img.get(0).naturalHeight;
      var imgRatio = natWidth / natHeight;

      var width = $(window).width();
      var height = $(window).height();
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

        // Remove top height
        var top = newHeight - height;
        if ($img.hasClass('img-contact')) {
          // Add 10 %
          top -= (newHeight / 9);
        }

        $img.css({
          'width': width,
          'height': 'auto',
          'top': -top
        })
      }
    };

    self.initProductPagesImageLoad = function () {
      var $productImages = $('.products-pages');
      $productImages.each(function () {
        var $img = $(this).find('img');
        var src = $img.attr('data-src');

        if(src){
          $img[0].src = src;
        }
      });
    };

    var initMainImagesLoad = function () {
      var self = this;
      var $mainImages = $('.img-home, .img-contact');

      var resizeImages = function () {
        $mainImages.each(function () {
          imageResize($(this));
        });
      };

      resizeImages();
      $(window).resize(function () {
        resizeImages();
      });
    };

    self.initProductPageThumbnails = function () {
      var $thumbnails = $('.products-display .mix');
      $thumbnails.each(function () {
        var $img = $(this).find('img');
        var src = $img.attr('data-src');

        if(src){
          $img[0].src = src;
        }
      });

      return self;
    };

    self.init = function () {
      initMainImagesLoad();
      return self;
    }
  };

  return ResourceLoader;
});
