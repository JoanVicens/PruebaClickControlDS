<?php
  include_once('../BBDD.php');

  header("Content-Type:application/json");
  switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
      getPeticions();
      break;

    case "POST":
      postPeticions();
      break;
  }

  function getPeticions() {

    if(isset($_GET["Drama"])) {
      $query = "SELECT * FROM books WHERE books.category = 'Drama'";
    } elseif (isset($_GET["before2013"])) {
      $query = "SELECT * FROM books WHERE books.published <= to_date('2013', 'YYYY')";
    } elseif (isset($_GET["isbn"])) {
      $isbn = $_GET["isbn"];
      $query = "SELECT b.*, COUNT(i.image) AS number_of_images FROM books b LEFT JOIN images i ON b.isbn = i.isbn WHERE b.isbn = '{$isbn}' GROUP BY b.isbn";
    } else {
      $query = "SELECT * FROM books";
    }

    $result = BBDD::execQuery($query);
    if(sizeof($result) == 0) {
      header("HTTP/1.1 400 OK");
    } else {
      header("HTTP/1.1 200 OK");
      echo json_encode($result);
    }
  }

  function postPeticions() {
    if(isset($_POST["action"])) {
      switch ($_POST["action"]) {
        case 'insert':
          if(isset($_POST["isbn"]) && isset($_POST['title'])) {
            BBDD::insertBook($_POST);

            if(isset($_FILES['images'])) { // Hay imagenes adjuntadas
              foreach($_FILES["images"]["tmp_name"] as $key=>$tmp_name) {
                $file_name=$_FILES["images"]["name"][$key];
                $file_tmp=$_FILES["images"]["tmp_name"][$key];

                $blob = fopen($file_tmp, 'rb');

                BBDD::insertImage($file_name, $_POST["isbn"], $blob);
              }

              header("HTTP/1.1 201 OK");

            } else {
              // header("HTTP/1.1 500");
            }
          }
          exit();

        case 'delete':
          if(isset($_POST['isbn'])) {
            $isbn = $_POST["isbn"];
            $query = "DELETE FROM books WHERE books.isbn = '{$isbn}'";
            $result = BBDD::execQuery($query);
            echo 'ISBN deleted: ' . $isbn;
          }
          exit();
      }
    }
  }



?>
