<?php


// return a pdo database object
function dbConnect() {
  include('db-info.php');

  try {
    // connect to database
    $pdo = new PDO("mysql:host=$host;dbname=$dbName",$user,$password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $pdo;

  } catch(PDOexception $e) {
    return 0;
  }
}

// returns a bootstrap alert
function getAlert($message, $alertType = 'success') {
  return "
  <div class=\"alert alert-$alertType alert-dismissible mt-5 mb-5 fade show\" role=\"alert\">
  $message
  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">
  <span aria-hidden=\"true\">&times;</span>
  </button>
  </div>";
}


// return the list names and ids
function getLists() {
  $stmt = '
  SELECT l.id as list_id,
         l.name as list_name,
         (SELECT COUNT(id)
          FROM   Words
          WHERE  list_id = l.id) AS word_count
  FROM   Lists l
  GROUP  BY l.id
  ORDER  BY l.name';

  $sql = dbConnect()->prepare($stmt);
  $sql->execute();

  return $sql;
}


function getListWords($listID) {
  $stmt = '
  SELECT w.word
  FROM   Words w
  WHERE  w.list_id = :listID
  ORDER  BY w.word ASC';

  $sql = dbConnect()->prepare($stmt);

  // filter and bind list id
  $listID = filter_var($listID, FILTER_SANITIZE_NUMBER_INT);
  $sql->bindParam(':listID', $listID, PDO::PARAM_INT);

  $sql->execute();

  return $sql;
}


function getListID($listName) {
  $stmt = '
  SELECT l.id
  FROM   Lists l
  WHERE  l.name = :listName
  LIMIT  1';

  $sql = dbConnect()->prepare($stmt);

  // filter and bind list name
  $listName = filter_var($listName, FILTER_SANITIZE_STRING);
  $sql->bindParam(':listName', $listName, PDO::PARAM_STR);

  $result = $sql->execute()->fetch(PDO::FETCH_ASSOC);

  return $result['id'];
}

function getList($listID) {
  $stmt = '
  SELECT l.id,
         l.name,
         (SELECT COUNT(id)
          FROM   Words
          WHERE  list_id = l.id) AS count
  FROM   Lists l
  WHERE  l.id = :listID
  GROUP  BY l.id
  ORDER  BY l.name
  LIMIT  1';

  $sql = dbConnect()->prepare($stmt);

  // filter and bind list id
  $listID = filter_var($listID, FILTER_SANITIZE_NUMBER_INT);
  $sql->bindParam(':listID', $listID, PDO::PARAM_INT);

  $sql->execute();

  return $sql;
}




?>