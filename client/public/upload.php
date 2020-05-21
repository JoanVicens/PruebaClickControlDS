<?php
  include_once('BBDD.php');


  $books_file = file_get_contents("./books.json");

  $json = json_decode($books_file, true, 4);
  $books = $json['books'];

  foreach ($books as $book) {
    // BBDD::insertBook($db, $book);
  }

?>

<form action="/api/" method="post" enctype="multipart/form-data">
  <input type="text" name="isbn" value="01"/>
  <input type="text" name="title" value="test"/>
  <input type="hidden" name="action" value="insert">
    <table width="100%">
        <tr>
            <td>Select Photo (one or multiple):</td>
            <td><input type="file" name="images[]" multiple/></td>
        </tr>
        <tr>
            <td colspan="2" align="center"><input type="submit" value="Add book"/></td>
        </tr>
    </table>
</form>
