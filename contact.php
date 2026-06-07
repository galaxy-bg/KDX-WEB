<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['adSoyad']) || empty($data['email']) || empty($data['mesaj']) || empty($data['konu'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Lütfen zorunlu alanları doldurunuz.']);
    exit;
}

if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Geçersiz e-posta adresi.']);
    exit;
}

$to      = 'info@kronosdx.com';
$adSoyad = htmlspecialchars($data['adSoyad']);
$email   = htmlspecialchars($data['email']);
$telefon = htmlspecialchars($data['telefon'] ?? '');
$sirket  = htmlspecialchars($data['sirket'] ?? '');
$konu    = htmlspecialchars($data['konu']);
$mesaj   = htmlspecialchars($data['mesaj']);

$subject = '=?UTF-8?B?' . base64_encode('[KronosDX] ' . $konu . ' - ' . $adSoyad) . '?=';

$body  = "Ad Soyad : $adSoyad\n";
$body .= "E-posta  : $email\n";
if ($telefon) $body .= "Telefon  : $telefon\n";
if ($sirket)  $body .= "Şirket   : $sirket\n";
$body .= "Konu     : $konu\n";
$body .= "\nMesaj:\n$mesaj\n";

$headers  = "From: noreply@kronosdx.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'E-posta gönderilemedi. Lütfen tekrar deneyin.']);
}
