CREATE DATABASE  IF NOT EXISTS `booking` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `booking`;
-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: booking
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Aeropuertos`
--

DROP TABLE IF EXISTS `Aeropuertos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Aeropuertos` (
  `Aero_ID` smallint unsigned NOT NULL AUTO_INCREMENT COMMENT 'No llegan a 7,5k aeropuertos en todo el mundo, de los cuales menos de 4k son comerciales.\\n',
  `Aero_nombre` varchar(255) NOT NULL,
  `Aero_iata` char(3) NOT NULL COMMENT 'El código IATA el aeropuerto son 3 caracteres alfanuméricos.',
  `Aero_LocaID` mediumint unsigned NOT NULL,
  `Aero_PaisID` tinyint unsigned NOT NULL,
  `Aero_latitud` decimal(10,8) NOT NULL,
  `Aero_longitud` decimal(11,8) NOT NULL,
  PRIMARY KEY (`Aero_ID`),
  UNIQUE KEY `Aero_iata_UNIQUE` (`Aero_iata`),
  KEY `Aero_nombre_idx` (`Aero_nombre`),
  KEY `Aero_Loca_idx` (`Aero_LocaID`),
  KEY `fk_Aero_Pais_idx` (`Aero_PaisID`),
  CONSTRAINT `fk_Aero_Loca` FOREIGN KEY (`Aero_LocaID`) REFERENCES `Localidades` (`Loca_ID`) ON UPDATE CASCADE,
  CONSTRAINT `fk_Aero_Pais` FOREIGN KEY (`Aero_PaisID`) REFERENCES `Paises` (`Pais_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Aeropuertos`
--

LOCK TABLES `Aeropuertos` WRITE;
/*!40000 ALTER TABLE `Aeropuertos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Aeropuertos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Companias`
--

DROP TABLE IF EXISTS `Companias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Companias` (
  `Cmp_ID` smallint unsigned NOT NULL AUTO_INCREMENT COMMENT 'No llegan a 2k compañias comerciales en el mundo.',
  `Cmp_iata` char(2) NOT NULL COMMENT 'El codigo IATA de las compañias aereas son dos caracteres alfanuméricos.',
  `Cmp_nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`Cmp_ID`),
  UNIQUE KEY `Cmp_iata_UNIQUE` (`Cmp_iata`),
  UNIQUE KEY `Cmp_nombre_UNIQUE` (`Cmp_nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Companias`
--

LOCK TABLES `Companias` WRITE;
/*!40000 ALTER TABLE `Companias` DISABLE KEYS */;
/*!40000 ALTER TABLE `Companias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Localidades`
--

DROP TABLE IF EXISTS `Localidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Localidades` (
  `Loca_ID` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `Loca_nombre` varchar(255) NOT NULL,
  `Loca_PaisID` tinyint unsigned NOT NULL,
  `Loca_latitud` decimal(10,8) NOT NULL,
  `Loca_longitud` decimal(11,8) NOT NULL,
  PRIMARY KEY (`Loca_ID`),
  KEY `fk_Loca_Pais_idx` (`Loca_PaisID`),
  CONSTRAINT `fk_Loca_Pais` FOREIGN KEY (`Loca_PaisID`) REFERENCES `Paises` (`Pais_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Localidades`
--

LOCK TABLES `Localidades` WRITE;
/*!40000 ALTER TABLE `Localidades` DISABLE KEYS */;
/*!40000 ALTER TABLE `Localidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Paises`
--

DROP TABLE IF EXISTS `Paises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Paises` (
  `Pais_ID` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `Pais_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Pais_iso3` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Pais_iso2` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Pais_phonecode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Pais_capital` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Pais_currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Pais_native` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Pais_region` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Pais_subregion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Pais_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=250 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Paises`
--

LOCK TABLES `Paises` WRITE;
/*!40000 ALTER TABLE `Paises` DISABLE KEYS */;
INSERT INTO `Paises` VALUES (1,'Afghanistan','AFG','AF','93','Kabul','AFN','افغانستان','Asia','Southern Asia'),(2,'Aland Islands','ALA','AX','+358-18','Mariehamn','EUR','Åland','Europe','Northern Europe'),(3,'Albania','ALB','AL','355','Tirana','ALL','Shqipëria','Europe','Southern Europe'),(4,'Algeria','DZA','DZ','213','Algiers','DZD','الجزائر','Africa','Northern Africa'),(5,'American Samoa','ASM','AS','+1-684','Pago Pago','USD','American Samoa','Oceania','Polynesia'),(6,'Andorra','AND','AD','376','Andorra la Vella','EUR','Andorra','Europe','Southern Europe'),(7,'Angola','AGO','AO','244','Luanda','AOA','Angola','Africa','Middle Africa'),(8,'Anguilla','AIA','AI','+1-264','The Valley','XCD','Anguilla','Americas','Caribbean'),(9,'Antarctica','ATA','AQ','','','','Antarctica','Polar',''),(10,'Antigua And Barbuda','ATG','AG','+1-268','St. John\'s','XCD','Antigua and Barbuda','Americas','Caribbean'),(11,'Argentina','ARG','AR','54','Buenos Aires','ARS','Argentina','Americas','South America'),(12,'Armenia','ARM','AM','374','Yerevan','AMD','Հայաստան','Asia','Western Asia'),(13,'Aruba','ABW','AW','297','Oranjestad','AWG','Aruba','Americas','Caribbean'),(14,'Australia','AUS','AU','61','Canberra','AUD','Australia','Oceania','Australia and New Zealand'),(15,'Austria','AUT','AT','43','Vienna','EUR','Österreich','Europe','Western Europe'),(16,'Azerbaijan','AZE','AZ','994','Baku','AZN','Azərbaycan','Asia','Western Asia'),(17,'Bahamas The','BHS','BS','+1-242','Nassau','BSD','Bahamas','Americas','Caribbean'),(18,'Bahrain','BHR','BH','973','Manama','BHD','‏البحرين','Asia','Western Asia'),(19,'Bangladesh','BGD','BD','880','Dhaka','BDT','Bangladesh','Asia','Southern Asia'),(20,'Barbados','BRB','BB','+1-246','Bridgetown','BBD','Barbados','Americas','Caribbean'),(21,'Belarus','BLR','BY','375','Minsk','BYN','Белару́сь','Europe','Eastern Europe'),(22,'Belgium','BEL','BE','32','Brussels','EUR','België','Europe','Western Europe'),(23,'Belize','BLZ','BZ','501','Belmopan','BZD','Belize','Americas','Central America'),(24,'Benin','BEN','BJ','229','Porto-Novo','XOF','Bénin','Africa','Western Africa'),(25,'Bermuda','BMU','BM','+1-441','Hamilton','BMD','Bermuda','Americas','Northern America'),(26,'Bhutan','BTN','BT','975','Thimphu','BTN','ʼbrug-yul','Asia','Southern Asia'),(27,'Bolivia','BOL','BO','591','Sucre','BOB','Bolivia','Americas','South America'),(28,'Bosnia and Herzegovina','BIH','BA','387','Sarajevo','BAM','Bosna i Hercegovina','Europe','Southern Europe'),(29,'Botswana','BWA','BW','267','Gaborone','BWP','Botswana','Africa','Southern Africa'),(30,'Bouvet Island','BVT','BV','','','NOK','Bouvetøya','',''),(31,'Brazil','BRA','BR','55','Brasilia','BRL','Brasil','Americas','South America'),(32,'British Indian Ocean Territory','IOT','IO','246','Diego Garcia','USD','British Indian Ocean Territory','Africa','Eastern Africa'),(33,'Brunei','BRN','BN','673','Bandar Seri Begawan','BND','Negara Brunei Darussalam','Asia','South-Eastern Asia'),(34,'Bulgaria','BGR','BG','359','Sofia','BGN','България','Europe','Eastern Europe'),(35,'Burkina Faso','BFA','BF','226','Ouagadougou','XOF','Burkina Faso','Africa','Western Africa'),(36,'Burundi','BDI','BI','257','Bujumbura','BIF','Burundi','Africa','Eastern Africa'),(37,'Cambodia','KHM','KH','855','Phnom Penh','KHR','Kâmpŭchéa','Asia','South-Eastern Asia'),(38,'Cameroon','CMR','CM','237','Yaounde','XAF','Cameroon','Africa','Middle Africa'),(39,'Canada','CAN','CA','1','Ottawa','CAD','Canada','Americas','Northern America'),(40,'Cape Verde','CPV','CV','238','Praia','CVE','Cabo Verde','Africa','Western Africa'),(41,'Cayman Islands','CYM','KY','+1-345','George Town','KYD','Cayman Islands','Americas','Caribbean'),(42,'Central African Republic','CAF','CF','236','Bangui','XAF','Ködörösêse tî Bêafrîka','Africa','Middle Africa'),(43,'Chad','TCD','TD','235','N\'Djamena','XAF','Tchad','Africa','Middle Africa'),(44,'Chile','CHL','CL','56','Santiago','CLP','Chile','Americas','South America'),(45,'China','CHN','CN','86','Beijing','CNY','中国','Asia','Eastern Asia'),(46,'Christmas Island','CXR','CX','61','Flying Fish Cove','AUD','Christmas Island','Oceania','Australia and New Zealand'),(47,'Cocos (Keeling) Islands','CCK','CC','61','West Island','AUD','Cocos (Keeling) Islands','Oceania','Australia and New Zealand'),(48,'Colombia','COL','CO','57','Bogota','COP','Colombia','Americas','South America'),(49,'Comoros','COM','KM','269','Moroni','KMF','Komori','Africa','Eastern Africa'),(50,'Congo','COG','CG','242','Brazzaville','XAF','République du Congo','Africa','Middle Africa'),(51,'Congo The Democratic Republic Of The','COD','CD','243','Kinshasa','CDF','République démocratique du Congo','Africa','Middle Africa'),(52,'Cook Islands','COK','CK','682','Avarua','NZD','Cook Islands','Oceania','Polynesia'),(53,'Costa Rica','CRI','CR','506','San Jose','CRC','Costa Rica','Americas','Central America'),(54,'Cote D\'Ivoire (Ivory Coast)','CIV','CI','225','Yamoussoukro','XOF',NULL,'Africa','Western Africa'),(55,'Croatia (Hrvatska)','HRV','HR','385','Zagreb','HRK','Hrvatska','Europe','Southern Europe'),(56,'Cuba','CUB','CU','53','Havana','CUP','Cuba','Americas','Caribbean'),(57,'Cyprus','CYP','CY','357','Nicosia','EUR','Κύπρος','Europe','Southern Europe'),(58,'Czech Republic','CZE','CZ','420','Prague','CZK','Česká republika','Europe','Eastern Europe'),(59,'Denmark','DNK','DK','45','Copenhagen','DKK','Danmark','Europe','Northern Europe'),(60,'Djibouti','DJI','DJ','253','Djibouti','DJF','Djibouti','Africa','Eastern Africa'),(61,'Dominica','DMA','DM','+1-767','Roseau','XCD','Dominica','Americas','Caribbean'),(62,'Dominican Republic','DOM','DO','+1-809 and 1-829','Santo Domingo','DOP','República Dominicana','Americas','Caribbean'),(63,'East Timor','TLS','TL','670','Dili','USD','Timor-Leste','Asia','South-Eastern Asia'),(64,'Ecuador','ECU','EC','593','Quito','USD','Ecuador','Americas','South America'),(65,'Egypt','EGY','EG','20','Cairo','EGP','مصر‎','Africa','Northern Africa'),(66,'El Salvador','SLV','SV','503','San Salvador','USD','El Salvador','Americas','Central America'),(67,'Equatorial Guinea','GNQ','GQ','240','Malabo','XAF','Guinea Ecuatorial','Africa','Middle Africa'),(68,'Eritrea','ERI','ER','291','Asmara','ERN','ኤርትራ','Africa','Eastern Africa'),(69,'Estonia','EST','EE','372','Tallinn','EUR','Eesti','Europe','Northern Europe'),(70,'Ethiopia','ETH','ET','251','Addis Ababa','ETB','ኢትዮጵያ','Africa','Eastern Africa'),(71,'Falkland Islands','FLK','FK','500','Stanley','FKP','Falkland Islands','Americas','South America'),(72,'Faroe Islands','FRO','FO','298','Torshavn','DKK','Føroyar','Europe','Northern Europe'),(73,'Fiji Islands','FJI','FJ','679','Suva','FJD','Fiji','Oceania','Melanesia'),(74,'Finland','FIN','FI','358','Helsinki','EUR','Suomi','Europe','Northern Europe'),(75,'France','FRA','FR','33','Paris','EUR','France','Europe','Western Europe'),(76,'French Guiana','GUF','GF','594','Cayenne','EUR','Guyane française','Americas','South America'),(77,'French Polynesia','PYF','PF','689','Papeete','XPF','Polynésie française','Oceania','Polynesia'),(78,'French Southern Territories','ATF','TF','','Port-aux-Francais','EUR','Territoire des Terres australes et antarctiques fr','Africa','Southern Africa'),(79,'Gabon','GAB','GA','241','Libreville','XAF','Gabon','Africa','Middle Africa'),(80,'Gambia The','GMB','GM','220','Banjul','GMD','Gambia','Africa','Western Africa'),(81,'Georgia','GEO','GE','995','Tbilisi','GEL','საქართველო','Asia','Western Asia'),(82,'Germany','DEU','DE','49','Berlin','EUR','Deutschland','Europe','Western Europe'),(83,'Ghana','GHA','GH','233','Accra','GHS','Ghana','Africa','Western Africa'),(84,'Gibraltar','GIB','GI','350','Gibraltar','GIP','Gibraltar','Europe','Southern Europe'),(85,'Greece','GRC','GR','30','Athens','EUR','Ελλάδα','Europe','Southern Europe'),(86,'Greenland','GRL','GL','299','Nuuk','DKK','Kalaallit Nunaat','Americas','Northern America'),(87,'Grenada','GRD','GD','+1-473','St. George\'s','XCD','Grenada','Americas','Caribbean'),(88,'Guadeloupe','GLP','GP','590','Basse-Terre','EUR','Guadeloupe','Americas','Caribbean'),(89,'Guam','GUM','GU','+1-671','Hagatna','USD','Guam','Oceania','Micronesia'),(90,'Guatemala','GTM','GT','502','Guatemala City','GTQ','Guatemala','Americas','Central America'),(91,'Guernsey and Alderney','GGY','GG','+44-1481','St Peter Port','GBP','Guernsey','Europe','Northern Europe'),(92,'Guinea','GIN','GN','224','Conakry','GNF','Guinée','Africa','Western Africa'),(93,'Guinea-Bissau','GNB','GW','245','Bissau','XOF','Guiné-Bissau','Africa','Western Africa'),(94,'Guyana','GUY','GY','592','Georgetown','GYD','Guyana','Americas','South America'),(95,'Haiti','HTI','HT','509','Port-au-Prince','HTG','Haïti','Americas','Caribbean'),(96,'Heard and McDonald Islands','HMD','HM',' ','','AUD','Heard Island and McDonald Islands','',''),(97,'Honduras','HND','HN','504','Tegucigalpa','HNL','Honduras','Americas','Central America'),(98,'Hong Kong S.A.R.','HKG','HK','852','Hong Kong','HKD','香港','Asia','Eastern Asia'),(99,'Hungary','HUN','HU','36','Budapest','HUF','Magyarország','Europe','Eastern Europe'),(100,'Iceland','ISL','IS','354','Reykjavik','ISK','Ísland','Europe','Northern Europe'),(101,'India','IND','IN','91','New Delhi','INR','भारत','Asia','Southern Asia'),(102,'Indonesia','IDN','ID','62','Jakarta','IDR','Indonesia','Asia','South-Eastern Asia'),(103,'Iran','IRN','IR','98','Tehran','IRR','ایران','Asia','Southern Asia'),(104,'Iraq','IRQ','IQ','964','Baghdad','IQD','العراق','Asia','Western Asia'),(105,'Ireland','IRL','IE','353','Dublin','EUR','Éire','Europe','Northern Europe'),(106,'Israel','ISR','IL','972','Jerusalem','ILS','יִשְׂרָאֵל','Asia','Western Asia'),(107,'Italy','ITA','IT','39','Rome','EUR','Italia','Europe','Southern Europe'),(108,'Jamaica','JAM','JM','+1-876','Kingston','JMD','Jamaica','Americas','Caribbean'),(109,'Japan','JPN','JP','81','Tokyo','JPY','日本','Asia','Eastern Asia'),(110,'Jersey','JEY','JE','+44-1534','Saint Helier','GBP','Jersey','Europe','Northern Europe'),(111,'Jordan','JOR','JO','962','Amman','JOD','الأردن','Asia','Western Asia'),(112,'Kazakhstan','KAZ','KZ','7','Astana','KZT','Қазақстан','Asia','Central Asia'),(113,'Kenya','KEN','KE','254','Nairobi','KES','Kenya','Africa','Eastern Africa'),(114,'Kiribati','KIR','KI','686','Tarawa','AUD','Kiribati','Oceania','Micronesia'),(115,'Korea North','PRK','KP','850','Pyongyang','KPW','북한','Asia','Eastern Asia'),(116,'Korea South','KOR','KR','82','Seoul','KRW','대한민국','Asia','Eastern Asia'),(117,'Kuwait','KWT','KW','965','Kuwait City','KWD','الكويت','Asia','Western Asia'),(118,'Kyrgyzstan','KGZ','KG','996','Bishkek','KGS','Кыргызстан','Asia','Central Asia'),(119,'Laos','LAO','LA','856','Vientiane','LAK','ສປປລາວ','Asia','South-Eastern Asia'),(120,'Latvia','LVA','LV','371','Riga','EUR','Latvija','Europe','Northern Europe'),(121,'Lebanon','LBN','LB','961','Beirut','LBP','لبنان','Asia','Western Asia'),(122,'Lesotho','LSO','LS','266','Maseru','LSL','Lesotho','Africa','Southern Africa'),(123,'Liberia','LBR','LR','231','Monrovia','LRD','Liberia','Africa','Western Africa'),(124,'Libya','LBY','LY','218','Tripolis','LYD','‏ليبيا','Africa','Northern Africa'),(125,'Liechtenstein','LIE','LI','423','Vaduz','CHF','Liechtenstein','Europe','Western Europe'),(126,'Lithuania','LTU','LT','370','Vilnius','EUR','Lietuva','Europe','Northern Europe'),(127,'Luxembourg','LUX','LU','352','Luxembourg','EUR','Luxembourg','Europe','Western Europe'),(128,'Macau S.A.R.','MAC','MO','853','Macao','MOP','澳門','Asia','Eastern Asia'),(129,'Macedonia','MKD','MK','389','Skopje','MKD','Северна Македонија','Europe','Southern Europe'),(130,'Madagascar','MDG','MG','261','Antananarivo','MGA','Madagasikara','Africa','Eastern Africa'),(131,'Malawi','MWI','MW','265','Lilongwe','MWK','Malawi','Africa','Eastern Africa'),(132,'Malaysia','MYS','MY','60','Kuala Lumpur','MYR','Malaysia','Asia','South-Eastern Asia'),(133,'Maldives','MDV','MV','960','Male','MVR','Maldives','Asia','Southern Asia'),(134,'Mali','MLI','ML','223','Bamako','XOF','Mali','Africa','Western Africa'),(135,'Malta','MLT','MT','356','Valletta','EUR','Malta','Europe','Southern Europe'),(136,'Man (Isle of)','IMN','IM','+44-1624','Douglas, Isle of Man','GBP','Isle of Man','Europe','Northern Europe'),(137,'Marshall Islands','MHL','MH','692','Majuro','USD','M̧ajeļ','Oceania','Micronesia'),(138,'Martinique','MTQ','MQ','596','Fort-de-France','EUR','Martinique','Americas','Caribbean'),(139,'Mauritania','MRT','MR','222','Nouakchott','MRO','موريتانيا','Africa','Western Africa'),(140,'Mauritius','MUS','MU','230','Port Louis','MUR','Maurice','Africa','Eastern Africa'),(141,'Mayotte','MYT','YT','262','Mamoudzou','EUR','Mayotte','Africa','Eastern Africa'),(142,'Mexico','MEX','MX','52','Mexico City','MXN','México','Americas','Central America'),(143,'Micronesia','FSM','FM','691','Palikir','USD','Micronesia','Oceania','Micronesia'),(144,'Moldova','MDA','MD','373','Chisinau','MDL','Moldova','Europe','Eastern Europe'),(145,'Monaco','MCO','MC','377','Monaco','EUR','Monaco','Europe','Western Europe'),(146,'Mongolia','MNG','MN','976','Ulan Bator','MNT','Монгол улс','Asia','Eastern Asia'),(147,'Montenegro','MNE','ME','382','Podgorica','EUR','Црна Гора','Europe','Southern Europe'),(148,'Montserrat','MSR','MS','+1-664','Plymouth','XCD','Montserrat','Americas','Caribbean'),(149,'Morocco','MAR','MA','212','Rabat','MAD','المغرب','Africa','Northern Africa'),(150,'Mozambique','MOZ','MZ','258','Maputo','MZN','Moçambique','Africa','Eastern Africa'),(151,'Myanmar','MMR','MM','95','Nay Pyi Taw','MMK','မြန်မာ','Asia','South-Eastern Asia'),(152,'Namibia','NAM','NA','264','Windhoek','NAD','Namibia','Africa','Southern Africa'),(153,'Nauru','NRU','NR','674','Yaren','AUD','Nauru','Oceania','Micronesia'),(154,'Nepal','NPL','NP','977','Kathmandu','NPR','नपल','Asia','Southern Asia'),(155,'Netherlands Antilles','ANT','AN','','','',NULL,NULL,NULL),(156,'Netherlands The','NLD','NL','31','Amsterdam','EUR','Nederland','Europe','Western Europe'),(157,'New Caledonia','NCL','NC','687','Noumea','XPF','Nouvelle-Calédonie','Oceania','Melanesia'),(158,'New Zealand','NZL','NZ','64','Wellington','NZD','New Zealand','Oceania','Australia and New Zealand'),(159,'Nicaragua','NIC','NI','505','Managua','NIO','Nicaragua','Americas','Central America'),(160,'Niger','NER','NE','227','Niamey','XOF','Niger','Africa','Western Africa'),(161,'Nigeria','NGA','NG','234','Abuja','NGN','Nigeria','Africa','Western Africa'),(162,'Niue','NIU','NU','683','Alofi','NZD','Niuē','Oceania','Polynesia'),(163,'Norfolk Island','NFK','NF','672','Kingston','AUD','Norfolk Island','Oceania','Australia and New Zealand'),(164,'Northern Mariana Islands','MNP','MP','+1-670','Saipan','USD','Northern Mariana Islands','Oceania','Micronesia'),(165,'Norway','NOR','NO','47','Oslo','NOK','Norge','Europe','Northern Europe'),(166,'Oman','OMN','OM','968','Muscat','OMR','عمان','Asia','Western Asia'),(167,'Pakistan','PAK','PK','92','Islamabad','PKR','Pakistan','Asia','Southern Asia'),(168,'Palau','PLW','PW','680','Melekeok','USD','Palau','Oceania','Micronesia'),(169,'Palestinian Territory Occupied','PSE','PS','970','East Jerusalem','ILS','فلسطين','Asia','Western Asia'),(170,'Panama','PAN','PA','507','Panama City','PAB','Panamá','Americas','Central America'),(171,'Papua new Guinea','PNG','PG','675','Port Moresby','PGK','Papua Niugini','Oceania','Melanesia'),(172,'Paraguay','PRY','PY','595','Asuncion','PYG','Paraguay','Americas','South America'),(173,'Peru','PER','PE','51','Lima','PEN','Perú','Americas','South America'),(174,'Philippines','PHL','PH','63','Manila','PHP','Pilipinas','Asia','South-Eastern Asia'),(175,'Pitcairn Island','PCN','PN','870','Adamstown','NZD','Pitcairn Islands','Oceania','Polynesia'),(176,'Poland','POL','PL','48','Warsaw','PLN','Polska','Europe','Eastern Europe'),(177,'Portugal','PRT','PT','351','Lisbon','EUR','Portugal','Europe','Southern Europe'),(178,'Puerto Rico','PRI','PR','+1-787 and 1-939','San Juan','USD','Puerto Rico','Americas','Caribbean'),(179,'Qatar','QAT','QA','974','Doha','QAR','قطر','Asia','Western Asia'),(180,'Reunion','REU','RE','262','Saint-Denis','EUR','La Réunion','Africa','Eastern Africa'),(181,'Romania','ROU','RO','40','Bucharest','RON','România','Europe','Eastern Europe'),(182,'Russia','RUS','RU','7','Moscow','RUB','Россия','Europe','Eastern Europe'),(183,'Rwanda','RWA','RW','250','Kigali','RWF','Rwanda','Africa','Eastern Africa'),(184,'Saint Helena','SHN','SH','290','Jamestown','SHP','Saint Helena','Africa','Western Africa'),(185,'Saint Kitts And Nevis','KNA','KN','+1-869','Basseterre','XCD','Saint Kitts and Nevis','Americas','Caribbean'),(186,'Saint Lucia','LCA','LC','+1-758','Castries','XCD','Saint Lucia','Americas','Caribbean'),(187,'Saint Pierre and Miquelon','SPM','PM','508','Saint-Pierre','EUR','Saint-Pierre-et-Miquelon','Americas','Northern America'),(188,'Saint Vincent And The Grenadines','VCT','VC','+1-784','Kingstown','XCD','Saint Vincent and the Grenadines','Americas','Caribbean'),(189,'Saint-Barthelemy','BLM','BL','590','Gustavia','EUR','Saint-Barthélemy','Americas','Caribbean'),(190,'Saint-Martin (French part)','MAF','MF','590','Marigot','EUR','Saint-Martin','Americas','Caribbean'),(191,'Samoa','WSM','WS','685','Apia','WST','Samoa','Oceania','Polynesia'),(192,'San Marino','SMR','SM','378','San Marino','EUR','San Marino','Europe','Southern Europe'),(193,'Sao Tome and Principe','STP','ST','239','Sao Tome','STD','São Tomé e Príncipe','Africa','Middle Africa'),(194,'Saudi Arabia','SAU','SA','966','Riyadh','SAR','العربية السعودية','Asia','Western Asia'),(195,'Senegal','SEN','SN','221','Dakar','XOF','Sénégal','Africa','Western Africa'),(196,'Serbia','SRB','RS','381','Belgrade','RSD','Србија','Europe','Southern Europe'),(197,'Seychelles','SYC','SC','248','Victoria','SCR','Seychelles','Africa','Eastern Africa'),(198,'Sierra Leone','SLE','SL','232','Freetown','SLL','Sierra Leone','Africa','Western Africa'),(199,'Singapore','SGP','SG','65','Singapur','SGD','Singapore','Asia','South-Eastern Asia'),(200,'Slovakia','SVK','SK','421','Bratislava','EUR','Slovensko','Europe','Eastern Europe'),(201,'Slovenia','SVN','SI','386','Ljubljana','EUR','Slovenija','Europe','Southern Europe'),(202,'Solomon Islands','SLB','SB','677','Honiara','SBD','Solomon Islands','Oceania','Melanesia'),(203,'Somalia','SOM','SO','252','Mogadishu','SOS','Soomaaliya','Africa','Eastern Africa'),(204,'South Africa','ZAF','ZA','27','Pretoria','ZAR','South Africa','Africa','Southern Africa'),(205,'South Georgia','SGS','GS','','Grytviken','GBP','South Georgia','Americas','South America'),(206,'South Sudan','SSD','SS','211','Juba','SSP','South Sudan','Africa','Middle Africa'),(207,'Spain','ESP','ES','34','Madrid','EUR','España','Europe','Southern Europe'),(208,'Sri Lanka','LKA','LK','94','Colombo','LKR','śrī laṃkāva','Asia','Southern Asia'),(209,'Sudan','SDN','SD','249','Khartoum','SDG','السودان','Africa','Northern Africa'),(210,'Suriname','SUR','SR','597','Paramaribo','SRD','Suriname','Americas','South America'),(211,'Svalbard And Jan Mayen Islands','SJM','SJ','47','Longyearbyen','NOK','Svalbard og Jan Mayen','Europe','Northern Europe'),(212,'Swaziland','SWZ','SZ','268','Mbabane','SZL','Swaziland','Africa','Southern Africa'),(213,'Sweden','SWE','SE','46','Stockholm','SEK','Sverige','Europe','Northern Europe'),(214,'Switzerland','CHE','CH','41','Berne','CHF','Schweiz','Europe','Western Europe'),(215,'Syria','SYR','SY','963','Damascus','SYP','سوريا','Asia','Western Asia'),(216,'Taiwan','TWN','TW','886','Taipei','TWD','臺灣','Asia','Eastern Asia'),(217,'Tajikistan','TJK','TJ','992','Dushanbe','TJS','Тоҷикистон','Asia','Central Asia'),(218,'Tanzania','TZA','TZ','255','Dodoma','TZS','Tanzania','Africa','Eastern Africa'),(219,'Thailand','THA','TH','66','Bangkok','THB','ประเทศไทย','Asia','South-Eastern Asia'),(220,'Togo','TGO','TG','228','Lome','XOF','Togo','Africa','Western Africa'),(221,'Tokelau','TKL','TK','690','','NZD','Tokelau','Oceania','Polynesia'),(222,'Tonga','TON','TO','676','Nuku\'alofa','TOP','Tonga','Oceania','Polynesia'),(223,'Trinidad And Tobago','TTO','TT','+1-868','Port of Spain','TTD','Trinidad and Tobago','Americas','Caribbean'),(224,'Tunisia','TUN','TN','216','Tunis','TND','تونس','Africa','Northern Africa'),(225,'Turkey','TUR','TR','90','Ankara','TRY','Türkiye','Asia','Western Asia'),(226,'Turkmenistan','TKM','TM','993','Ashgabat','TMT','Türkmenistan','Asia','Central Asia'),(227,'Turks And Caicos Islands','TCA','TC','+1-649','Cockburn Town','USD','Turks and Caicos Islands','Americas','Caribbean'),(228,'Tuvalu','TUV','TV','688','Funafuti','AUD','Tuvalu','Oceania','Polynesia'),(229,'Uganda','UGA','UG','256','Kampala','UGX','Uganda','Africa','Eastern Africa'),(230,'Ukraine','UKR','UA','380','Kiev','UAH','Україна','Europe','Eastern Europe'),(231,'United Arab Emirates','ARE','AE','971','Abu Dhabi','AED','دولة الإمارات العربية المتحدة','Asia','Western Asia'),(232,'United Kingdom','GBR','GB','44','London','GBP','United Kingdom','Europe','Northern Europe'),(233,'United States','USA','US','1','Washington','USD','United States','Americas','Northern America'),(234,'United States Minor Outlying Islands','UMI','UM','1','','USD','United States Minor Outlying Islands','Americas','Northern America'),(235,'Uruguay','URY','UY','598','Montevideo','UYU','Uruguay','Americas','South America'),(236,'Uzbekistan','UZB','UZ','998','Tashkent','UZS','O‘zbekiston','Asia','Central Asia'),(237,'Vanuatu','VUT','VU','678','Port Vila','VUV','Vanuatu','Oceania','Melanesia'),(238,'Vatican City State (Holy See)','VAT','VA','379','Vatican City','EUR','Vaticano','Europe','Southern Europe'),(239,'Venezuela','VEN','VE','58','Caracas','VEF','Venezuela','Americas','South America'),(240,'Vietnam','VNM','VN','84','Hanoi','VND','Việt Nam','Asia','South-Eastern Asia'),(241,'Virgin Islands (British)','VGB','VG','+1-284','Road Town','USD','British Virgin Islands','Americas','Caribbean'),(242,'Virgin Islands (US)','VIR','VI','+1-340','Charlotte Amalie','USD','United States Virgin Islands','Americas','Caribbean'),(243,'Wallis And Futuna Islands','WLF','WF','681','Mata Utu','XPF','Wallis et Futuna','Oceania','Polynesia'),(244,'Western Sahara','ESH','EH','212','El-Aaiun','MAD','الصحراء الغربية','Africa','Northern Africa'),(245,'Yemen','YEM','YE','967','Sanaa','YER','اليَمَن','Asia','Western Asia'),(246,'Zambia','ZMB','ZM','260','Lusaka','ZMW','Zambia','Africa','Eastern Africa'),(247,'Zimbabwe','ZWE','ZW','263','Harare','ZWL','Zimbabwe','Africa','Eastern Africa'),(248,'Kosovo','XKX','XK','383','Pristina','EUR','Republika e Kosovës','Europe','Eastern Europe'),(249,'Curaçao','CUW','CW','599','Willemstad','ANG','Curaçao','Americas','Caribbean');
/*!40000 ALTER TABLE `Paises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Regiones`
--

DROP TABLE IF EXISTS `Regiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Regiones` (
  `Rgn_ID` smallint unsigned NOT NULL AUTO_INCREMENT,
  `Rgn_nombre` varchar(255) NOT NULL,
  `Rgn_PaisID` tinyint unsigned NOT NULL,
  `Rgn_iso2` char(2) DEFAULT '' COMMENT 'El código ISO2 de una región son dos caracteres alfanuméricos. Puede haber regiones sin ISO2.',
  PRIMARY KEY (`Rgn_ID`),
  KEY `fk_Rgn_pais_idx` (`Rgn_PaisID`),
  CONSTRAINT `fk_Rgn_pais` FOREIGN KEY (`Rgn_PaisID`) REFERENCES `Paises` (`Pais_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Regiones`
--

LOCK TABLES `Regiones` WRITE;
/*!40000 ALTER TABLE `Regiones` DISABLE KEYS */;
/*!40000 ALTER TABLE `Regiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReservaCabeceras`
--

DROP TABLE IF EXISTS `ReservaCabeceras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReservaCabeceras` (
  `RC_ID` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'Hasta 4.294.967.295 reservas',
  `RC_UsrID` mediumint unsigned NOT NULL,
  `RC_base` decimal(6,2) unsigned NOT NULL,
  `RC_total` decimal(6,2) unsigned NOT NULL COMMENT 'Se calcula a partir de la cantidad y precio del detalle.',
  `RC_fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'YYYY-MM-DD en la que se efectúa la reserva.',
  `RC_status` char(1) NOT NULL DEFAULT 'a' COMMENT '''a'' de activo ''i'' de inactivo para las reservas canceladas.',
  `RC_adults` tinyint NOT NULL COMMENT 'Número de adultos',
  PRIMARY KEY (`RC_ID`),
  KEY `fk_RC_Usr_idx` (`RC_UsrID`),
  KEY `RC_fecha_idx` (`RC_fecha`),
  KEY `RC_status_idx` (`RC_status`),
  CONSTRAINT `fk_RC_Usr` FOREIGN KEY (`RC_UsrID`) REFERENCES `Usuarios` (`Usr_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='La tabla cabecera de reserva identifica un conjunto de reservas para cada usuario. Es como una cabecera de factura.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReservaCabeceras`
--

LOCK TABLES `ReservaCabeceras` WRITE;
/*!40000 ALTER TABLE `ReservaCabeceras` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReservaCabeceras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReservaDetalles`
--

DROP TABLE IF EXISTS `ReservaDetalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReservaDetalles` (
  `RD_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `RD_VueID` bigint unsigned NOT NULL,
  `RD_RCID` int unsigned NOT NULL,
  PRIMARY KEY (`RD_ID`),
  KEY `fk_RD_RC_idx` (`RD_RCID`),
  KEY `fk_RD_vuelo_idx` (`RD_VueID`),
  CONSTRAINT `fk_RD_RC` FOREIGN KEY (`RD_RCID`) REFERENCES `ReservaCabeceras` (`RC_ID`) ON UPDATE CASCADE,
  CONSTRAINT `fk_RD_vuelo` FOREIGN KEY (`RD_VueID`) REFERENCES `Vuelos` (`Vue_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Es el desglose de un conjunto de reservas.Sería como el desglose de una factura.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReservaDetalles`
--

LOCK TABLES `ReservaDetalles` WRITE;
/*!40000 ALTER TABLE `ReservaDetalles` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReservaDetalles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `Usr_ID` mediumint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Hasta  16777215  Usuarios.',
  `Usr_nombre` varchar(100) NOT NULL,
  `Usr_email` varchar(200) NOT NULL COMMENT 'El mail es único y será el login de usuario.',
  `Usr_password` varchar(255) NOT NULL COMMENT 'La contraseña se encriptará en el BE.',
  `Usr_foto` varchar(255) DEFAULT '0' COMMENT 'Se guarda un path.',
  `Usr_bio` varchar(249) DEFAULT '0',
  `Usr_signin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Se almacena un timestamp del momento de registro.',
  `Usr_status` char(1) NOT NULL DEFAULT 'i' COMMENT 'Estado de usuario. Los usuarios nunca se borran. Al darse de alta, por defecto estan activos. En caso de baja se cambia el estado a \\\\''i\\\\''.',
  `Usr_AeroID` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`Usr_ID`),
  UNIQUE KEY `Usr_email_UNIQUE` (`Usr_email`),
  KEY `fk_Usuarios_1_idx` (`Usr_AeroID`),
  CONSTRAINT `fk_Usr_Aero_idx` FOREIGN KEY (`Usr_AeroID`) REFERENCES `Aeropuertos` (`Aero_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vuelos`
--

DROP TABLE IF EXISTS `Vuelos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vuelos` (
  `Vue_ID` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Hasta 2 e64-1 vuelos almacenables.',
  `Vue_origenID` smallint unsigned NOT NULL COMMENT 'No llegan a 7,5k aeropuertos en el mundo de los cuales menos de 4k son comerciales.',
  `Vue_destinoID` smallint unsigned NOT NULL,
  `Vue_companyID` smallint unsigned NOT NULL COMMENT 'No llegan a 2k compañias comerciales.',
  `Vue_horaSalida` varchar(45) NOT NULL COMMENT 'Dia y hora de partida del vuelo.',
  `Vue_horaLlegada` varchar(45) NOT NULL,
  `Vue_duracion` varchar(9) NOT NULL COMMENT 'Duración del vuelo en formato string ISO 8601',
  `Vue_paradas` tinyint unsigned NOT NULL,
  `Vue_direccion` tinyint unsigned NOT NULL,
  `Vue_aircraft` varchar(12) NOT NULL,
  PRIMARY KEY (`Vue_ID`),
  UNIQUE KEY `Vue_OCH` (`Vue_origenID`,`Vue_companyID`,`Vue_horaSalida`),
  KEY `fk_Vue_Cmp_idx` (`Vue_companyID`),
  KEY `fk_Vue_origen_idx` (`Vue_origenID`),
  KEY `fk_Vue_destino_idx` (`Vue_destinoID`),
  KEY `Vue_duracion_idx` (`Vue_duracion`),
  CONSTRAINT `fk_Vue_Cmp` FOREIGN KEY (`Vue_companyID`) REFERENCES `Companias` (`Cmp_ID`) ON UPDATE CASCADE,
  CONSTRAINT `fk_Vue_destino` FOREIGN KEY (`Vue_destinoID`) REFERENCES `Aeropuertos` (`Aero_ID`) ON UPDATE CASCADE,
  CONSTRAINT `fk_Vue_origen` FOREIGN KEY (`Vue_origenID`) REFERENCES `Aeropuertos` (`Aero_ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vuelos`
--

LOCK TABLES `Vuelos` WRITE;
/*!40000 ALTER TABLE `Vuelos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Vuelos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-08  8:40:35
