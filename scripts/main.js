/**
 * Created by Thomas Marstrander on 20.08.2015.
 */
(function ($) {

  $(document).ready(function(){
    var $wrapper = $('.wrapper');

    var slideControls = new SlideControls($wrapper);
    var productsPage = new ProductsPage();
    var graffHeader = new GraffHeader($wrapper, productsPage);

    slideControls.initImageLoaderChain(function () {
      productsPage.loadClones();
    });

    // Init google maps
    var $map = $('.google-map');
    console.log("what is map ?");
    console.log($map);
    var mapOptions = {
      center: new google.maps.LatLng(44.5403, -78.5463),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var googleMap = new google.maps.Map($map.get(0), mapOptions);

  });

})(jQuery);
