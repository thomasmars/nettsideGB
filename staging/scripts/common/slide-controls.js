/**
 * Created by thoma_000 on 19.09.2015.
 */
define(['jquery'], function ($) {

  var SlideControls = function ($wrapper) {
    var self = this;
    this.$wrapper = $wrapper;
    this.initKeyboardListeners();
    this.resizeWrapper();

    $(window).resize(function () {
      self.resizeWrapper();
    });
  };

  SlideControls.prototype.resizeWrapper = function () {
    var windowWidth = $(window).width();

    var $productsDisplay = $('.products-display');

    if (windowWidth <= 600) {
      $productsDisplay.removeClass('three-images four-images five-images').addClass('two-images');
      this.imageAmounts = 2;
    } else if (windowWidth <= 900) {
      $productsDisplay.removeClass('two-images four-images five-images').addClass('three-images');
      this.imageAmounts = 3;
    } else if (windowWidth <= 1200) {
      $productsDisplay.removeClass('two-images three-images five-images').addClass('four-images');
      this.imageAmounts = 4;
    } else {
      $productsDisplay.removeClass('two-images three-images four-images').addClass('five-images');
      this.imageAmounts = 5;
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
