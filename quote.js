function fetchQuote() {
    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/quotes',
      headers: { 'X-Api-Key': 'asHt6ezm6ZQBYHXAOH+qFg==tt2DfilbN0Uphf1F' },
      contentType: 'application/json',
      success: function (result) {
        if (result.length > 0) {
          $('#quoteText').text(`"${result[0].quote}"`);
          $('#quoteAuthor').text(`- ${result[0].author}`);
        } else {
          $('#quoteText').text('No quote found.');
          $('#quoteAuthor').text('');
        }
      },
      error: function (jqXHR) {
        console.error('Error fetching quote: ', jqXHR.responseText);
        $('#quoteText').text('Failed to load quote.');
        $('#quoteAuthor').text('');
      }
    });
  }
  
  $(document).ready(function () {
    fetchQuote();
  
    $('#newQuoteButton').on('click', fetchQuote);
  });