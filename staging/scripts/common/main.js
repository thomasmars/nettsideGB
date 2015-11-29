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
  var TouchControls = require('./touch-controls');

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
          var slideControls = new SlideControls($wrapper);
          new TouchControls($wrapper, slideControls);
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

  $('.footer').on('touchstart', function (event) {
    console.log("footer touched");
    event.preventDefault();
  })


});
