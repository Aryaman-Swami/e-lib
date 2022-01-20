var slideIndex1 = 1;
        showSlides1(slideIndex1);

        // Next/previous controls
        function plusSlides1(n) {
        showSlides1(slideIndex1+= n);
        }

        // Thumbnail image controls
        function currentSlide1(n) {
        showSlides1(slideIndex1 = n);
        }

        function showSlides1(n) {
        var j;
        var slides1 = document.getElementsByClassName("mySlides2");
        if (n > slides1.length) {slideIndex1 = 1}
        if (n < 1) {slideIndex1 = slides1.length}
        for (j = 0; j < slides1.length; j++) {
            slides1[j].style.display = "none";
        }
        slides1[slideIndex1-1].style.display = "block";
        }