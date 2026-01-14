-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: database-lb3r.cluster-cta04uwsk3mh.ap-southeast-1.rds.amazonaws.com    Database: lb3r01
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_username` (`username`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (2,'admin','$2a$10$0w0lHKBATH4oBZSq0jsdzO3SwKSkuoUCpQnNn.vP7.gXSkT4.wBk2','Administrator','admin@lb3r.com','superadmin','2026-01-06 09:54:32','2026-01-06 09:54:32');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bacaan`
--

DROP TABLE IF EXISTS `bacaan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bacaan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomor_soal` int NOT NULL,
  `kategori_soal` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `judul_text1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_2` text COLLATE utf8mb4_unicode_ci,
  `bacaan_3` text COLLATE utf8mb4_unicode_ci,
  `bacaan_4` text COLLATE utf8mb4_unicode_ci,
  `bacaan_5` text COLLATE utf8mb4_unicode_ci,
  `bacaan_6` text COLLATE utf8mb4_unicode_ci,
  `bacaan_7` text COLLATE utf8mb4_unicode_ci,
  `bacaan_8` text COLLATE utf8mb4_unicode_ci,
  `bacaan_9` text COLLATE utf8mb4_unicode_ci,
  `bacaan_10` text COLLATE utf8mb4_unicode_ci,
  `bacaan_11` text COLLATE utf8mb4_unicode_ci,
  `bacaan_12` text COLLATE utf8mb4_unicode_ci,
  `bacaan_13` text COLLATE utf8mb4_unicode_ci,
  `bacaan_14` text COLLATE utf8mb4_unicode_ci,
  `bacaan_15` text COLLATE utf8mb4_unicode_ci,
  `bacaan_16` text COLLATE utf8mb4_unicode_ci,
  `link_gambar` text COLLATE utf8mb4_unicode_ci,
  `soal` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeOpsi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inner_html` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pilihan_a` text COLLATE utf8mb4_unicode_ci,
  `pilihan_a_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5_img` text COLLATE utf8mb4_unicode_ci,
  `kunci_jawaban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_kategori` (`kategori_soal`),
  KEY `idx_nomor` (`nomor_soal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bacaan`
--

LOCK TABLES `bacaan` WRITE;
/*!40000 ALTER TABLE `bacaan` DISABLE KEYS */;
/*!40000 ALTER TABLE `bacaan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `english`
--

DROP TABLE IF EXISTS `english`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `english` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomor_soal` int NOT NULL,
  `kategori_soal` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `judul_text1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_2` text COLLATE utf8mb4_unicode_ci,
  `bacaan_3` text COLLATE utf8mb4_unicode_ci,
  `bacaan_4` text COLLATE utf8mb4_unicode_ci,
  `bacaan_5` text COLLATE utf8mb4_unicode_ci,
  `bacaan_6` text COLLATE utf8mb4_unicode_ci,
  `bacaan_7` text COLLATE utf8mb4_unicode_ci,
  `bacaan_8` text COLLATE utf8mb4_unicode_ci,
  `bacaan_9` text COLLATE utf8mb4_unicode_ci,
  `bacaan_10` text COLLATE utf8mb4_unicode_ci,
  `bacaan_11` text COLLATE utf8mb4_unicode_ci,
  `bacaan_12` text COLLATE utf8mb4_unicode_ci,
  `bacaan_13` text COLLATE utf8mb4_unicode_ci,
  `bacaan_14` text COLLATE utf8mb4_unicode_ci,
  `bacaan_15` text COLLATE utf8mb4_unicode_ci,
  `bacaan_16` text COLLATE utf8mb4_unicode_ci,
  `link_gambar` text COLLATE utf8mb4_unicode_ci,
  `soal` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeOpsi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inner_html` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pilihan_a` text COLLATE utf8mb4_unicode_ci,
  `pilihan_a_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5_img` text COLLATE utf8mb4_unicode_ci,
  `kunci_jawaban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_kategori` (`kategori_soal`),
  KEY `idx_nomor` (`nomor_soal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `english`
--

LOCK TABLES `english` WRITE;
/*!40000 ALTER TABLE `english` DISABLE KEYS */;
/*!40000 ALTER TABLE `english` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jwb_bacaan`
--

DROP TABLE IF EXISTS `jwb_bacaan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jwb_bacaan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nisn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group0` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group5` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group6` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group7` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group8` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group9` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group10` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group11` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group12` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group13` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group14` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group15` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group16` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group17` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group18` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group19` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skor` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nisn` (`nisn`),
  KEY `idx_nisn` (`nisn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwb_bacaan`
--

LOCK TABLES `jwb_bacaan` WRITE;
/*!40000 ALTER TABLE `jwb_bacaan` DISABLE KEYS */;
/*!40000 ALTER TABLE `jwb_bacaan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jwb_english`
--

DROP TABLE IF EXISTS `jwb_english`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jwb_english` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nisn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group0` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group5` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group6` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group7` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group8` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group9` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group10` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group11` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group12` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group13` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group14` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group15` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group16` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group17` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group18` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group19` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skor` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nisn` (`nisn`),
  KEY `idx_nisn` (`nisn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwb_english`
--

LOCK TABLES `jwb_english` WRITE;
/*!40000 ALTER TABLE `jwb_english` DISABLE KEYS */;
/*!40000 ALTER TABLE `jwb_english` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jwb_kuantitatif`
--

DROP TABLE IF EXISTS `jwb_kuantitatif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jwb_kuantitatif` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nisn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group0` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group5` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group6` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group7` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group8` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group9` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group10` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group11` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group12` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group13` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group14` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group15` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group16` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group17` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group18` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group19` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skor` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nisn` (`nisn`),
  KEY `idx_nisn` (`nisn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwb_kuantitatif`
--

LOCK TABLES `jwb_kuantitatif` WRITE;
/*!40000 ALTER TABLE `jwb_kuantitatif` DISABLE KEYS */;
/*!40000 ALTER TABLE `jwb_kuantitatif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jwb_matematika`
--

DROP TABLE IF EXISTS `jwb_matematika`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jwb_matematika` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nisn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group0` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group5` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group6` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group7` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group8` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group9` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group10` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group11` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group12` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group13` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group14` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group15` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group16` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group17` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group18` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group19` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skor` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nisn` (`nisn`),
  KEY `idx_nisn` (`nisn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwb_matematika`
--

LOCK TABLES `jwb_matematika` WRITE;
/*!40000 ALTER TABLE `jwb_matematika` DISABLE KEYS */;
/*!40000 ALTER TABLE `jwb_matematika` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jwb_penalaran`
--

DROP TABLE IF EXISTS `jwb_penalaran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jwb_penalaran` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nisn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group0` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group5` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group6` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group7` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group8` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group9` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group10` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group11` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group12` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group13` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group14` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group15` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group16` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group17` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group18` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group19` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group20` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group21` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group22` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group23` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group24` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group25` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group26` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group27` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group28` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group29` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skor` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nisn` (`nisn`),
  KEY `idx_nisn` (`nisn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwb_penalaran`
--

LOCK TABLES `jwb_penalaran` WRITE;
/*!40000 ALTER TABLE `jwb_penalaran` DISABLE KEYS */;
/*!40000 ALTER TABLE `jwb_penalaran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jwb_pengetahuan`
--

DROP TABLE IF EXISTS `jwb_pengetahuan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jwb_pengetahuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nisn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group0` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group5` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group6` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group7` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group8` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group9` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group10` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group11` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group12` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group13` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group14` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group15` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group16` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group17` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group18` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group19` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skor` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nisn` (`nisn`),
  KEY `idx_nisn` (`nisn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwb_pengetahuan`
--

LOCK TABLES `jwb_pengetahuan` WRITE;
/*!40000 ALTER TABLE `jwb_pengetahuan` DISABLE KEYS */;
/*!40000 ALTER TABLE `jwb_pengetahuan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jwb_snbt`
--

DROP TABLE IF EXISTS `jwb_snbt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jwb_snbt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nisn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group0` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group5` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group6` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group7` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group8` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group9` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group10` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group11` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group12` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group13` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group14` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group15` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group16` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group17` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group18` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group19` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group20` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group21` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group22` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group23` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group24` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group25` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group26` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group27` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group28` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group29` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skor` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nisn` (`nisn`),
  KEY `idx_nisn` (`nisn`),
  KEY `idx_created` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwb_snbt`
--

LOCK TABLES `jwb_snbt` WRITE;
/*!40000 ALTER TABLE `jwb_snbt` DISABLE KEYS */;
INSERT INTO `jwb_snbt` VALUES (1,'10987',NULL,'C',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2026-01-06 01:59:51','2026-01-06 01:59:51');
/*!40000 ALTER TABLE `jwb_snbt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kuantitatif`
--

DROP TABLE IF EXISTS `kuantitatif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kuantitatif` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomor_soal` int NOT NULL,
  `kategori_soal` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `judul_text1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_2` text COLLATE utf8mb4_unicode_ci,
  `bacaan_3` text COLLATE utf8mb4_unicode_ci,
  `bacaan_4` text COLLATE utf8mb4_unicode_ci,
  `bacaan_5` text COLLATE utf8mb4_unicode_ci,
  `bacaan_6` text COLLATE utf8mb4_unicode_ci,
  `bacaan_7` text COLLATE utf8mb4_unicode_ci,
  `bacaan_8` text COLLATE utf8mb4_unicode_ci,
  `bacaan_9` text COLLATE utf8mb4_unicode_ci,
  `bacaan_10` text COLLATE utf8mb4_unicode_ci,
  `bacaan_11` text COLLATE utf8mb4_unicode_ci,
  `bacaan_12` text COLLATE utf8mb4_unicode_ci,
  `bacaan_13` text COLLATE utf8mb4_unicode_ci,
  `bacaan_14` text COLLATE utf8mb4_unicode_ci,
  `bacaan_15` text COLLATE utf8mb4_unicode_ci,
  `bacaan_16` text COLLATE utf8mb4_unicode_ci,
  `link_gambar` text COLLATE utf8mb4_unicode_ci,
  `soal` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeOpsi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inner_html` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pilihan_a` text COLLATE utf8mb4_unicode_ci,
  `pilihan_a_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5_img` text COLLATE utf8mb4_unicode_ci,
  `kunci_jawaban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_kategori` (`kategori_soal`),
  KEY `idx_nomor` (`nomor_soal`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kuantitatif`
--

LOCK TABLES `kuantitatif` WRITE;
/*!40000 ALTER TABLE `kuantitatif` DISABLE KEYS */;
INSERT INTO `kuantitatif` VALUES (1,1,'kuantitatif','judul bacaan','ba 1','ba 2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1S0ex7.img?w=768&h=512&m=6&x=428&y=143&s=215&d=215','Soal','pilgan','no','A',NULL,'B',NULL,'C',NULL,'D',NULL,'E',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'A','2026-01-06 00:38:14','2026-01-06 00:38:14');
/*!40000 ALTER TABLE `kuantitatif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matematika`
--

DROP TABLE IF EXISTS `matematika`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matematika` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomor_soal` int NOT NULL,
  `kategori_soal` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `judul_text1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_2` text COLLATE utf8mb4_unicode_ci,
  `bacaan_3` text COLLATE utf8mb4_unicode_ci,
  `bacaan_4` text COLLATE utf8mb4_unicode_ci,
  `bacaan_5` text COLLATE utf8mb4_unicode_ci,
  `bacaan_6` text COLLATE utf8mb4_unicode_ci,
  `bacaan_7` text COLLATE utf8mb4_unicode_ci,
  `bacaan_8` text COLLATE utf8mb4_unicode_ci,
  `bacaan_9` text COLLATE utf8mb4_unicode_ci,
  `bacaan_10` text COLLATE utf8mb4_unicode_ci,
  `bacaan_11` text COLLATE utf8mb4_unicode_ci,
  `bacaan_12` text COLLATE utf8mb4_unicode_ci,
  `bacaan_13` text COLLATE utf8mb4_unicode_ci,
  `bacaan_14` text COLLATE utf8mb4_unicode_ci,
  `bacaan_15` text COLLATE utf8mb4_unicode_ci,
  `bacaan_16` text COLLATE utf8mb4_unicode_ci,
  `link_gambar` text COLLATE utf8mb4_unicode_ci,
  `soal` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeOpsi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inner_html` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pilihan_a` text COLLATE utf8mb4_unicode_ci,
  `pilihan_a_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5_img` text COLLATE utf8mb4_unicode_ci,
  `kunci_jawaban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_kategori` (`kategori_soal`),
  KEY `idx_nomor` (`nomor_soal`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matematika`
--

LOCK TABLES `matematika` WRITE;
/*!40000 ALTER TABLE `matematika` DISABLE KEYS */;
INSERT INTO `matematika` VALUES (1,1,'matematika','7 alasan Park Bo Gum adalah lelaki green flag, pasangan idaman!','Park Bo Gum baru-baru ini menyorot perhatian saat hadir di acara penghargaan Asia Artist Awards 2025. Aktor kelahiran tahun 1993 itu terlihat akrab dengan ‘tiga istrinya’ dari tiga drama berbeda di acara tersebut. Namun, hal lain yang juga membuat para penggemar tersentuh adalah bagaimana sang aktor bersikap gentleman kepada lawan mainnya itu. ','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','Sejak awal debutnya di dunia hiburan, aktor When Life Gives You Tangerines ini dijuluki \"Nation\'s Boyfriend\" (Pacar Nasional) dan \"Nation\'s Son-in-Law\" (Menantu Idaman) karena sosoknya yang rendah hati dan lemah lembut. Ia juga disebut green flag dan jadi tipe pasangan idaman banyak perempuan. Nah, berikut ada 7 alasan sekaligus bukti kenapa Park Bo Gum adalah lelaki green flag idaman.','https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1S0ex7.img?w=768&h=512&m=6&x=428&y=143&s=215&d=215','Berapa tokoh yang ada pada bacaan diatas?','inputangka','no','',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'2','2026-01-05 17:59:57','2026-01-05 17:59:57'),(2,2,'matematika','Kenapa Tok Dalang Tinggal Sendirian di Upin & Ipin?','1. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','2. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','3. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','4. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','5. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','6. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','7. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','8. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','9. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','10.Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','11.Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','12. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','13. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','14 Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','15. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','16. Dalam serial kartun Upin & Ipin, karakter Tok Dalang merupakan salah satu tokoh penting di Kampung Durian Runtuh. Tetangga Upin, Ipin, Kak Ros, dan Opah ini merupakan orang yang dituakan di kampung. Banyak keputusan yang membutuhkan pertimbangan Tok Dalang, mulai dari membuat bangunan, mengadakan acara, hingga mengatasi permasalahan di kampung.','https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1S0ex7.img?w=768&h=512&m=6&x=428&y=143&s=215&d=215','Kenapa dengan tok dalang?','benarsalah','yes','',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'<strong>Tok dalang sakit</strong>',NULL,'Tok dalang sakit',NULL,'Tok dalang sakit',NULL,'Tok dalang sakit',NULL,'Tok dalang sakit',NULL,'1B2S3B4B5S','2026-01-05 05:48:13','2026-01-05 05:48:13'),(3,3,'matematika','Judul Bacaan','Bacaan 1','Bacaan 2','Bacaan 3','Bacaan 4','Bacaan 5','Bacaan 6','Bacaan 7','Bacaan 8','Bacaan 9','Bacaan 10','Bacaan 11','Bacaan 12','Bacaan 13','Bacaan 14','Bacaan 15','Bacaan 16','https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1S0ex7.img?w=768&h=512&m=6&x=428&y=143&s=215&d=215','Soal pilihan Ganda','pilgan','yes','<strong>Pil A</strong>',NULL,'<p className=\"text-blue-500\">Pil B</p>',NULL,'pil C',NULL,'pil D',NULL,'pil E',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'E','2026-01-06 16:02:01','2026-01-06 16:02:01'),(4,4,'matematika','Judul','B1','2','3','4','5','6','7','8','9','10','11','12','13','14','','','https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1S0ex7.img?w=768&h=512&m=6&x=428&y=143&s=215&d=215','Soal','pilgan','no','','https://lb3r-bimbel-storage.s3.ap-southeast-1.amazonaws.com/soal-images/1767788690295-logo_lb3r.png','pil B','https://lb3r-bimbel-storage.s3.ap-southeast-1.amazonaws.com/soal-images/1767789207106-logo_lb3r.png','C','https://lb3r-bimbel-storage.s3.ap-southeast-1.amazonaws.com/soal-images/1767789217789-logo_lb3r.png','D','https://lb3r-bimbel-storage.s3.ap-southeast-1.amazonaws.com/soal-images/1767789228786-logo_lb3r.png','E','https://lb3r-bimbel-storage.s3.ap-southeast-1.amazonaws.com/soal-images/1767789245138-logo_lb3r.png','','','','','','','','','','','A','2026-01-07 04:26:16','2026-01-07 04:26:16');
/*!40000 ALTER TABLE `matematika` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penalaran`
--

DROP TABLE IF EXISTS `penalaran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penalaran` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomor_soal` int NOT NULL,
  `kategori_soal` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `judul_text1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_2` text COLLATE utf8mb4_unicode_ci,
  `bacaan_3` text COLLATE utf8mb4_unicode_ci,
  `bacaan_4` text COLLATE utf8mb4_unicode_ci,
  `bacaan_5` text COLLATE utf8mb4_unicode_ci,
  `bacaan_6` text COLLATE utf8mb4_unicode_ci,
  `bacaan_7` text COLLATE utf8mb4_unicode_ci,
  `bacaan_8` text COLLATE utf8mb4_unicode_ci,
  `bacaan_9` text COLLATE utf8mb4_unicode_ci,
  `bacaan_10` text COLLATE utf8mb4_unicode_ci,
  `bacaan_11` text COLLATE utf8mb4_unicode_ci,
  `bacaan_12` text COLLATE utf8mb4_unicode_ci,
  `bacaan_13` text COLLATE utf8mb4_unicode_ci,
  `bacaan_14` text COLLATE utf8mb4_unicode_ci,
  `bacaan_15` text COLLATE utf8mb4_unicode_ci,
  `bacaan_16` text COLLATE utf8mb4_unicode_ci,
  `link_gambar` text COLLATE utf8mb4_unicode_ci,
  `soal` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeOpsi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inner_html` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pilihan_a` text COLLATE utf8mb4_unicode_ci,
  `pilihan_a_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5_img` text COLLATE utf8mb4_unicode_ci,
  `kunci_jawaban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_kategori` (`kategori_soal`),
  KEY `idx_nomor` (`nomor_soal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penalaran`
--

LOCK TABLES `penalaran` WRITE;
/*!40000 ALTER TABLE `penalaran` DISABLE KEYS */;
/*!40000 ALTER TABLE `penalaran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengetahuan`
--

DROP TABLE IF EXISTS `pengetahuan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengetahuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomor_soal` int NOT NULL,
  `kategori_soal` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `judul_text1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_2` text COLLATE utf8mb4_unicode_ci,
  `bacaan_3` text COLLATE utf8mb4_unicode_ci,
  `bacaan_4` text COLLATE utf8mb4_unicode_ci,
  `bacaan_5` text COLLATE utf8mb4_unicode_ci,
  `bacaan_6` text COLLATE utf8mb4_unicode_ci,
  `bacaan_7` text COLLATE utf8mb4_unicode_ci,
  `bacaan_8` text COLLATE utf8mb4_unicode_ci,
  `bacaan_9` text COLLATE utf8mb4_unicode_ci,
  `bacaan_10` text COLLATE utf8mb4_unicode_ci,
  `bacaan_11` text COLLATE utf8mb4_unicode_ci,
  `bacaan_12` text COLLATE utf8mb4_unicode_ci,
  `bacaan_13` text COLLATE utf8mb4_unicode_ci,
  `bacaan_14` text COLLATE utf8mb4_unicode_ci,
  `bacaan_15` text COLLATE utf8mb4_unicode_ci,
  `bacaan_16` text COLLATE utf8mb4_unicode_ci,
  `link_gambar` text COLLATE utf8mb4_unicode_ci,
  `soal` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeOpsi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inner_html` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pilihan_a` text COLLATE utf8mb4_unicode_ci,
  `pilihan_a_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5_img` text COLLATE utf8mb4_unicode_ci,
  `kunci_jawaban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_kategori` (`kategori_soal`),
  KEY `idx_nomor` (`nomor_soal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengetahuan`
--

LOCK TABLES `pengetahuan` WRITE;
/*!40000 ALTER TABLE `pengetahuan` DISABLE KEYS */;
/*!40000 ALTER TABLE `pengetahuan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peserta_snbt`
--

DROP TABLE IF EXISTS `peserta_snbt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peserta_snbt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nisn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `asalsekolah` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wa` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prodi1` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kampus1` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prodi2` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kampus2` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nisn` (`nisn`),
  KEY `idx_nisn` (`nisn`),
  KEY `idx_email` (`email`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_asalsekolah` (`asalsekolah`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peserta_snbt`
--

LOCK TABLES `peserta_snbt` WRITE;
/*!40000 ALTER TABLE `peserta_snbt` DISABLE KEYS */;
INSERT INTO `peserta_snbt` VALUES (1,'Wahyudi','10987','SMA N 1 Tanjung','81392552458','Kimia','ULM','Biologi','ULM','ikhwchemist@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocIZghXtHMTR9PRAF2sdW70ulVMibeRt5LEe1ngJyJ_KXoXx8K05=s96-c','2026-01-05 07:17:18','2026-01-05 07:17:18'),(2,'RAISYAH BUNGA CAHAYA','10085510276','SMKN 1 Murung Pudak','0881036115831','Manajemen Perhotelan','Universitas Airlangga','Psikologi','Universitas Lambung Mangkurat','raisyah.bunga29@smk.belajar.id','https://lh3.googleusercontent.com/a/ACg8ocLIXwls_IS3dBW3RFEO9vq5-OiF9nxiNlv3EmH6sNlkAh3zwA=s96-c','2026-01-05 09:50:24','2026-01-05 09:50:24'),(3,'Dhini Astryani','10085746366','SMAN 1 TANJUNG','082149502529','Pendidikan Dokter Hewan','Universitas Brawijaya','Teknologi Bioproses','Universitas Brawijaya','dhiniastryani642@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocJoWdr8NHxroNV5ZPEWkHeC8OO_m5-7yHGTijPKM61_09U7Tg=s96-c','2026-01-05 09:56:28','2026-01-05 09:56:28'),(4,'M.fathul Arifin','10085274941','SMAN 1 TANJUNG ','081649328283','Agroteknologi ','Universitas Hasanuddin ','Agronomi ','ULM','m.fathularifin31@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocK5uXVyMN2rfLYT9H7fdWAzt4DRFQPCWpvZcfXNtEHiEBiShA=s96-c','2026-01-05 10:02:07','2026-01-05 10:02:07'),(5,'Hafiz Nur Rahman','10077100183','SMAN 1 TANJUNG','085654873457','Teknik Elektro','UGM','Teknik Material','ITS','adahafiz33@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocJ2ENSc2jfRI2jfgJtKW-dpdOfv-aWKo9bZeVNmKCrUYoj_2bDpWQ=s96-c','2026-01-05 10:02:09','2026-01-05 10:02:09'),(6,'Alf _0929','10085520010 ','SMAN 1 TANJUNG ','081347650768','Teknik Geomatika ','Institut Teknologi Sepuluh Nopember','Sistem informasi ','UPN Veteran Yogyakarta','allfiainningsih0929@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocLXI2ar4W9cVSNm5SSm-xUBN4SbSvSK45COhjWdiKhPz7At4_Q=s96-c','2026-01-05 10:08:37','2026-01-05 10:08:37'),(7,'Syifa Zahrohu','13082053519','SMAN 1 TANJUNG','085245647818','Hukum','Universitas Brawijaya','Psikologi ','Universitas Lambung Mangkurat','szahrohu@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocJAvN6ONnhHGTHoRsMF42vmRDFGr8tqixtjgdffBJgusCF0mQ=s96-c','2026-01-05 10:09:47','2026-01-05 10:09:47'),(8,'Aleva Rahmadaniah','10073465163','SMAN 2 TANJUNG','085259830868','Psikologi ','Universitas Lambung Mangkurat','Manajemen','Universitas Lambung Mangkurat','alevarahmadaniah75@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocKJxVmEIkGdfcXcwGWvaU9-eLG_eesogCZhS_lP1uTXcLiVbvU=s96-c','2026-01-05 10:10:26','2026-01-05 10:10:26'),(9,'kia herliza','10089065384','SMAN 2 TANJUNG','08115130885','Teknik sipil','Universitas Lambung Mangkurat','Teknik lingkungan','Universitas Lambung Mangkurat ','kiaherliza@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocJcruSZ-vlbDb9lty479hTOdY5GdXLaoxEYHd8nCXuobc2QPw=s96-c','2026-01-05 10:10:27','2026-01-05 10:10:27'),(10,'Muhammad Ardiansyah','10069256428','SMKN 1 Tanjung','082154608193','Informatika','Universitas Sebelas Maret','Teknik informatika/komputer/jaringan','Universitas Negeri Semarang','muhammadardiansyah56273@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocIC0t4hGXM0x9-jfNO-V9b1OZYmDxMUtFlcVxKQ5hWc-L9Ss28=s96-c','2026-01-05 10:10:28','2026-01-05 10:10:28'),(11,'nabila amalia','10089367314','SMA NEGERI 2 TANJUNG ','082254892946','ADMINISTRASI PUBLIK ','Universitas Lambung Mangkurat','ILMU KOMUNIKASI ','Universitas Lambung Mangkurat','nbilaabbll@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocLy81-64HoQfWmVrXHbX0Jybkd-zPYext2S6awgbwBnMx2fQQ=s96-c','2026-01-05 10:11:18','2026-01-05 10:11:18'),(12,'ALIKA RIZKIA HAIKAL','10085434148','SMAN 2 TANJUNG','085245827722','Akuntansi','Universitas Lambung Mangkurat','Administrasi Bisnis','Universitas Lambung Mangkurat','alika.rizkia181@sma.belajar.id','https://lh3.googleusercontent.com/a/ACg8ocL7tvfbEAYeA8Uf5-l_rPeTnFqx3x-i79kx_WNbFTy8N0a-fg=s96-c','2026-01-05 10:17:03','2026-01-05 10:17:03'),(13,'Suci Ramadani','10089251002','SMAN 2 TANJUNG','083150843018','Teknik Pertambangan','Universitas Lambung Mangkurat','Teknik pertambangan ','POLIBAN','rsuci7521@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocL_o9y4K9dAqB8qa9-Ti_dVqiC7hAqoFf5auEzov-TT9Tvl0BI=s96-c','2026-01-05 10:30:32','2026-01-05 10:30:32'),(14,'Joan Ebaraya','10086640881','SMAN 2 Tanjung ','082157410035','Teknik lingkungan ','Universitas Diponegoro ','Teknik lingkungan ','UPN Veteran Yogyakarta ','joanebaraya@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocLAseig2zOcEeunLBc-py_UGeF_hAdE4y858AsPkXfq7vlVRA=s96-c','2026-01-05 11:00:10','2026-01-05 11:00:10'),(15,'Dinda','10085301482','SMAN 1 Tanjung ','089529192890','Kedokteran','Universitas Lambung Mangkurat ','Akuntansi ','Universitas Lambung Mangkurat ','dindaheerawati@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocKlCqDOgBvmpcTYFnCmzeicXXJM35HNHnnSUUsFGTy8hVu0Wg=s96-c','2026-01-05 12:24:34','2026-01-05 12:24:34');
/*!40000 ALTER TABLE `peserta_snbt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `snbt`
--

DROP TABLE IF EXISTS `snbt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `snbt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomor_soal` int NOT NULL,
  `kategori_soal` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `judul_text1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_1` text COLLATE utf8mb4_unicode_ci,
  `bacaan_2` text COLLATE utf8mb4_unicode_ci,
  `bacaan_3` text COLLATE utf8mb4_unicode_ci,
  `bacaan_4` text COLLATE utf8mb4_unicode_ci,
  `bacaan_5` text COLLATE utf8mb4_unicode_ci,
  `bacaan_6` text COLLATE utf8mb4_unicode_ci,
  `bacaan_7` text COLLATE utf8mb4_unicode_ci,
  `bacaan_8` text COLLATE utf8mb4_unicode_ci,
  `bacaan_9` text COLLATE utf8mb4_unicode_ci,
  `bacaan_10` text COLLATE utf8mb4_unicode_ci,
  `bacaan_11` text COLLATE utf8mb4_unicode_ci,
  `bacaan_12` text COLLATE utf8mb4_unicode_ci,
  `bacaan_13` text COLLATE utf8mb4_unicode_ci,
  `bacaan_14` text COLLATE utf8mb4_unicode_ci,
  `bacaan_15` text COLLATE utf8mb4_unicode_ci,
  `bacaan_16` text COLLATE utf8mb4_unicode_ci,
  `link_gambar` text COLLATE utf8mb4_unicode_ci,
  `soal` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeOpsi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inner_html` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pilihan_a` text COLLATE utf8mb4_unicode_ci,
  `pilihan_a_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b` text COLLATE utf8mb4_unicode_ci,
  `pilihan_b_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c` text COLLATE utf8mb4_unicode_ci,
  `pilihan_c_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d` text COLLATE utf8mb4_unicode_ci,
  `pilihan_d_img` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e` text COLLATE utf8mb4_unicode_ci,
  `pilihan_e_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_1_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_2_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_3_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_4_img` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5` text COLLATE utf8mb4_unicode_ci,
  `pernyataan_5_img` text COLLATE utf8mb4_unicode_ci,
  `kunci_jawaban` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_kategori` (`kategori_soal`),
  KEY `idx_nomor` (`nomor_soal`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `snbt`
--

LOCK TABLES `snbt` WRITE;
/*!40000 ALTER TABLE `snbt` DISABLE KEYS */;
INSERT INTO `snbt` VALUES (1,1,'Literasi Bahasa Indonesia','judul bacaan','ba 1','ba 2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1S0ex7.img?w=768&h=512&m=6&x=428&y=143&s=215&d=215','soal','pilgan','no','A',NULL,'B',NULL,'C',NULL,'D',NULL,'E',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'A','2026-01-06 00:47:49','2026-01-06 00:47:49'),(2,2,'Literasi Bahasa Indonesia','judul bacaan','ba 1','ba 2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1S0ex7.img?w=768&h=512&m=6&x=428&y=143&s=215&d=215','soal','pilgan','no','A',NULL,'B',NULL,'C',NULL,'D',NULL,'E',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'A','2026-01-06 01:02:04','2026-01-06 01:02:04'),(3,3,'Literasi Bahasa Indonesia','jud','1','2','3','4','5','6','7','8','9','10','1','1','','12','13','14','https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1S0ex7.img?w=768&h=512&m=6&x=428&y=143&s=215&d=215','soal','pilgan','no','A',NULL,'B',NULL,'C',NULL,'D',NULL,'E',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'',NULL,'A','2026-01-06 01:06:04','2026-01-06 01:06:04');
/*!40000 ALTER TABLE `snbt` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-07 22:59:21
