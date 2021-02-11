<?php
$total = 1 * $b * $c;

$aIndex = 0;
$cIndex = 0;
for ($i = 0; $i < $total * $a; $i++) {

    $cOut = $i + 1;
    if ($cOut > $c) {
        $mod = $cOut % $c;
        if ($mod > 0) {
            $cOut = $mod;
        } else {
            $cOut = $c;
        }

        if ($cOut === 1) {
            $cIndex++;
        }
    }

    if ($cIndex === $b) {
        $cIndex = 0;
    }

    $bOut = $cIndex + 1;
    $aMod = ($i) % $total;
    if ($aMod === 0) {
        $aIndex++;
    }
    $aOut = $aIndex;

?>
    <tr>
        <td><?= $aOut ?></td>
        <td><?= $bOut ?></td>
        <td><?= $cOut ?></td>
        <td></td>
    </tr>
<?php
}
?>