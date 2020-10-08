const API = 'api.word-search.php';

$(document).ready(function() {
  getLists(displayLists);
  addListeners();
});


function addListeners() {
  $('#select-list').on('change', getWords);
}


function getLists(action) {
  $.getJSON(API, function(response) {
    action(response);
  });
}

function displayLists(lists) {
  var html = '';


  for (var count = 0; count < lists.length; count++)
    html += `<option value="${lists[count].list_id}">${lists[count].list_name}</option>`;

  $('#select-list').html(html);
}


function getWords() {
  var id = $('#select-list option:checked').val();

  var data = {
    list_id: id
  }

  $.getJSON(API, data, function(response) {
    displayWords(response.words);
  });
}

function displayWords(words) {
  var html = '';

  for (var count = 0; count < words.length; count++)
    html += words[count] + "\n";

  $('#words-input').val(html); 
  autosize.update($('#words-input')); 
}