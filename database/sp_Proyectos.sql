USE `des`;
DROP procedure IF EXISTS `sp_Proyectos`;

DELIMITER $$
USE `des`$$
CREATE PROCEDURE `sp_Proyectos`(
	pUsuario INT,
    pCurso INT
)
BEGIN

	SELECT 
		p.idProyectos,
		p.Nombre,
		p.Descripcion
	FROM
		proyectos p
			INNER JOIN
		detalleproyecto dp ON p.idProyectos = dp.idProyecto
			INNER JOIN
		cursos c ON dp.idCursos = c.idCursos
			INNER JOIN
		detallecurso dc ON c.idCursos = dc.idCurso
			INNER JOIN
		usuarios u ON dc.idUsuario = u.idUsuarios
	WHERE
		u.idUsuarios = pUsuario AND c.idCursos = pCurso;

END$$

DELIMITER ;

