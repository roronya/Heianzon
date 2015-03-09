if ($('body').attr('class') === 'book ja_JP') {
    var data = $('#detail_bullets_id .content li');
    $.each(data, function() {
        if ($(this).find('b').text() === 'ISBN-10:') {
            isbn = $(this).text().split(':')[1];
        }
    });
}

$.ajax({
    url: 'https://shop.heiando.jp/order/search.asp?page=1&start=1&smode=new&category=&zaiko=ALL&fmode=detail&sort=SELL1&keywords=&titles=&writers=&pubs=&isbns=' + isbn,
    type: 'GET',
    cache: false})
    .done(function(data) {
        stock = $(data).find(".article_area .result_ls_area .item_area .stock_lt").text();
        stock = stock.split('：')[1];
        if(stock === 'あり' || stock === '僅少'){
            $('#availability').parent().prepend("<p id='heianzon'>平安堂に在庫あります</p><style>p#heianzon { color: green; font-size: 130%;}</style>");
        }
        else{
            $('#availability').parent().prepend("<p>平安堂に在庫無し。");
        }
    });