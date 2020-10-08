<?php

include('functions.php');


if (isset($_GET['id'])) {
  $listID = $_GET['id'];
  
  // build list of words
  $words = getListWords($listID);
  $wordList = [];
  while ($word = $words->fetch(PDO::FETCH_ASSOC)) {
    array_push($wordList, $word['word']);
  }

  // send 404 response if list id does not exist
  if (count($wordList) == 0) {
    echo http_response_code(404);
    exit;
  }


  // get list data
  $listData = getList($listID)->fetch(PDO::FETCH_ASSOC);
  $list['list_id'] = $listData['id'];
  $list['list_name'] = $listData['name'];
  $list['word_count'] = $listData['count'];
  $list['words'] = $wordList;

  // return the data
  echo '<pre>';
  echo json_encode($list, JSON_PRETTY_PRINT);
  echo '</pre>';
  
  exit;
}

else {
  $lists = getLists()->fetchAll(PDO::FETCH_ASSOC);
  echo '<pre>';
  echo json_encode($lists, JSON_PRETTY_PRINT);
  echo '</pre>';
  exit;
}


?>