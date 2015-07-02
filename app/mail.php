<?php

require_once 'config.php';

$data = array();
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $name = clear_str($_POST['name']);
    $email = clear_str($_POST['email']);
    $message = clear_str($_POST['message']);
    // если не прошли проверку капчу
    if (empty($name) || empty($email) || empty($message)){
        $data['status'] = "NO";
        $data['mes'] = "Заполните все поля";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $data['status'] = "NO";
        $data['mes'] = "Вы указали не валидный email";
    } else{
        $data_send_admin = array(
            'subject' => 'Письмо с сайта Магазин вариант2 '. $name,
            'message' => 'Сообщение от посетителя <a href="mailto:'.$email.'">'.$name.'</a><br /><br />'.$message,
            'email_from' => 'magazin2@magaz.ru',
            'name_from'  => 'admin',
            'email_to'   => 'cesear@bk.ru',
            'name_to'    => 'Вадиму Д.'
        );
        send_message_to_email($data_send_admin);
        
        $data['status'] = "OK";
        $data['mes'] = "Письмо успешно отправлено";
    }
} else {
    $data['status'] = "NO";
    $data['mes'] = "Некорректное обращение к серверу";
}
echo json_encode($data);
exit;

?>
