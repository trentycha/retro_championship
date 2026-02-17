-- CreateTable
CREATE TABLE `user_status` (
    `Id_user_status` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `user_status_label_key`(`label`),
    PRIMARY KEY (`Id_user_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match_status` (
    `Id_match_status` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(150) NOT NULL,

    PRIMARY KEY (`Id_match_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channel` (
    `Id_channel` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`Id_channel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tournament_status` (
    `Id_tournament_status` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`Id_tournament_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_game` (
    `Id_type_game` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`Id_type_game`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `license` (
    `Id_license` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`Id_license`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game` (
    `Id_game` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `Id_license` INTEGER NOT NULL,
    `Id_type_game` INTEGER NOT NULL,

    PRIMARY KEY (`Id_game`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_` (
    `Id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `mail` VARCHAR(150) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `birthday` DATE NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `how_many_tourn` INTEGER NULL,
    `how_many_matches` INTEGER NULL,
    `won_tournaments` INTEGER NULL,
    `Id_user_status` INTEGER NOT NULL,

    UNIQUE INDEX `user__mail_key`(`mail`),
    UNIQUE INDEX `user__username_key`(`username`),
    PRIMARY KEY (`Id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prize` (
    `Id_prize` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `value_` DECIMAL(15, 2) NULL,
    `Id_user` INTEGER NOT NULL,

    PRIMARY KEY (`Id_prize`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tournament` (
    `Id_tournament` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `started_at` DATETIME(0) NULL,
    `ended_at` DATETIME(0) NULL,
    `Id_user` INTEGER NOT NULL,
    `Id_user_1` INTEGER NULL,
    `Id_prize` INTEGER NULL,
    `Id_game` INTEGER NULL,
    `Id_tournament_status` INTEGER NOT NULL,
    `Id_channel` INTEGER NULL,

    UNIQUE INDEX `tournament_name_key`(`name`),
    UNIQUE INDEX `tournament_started_at_key`(`started_at`),
    UNIQUE INDEX `tournament_ended_at_key`(`ended_at`),
    PRIMARY KEY (`Id_tournament`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match_` (
    `Id_match` INTEGER NOT NULL AUTO_INCREMENT,
    `started_at` DATETIME(0) NOT NULL,
    `ended_at` DATETIME(0) NULL,
    `Id_tournament` INTEGER NULL,
    `Id_user_winner` INTEGER NULL,
    `Id_channel` INTEGER NULL,
    `Id_user_1` INTEGER NULL,
    `Id_user_2` INTEGER NULL,
    `Id_match_status` INTEGER NULL,

    PRIMARY KEY (`Id_match`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub` (
    `Id_user` INTEGER NOT NULL,
    `Id_tournament` INTEGER NOT NULL,

    PRIMARY KEY (`Id_user`, `Id_tournament`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_Id_license_fkey` FOREIGN KEY (`Id_license`) REFERENCES `license`(`Id_license`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_Id_type_game_fkey` FOREIGN KEY (`Id_type_game`) REFERENCES `type_game`(`Id_type_game`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_` ADD CONSTRAINT `user__Id_user_status_fkey` FOREIGN KEY (`Id_user_status`) REFERENCES `user_status`(`Id_user_status`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prize` ADD CONSTRAINT `prize_Id_user_fkey` FOREIGN KEY (`Id_user`) REFERENCES `user_`(`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tournament` ADD CONSTRAINT `tournament_Id_user_fkey` FOREIGN KEY (`Id_user`) REFERENCES `user_`(`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tournament` ADD CONSTRAINT `tournament_Id_user_1_fkey` FOREIGN KEY (`Id_user_1`) REFERENCES `user_`(`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tournament` ADD CONSTRAINT `tournament_Id_prize_fkey` FOREIGN KEY (`Id_prize`) REFERENCES `prize`(`Id_prize`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tournament` ADD CONSTRAINT `tournament_Id_game_fkey` FOREIGN KEY (`Id_game`) REFERENCES `game`(`Id_game`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tournament` ADD CONSTRAINT `tournament_Id_tournament_status_fkey` FOREIGN KEY (`Id_tournament_status`) REFERENCES `tournament_status`(`Id_tournament_status`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tournament` ADD CONSTRAINT `tournament_Id_channel_fkey` FOREIGN KEY (`Id_channel`) REFERENCES `channel`(`Id_channel`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_` ADD CONSTRAINT `match__Id_tournament_fkey` FOREIGN KEY (`Id_tournament`) REFERENCES `tournament`(`Id_tournament`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_` ADD CONSTRAINT `match__Id_user_winner_fkey` FOREIGN KEY (`Id_user_winner`) REFERENCES `user_`(`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_` ADD CONSTRAINT `match__Id_channel_fkey` FOREIGN KEY (`Id_channel`) REFERENCES `channel`(`Id_channel`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_` ADD CONSTRAINT `match__Id_user_1_fkey` FOREIGN KEY (`Id_user_1`) REFERENCES `user_`(`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_` ADD CONSTRAINT `match__Id_user_2_fkey` FOREIGN KEY (`Id_user_2`) REFERENCES `user_`(`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_` ADD CONSTRAINT `match__Id_match_status_fkey` FOREIGN KEY (`Id_match_status`) REFERENCES `match_status`(`Id_match_status`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub` ADD CONSTRAINT `sub_Id_user_fkey` FOREIGN KEY (`Id_user`) REFERENCES `user_`(`Id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub` ADD CONSTRAINT `sub_Id_tournament_fkey` FOREIGN KEY (`Id_tournament`) REFERENCES `tournament`(`Id_tournament`) ON DELETE RESTRICT ON UPDATE CASCADE;
