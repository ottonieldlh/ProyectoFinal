CREATE SCHEMA `des` ;

USE des;

CREATE TABLE `des`.`usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(100) NOT NULL,
  `Carnet` VARCHAR(30) NOT NULL,
  `Correo` VARCHAR(30) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `TipoUsuario` INT NOT NULL,
  PRIMARY KEY (`idUsuarios`));

CREATE TABLE `des`.`cursos` (
  `idCursos` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idCursos`));


CREATE TABLE `des`.`proyectos` (
  `idProyectos` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(100) NOT NULL,
  `Descripcion` VARCHAR(500) NULL,
  PRIMARY KEY (`idProyectos`));

CREATE TABLE `des`.`tipousuario` (
  `idTipoUsuario` INT NOT NULL AUTO_INCREMENT,
  `Descripcion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idTipoUsuario`));


ALTER TABLE `des`.`usuarios` 
ADD INDEX `fk_tipoUsuario_idx` (`TipoUsuario` ASC) VISIBLE;
;

ALTER TABLE `des`.`usuarios` 
ADD CONSTRAINT `fk_tipoUsuario`
  FOREIGN KEY (`TipoUsuario`)
  REFERENCES `des`.`tipousuario` (`idTipoUsuario`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE `des`.`detallecurso` (
  `idDetalleCurso` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `idCurso` INT NOT NULL,
  PRIMARY KEY (`idDetalleCurso`),
  INDEX `FK_idUsuario_idx` (`idUsuario` ASC) VISIBLE,
  INDEX `fk_idCursos_idx` (`idCurso` ASC) VISIBLE,
  CONSTRAINT `FK_idUsuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `des`.`usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_idCursos`
    FOREIGN KEY (`idCurso`)
    REFERENCES `des`.`cursos` (`idCursos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    
CREATE TABLE `des`.`detalleproyecto` (
  `idDetalleProyecto` INT NOT NULL AUTO_INCREMENT,
  `idCursos` INT NOT NULL,
  `idProyecto` INT NOT NULL,
  PRIMARY KEY (`idDetalleProyecto`),
  INDEX `fk_idCursoproyecto_idx` (`idCursos` ASC) VISIBLE,
  INDEX `fk_idProyecto_idx` (`idProyecto` ASC) VISIBLE,
  CONSTRAINT `fk_idCursoproyecto`
    FOREIGN KEY (`idCursos`)
    REFERENCES `des`.`cursos` (`idCursos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_idProyecto`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `des`.`proyectos` (`idProyectos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `des`.`carga` (
  `idCarga` INT NOT NULL AUTO_INCREMENT,
  `idProyecto` INT NOT NULL,
  `Descripcion` VARCHAR(200) NULL,
  `Path` TEXT NOT NULL,
  `FECHA` DATETIME NOT NULL,
  PRIMARY KEY (`idCarga`),
  INDEX `fk_idProyectoCarga_idx` (`idProyecto` ASC) VISIBLE,
  CONSTRAINT `fk_idProyectoCarga`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `des`.`proyectos` (`idProyectos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- Cambios para carga
ALTER TABLE `des`.`carga` 
ADD COLUMN `idUsuario` INT NOT NULL AFTER `idCarga`,
ADD INDEX `index3` (`idUsuario` ASC) INVISIBLE;
;
ALTER TABLE `des`.`carga` 
ADD CONSTRAINT `fk_idUsuario`
  FOREIGN KEY (`idUsuario`)
  REFERENCES `des`.`usuarios` (`idUsuarios`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;



-- Cambios a detalle carga
CREATE TABLE `des`.`detallecarga` (
  `iddetallecarga` INT NOT NULL AUTO_INCREMENT,
  `idCarga` INT NOT NULL,
  `detallecarga` TEXT NOT NULL,
  PRIMARY KEY (`iddetallecarga`));
