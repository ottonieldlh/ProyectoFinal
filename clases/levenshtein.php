<?php


        $result = 0;

    try{

        $s1 = $_REQUEST['path1'];
        $s2 = $_REQUEST['path2'];

        $txtpath1 = file_get_contents($s1);
        $txtpath2 = file_get_contents($s2);

        //$result["valor"] = levenshtein($txtpath1,$txtpath2);
        $l1 = strlen($s1);                    // Length of string $s1
        $l2 = strlen($s2);                    // Length of $s2
        $dis = range(0, $l2);                 // Array with (0,1,2,...,n)
    
        for ($x = 1; $x <= $l1; $x++) {        
            $dis_new[0] = $x;
            for ($y = 1; $y <= $l2; $y++) {
                $c = ($s1[$x - 1] == $s2[$y - 1]) ? 0 : 1;
                $dis_new[$y] = min($dis[$y] + 1, $dis_new[$y - 1] + 1, $dis[$y - 1] + $c);	 
            }
            $dis = $dis_new;              
        }	
    
        $result = $dis[$l2];
          

    }catch(Exception $e){
        $result = 999;
    }

    echo json_encode($result);

?>


