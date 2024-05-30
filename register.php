<?php
/*
 * @Author: Lucky-Firstsnow firstsnow1119@163.com
 * @Date: 2023-11-14 13:43:57
 * @LastEditors: Lucky-Firstsnow firstsnow1119@163.com
 * @LastEditTime: 2024-05-14 16:45:27
 * @FilePath: \sky\register.php
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//header("Access-Control-Allow-Origin:*");
$conn = new PDO('mysql:host=localhost;dbname=client_side;charset=utf8',
    'root',
    '123456', [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
//header("A");
$name = $_POST['name'] ?? null;
$time = $_POST['time'] ?? null;
$score = $_POST['score'] ?? null;

if (empty($name)) {
    echo json_encode(['error' => 'Name field cannot be blank.']);
    return false;
}

if (empty($time) && $time != '0') {
    echo json_encode(['error' => 'Time field cannot be blank.']);
    return false;
}

if (empty($score) && $score != '0') {
    echo json_encode(['error' => 'Score field cannot be blank.']);
    return false;
}

if (!ctype_digit($time)) {
    echo json_encode(['error' => 'Time field must be an integer.']);
    return false;
}


if (!is_numeric($score)) {
    echo json_encode(['error' => 'Score field must be an integer.']);
    return false;
}

$stmtInsert = $conn->prepare('INSERT INTO ranking (name, time, score) VALUES (?, ?, ?)');
$stmtInsert->execute([$name, $time, $score]);

$stmtSelect = $conn->query('SELECT * FROM ranking');
$ranking = $stmtSelect->fetchAll();
echo json_encode($ranking);