USE `des`;
DROP procedure IF EXISTS `sp_Cursos`;

DELIMITER $$
USE `des`$$
CREATE PROCEDURE `sp_Cursos`(
	pUsuario INT
)
BEGIN

	SELECT 
		c.idCursos, c.Nombre, COUNT(dp.idCursos) TotalProyectos
	FROM
		cursos c
			INNER JOIN
		detallecurso dc ON c.idCursos = dc.idCurso
			INNER JOIN
		usuarios u ON dc.idUsuario = idUsuarios
			LEFT JOIN 
		detalleproyecto dp ON c.idCursos = dp.idCursos
	WHERE
		u.idUsuarios = pUsuario
	GROUP BY c.idCursos, c.Nombre;

END$$

DELIMITER ;

