/**
 * Created by thoma_000 on 19.09.2015.
 */
define(['jquery'], function ($) {

  var SlideControls = function ($wrapper) {
    var self = this;
    this.$wrapper = $wrapper;
    this.initKeyboardListeners();

    $(window).resize(function () {
      self.orientationResize();
    });

    $(window).on('orientationchange', function () {
      self.orientationResize();
    });
    self.orientationResize();
  };

  SlideControls.prototype.orientationResize = function () {
    var self = this;
    var ratio = screen.width / screen.height;
    var $productsDisplay = $('.products-display');
    var $body = $('body');

    // Landscape
    if (ratio > 1) {
      $body.removeClass('portrait');
      self.resizeWrapper($productsDisplay);
    } else {

      // Portrait
      $body.addClass('portrait');
      $body.trigger('reset-image-roll');
      self.portraitResize($productsDisplay);
    }
  };

  SlideControls.prototype.portraitResize = function ($productsDisplay) {
    var $productsDisplay = $productsDisplay || $('.products-display');

    $productsDisplay.removeClass('two-images four-images five-images').addClass('three-images');
    this.imageAmounts = 3;
  };

  SlideControls.prototype.resizeWrapper = function ($productsDisplay) {
    var self = this;
    var windowWidth = $(window).width();

    var $productsDisplay = $productsDisplay || $('.products-display');

    if (windowWidth <= 600) {
      $productsDisplay.removeClass('three-images four-images five-images').addClass('two-images');
      self.imageAmounts = 2;
    } else if (windowWidth <= 900) {
      $productsDisplay.removeClass('two-images four-images five-images').addClass('three-images');
      self.imageAmounts = 3;
    } else if (windowWidth <= 1200) {
      $productsDisplay.removeClass('two-images three-images five-images').addClass('four-images');
      self.imageAmounts = 4;
    } else {
      $productsDisplay.removeClass('two-images three-images four-images').addClass('five-images');
      self.imageAmounts = 5;
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

  SlideControls.prototype.getImageAmounts = function () {
    return this.imageAmounts;
  };

  SlideControls.prototype.slideDown = function () {
    if (this.$wrapper.hasClass('show-contact')) {
      return;
    } else if (this.$wrapper.hasClass('show-products')) {
      this.$wrapper.removeClass('show-products').addClass('show-contact');
    } else {
      this.$wrapper.addClass('show-products');
    }
    $('body').removeClass();
  };

  SlideControls.prototype.slideUp = function () {
    if (this.$wrapper.hasClass('show-contact')) {
      this.$wrapper.removeClass('show-contact').addClass('show-products');
    } else if (this.$wrapper.hasClass('show-products')) {
      this.$wrapper.removeClass('show-products');
    }
    $('body').removeClass();
  };

  return SlideControls;
});
