function send_message_to_email($data, $file = null){
    $mail = new PHPMailer;
    $mail->isSendmail();
    
    // Указываем отправителя письма
    $mail->setFrom($data['email_from'], $data['name_from']);
    // Указываем получателя письма
    $mail->addAddress($data['email_to'], $data['name_to']);
    // Указываем тему письма
    $mail->Subject = $data['subject'];
    // Устанавливаем текст сообщения
    $mail->msgHTML($data['message']);
    if($file){
        $mail->addAttachment($file);
    }
    $result = $mail->send();
    $mail->clearAddresses();
    return $result;
}
