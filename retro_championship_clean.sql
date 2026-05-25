-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: localhost    Database: retro_championship
-- ------------------------------------------------------
-- Server version	8.4.3

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('49b0caea-ee42-41eb-a80c-ff2a8225d9b2','9450c186723f55e613c54282dfc330f7fb73c4a6fde197ea1ee1bfb4f7628071','2026-03-08 16:27:04.466','20260308162645_add_round_match',NULL,NULL,'2026-03-08 16:27:04.239',1),('782c16d1-72d5-451e-8a3a-d966034be180','259f8deca53f0f74ed83ef1093fdc91dbf8aeeac18a5f648b8c239e63e4f621a','2026-02-18 14:54:29.059','20260217114648_new_relation_added_between_tournament_and_channel',NULL,NULL,'2026-02-18 14:54:26.712',1),('b2596f12-6f75-4e00-9342-f118136874bb','91c4e1487c2fcb5b5c5d87bdd280b92a492f8df5fc70f8196f0a21f5de34b977','2026-02-18 14:55:48.601','20260218145548_tournaments_images_added',NULL,NULL,'2026-02-18 14:55:48.515',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel` (
  `Id_channel` int NOT NULL AUTO_INCREMENT,
  `label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Id_channel`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel`
--

LOCK TABLES `channel` WRITE;
/*!40000 ALTER TABLE `channel` DISABLE KEYS */;
INSERT INTO `channel` VALUES (1,'Link'),(2,'Mario'),(3,'Lara'),(4,'Bowser');
/*!40000 ALTER TABLE `channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `Id_game` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Id_license` int NOT NULL,
  `Id_type_game` int NOT NULL,
  PRIMARY KEY (`Id_game`),
  KEY `game_Id_license_fkey` (`Id_license`),
  KEY `game_Id_type_game_fkey` (`Id_type_game`),
  CONSTRAINT `game_Id_license_fkey` FOREIGN KEY (`Id_license`) REFERENCES `license` (`Id_license`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `game_Id_type_game_fkey` FOREIGN KEY (`Id_type_game`) REFERENCES `type_game` (`Id_type_game`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'Pacman',1,2),(2,'Mario Bros',4,2),(3,'Pong',3,3);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `license`
--

DROP TABLE IF EXISTS `license`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `license` (
  `Id_license` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Id_license`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `license`
--

LOCK TABLES `license` WRITE;
/*!40000 ALTER TABLE `license` DISABLE KEYS */;
INSERT INTO `license` VALUES (1,'Pacman'),(2,'Tetris'),(3,'Pong'),(4,'Mario');
/*!40000 ALTER TABLE `license` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_`
--

DROP TABLE IF EXISTS `match_`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_` (
  `Id_match` int NOT NULL AUTO_INCREMENT,
  `started_at` datetime NOT NULL,
  `ended_at` datetime DEFAULT NULL,
  `Id_tournament` int DEFAULT NULL,
  `Id_user_winner` int DEFAULT NULL,
  `Id_channel` int DEFAULT NULL,
  `Id_user_1` int DEFAULT NULL,
  `Id_user_2` int DEFAULT NULL,
  `Id_match_status` int DEFAULT NULL,
  `Id_round_match` int DEFAULT NULL,
  PRIMARY KEY (`Id_match`),
  KEY `match__Id_tournament_fkey` (`Id_tournament`),
  KEY `match__Id_user_winner_fkey` (`Id_user_winner`),
  KEY `match__Id_channel_fkey` (`Id_channel`),
  KEY `match__Id_user_1_fkey` (`Id_user_1`),
  KEY `match__Id_user_2_fkey` (`Id_user_2`),
  KEY `match__Id_match_status_fkey` (`Id_match_status`),
  KEY `match__Id_round_match_fkey` (`Id_round_match`),
  CONSTRAINT `match__Id_channel_fkey` FOREIGN KEY (`Id_channel`) REFERENCES `channel` (`Id_channel`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `match__Id_match_status_fkey` FOREIGN KEY (`Id_match_status`) REFERENCES `match_status` (`Id_match_status`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `match__Id_round_match_fkey` FOREIGN KEY (`Id_round_match`) REFERENCES `round_match` (`Id_round_match`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `match__Id_tournament_fkey` FOREIGN KEY (`Id_tournament`) REFERENCES `tournament` (`Id_tournament`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `match__Id_user_1_fkey` FOREIGN KEY (`Id_user_1`) REFERENCES `user_` (`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `match__Id_user_2_fkey` FOREIGN KEY (`Id_user_2`) REFERENCES `user_` (`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `match__Id_user_winner_fkey` FOREIGN KEY (`Id_user_winner`) REFERENCES `user_` (`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_`
--

LOCK TABLES `match_` WRITE;
/*!40000 ALTER TABLE `match_` DISABLE KEYS */;
INSERT INTO `match_` VALUES (3,'2025-01-10 10:00:00','2025-01-10 10:25:00',1,3,3,3,4,3,1),(4,'2025-01-10 10:30:00','2025-01-10 10:55:00',1,4,3,4,5,3,1),(5,'2025-01-10 11:00:00','2025-01-10 11:25:00',1,5,3,5,6,3,1),(6,'2025-01-10 11:30:00','2025-01-10 11:55:00',1,6,3,6,7,3,1),(7,'2025-01-10 12:00:00','2025-01-10 12:25:00',1,7,3,7,8,3,1),(8,'2025-01-10 12:30:00','2025-01-10 12:55:00',1,8,3,8,9,3,1),(9,'2025-01-10 13:00:00','2025-01-10 13:25:00',1,9,3,9,10,3,2),(10,'2025-01-10 13:30:00','2025-01-10 13:55:00',1,10,3,10,11,3,2),(11,'2025-01-10 14:00:00','2025-01-10 14:25:00',1,11,3,11,12,3,2),(12,'2025-01-10 14:30:00','2025-01-10 14:55:00',1,12,3,12,1,3,2),(13,'2025-01-10 14:30:00','2025-01-10 14:55:00',1,NULL,3,9,10,1,3),(14,'2025-01-10 14:30:00','2025-01-10 14:55:00',1,NULL,3,11,12,1,3),(15,'2025-01-10 14:30:00','2025-01-10 14:55:00',1,NULL,3,NULL,NULL,1,4),(16,'2026-05-08 08:00:00',NULL,7,NULL,NULL,1,23,1,1);
/*!40000 ALTER TABLE `match_` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_status`
--

DROP TABLE IF EXISTS `match_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_status` (
  `Id_match_status` int NOT NULL AUTO_INCREMENT,
  `label` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Id_match_status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_status`
--

LOCK TABLES `match_status` WRITE;
/*!40000 ALTER TABLE `match_status` DISABLE KEYS */;
INSERT INTO `match_status` VALUES (1,'En attente'),(2,'En cours'),(3,'Terminé');
/*!40000 ALTER TABLE `match_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prize`
--

DROP TABLE IF EXISTS `prize`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prize` (
  `Id_prize` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `value_` decimal(15,2) DEFAULT NULL,
  `Id_user` int NOT NULL,
  PRIMARY KEY (`Id_prize`),
  KEY `prize_Id_user_fkey` (`Id_user`),
  CONSTRAINT `prize_Id_user_fkey` FOREIGN KEY (`Id_user`) REFERENCES `user_` (`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prize`
--

LOCK TABLES `prize` WRITE;
/*!40000 ALTER TABLE `prize` DISABLE KEYS */;
INSERT INTO `prize` VALUES (1,'Prix Tournoi Hiver','Prix du Tournoi d\'hiver Pacman',1000.00,1),(8,'1000€','Un gros chèque',1000.00,23);
/*!40000 ALTER TABLE `prize` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `round_match`
--

DROP TABLE IF EXISTS `round_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `round_match` (
  `Id_round_match` int NOT NULL AUTO_INCREMENT,
  `label` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Id_round_match`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `round_match`
--

LOCK TABLES `round_match` WRITE;
/*!40000 ALTER TABLE `round_match` DISABLE KEYS */;
INSERT INTO `round_match` VALUES (1,'Premier tour'),(2,'Quart de finale'),(3,'Demi finale'),(4,'Finale');
/*!40000 ALTER TABLE `round_match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub`
--

DROP TABLE IF EXISTS `sub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub` (
  `Id_user` int NOT NULL,
  `Id_tournament` int NOT NULL,
  PRIMARY KEY (`Id_user`,`Id_tournament`),
  KEY `sub_Id_tournament_fkey` (`Id_tournament`),
  CONSTRAINT `sub_Id_tournament_fkey` FOREIGN KEY (`Id_tournament`) REFERENCES `tournament` (`Id_tournament`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `sub_Id_user_fkey` FOREIGN KEY (`Id_user`) REFERENCES `user_` (`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub`
--

LOCK TABLES `sub` WRITE;
/*!40000 ALTER TABLE `sub` DISABLE KEYS */;
INSERT INTO `sub` VALUES (1,1),(3,1),(4,1),(6,1),(7,1),(1,7),(23,7);
/*!40000 ALTER TABLE `sub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tournament` (
  `Id_tournament` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `started_at` datetime DEFAULT NULL,
  `ended_at` datetime DEFAULT NULL,
  `Id_user` int NOT NULL,
  `Id_user_1` int DEFAULT NULL,
  `Id_prize` int DEFAULT NULL,
  `Id_game` int DEFAULT NULL,
  `Id_tournament_status` int NOT NULL,
  `Id_channel` int DEFAULT NULL,
  `imageDetails` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageIcon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Id_tournament`),
  UNIQUE KEY `tournament_name_key` (`name`),
  UNIQUE KEY `tournament_started_at_key` (`started_at`),
  UNIQUE KEY `tournament_ended_at_key` (`ended_at`),
  KEY `tournament_Id_user_fkey` (`Id_user`),
  KEY `tournament_Id_user_1_fkey` (`Id_user_1`),
  KEY `tournament_Id_prize_fkey` (`Id_prize`),
  KEY `tournament_Id_game_fkey` (`Id_game`),
  KEY `tournament_Id_tournament_status_fkey` (`Id_tournament_status`),
  KEY `tournament_Id_channel_fkey` (`Id_channel`),
  CONSTRAINT `tournament_Id_channel_fkey` FOREIGN KEY (`Id_channel`) REFERENCES `channel` (`Id_channel`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tournament_Id_game_fkey` FOREIGN KEY (`Id_game`) REFERENCES `game` (`Id_game`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tournament_Id_prize_fkey` FOREIGN KEY (`Id_prize`) REFERENCES `prize` (`Id_prize`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tournament_Id_tournament_status_fkey` FOREIGN KEY (`Id_tournament_status`) REFERENCES `tournament_status` (`Id_tournament_status`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `tournament_Id_user_1_fkey` FOREIGN KEY (`Id_user_1`) REFERENCES `user_` (`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tournament_Id_user_fkey` FOREIGN KEY (`Id_user`) REFERENCES `user_` (`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament`
--

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;
INSERT INTO `tournament` VALUES (1,'Tournoi d\'hiver Pacman','2025-01-10 09:00:00','2025-01-10 17:00:00',1,NULL,1,1,2,3,'','http://localhost:5173/images/pacman-game.jpg'),(2,'Tournoi Mario Printemps','2025-03-15 09:00:00','2025-03-15 16:00:00',1,NULL,1,2,2,2,NULL,'http://localhost:5173/images/mario-game.jpg'),(3,'Tournoi Tetris Time','2025-07-20 12:00:00','2025-07-20 18:00:00',1,NULL,1,3,2,1,NULL,'http://localhost:5173/images/tetris-game.jpg'),(4,'Tournoi Pong Été 2025','2025-07-05 09:00:00','2025-07-15 09:00:00',8,NULL,1,3,3,1,NULL,'http://localhost:5173/images/Pong.png'),(7,'Testttt','2026-05-08 08:00:00','2026-05-18 16:00:00',23,NULL,8,2,1,4,NULL,NULL);
/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament_status`
--

DROP TABLE IF EXISTS `tournament_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tournament_status` (
  `Id_tournament_status` int NOT NULL AUTO_INCREMENT,
  `label` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Id_tournament_status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament_status`
--

LOCK TABLES `tournament_status` WRITE;
/*!40000 ALTER TABLE `tournament_status` DISABLE KEYS */;
INSERT INTO `tournament_status` VALUES (1,'En attente'),(2,'En cours'),(3,'Terminé');
/*!40000 ALTER TABLE `tournament_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_game`
--

DROP TABLE IF EXISTS `type_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_game` (
  `Id_type_game` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Id_type_game`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_game`
--

LOCK TABLES `type_game` WRITE;
/*!40000 ALTER TABLE `type_game` DISABLE KEYS */;
INSERT INTO `type_game` VALUES (1,'Fighting'),(2,'Score'),(3,'1v1');
/*!40000 ALTER TABLE `type_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_`
--

DROP TABLE IF EXISTS `user_`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_` (
  `Id_user` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `how_many_tourn` int DEFAULT NULL,
  `how_many_matches` int DEFAULT NULL,
  `won_tournaments` int DEFAULT NULL,
  `Id_user_status` int NOT NULL,
  PRIMARY KEY (`Id_user`),
  UNIQUE KEY `user__mail_key` (`mail`),
  UNIQUE KEY `user__username_key` (`username`),
  KEY `user__Id_user_status_fkey` (`Id_user_status`),
  CONSTRAINT `user__Id_user_status_fkey` FOREIGN KEY (`Id_user_status`) REFERENCES `user_status` (`Id_user_status`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_`
--

LOCK TABLES `user_` WRITE;
/*!40000 ALTER TABLE `user_` DISABLE KEYS */;
INSERT INTO `user_` VALUES (1,'player1@retro.com','$2b$10$zXFZ7WhqxWtHUKLzSuftduC/MBvNYRiVuWcmn.EymDKSVwjhRxqEW','player1','1995-06-15','Paris','2026-02-18 14:55:53',21,52,3,1),(3,'player3@retro.com','$2b$10$zXFZ7WhqxWtHUKLzSuftduC/MBvNYRiVuWcmn.EymDKSVwjhRxqEW','player3','1995-06-15','Paris','2026-02-18 14:55:53',NULL,NULL,NULL,1),(4,'player4@retro.com','$2b$10$zXFZ7WhqxWtHUKLzSuftduC/MBvNYRiVuWcmn.EymDKSVwjhRxqEW','player4','1995-06-15','Paris','2026-02-18 14:55:53',NULL,NULL,NULL,1),(5,'player5@retro.com','$2b$10$zXFZ7WhqxWtHUKLzSuftduC/MBvNYRiVuWcmn.EymDKSVwjhRxqEW','player5','1995-06-15','Paris','2026-02-18 14:55:53',NULL,NULL,NULL,1),(6,'player6@retro.com','$2b$10$zXFZ7WhqxWtHUKLzSuftduC/MBvNYRiVuWcmn.EymDKSVwjhRxqEW','player6','1995-06-15','Paris','2026-02-18 14:55:53',NULL,NULL,NULL,1),(7,'player7@retro.com','$2b$10$zXFZ7WhqxWtHUKLzSuftduC/MBvNYRiVuWcmn.EymDKSVwjhRxqEW','player7','1995-06-15','Paris','2026-02-18 14:55:53',NULL,NULL,NULL,1),(8,'player8@retro.com','$2b$10$zXFZ7WhqxWtHUKLzSuftduC/MBvNYRiVuWcmn.EymDKSVwjhRxqEW','player8','1995-06-15','Paris','2026-02-18 14:55:53',NULL,NULL,NULL,1),(9,'player9@retro.com','$2b$10$zXFZ7WhqxWtHUKLzSuftduC/MBvNYRiVuWcmn.EymDKSVwjhRxqEW','player9','1995-06-15','Paris','2026-02-18 14:55:53',NULL,NULL,NULL,1),(10,'player10@retro.com','$2b$10$zXFZ7WhqxWtHUKLzSuftduC/MBvNYRiVuWcmn.EymDKSVwjhRxqEW','player10','1995-06-15','Paris','2026-02-18 14:55:53',NULL,NULL,NULL,1),(11,'player11@retro.com','$2b$10$zXFZ7WhqxWtHUKLzSuftduC/MBvNYRiVuWcmn.EymDKSVwjhRxqEW','player11','1995-06-15','Paris','2026-02-18 14:55:53',NULL,NULL,NULL,1),(12,'player12@retro.com','$2b$10$zXFZ7WhqxWtHUKLzSuftduC/MBvNYRiVuWcmn.EymDKSVwjhRxqEW','player12','1995-06-15','Paris','2026-02-18 14:55:53',NULL,NULL,NULL,1),(19,'thomas.shelby@gmail.com','$2b$10$JLMabRoaCwEKYHidrii1a.8NDdvW.OfCDxJ4/7wR/JjGm.8Sbq2nK','thomy','1881-09-03','Clermond-Ferrand','2026-04-18 16:29:24',0,0,0,1),(20,'daenerys.targerien@gmail.com','$2b$10$z/XVgB.hQ5OWHPOkPgjvdO/2PAU/Se7ETvzBtl4IpcysqPUyZPbVy','khalessi','1031-09-03','Marseille','2026-04-18 16:33:18',0,0,0,1),(21,'arya.stark@gmail.com','$2b$10$hj.Bu3fIJ7NX51dvyKseIuXeg5yfQCIwdHtH4lTqvWmkirIHihekC','niddle','1031-09-03','Marseille','2026-04-18 16:51:33',0,0,0,1),(22,'aaaaaaaa@retro.com','$2b$10$xpPuf73F5iKJRI/gNycwG.1.J4q4OX9mw8Z.sfV/Vie9X5y6UktvC','aaaaaaa','2026-04-16','Libourne','2026-04-21 20:21:04',0,0,0,1),(23,'admin@retro.com','$2b$10$Aui51nyETl1CZJgbxxleQuWCx74h31FG13DungiOfR6SxRptSlE7W','admin33','1997-06-18','Bordeaux','2026-04-21 20:28:39',0,0,0,2),(25,'playwright@test.com','$2b$10$x5lTnJFqs.yeNu.h3hi7C.1JVAgPajnBosMQtcL/aZpxoas6dfaOi','playwrightuser','1997-06-19','Bordeaux','2026-05-10 09:10:37',0,0,0,1),(26,'playwright_1778404466121@test.com','$2b$10$yXm1W0FA7VBdU4ldGdGEHuGXE42MSOyjd4GqLr9hIKe0KRKCGIvZe','playwright_1778404466121','1997-06-19','Bordeaux','2026-05-10 09:14:27',0,0,0,1),(27,'playwright_1778404466931@test.com','$2b$10$V9Ja6I4YspP9UKDQf7YJxOqkOMWoLUCHTgYfotVkTKYkMHFkV7COy','playwright_1778404466931','1997-06-19','Bordeaux','2026-05-10 09:14:29',0,0,0,1),(28,'playwright_1778404470442@test.com','$2b$10$JCzHuzMBuY5A4EnAhmnED.ckNvu7NtkGy95aLTAGrAC/n69sJRVMq','playwright_1778404470442','1997-06-19','Bordeaux','2026-05-10 09:14:34',0,0,0,1),(29,'daenerys.targarien@gmail.com','$2b$10$xwfKvzNisROaLIxfOQCpde6k9TDnoPOVG2PpgkIGLV8NUn8nAtAQ2','uniqueusername123','1997-06-19','Bordeaux','2026-05-10 09:17:17',0,0,0,1),(30,'playwright_1778404635230@test.com','$2b$10$i2Obx94ozmcUdXPe6B6FpOI9499VZt2Om2CAmHgV0Z9bHOxxEfL52','playwright_1778404635230','1997-06-19','Bordeaux','2026-05-10 09:17:17',0,0,0,1),(31,'playwright_1778404636583@test.com','$2b$10$BWVE/JVbL35VfitNPbSPO.rDFmzU73rfvYL45y4.DAOSqZ1wIDPyG','playwright_1778404636583','1997-06-19','Bordeaux','2026-05-10 09:17:18',0,0,0,1),(32,'playwright_1778404638449@test.com','$2b$10$robOc8VdA/vmI5Ggo/ggsOGz75/hJCd2haewjCmwDHJHlPB99kg5G','playwright_1778404638449','1997-06-19','Bordeaux','2026-05-10 09:17:21',0,0,0,1),(33,'playwright_1778404870650@test.com','$2b$10$.YT.Gvpf2arUqcWwG55a1eBbAPr.8lEXy0RZLax4izBIjz1GlPWuS','playwright_1778404870650','1997-06-19','Bordeaux','2026-05-10 09:21:12',0,0,0,1),(34,'playwright_1778404872340@test.com','$2b$10$tb181ObRP48xHnCvWJz.S.5u1DnscrtbcNPvzXQ3sqCIq4m68r2M.','playwright_1778404872340','1997-06-19','Bordeaux','2026-05-10 09:21:13',0,0,0,1),(35,'playwright_1778404873586@test.com','$2b$10$r9HlEM6cdEe4juWX2/Rifu8eC/fD4aFSOXnc1yEAEHl/rFVGnlj5.','playwright_1778404873586','1997-06-19','Bordeaux','2026-05-10 09:21:16',0,0,0,1),(36,'playwright_1778405056522@test.com','$2b$10$4dFzTr8J6Y3jo.wrrC0Aa.ZGlXB.rQP/hVpWOE7d/vt0R5loyI2lW','playwright_1778405056522','1997-06-19','Bordeaux','2026-05-10 09:24:18',0,0,0,1),(37,'playwright_1778405058666@test.com','$2b$10$9At5/GPhrI59AXTqijz9g.4E2CYvP1lu/PXan6RiPs7R58ZHAWUc.','playwright_1778405058666','1997-06-19','Bordeaux','2026-05-10 09:24:20',0,0,0,1),(38,'playwright_1778405060287@test.com','$2b$10$e6ScbgVYsAqZVmqam3XsaeXhcv4y871JjNbF.SMzmCUlXBEC0tRBO','playwright_1778405060287','1997-06-19','Bordeaux','2026-05-10 09:24:23',0,0,0,1),(39,'playwright_1778406524642@test.com','$2b$10$cH7b2xJ6xA3XX7P.F7NDyu4eqLAqPg7Cx8QmtpHPeQg/R20f6yvNe','playwright_1778406524642','1997-06-19','Bordeaux','2026-05-10 09:48:46',0,0,0,1),(40,'playwright_1778406525548@test.com','$2b$10$kXE0n721EVGnXTBqttlC8.0j5Jm2X1OioYKmPnlwLWH.3YoIenGZu','playwright_1778406525548','1997-06-19','Bordeaux','2026-05-10 09:48:47',0,0,0,1),(41,'playwright_1778406527531@test.com','$2b$10$yHsVqNfhuUDEHxhIvooiiuTsjlwsAR5GfaMX.zBPjG7xDJ7DoG5Ty','playwright_1778406527531','1997-06-19','Bordeaux','2026-05-10 09:48:50',0,0,0,1),(42,'playwright_1778406779060@test.com','$2b$10$n6BqwTYxEqFk6fHnqbmhmuSTC7jP3miVWXWEtt.BpG9XTzH97H31e','playwright_1778406779060','1997-06-19','Bordeaux','2026-05-10 09:53:00',0,0,0,1),(43,'playwright_1778406780164@test.com','$2b$10$qiUl1hwWIi4aUKHdxIjhzOGxERWjgjHVCQv8vsQdcGqdKD06k0eXa','playwright_1778406780164','1997-06-19','Bordeaux','2026-05-10 09:53:01',0,0,0,1),(44,'playwright_1778406781970@test.com','$2b$10$Jvxj3wSrFXGdo1vJQadbAe13Q70R8gwy0Sv5TC1E5EEFPB1hmrddS','playwright_1778406781970','1997-06-19','Bordeaux','2026-05-10 09:53:05',0,0,0,1);
/*!40000 ALTER TABLE `user_` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_status`
--

DROP TABLE IF EXISTS `user_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_status` (
  `Id_user_status` int NOT NULL AUTO_INCREMENT,
  `label` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Id_user_status`),
  UNIQUE KEY `user_status_label_key` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_status`
--

LOCK TABLES `user_status` WRITE;
/*!40000 ALTER TABLE `user_status` DISABLE KEYS */;
INSERT INTO `user_status` VALUES (2,'Admin'),(1,'Player'),(3,'Super-admin');
/*!40000 ALTER TABLE `user_status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-25 18:29:05
