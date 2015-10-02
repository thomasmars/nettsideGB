/**
 * Created by thoma_000 on 19.09.2015.
 */
ProductsPage = (function ($) {

  ProductsPage = function () {
    this.currentIndex = 0;
    this.$productsList = $('.products-list');
    this.totalProductPages = $('.products-pages').length;
    this.clonesLoaded = false;

    this.initFilterButtons();
    this.initImageButtons();
    this.initProductsButtons();
  };

  ProductsPage.prototype.loadClones = function () {
    var self = this;

    // Clone pages and attach them to the left side
    var $productPages = $('.products-pages');
    var clonesLoaded = 0;
    var totalClones = $productPages.length;
    $productPages.each(function (idx) {
      var left = ((self.totalProductPages + 1 - (parseInt($(this).css('left'))) / $productPages.width())) * -100;
      var $clone = $(this).clone()
        .css('left', left + '%')
        .addClass('clone')
        .appendTo(self.$productsList);

      self.initGoHomeButtons($clone.find('.back-to-product'));

      $clone.ready(function () {
        clonesLoaded += 1;

        if (clonesLoaded >= totalClones) {
          self.clonesLoaded = true;
        }
      });
    });

  };

  ProductsPage.prototype.initProductsButtons = function () {
    this.initGoHomeButtons($('.back-to-product'));
  };

  ProductsPage.prototype.initGoHomeButtons = function ($buttons) {
    var self = this;
    $buttons.click(function () {
      self.goHome();
    })
  };

  ProductsPage.prototype.initFilterButtons = function () {
    $('.filter-series button').click(function () {

      // Remove all active classes for buttons
      $('.filter-series button').each(function () {
        $(this).removeClass('active');
      });

      // Add active state to this button
      $(this).addClass('active');
    })
  };

  ProductsPage.prototype.initImageButtons = function () {
    var self = this;
    $('.products-display .mix').each(function () {
      $(this).click(function () {
        var beerIndex = $(this).attr('data-my-order');
        self.$productsList.addClass('has-moved');
        if (beerIndex === 0) {
          self.$productsList.removeClass('has-moved');
        }

        console.log("beer index ?");
        console.log(beerIndex);
        self.goToBeerPage(beerIndex);
      });
    });
  };

  ProductsPage.prototype.goHome = function () {
    console.log("going home!");
    this.goToBeerPage(0);
  };

  ProductsPage.prototype.goToBeerPage = function (index) {
    if (index === this.currentIndex) {
      return;
    }

    var self = this;
    var percentageTranslate = index * -100;



    if (self.clonesLoaded && (index > (this.totalProductPages / 2))) {

      console.log("clones loaded !");
      // Move backwards
      var reverseIndex = (index - this.totalProductPages) - 1;
      console.log("total product pages");
      console.log(this.totalProductPages);
      console.log("index");
      console.log(index);
      console.log("reverse index");
      console.log(reverseIndex);
      percentageTranslate = reverseIndex * -100;

      console.log("percentage translate");
      console.log(percentageTranslate);
      self.translateProductList(percentageTranslate);
      this.currentIndex = index;
    } else {
      self.translateProductList(percentageTranslate);
      this.currentIndex = index;
    }
  };

  ProductsPage.prototype.transitionProductList = function (value) {
    this.$productsList.css({
      '-webkit-transition': value,
      transition: value
    });
  };

  ProductsPage.prototype.translateProductList = function (percentageTranslate) {
    this.$productsList.css({
      '-webkit-transform': 'translateX(' + percentageTranslate + '%)',
      transform: 'translateX(' + percentageTranslate + '%)'
    });
  };


  return ProductsPage;

})(jQuery);
