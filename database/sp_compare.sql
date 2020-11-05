USE `des`;
DROP procedure IF EXISTS `sp_compare`;

DELIMITER $$
USE `des`$$
CREATE PROCEDURE `sp_compare`(
	pCompare1 TEXT,
    pCompare2 TEXT
)
BEGIN
	DECLARE vCount INT DEFAULT 0;
    
    DROP TEMPORARY TABLE IF EXISTS tmpresult;
    DROP TEMPORARY TABLE IF EXISTS tmp;
    
    CREATE TEMPORARY TABLE IF NOT EXISTS tmpresult
    (
		DETALLE VARCHAR(100),
        VALOR DECIMAL(12,2)
    );
    
    CREATE TEMPORARY TABLE IF NOT EXISTS tmp
    SELECT 
		SUBSTRING_INDEX (detallecarga, '/', - 1) archivo
	FROM
		detallecarga dc
			INNER JOIN
		carga c ON dc.idcarga = c.idcarga
	WHERE
		path = pComPare1;
        
    SELECT 
		COUNT(*)
	INTO
		vCount
	FROM
		tmp;    
    
    INSERT INTO tmpresult
	SELECT 
		'Cantidad de documentos' AS DETALLE, (COUNT(*)*100)/vCount VALOR
	FROM
		detallecarga dc
			INNER JOIN
		carga c ON dc.idcarga = c.idcarga
	WHERE
		path = pCompare2;
        
	INSERT INTO tmpresult
    SELECT 'Nombre de documentos' AS DETALLE, (COUNT(*)*100) / vCount VALOR FROM (
	SELECT (SELECT 
		SUBSTRING_INDEX (detallecarga, '/', - 1) archivo 
	FROM
		detallecarga dc
			INNER JOIN
		carga c ON dc.idcarga = c.idcarga
	WHERE
		path = pCompare2 and detallecarga like CONCAT('%',t.archivo,'%')) comparacion  from tmp t) as x;
        
    SELECT * FROM tmpresult;
    
    DROP TEMPORARY TABLE IF EXISTS tmp;
    DROP TEMPORARY TABLE IF EXISTS tmpresult;
    
END$$

DELIMITER ;

