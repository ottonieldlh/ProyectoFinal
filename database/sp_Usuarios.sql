USE `des`;
DROP procedure IF EXISTS `sp_Usuario`;

DELIMITER $$
USE `des`$$
CREATE PROCEDURE `sp_Usuario`(
	pCorreo VARCHAR(30),
    pPassword VARCHAR(45)
)
BEGIN

	DECLARE vEstado BOOL DEFAULT FALSE;
	DECLARE vMensaje VARCHAR(50) DEFAULT "";
    DECLARE vid INT DEFAULT 0;
    
    IF (pCorreo = "" OR pPassword = "") THEN
	
		SET vEstado = FALSE;
        SET vMensaje = "Datos incompletos";

	ELSE
    
		IF EXISTS (select * from usuarios where Correo = pCorreo and Password = pPassword) THEN
			
			SET vEstado = TRUE;
			SET vMensaje = "Datos Correctos";
            
            select idUsuarios INTO vid from usuarios where Correo = pCorreo and Password = pPassword limit 1;
			
		ELSE
			
			SET vEstado = FALSE;
			SET vMensaje = "Datos Incorrectos";
        
        END IF;
        
	END IF;

    SELECT vEstado, vMensaje, vid;
END$$

DELIMITER ;

