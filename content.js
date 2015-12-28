if ($('body').hasClass('book')) {
    var data = $("#detail_bullets_id > table > tbody > tr > td > div > ul > li:nth-child(4)").text();
    var isbn = data.split(':')[1];
    var eHonForm = "<form method='post' action='http://www.e-hon.ne.jp/bec/SA/Forward' target='_blank'>" +
        "<input type='hidden' name='　　　検　索　　　' value='btnKodawari'>" +
        "<input type='hidden' name='　　　クリア　　　' value='btnClear'>" +
        "<input type='hidden' name='mode' value='kodawari'>" +
        "<input type='hidden' name='shomei'>" +
        "<input type='hidden' name='tyosya'>" +
        "<input type='hidden' name='syuppan'>" +
        "<input type='hidden' name='series'>" +
        "<input type='hidden' name='description'>" +
        "<input type='hidden' name='isbn' value='" + isbn + "'>" + 
        "<input type='hidden' name='genre'>" +
        "<input type='hidden' name='submitLabel' value='　　　検　索　　　'>" +
        "<button type='submit' style='background-color: #000066; color: #FFFFFF; border-style:none; font-weight: bold; font-size: 130%; -moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px; padding: 5px 60px;'>e-hon で購入</button>" +
        "</form>";
    
    $.ajax({
	    url: 'https://shop.heiando.jp/order/search.asp?page=1&start=1&smode=new&category=&zaiko=ALL&fmode=detail&sort=SELL1&keywords=&titles=&writers=&pubs=&isbns=' + isbn,
	    type: 'GET',
	    cache: false})
	    .done(function(data) {
            var stock = $(data).find(".article_area .result_ls_area .item_area .stock_lt").text();
            var stock = stock.split('：')[1];
            if(stock === 'あり' || stock === '僅少'){
		        $('#availability').parent().prepend("<div id='heianzon'>" +
                                                    "<p style='color: green; font-size: 130%;'><b>平安堂に在庫あります</b></p>" +
                                                    eHonForm +                                             
                                                    "</div>");
            }
            else{
		        $('#availability').parent().prepend("<div id='heianzon'>" +
                                                    "<p><b>平安堂に在庫無し。</b></p>" +
                                                    "</div>" +
                                                    eHonForm);
            }
	    });
}
