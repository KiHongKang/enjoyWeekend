    $(document).on('ready', function() {
      $(".vertical-center-4").slick({
        dots: true,
        vertical: true,
        centerMode: true,
        slidesToShow: 4,
        slidesToScroll: 1
      });
   
      $(".variable").slick({
        dots: true,
        infinite: true,
        variableWidth: true
      });

    });