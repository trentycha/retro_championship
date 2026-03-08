-- AlterTable
ALTER TABLE `match_` ADD COLUMN `Id_round_match` INTEGER NULL;

-- CreateTable
CREATE TABLE `round_match` (
    `Id_round_match` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`Id_round_match`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `match_` ADD CONSTRAINT `match__Id_round_match_fkey` FOREIGN KEY (`Id_round_match`) REFERENCES `round_match`(`Id_round_match`) ON DELETE SET NULL ON UPDATE CASCADE;
