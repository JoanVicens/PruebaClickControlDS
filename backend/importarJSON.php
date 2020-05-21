<?php
  include_once('BBDD.php');


  $books_file = file_get_contents("./books.json");

  $json = json_decode($books_file, true, 4);
  $books = $json['books'];

  foreach ($books as $book) {
    BBDD::insertBook($db, $book);
  }

?>
