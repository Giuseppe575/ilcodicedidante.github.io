<?php

declare(strict_types=1);

header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

$target = trim((string) ($_GET['target'] ?? ''));
$channel = strtolower(trim((string) ($_GET['channel'] ?? 'beta')));

if ($target !== '' && stripos($target, 'windows') !== 0) {
    http_response_code(204);
    exit;
}

$channel = preg_replace('/[^a-z0-9_-]/i', '', $channel) ?: 'beta';
$baseDir = __DIR__;
$manifestCandidates = [
    $baseDir . DIRECTORY_SEPARATOR . 'latest-dynamic-' . $channel . '.json',
    $baseDir . DIRECTORY_SEPARATOR . 'latest-dynamic.json',
];

$manifestPath = null;
foreach ($manifestCandidates as $candidate) {
    if (is_file($candidate)) {
        $manifestPath = $candidate;
        break;
    }
}

if ($manifestPath === null) {
    http_response_code(204);
    exit;
}

$raw = file_get_contents($manifestPath);
if ($raw === false) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'error' => 'Impossibile leggere il manifest update.'
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode($raw, true);
if (!is_array($data) || !isset($data['version'], $data['url'], $data['signature'])) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'error' => 'Manifest update non valido.'
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
