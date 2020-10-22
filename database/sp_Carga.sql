USE `des`;
DROP procedure IF EXISTS `sp_Carga`;

DELIMITER $$
USE `des`$$
CREATE PROCEDURE `sp_Carga`(
	pOpcion INT,
	pUsuario INT,
    pProyecto INT,
    pDescripcion VARCHAR(200),
    pPath TEXT)
BEGIN

	IF pOpcion = 1 THEN
		IF (pUsuario > 0 ) THEN
		
			SELECT 
				c.idCarga, c.idProyecto, u.Nombre, u.Carnet, c.Descripcion, c.Path, c.FECHA
			FROM
				carga c
					INNER JOIN
				proyectos p ON c.idProyecto = p.idProyectos
					INNER JOIN
				usuarios u ON c.idUsuario = u.idUsuarios
			WHERE
				u.idUsuarios = pUsuario AND p.idProyectos = pProyecto;
			
		ELSE
		
			SELECT 
				c.idCarga, c.idProyecto, u.Nombre, u.Carnet, c.Descripcion, c.Path, c.FECHA
			FROM
				carga c
					INNER JOIN
				proyectos p ON c.idProyecto = p.idProyectos
					INNER JOIN
				usuarios u ON c.idUsuario = u.idUsuarios
			WHERE
				p.idProyectos = pProyecto;

		END IF;
	ELSEIF pOpcion = 2 THEN
		
        INSERT INTO `des`.`carga` (`idUsuario`, `idProyecto`, `Descripcion`, `Path`, `FECHA`) VALUES (pUsuario, pProyecto, pDescripcion, pPath, NOW());
		
        SELECT 'OK';
    END IF;
END$$

DELIMITER ;

