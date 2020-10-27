USE `des`;
DROP procedure IF EXISTS `sp_DetalleCarga`;

DELIMITER $$
USE `des`$$
CREATE PROCEDURE `sp_DetalleCarga`(
	pOpcion INT,
	pIdCarga INT,
    pDetalleCarga TEXT)
BEGIN

	IF pOpcion = 1 then
    
		SELECT 
			detallecarga
		FROM
			carga c
				INNER JOIN
			detallecarga dc ON c.idCarga = dc.idCarga
		WHERE
			c.idCarga = pIdCarga
		ORDER BY detallecarga;

    ELSEIF pOpcion=2 THEN
    
		INSERT INTO `des`.`detallecarga` (`idCarga`, `detallecarga`) VALUES (pIdCarga, pDetalleCarga);

    END IF;
END$$

DELIMITER ;

