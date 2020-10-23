USE `des`;
DROP procedure IF EXISTS `sp_DetalleUsuario`;

DELIMITER $$
USE `des`$$
CREATE PROCEDURE `sp_DetalleUsuario`(
	pIdUsuario INT)
BEGIN

	SELECT 
    idUsuarios id, Nombre, Carnet, idTipoUsuario, Descripcion
FROM
    usuarios u
        INNER JOIN
    tipousuario t ON u.TipoUsuario = t.idTipoUsuario
WHERE
    idUsuarios = pIdUsuario;

END$$

DELIMITER ;

