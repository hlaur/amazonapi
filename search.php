<?php
//require_once "include/sampleSettings.php";
require_once "AmazonECS.class.php";

$amazonEcs = new AmazonECS('AKIAJDZSGW4QWT3CMNSQ', 'R5IHFIoP7/hmZzDBo+SSfic67qMJMCCQDM2UA/1o', 'com', 'techmarkets-20');
//$amazonEcs = new AmazonECS(AWS_API_KEY, AWS_API_SECRET_KEY, 'DE', AWS_ASSOCIATE_TAG);
$amazonEcs->category($_GET['category']);
$amazonEcs->responseGroup('Large');
$amazonEcs->returnType(AmazonECS::RETURN_TYPE_ARRAY);
$amazonEcs->country($_GET['country']);

$page = (!empty($_GET['page'])) ? (int) $_GET['page'] : 1;

if ($page === 0)
  $page = 1;

$output = array();

$amazonEcs->page($page);

$response_final = $amazonEcs->search($_GET['q']);

foreach ($response_final['Items']['Item'] as $singleItem)
{
  $data = array();

  $title = $singleItem['ItemAttributes']['Title'];
  if (mb_strlen($title) > 30)
  {
    $title = substr($title,0, 30);
  }

  $data['Title'] = $title;
  $data['url']   = $singleItem['DetailPageURL'];
  $data['img']   = $singleItem['MediumImage']['URL'];
  $data['price'] = $singleItem['ItemAttributes']['ListPrice']['FormattedPrice'];

  $output[] = $data;
}


echo json_encode($output);