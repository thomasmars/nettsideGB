/**
 * Created by Thomas Marstrander on 20.08.2015.
 */
(function ($) {

  $(document).ready(function(){
    var $wrapper = $('.wrapper');

    var slideControls = new SlideControls($wrapper);
    var productsPage = new ProductsPage(slideControls);
    new GraffHeader($wrapper, productsPage);
    new ContactPage();

    slideControls.initImageLoaderChain(function () {
      productsPage.loadClones();
    });

  });

})(jQuery);
