/**
 * Created by thoma_000 on 19.09.2015.
 */
GraffHeader = (function ($) {

  /**
   *
   * @param $wrapper
   * @param {SlideControls} slideControls
   * @constructor
   */
  GraffHeader = function ($wrapper, productsPage) {
    this.$wrapper = $wrapper;
    this.productsPage = productsPage;
    this.initClickListeners();
  };

  GraffHeader.prototype.initClickListeners = function () {
    var self = this;

    $('.button-home, .img-logo').click(function () {
      self.$wrapper.removeClass('show-products').removeClass('show-contact');
      $('body').removeClass();
    });

    $('.button-products').click(function () {
      self.$wrapper.removeClass('show-contact').addClass('show-products');
      self.productsPage.goHome();
    });

    $('.button-contact').click(function () {
      self.$wrapper.removeClass('show-products').addClass('show-contact');
      $('body').removeClass();
    });
  };

  return GraffHeader;

})(jQuery);
