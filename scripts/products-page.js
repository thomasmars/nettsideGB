/**
 * Created by thoma_000 on 19.09.2015.
 */
ProductsPage = (function ($) {

  ProductsPage = function (slideControls) {
    var self = this;

    this.slideControls = slideControls;
    this.currentIndex = 0;
    this.$mixItUp = $('.products-display');
    this.$productsList = $('.products-list');
    this.totalProductPages = $('.products-pages').length;
    this.$innerImageRoll = this.$productsList.find('.products-image-roll-inner');
    this.$imageRollArrowLeft = this.$productsList.find('.products-image-roll-arrow.left');
    this.$imageRollArrowRight = this.$productsList.find('.products-image-roll-arrow.right');
    this.currentImageRollIndex = 0;
    this.clonesLoaded = false;

    this.initFilterButtons();

    this.initImageButtons();
    this.initProductsButtons();

    setTimeout(function () {
      self.initImageRollButtons();

      // Reinit image roll buttons when done mixing
      self.$mixItUp.on('mixEnd', function () {
        self.initImageRollButtons();
      })
    }, 100);
  };

  ProductsPage.prototype.loadClones = function () {
    var self = this;

    // Clone pages and attach them to the left side
    var $productPages = $('.products-pages');
    var clonesLoaded = 0;
    var totalClones = $productPages.length;
    $productPages.each(function () {
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

  ProductsPage.prototype.initImageRollButtons = function () {
    var self = this;
    var $mixElements = this.$productsList.find('.mix');
    var scrollAmount = $mixElements.get(0).offsetWidth;
    var visibleElements = this.slideControls.getImageAmounts();
    var rollElements = 0;
    $mixElements.each(function () {
      if ($(this).is(':visible')) {
        rollElements += 1;
      }
    });

    this.$imageRollArrowLeft.unbind('click')
      .click(function () {

        // Already at min index
        if (self.currentImageRollIndex === 0) {
          return;
        }

        // Increase current image roll index
        self.currentImageRollIndex -= 1;

        if (self.currentImageRollIndex <= 0) {
          self.fadeToHidden(self.$imageRollArrowLeft)
        }
        self.fadeToShown(self.$imageRollArrowRight);

        // Negative translation
        self.setImageRollTranslate(-1 * self.currentImageRollIndex * scrollAmount);
      });

    this.$imageRollArrowRight.unbind('click')
      .click(function () {

        // All images already shown
        if (self.currentImageRollIndex + 1 + visibleElements > rollElements) {
          return;
        }

        // Decrease current image roll index
        self.currentImageRollIndex += 1;

        if (self.currentImageRollIndex + visibleElements >= rollElements) {
          self.fadeToHidden(self.$imageRollArrowRight);
        }
        self.fadeToShown(self.$imageRollArrowLeft);

        // Negative translation
        self.setImageRollTranslate(-1 * self.currentImageRollIndex * scrollAmount);
      });

    // Reset image roll
    self.currentImageRollIndex = 0;
    self.setImageRollTranslate();

    // Handle visibility of buttons
    self.fadeToToggle(this.$imageRollArrowLeft, (this.currentImageRollIndex === 0));
    self.fadeToToggle(this.$imageRollArrowRight, (this.currentImageRollIndex + visibleElements >= rollElements));
  };

  ProductsPage.prototype.setImageRollTranslate = function (value) {
    value = value ? value : 0;
    this.$innerImageRoll.css({
      '-webkit-transform': 'translateX(' + value + 'px)',
      transform: 'translateX(' + value + 'px)'
    })
  };

  ProductsPage.prototype.fadeToToggle = function ($element, boolean) {
    if (boolean) {
      this.fadeToHidden($element);
    } else {
      this.fadeToShown($element);
    }
  };

  ProductsPage.prototype.fadeToHidden = function ($element) {
    $element.addClass('hiding').on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function (f) {
      $element.addClass('hidden');

      // Make sure event is only triggered once.
      $element.off(f);
    })
  };

  ProductsPage.prototype.fadeToShown = function ($element) {
    $element.removeClass('hidden').removeClass('hiding');
  };

  ProductsPage.prototype.initGoHomeButtons = function ($buttons) {
    var self = this;
    $buttons.click(function () {
      self.goHome();
    })
  };

  ProductsPage.prototype.initFilterButtons = function () {
    var self = this;

    $('.filter-series button').click(function () {

      // Remove all active classes for buttons
      $('.filter-series button').each(function () {
        $(this).removeClass('active');
      });

      // Add active state to this button
      $(this).addClass('active');
    });
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

    // Get beer class
    if (index !== 0) {
      var beerClass = $('.products-display .mix').eq(index - 1).attr('class').split(' ').pop().split('-').pop();
      $('body').addClass(beerClass);
    } else {
      $('body').removeClass();
    }


    var self = this;
    var percentageTranslate = index * -100;

    if (self.clonesLoaded && (index > (this.totalProductPages / 2))) {

      // Move backwards
      var reverseIndex = (index - this.totalProductPages) - 1;
      percentageTranslate = reverseIndex * -100;

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
