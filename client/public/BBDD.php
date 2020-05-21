<?php
  class BBDD {

    private static function connectar() {
      // Credenciales
      $host = "ec2-54-247-122-209.eu-west-1.compute.amazonaws.com";
      $dbname = "darjggpkbou3j6";
      $user = "rsbhdvimztmpir";
      $password = "61c4d8baa8b8b72905e338064fd7055479a9924126fa2ec732378c0370481843";

      try {
       $db = new PDO("pgsql:host={$host};dbname={$dbname};", $user, $password);
       $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

       return $db;
      } catch(PDOException $ex) {
        echo $ex->getMessage();
      }
    }

    public static function insertBook($book) {
      $db = BBDD::connectar();

      $query = 'INSERT INTO books (isbn, title, subtitle, author, published, publisher, pages, description, website, category)'
        . 'VALUES (:isbn, :title, :subtitle, :author, :published, :publisher, :pages, :description, :website, :category)';

      $params = array(
        ':isbn'=> $book['isbn'],
        ':title'=> $book['title'],
        ':subtitle'=> isset($book['subtitle']) ? $book['subtitle'] : '',
        ':author'=> isset($book['author']) ? $book['author'] : '',
        ':published'=> isset($book['published']) && $book['published'] !== "" ? $book['published'] : null,
        ':pages'=> isset($book['pages']) ? $book['pages'] : 0,
        ':description'=> isset($book['description']) ? $book['description'] : '',
        ':publisher'=> isset($book['publisher']) ? $book['publisher'] : '',
        ':website'=> isset($book['website']) ? $book['website'] : '',
        ':category'=> isset($book['category']) ? $book['category'] : '',

      );

      $prepared = $db -> prepare($query);
      try {
        return $prepared -> execute($params);
      } catch(PDOException $ex) {
        echo $ex->getMessage();
      }
    }

    public static function insertImage($file_name, $isbn, $blob) {
      $db = BBDD::connectar();

      $query = 'INSERT INTO images (name, isbn, image)'
        . 'VALUES (:name, :isbn, :image)';

      $params = array(
        ':isbn'=> $isbn,
        ':name'=> $file_name,
        ':image'=> $blob
      );

      $prepared = $db -> prepare($query);
      try {
        $prepared -> execute($params);
      } catch(PDOException $ex) {
        echo $ex->getMessage();
      }
    }

    public static function execQuery($query) {
      $db = BBDD::connectar();

      try {
        $stmt  = $db -> prepare($query);
        $stmt ->execute();
        return $stmt -> fetchAll(PDO::FETCH_ASSOC);
      } catch(PDOException $ex) {
        return $ex->getMessage();
      }

    }
  }
?>
