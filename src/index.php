<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <title>Word Search</title>
  <!-- bootstrap -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous" />

  <!-- boxicons -->
  <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet' />

  <!-- personal css -->
  <link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<body>

  <div class="container">

    <h1 class="mt-5 mb-3 text-center">Word Search Generator</h1>

    <p class="text-center mb-5">
      <a href="https://github.com/rrickgauer/word-search-generator">View the source code</a>
      <span> | </span>
      <span>&copy; 2020 by </span>
      <a href="https://www.ryanrickgauer.com/resume/index.html">Ryan Rickgauer</a>
      <span> | </span>
      <a href="https://github.com/rrickgauer/word-search-generator/tree/master/word-lists">Get a list of words</a>
    </p>


    <div class="form-group">
      <label for="select-list">Select a list</label>
      <select class="form-control" id="select-list"></select>
    </div>

    <p class="form-label">Enter in words</p>
    <textarea class="form-control" rows="1" id="words-input"></textarea>

    <div class="action-buttons mt-3">
      <button type="button" class="btn btn-primary" id="btn-generate-puzzle">Generate puzzle</button>
      <button type="button" class="btn btn-secondary" id="btn-print">Print</button>
    </div>


    
    <!-- generated puzzle -->
    <table id="puzzle"></table>

    <!-- list of words to search for -->
    <div id="word-list"></div>

  </div>


  <!-- jquery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

  <!-- popper -->
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>

  <!-- bootstrap -->
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

  <!-- autosize script: https://github.com/jackmoore/autosize -->
  <script src="js/autosize.min.js"></script>

  <!-- personal js -->



  <script src="js/generate-words.js"></script>
  <script src="js/main.js"></script>
</body>
</html>