 function fiction(){
                    url = "https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=15&key=AIzaSyABCMotJsaZVpPDKaB03v72YRoWAkmiuvo&startIndex=0";

            localStorage.setItem("url",url)
        }

        function nonfiction() {
                            url = "https://www.googleapis.com/books/v1/volumes?q=nonfiction&maxResults=15&key=AIzaSyABCMotJsaZVpPDKaB03v72YRoWAkmiuvo&startIndex=0";

                localStorage.setItem("url", url)
            }

              function drama() {
                    url = "https://www.googleapis.com/books/v1/volumes?q=drama&maxResults=15&key=AIzaSyABCMotJsaZVpPDKaB03v72YRoWAkmiuvo&startIndex=0";

                    localStorage.setItem("url", url)
                }

                 function comic() {
                        url = "https://www.googleapis.com/books/v1/volumes?q=comic&maxResults=15&key=AIzaSyABCMotJsaZVpPDKaB03v72YRoWAkmiuvo&startIndex=0";

                        localStorage.setItem("url", url)
                    }