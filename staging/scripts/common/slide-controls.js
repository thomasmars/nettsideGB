/**
 * Created by thoma_000 on 19.09.2015.
 */
define(['jquery'], function ($) {

  var SlideControls = function ($wrapper) {
    var self = this;
    this.$wrapper = $wrapper;
    this.initKeyboardListeners();
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
