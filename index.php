<?php if(!is_readable('Connections/aquiescedb.php')) {
	if(is_readable("install/index.php")) {
		header("location: install/index.php"); exit;
	} else {
		die("The site does not appear to be properly installed. Please install before use.");
	}
}?>
<?php require_once('Connections/aquiescedb.php'); ?>
<?php require_once('login/includes/login.inc.php'); // log in the user with cookies if applicable ?>
<?php  /*
if (substr(PHP_OS, 0, 3) == 'WIN') {
	pclose(popen("start php /Users/paulegan/Sites/build.fullbhuna.com/documents/includes/auto_backup.gif.php", "r")); // win 
} else {
	pclose(popen("php ".SITE_ROOT."documents/admin/backup/backup.php &", "r")); // unix
} */
if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}

require_once('articles/includes/quickedit_save.inc.php');

$varRegionID_rsHomePage = "1";
if (isset($regionID)) {
  $varRegionID_rsHomePage = $regionID;
}
mysql_select_db($database_aquiescedb, $aquiescedb);
$query_rsHomePage = sprintf("SELECT article.*, articlesection.accesslevel, articlesection.`description` AS section, CONCAT(firstname, ' ', surname) AS author FROM article LEFT JOIN articlesection ON (article.sectionID = articlesection.ID) LEFT JOIN users ON (article.createdbyID = users.ID) WHERE article.sectionID = 0 AND article.regionID = %s  AND versionofID IS NULL LIMIT 1", GetSQLValueString($varRegionID_rsHomePage, "int"));
$rsHomePage = mysql_query($query_rsHomePage, $aquiescedb) or die(mysql_error());
$row_rsHomePage = mysql_fetch_assoc($rsHomePage);
$totalRows_rsHomePage = mysql_num_rows($rsHomePage);

if (isset($row_rsHomePage['redirectURL']) && $row_rsHomePage['redirectURL']!="") { // redirect in article
	header( "HTTP/1.1 301 Moved Permanently" ); 
	header( "Status: 301 Moved Permanently" );
	header("location: ".$row_rsHomePage['redirectURL']); exit;
}

$colname_rsLoggedIn = "-1";
if (isset($_SESSION['MM_Username'])) {
  $colname_rsLoggedIn = $_SESSION['MM_Username'];
}
mysql_select_db($database_aquiescedb, $aquiescedb);
$query_rsLoggedIn = sprintf("SELECT users.ID, users.usertypeID, users.firstname, usergroupmember.groupID FROM users LEFT JOIN usergroupmember ON (users.ID = usergroupmember.userID) WHERE username = %s", GetSQLValueString($colname_rsLoggedIn, "text"));
$rsLoggedIn = mysql_query($query_rsLoggedIn, $aquiescedb) or die(mysql_error());
$row_rsLoggedIn = mysql_fetch_assoc($rsLoggedIn);
$totalRows_rsLoggedIn = mysql_num_rows($rsLoggedIn);

$varRegionID_rsMerge = "1";
if (isset($regionID)) {
  $varRegionID_rsMerge = $regionID;
}
mysql_select_db($database_aquiescedb, $aquiescedb);
$query_rsMerge = sprintf("SELECT * FROM merge WHERE statusID = 1 AND (%s = regionID OR regionID = 0)", GetSQLValueString($varRegionID_rsMerge, "int"));
$rsMerge = mysql_query($query_rsMerge, $aquiescedb) or die(mysql_error());
$row_rsMerge = mysql_fetch_assoc($rsMerge);
$totalRows_rsMerge = mysql_num_rows($rsMerge);




$body = $row_rsHomePage['body'];
$mergebody = $row_rsHomePage['body'];
$articleID = $row_rsHomePage['ID'];



if($totalRows_rsMerge>0) {
	do{
		if(trim($row_rsMerge['mergeincludeURL'])!="") {
			$url = SITE_ROOT.$row_rsMerge['mergeincludeURL'];
			if(is_readable($url)) {				
				ob_start();
				include( $url);
				$row_rsMerge['mergetext'] = ob_get_clean(); // gets content, discards buffer			
			} else {
				if(defined("DEBUG")) die("Can not read include (".htmlentities($url).")");
			}
		}		
		$mergebody = str_replace($row_rsMerge['mergename'], $row_rsMerge['mergetext'],$mergebody);
	} while($row_rsMerge = mysql_fetch_assoc($rsMerge));
}

$pageTitle =  $row_rsHomePage['title'];
$body_class = "home section0";
?>
<!doctype html>

<html class="" lang="en"><!-- InstanceBegin template="/Templates/Standard.dwt.php" codeOutsideHTMLIsLocked="false" -->
<!--<![endif]-->
<head>
<meta charset="utf-8" />
<!-- InstanceBeginEditable name="doctitle" -->
<title><?php  echo isset($row_rsHomePage['seotitle']) ? $row_rsHomePage['seotitle'] : $site_name." | ".$pageTitle; ?></title>
<!-- InstanceEndEditable -->
<?php require_once('seo/includes/seo.inc.php'); ?>
<?php require_once('local/includes/head.inc.php'); ?>
<!-- InstanceBeginEditable name="head" -->
<meta name="robots" content="index,follow"/>
<meta name="description" content="<?php echo isset($row_rsHomePage['metadescription']) ? $row_rsHomePage['metadescription'] : $pageTitle; ?>" />
<meta name="keywords" content="<?php echo isset($row_rsHomePage['metakeywords']) ? $row_rsHomePage['metakeywords'] :  substr(strip_tags($articleBody),0,255); ?>" />
<meta name="author" content="<?php echo isset($row_rsHomePage['author']) ? $row_rsHomePage['author'] : "Paul Egan"; ?>" />
<link rel="canonical" href="<?php $canonicalURL = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") ? "https://" : "http://"; echo $canonicalURL.$_SERVER['HTTP_HOST']."/"; echo $canonicalURL; ?>">
<meta property="og:url" content="<?php echo  $canonicalURL; ?>" />
<meta property="og:site_name" content="<?php echo $site_name; ?>"/>
<meta property="og:title" content="<?php echo $pageTitle; ?>" />
<meta property="og:description" content="<?php echo $row_rsHomePage['metadescription']; ?>" />
<meta property="og:type" content="article" />
<?php echo metaTags(); echo $row_rsHomePage['headHTML']; ?>
<!-- InstanceEndEditable -->
</head>
<!-- ISEARCH_END_INDEX -->
<body class="bootstrap <?php echo $body_class;  ?>">

    <?php require_once('local/includes/header.inc.php'); ?>
  <section>
      <!-- ISEARCH_BEGIN_INDEX -->
      <!-- InstanceBeginEditable name="Body" --><div class="container"><?php require_once('core/includes/alert.inc.php'); ?>
     <div class="quickeditcontainer"> 
 <?php echo $mergebody; ?></div></div>
 <img src="search/auto_spider_img.php" width="1" height="1" alt="" />
<!-- InstanceEndEditable -->
     <section>
      <!-- ISEARCH_END_INDEX --> 
  
    <?php require_once('local/includes/footer.inc.php'); ?>
  
<!-- ISEARCH_BEGIN_INDEX -->

</body>
<!-- InstanceEnd --></html>
<?php
mysql_free_result($rsHomePage);

mysql_free_result($rsLoggedIn);



?>
