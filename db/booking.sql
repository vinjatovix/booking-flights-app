-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema booking
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `booking` ;

-- -----------------------------------------------------
-- Schema booking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `booking` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `booking` ;

-- -----------------------------------------------------
-- Table `booking`.`Paises`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`Paises` ;

CREATE TABLE IF NOT EXISTS `booking`.`Paises` (
  `Pais_ID` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'No llegan a 250 paises en el mundo.\\n',
  `Pais_nombre` VARCHAR(100) NOT NULL,
  `Pais_iso3` CHAR(3) NOT NULL COMMENT 'El ISO3 de un país son 3 caracteres alfanuméricos.',
  `Pais_iso2` CHAR(2) NOT NULL COMMENT 'El ISO2 de un país son dos caracteres alfanuméricos.',
  `Pais_prefijo` VARCHAR(255) NULL DEFAULT NULL COMMENT 'Prefijo telefónico del país.',
  `Pais_divisa` VARCHAR(255) NULL DEFAULT NULL COMMENT 'Divisa del país.',
  `Pais_bandera` VARCHAR(255) NULL DEFAULT NULL COMMENT 'Emoji de la bandera del país.',
  `Pais_unicode` VARCHAR(255) NULL DEFAULT NULL COMMENT 'Alternativa Unicode a la bandera del país.',
  PRIMARY KEY (`Pais_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `Pais_nombre_UNIQUE` ON `booking`.`Paises` (`Pais_nombre` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `booking`.`Regiones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`Regiones` ;

CREATE TABLE IF NOT EXISTS `booking`.`Regiones` (
  `Rgn_ID` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Rgn_nombre` VARCHAR(255) NOT NULL,
  `Rgn_PaisID` TINYINT UNSIGNED NOT NULL,
  `Rgn_iso2` CHAR(2) NULL DEFAULT '' COMMENT 'El código ISO2 de una región son dos caracteres alfanuméricos. Puede haber regiones sin ISO2.',
  PRIMARY KEY (`Rgn_ID`),
  CONSTRAINT `fk_Rgn_pais`
    FOREIGN KEY (`Rgn_PaisID`)
    REFERENCES `booking`.`Paises` (`Pais_ID`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `fk_Rgn_pais_idx` ON `booking`.`Regiones` (`Rgn_PaisID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `booking`.`Localidades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`Localidades` ;

CREATE TABLE IF NOT EXISTS `booking`.`Localidades` (
  `Loca_ID` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Loca_nombre` VARCHAR(255) NOT NULL,
  `Loca_RgnID` SMALLINT UNSIGNED NOT NULL,
  `Loca_PaisID` TINYINT UNSIGNED NOT NULL,
  `Loca_latitud` DECIMAL(10,8) NOT NULL,
  `Loca_longitud` DECIMAL(11,8) NOT NULL,
  PRIMARY KEY (`Loca_ID`),
  CONSTRAINT `fk_Loca_Pais`
    FOREIGN KEY (`Loca_PaisID`)
    REFERENCES `booking`.`Paises` (`Pais_ID`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Loca_Rgn`
    FOREIGN KEY (`Loca_RgnID`)
    REFERENCES `booking`.`Regiones` (`Rgn_ID`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `Loca_latitud_UNIQUE` ON `booking`.`Localidades` (`Loca_latitud` ASC) VISIBLE;

CREATE UNIQUE INDEX `Loca_longitud_UNIQUE` ON `booking`.`Localidades` (`Loca_longitud` ASC) VISIBLE;

CREATE INDEX `fk_Loca_Rgn_idx` ON `booking`.`Localidades` (`Loca_RgnID` ASC) VISIBLE;

CREATE INDEX `fk_Loca_Pais_idx` ON `booking`.`Localidades` (`Loca_PaisID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `booking`.`Aeropuertos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`Aeropuertos` ;

CREATE TABLE IF NOT EXISTS `booking`.`Aeropuertos` (
  `Aero_ID` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'No llegan a 7,5k aeropuertos en todo el mundo, de los cuales menos de 4k son comerciales.\\n',
  `Aero_nombre` VARCHAR(255) NOT NULL,
  `Aero_iata` CHAR(3) NOT NULL COMMENT 'El código IATA el aeropuerto son 3 caracteres alfanuméricos.',
  `Aero_LocaID` MEDIUMINT UNSIGNED NOT NULL,
  `Aero_PaisID` TINYINT UNSIGNED NOT NULL,
  `Aero_latitud` DECIMAL(10,8) NOT NULL,
  `Aero_longitud` DECIMAL(11,8) NOT NULL,
  PRIMARY KEY (`Aero_ID`),
  CONSTRAINT `fk_Aero_Loca`
    FOREIGN KEY (`Aero_LocaID`)
    REFERENCES `booking`.`Localidades` (`Loca_ID`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Aero_Pais`
    FOREIGN KEY (`Aero_PaisID`)
    REFERENCES `booking`.`Paises` (`Pais_ID`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `Aero_iata_UNIQUE` ON `booking`.`Aeropuertos` (`Aero_iata` ASC) VISIBLE;

CREATE UNIQUE INDEX `Aero_latitud_UNIQUE` ON `booking`.`Aeropuertos` (`Aero_latitud` ASC) VISIBLE;

CREATE UNIQUE INDEX `Aero_longitud_UNIQUE` ON `booking`.`Aeropuertos` (`Aero_longitud` ASC) VISIBLE;

CREATE INDEX `fk_Aero_Pais_idx` ON `booking`.`Aeropuertos` (`Aero_PaisID` ASC) VISIBLE;

CREATE INDEX `Aero_nombre_idx` ON `booking`.`Aeropuertos` (`Aero_nombre` ASC) VISIBLE;

CREATE INDEX `Aero_Loca_idx` ON `booking`.`Aeropuertos` (`Aero_LocaID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `booking`.`Companias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`Companias` ;

CREATE TABLE IF NOT EXISTS `booking`.`Companias` (
  `Cmp_ID` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'No llegan a 2k compañias comerciales en el mundo.',
  `Cmp_iata` CHAR(2) NOT NULL COMMENT 'El codigo IATA de las compañias aereas son dos caracteres alfanuméricos.',
  `Cmp_nombre` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`Cmp_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `Cmp_iata_UNIQUE` ON `booking`.`Companias` (`Cmp_iata` ASC) VISIBLE;

CREATE UNIQUE INDEX `Cmp_nombre_UNIQUE` ON `booking`.`Companias` (`Cmp_nombre` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `booking`.`Usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`Usuarios` ;

CREATE TABLE IF NOT EXISTS `booking`.`Usuarios` (
  `Usr_ID` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Hasta  16777215  Usuarios.',
  `Usr_nombre` VARCHAR(100) NOT NULL,
  `Usr_email` VARCHAR(200) NOT NULL COMMENT 'El mail es único y será el login de usuario.',
  `Usr_password` VARCHAR(255) NOT NULL COMMENT 'La contraseña se encriptará en el BE.',
  `Usr_foto` VARCHAR(255) DEFAULT '0' COMMENT 'Se guarda un path.',
  `Usr_bio` VARCHAR(249) DEFAULT '0',
  `Usr_signin` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Se almacena un timestamp del momento de registro.',
  `Usr_status` CHAR(1) NOT NULL DEFAULT 'i' COMMENT 'Estado de usuario. Los usuarios nunca se borran. Al darse de alta, por defecto estan activos. En caso de baja se cambia el estado a \\\\\'i\\\\\'.',
  `Usr_AeroID` SMALLINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`Usr_ID`),
  CONSTRAINT `fk_Usr_Aero_idx`
    FOREIGN KEY (`Usr_AeroID`)
    REFERENCES `booking`.`Aeropuertos` (`Aero_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `Usr_mail_UNIQUE` ON `booking`.`Usuarios` (`Usr_mail` ASC) VISIBLE;

CREATE INDEX `fk_Usuarios_1_idx` ON `booking`.`Usuarios` (`Usr_AeroID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `booking`.`ReservaCabeceras`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`ReservaCabeceras` ;

CREATE TABLE IF NOT EXISTS `booking`.`ReservaCabeceras` (
  `RC_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Hasta 4.294.967.295 reservas',
  `RC_fecha` DATE NOT NULL COMMENT 'YYYY-MM-DD en la que se efectúa la reserva.',
  `RC_total` DECIMAL(6,2) UNSIGNED NOT NULL COMMENT 'Se calcula a partir de la cantidad y precio del detalle.',
  `RC_UsrID` MEDIUMINT UNSIGNED NOT NULL,
  `RC_status` CHAR(1) NOT NULL DEFAULT 'a' COMMENT '\'a\' de activo \'i\' de inactivo para las reservas canceladas.',
  PRIMARY KEY (`RC_ID`),
  CONSTRAINT `fk_RC_Usr`
    FOREIGN KEY (`RC_UsrID`)
    REFERENCES `booking`.`Usuarios` (`Usr_ID`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = 'La tabla cabecera de reserva identifica un conjunto de reservas para cada usuario. Es como una cabecera de factura.';

CREATE INDEX `fk_RC_Usr_idx` ON `booking`.`ReservaCabeceras` (`RC_UsrID` ASC) VISIBLE;

CREATE INDEX `RC_fecha_idx` ON `booking`.`ReservaCabeceras` (`RC_fecha` ASC) VISIBLE;

CREATE INDEX `RC_status_idx` ON `booking`.`ReservaCabeceras` (`RC_status` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `booking`.`Vuelos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`Vuelos` ;

CREATE TABLE IF NOT EXISTS `booking`.`Vuelos` (
  `Vue_ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Hasta 2 e64-1 vuelos almacenables.',
  `Vue_origenID` SMALLINT UNSIGNED NOT NULL COMMENT 'No llegan a 7,5k aeropuertos en el mundo de los cuales menos de 4k son comerciales.',
  `Vue_destinoID` SMALLINT UNSIGNED NOT NULL,
  `Vue_companyID` SMALLINT UNSIGNED NOT NULL COMMENT 'No llegan a 2k compañias comerciales.',
  `Vue_hora` TIMESTAMP NOT NULL COMMENT 'Dia y hora de partida del vuelo.',
  `Vue_duracion` VARCHAR(9) NOT NULL COMMENT 'Duración del vuelo en formato string ISO 8601',
  `Vue_paradas` TINYINT NOT NULL DEFAULT '0',
  `Vue_precio` DECIMAL(4,2) NOT NULL,
  PRIMARY KEY (`Vue_ID`),
  CONSTRAINT `fk_Vue_Cmp`
    FOREIGN KEY (`Vue_companyID`)
    REFERENCES `booking`.`Companias` (`Cmp_ID`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Vue_destino`
    FOREIGN KEY (`Vue_destinoID`)
    REFERENCES `booking`.`Aeropuertos` (`Aero_ID`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Vue_origen`
    FOREIGN KEY (`Vue_origenID`)
    REFERENCES `booking`.`Aeropuertos` (`Aero_ID`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `fk_Vue_Cmp_idx` ON `booking`.`Vuelos` (`Vue_companyID` ASC) VISIBLE;

CREATE INDEX `fk_Vue_origen_idx` ON `booking`.`Vuelos` (`Vue_origenID` ASC) VISIBLE;

CREATE INDEX `fk_Vue_destino_idx` ON `booking`.`Vuelos` (`Vue_destinoID` ASC) VISIBLE;

CREATE INDEX `Vue_duracion_idx` ON `booking`.`Vuelos` (`Vue_duracion` ASC) VISIBLE;

CREATE INDEX `Vue_paradas_idx` ON `booking`.`Vuelos` (`Vue_paradas` ASC) VISIBLE;

CREATE INDEX `Vue_precio_idx` ON `booking`.`Vuelos` (`Vue_precio` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `booking`.`ReservaDetalles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `booking`.`ReservaDetalles` ;

CREATE TABLE IF NOT EXISTS `booking`.`ReservaDetalles` (
  `RD_ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Hasta 2 e64-1 lineas de detalles de reserva.',
  `RD_RCID` INT UNSIGNED NOT NULL COMMENT 'Cabecera a la que pertenece este registro.',
  `RD_VueID` BIGINT UNSIGNED NOT NULL COMMENT 'Vuelo al que hace referencia el registro',
  `RD_cantidad` TINYINT UNSIGNED NOT NULL COMMENT 'Numero de billetes por vuelo.',
  `RD_origenID` SMALLINT UNSIGNED NOT NULL,
  `RD_destinoID` SMALLINT UNSIGNED NOT NULL,
  `RD_duracion` VARCHAR(45) NOT NULL,
  `RD_paradas` TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (`RD_ID`),
  CONSTRAINT `fk_RD_RC`
    FOREIGN KEY (`RD_RCID`)
    REFERENCES `booking`.`ReservaCabeceras` (`RC_ID`)
    ON UPDATE CASCADE,
  CONSTRAINT `fk_RD_vuelo`
    FOREIGN KEY (`RD_VueID`)
    REFERENCES `booking`.`Vuelos` (`Vue_ID`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = 'Es el desglose de un conjunto de reservas.Sería como el desglose de una factura.';

CREATE INDEX `fk_RD_RC_idx` ON `booking`.`ReservaDetalles` (`RD_RCID` ASC) VISIBLE;

CREATE INDEX `fk_RD_vuelo_idx` ON `booking`.`ReservaDetalles` (`RD_VueID` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
