/**
 * Created by thoma_000 on 19.09.2015.
 */
SlideControls = (function ($) {

  /**
   * Wait an amount of miliseconds before moving with touch listener
   * in case of touch click
   * @type {number}
   */
  var touchMoveDelay = 100;

  /**
   * The percentage of a page that must be moved before a page will change
   * @type {number}
   */
  var touchMovePercentageThreshold = 20;

  SlideControls = function ($wrapper) {
    var self = this;
    this.$wrapper = $wrapper;
    this.windowWidth = $(window).width();
    this.windowHeight = $(window).height();

    this.initMixItUp();
    this.initResizeListeners();
    this.initKeyboardListeners();
    this.initTouchListeners(touchMoveDelay, touchMovePercentageThreshold);
    this.resizeWrapper();
  };

  SlideControls.prototype.initImageLoaderChain = function (finishedCallback) {
    var self = this;
    this.initMainImagesLoad(function () {
      self.initProductPageThumbnails(function () {
        self.initProductPagesImageLoad(function () {
          finishedCallback();
        });
      })
    });
  };

  SlideControls.prototype.initProductPagesImageLoad = function (finishedCallback) {
    var productImagesLoaded = 0;
    var $productImages = $('.products-pages');
    var totalProductImages = $productImages.length;
    $productImages.each(function () {
      var $img = $(this).find('img');
      var src = $img.attr('data-src');

      if(src){
        $img[0].src = src;
      }

      $img.load(function () {
        productImagesLoaded += 1;

        if (productImagesLoaded >= totalProductImages) {
          // Finished, run callback
          finishedCallback();
        }
      })
    });
  };

  SlideControls.prototype.initProductPageThumbnails = function (finishedCallback) {
    var thumbnailsLoaded = 0;
    var $thumbnails = $('.products-display .mix');
    var totalThumbnails = $thumbnails.length;
    var productImagesLoaded = false;
    $thumbnails.each(function () {
      var $img = $(this).find('img');
      var src = $img.attr('data-src');

      if(src){
        $img[0].src = src;
      }

      // Check when loaded
      $img.load(function () {
        thumbnailsLoaded += 1;

        if (thumbnailsLoaded >= totalThumbnails && !productImagesLoaded) {
          // Finished, run callback
          productImagesLoaded = true;
          finishedCallback();
        }
      })
    });
  };

  SlideControls.prototype.initMainImagesLoad = function (finishedCallback) {
    var mainImagesLoaded = 0;
    var $mainImages = $('.img-home, .img-contact');
    var totalMainImages = $mainImages.length;
    var thumbnailsLoaded = false;
    $mainImages.load(function () {
      mainImagesLoaded += 1;

      if (mainImagesLoaded >= totalMainImages && !thumbnailsLoaded) {
        // Finished, run callback
        thumbnailsLoaded = true;
        finishedCallback();
      }
    })
  };

  SlideControls.prototype.resizeWrapper = function () {
    this.windowWidth = $(window).width();
    this.windowHeight = $(window).height();
    this.$wrapper.width(this.windowWidth).height(this.windowHeight);
    this.$wrapper.children().width(this.windowWidth).height(this.windowHeight);

    var $productsDisplay = $('.products-display');

    if (this.windowWidth <= 600) {
      $productsDisplay.removeClass('three-images four-images five-images').addClass('two-images');
    } else if (this.windowWidth <= 900) {
      $productsDisplay.removeClass('two-images four-images five-images').addClass('three-images');
    } else if (this.windowWidth <= 1200) {
      $productsDisplay.removeClass('two-images three-images five-images').addClass('four-images');
    } else {
      $productsDisplay.removeClass('two-images three-images four-images').addClass('five-images');
    }
  };

  SlideControls.prototype.initKeyboardListeners = function () {
    var self = this;
    $(window).keydown(function (e) {
      if (e.which === 40) { // Arrow down
        self.slideDown();
      } else if (e.which === 38) { // Arrow up
        self.slideUp();
      }
    })
  };

  SlideControls.prototype.initTouchListeners = function (touchMoveDelay, touchMovePercentageThreshold) {
    var self = this;
    this.touchStartY = 0;
    this.currentTranslateY = 0;
    this.touchDiffPercentage = 0;
    this.touchStartTime = 0;
    this.startedMoving = false;

    $(window).on('touchstart', function (e) {
      self.touchStartTime = new Date().getTime();

      self.currentTranslateY = 0;
      if (self.$wrapper.hasClass('show-products')) {
        self.currentTranslateY = -100;
      } else if (self.$wrapper.hasClass('show-contact')) {
        self.currentTranslateY = -200;
      }
      self.touchStartY = e.originalEvent.touches[0].pageY;
    }).on('touchmove', function (e) {
      if (!self.startedMoving) {
        var timeElapsed = (new Date().getTime()) - self.touchStartTime;
        console.log("time elapsed");
        console.log(timeElapsed);
        if (timeElapsed > touchMoveDelay) {
          self.startedMoving = true;
        } else {
          return;
        }
      }

      var touchCurrentY = e.originalEvent.touches[0].pageY;
      var touchDiff = touchCurrentY - self.touchStartY;
      self.touchDiffPercentage = (touchDiff / self.windowHeight) * 100;
      if (self.touchDiffPercentage > 100) {
        self.touchDiffPercentage = 100;
      } else if (self.touchDiffPercentage < -100) {
        self.touchDiffPercentage = -100;
      }
      self.$wrapper.css({
        transition: 'none',
        transform: 'translateY(' + (self.currentTranslateY + self.touchDiffPercentage) + '%)'
      });

    }).on('touchend', function (e) {
      if (!self.startedMoving) {
        return
      }

      self.$wrapper.css({
        transition: '',
        transform: ''
      });
      if (self.touchDiffPercentage > touchMovePercentageThreshold) {
        self.slideUp();
      } else if (self.touchDiffPercentage < -touchMovePercentageThreshold) {
        self.slideDown();
      }

      // Get ready for next touch event
      self.startedMoving = false;
      console.log(e);
      console.log("touch end!");
    });
  };



  SlideControls.prototype.initResizeListeners = function () {
    var self = this;
    var $imgHome = $('.img-home');
    var $imgContact = $('.img-contact');

    $imgHome.load(function () {
      self.imageResize($imgHome);
    });

    $imgContact.load(function () {
      self.imageResize($imgContact);
    });

    $(window).resize(function () {
      self.resizeWrapper();
      self.imageResize($imgHome);
      self.imageResize($imgContact);
    });
  };

  SlideControls.prototype.initMixItUp = function () {
    var self = this;
    $('.products-display').mixItUp({
      animation: {
        effects: 'fade'
      }
    });
  };

  SlideControls.prototype.slideDown = function () {
    if (this.$wrapper.hasClass('show-contact')) {
      return;
    } else if (this.$wrapper.hasClass('show-products')) {
      this.$wrapper.removeClass('show-products').addClass('show-contact');
    } else {
      this.$wrapper.addClass('show-products');
    }
  };

  SlideControls.prototype.slideUp = function () {
    if (this.$wrapper.hasClass('show-contact')) {
      this.$wrapper.removeClass('show-contact').addClass('show-products');
    } else if (this.$wrapper.hasClass('show-products')) {
      this.$wrapper.removeClass('show-products');
    }
  };

  SlideControls.prototype.imageResize = function ($img) {
    var natWidth = $img.get(0).naturalWidth;
    var natHeight = $img.get(0).naturalHeight;
    var imgRatio = natWidth / natHeight;

    var width = $(window).width();
    var height = $(window).height();

    this.$wrapper.width(width).height(height);

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

  return SlideControls;
})(jQuery);
