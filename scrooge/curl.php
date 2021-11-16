<?php
function pr($val){
    print_r($val);
}

$apikey='xWrP5zYKM5j9chthcaWe';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://data.nasdaq.com/api/v3/datasets/WIKI/AAPL/data.json?api_key='.$apikey.'&start_date=2014-01-01&end_date=2014-12-31');
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

$headers = [
    'Accept-Encoding: deflate',
    'Connection: keep-alive',
    'User-Agent: Script',
    'Content-Type: application/json'
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);
if (curl_error($ch)) {
    die('Unable to connect: ' . curl_errno($ch) . ' - ' . curl_error($ch));
}
curl_close($ch);
$json=json_decode($response);
pr($json);
return $response;