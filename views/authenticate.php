<?php
session_start(); 
$username = $_POST['uname'];
$password = $_POST['psw'];

function test_input($username) {
    $data = trim($username);
    $data = stripslashes($username);
    $data = htmlspecialchars($username);
    return $username;
  }

  function test_input($password) {
    $data = trim($password);
    $data = stripslashes($password);
    $data = htmlspecialchars($password);
    return $password;
  }

