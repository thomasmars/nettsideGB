/**
 * Created by Thomas Marstrander on 20.08.2015.
 */
define(function (require) {
  var $ = require('jquery');
  var Mustache = require('mustache');
  var SlideControls = require('./slide-controls');
  var GraffHeader = require('./header');
  var ResourceLoader = require('./resource-loader');
  var ProductsPage = require('pages/products-page');
  var ContactPage = require('pages/contact-page');

  // Mustache templates
  var productsMain = require('text!templates/products-main.mustache');
  var imageRoll = require('text!templates/image-roll.mustache');
  var productPages = require('text!templates/product-pages.mustache');

  $(document).ready(function(){
    var $wrapper = $('.wrapper');

    // Load images and clones
    var resourceLoader = new ResourceLoader().init();

    // Load Mustache content
    $.getJSON('data/products.json', function (view) {

      // Render product page template
      $(Mustache.render(productsMain, view, {
        'image-roll': imageRoll,
        'product-pages': productPages
      }))
        .appendTo($('.products'))
        .promise()
        .then(function () {

          // Init mix it up
          resourceLoader.initMixItUp();


          // Enable product page functionality
          new SlideControls($wrapper);
          var productsPage = new ProductsPage(view);
          new GraffHeader($wrapper, productsPage);
          new ContactPage();

          // Resize products page
          productsPage.orientationResize();

          // Finally load clones to create 'product roll'
          productsPage.loadClones();
        });
    });
  });


});
