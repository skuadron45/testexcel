<?php
namespace App\Controllers;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class Test extends BaseAdmin
{
	protected $module = 'test';

	public function index()
	{

		return $this->render('test/index');
	}

	public function generate()
	{
		$nilaia = $this->request->getPost("nilaia");
		$nilaib = $this->request->getPost("nilaib");
		$nilaic = $this->request->getPost("nilaic");

		// $this->vars['a'] = intval($nilaia);
		// $this->vars['b'] = intval($nilaib);
		// $this->vars['c'] = intval($nilaic);
		//return $this->render('test/preview');

		$a = intval($nilaia);
		$b = intval($nilaib);
		$c = intval($nilaic);

		$spreadsheet = new Spreadsheet();
		$sheet = $spreadsheet->getActiveSheet();

		$sheet->setCellValue('B2', 'A');
		$sheet->setCellValue('C2', 'B');
		$sheet->setCellValue('D2', 'C');
		$sheet->setCellValue('E2', 'D');

		$total = 1 * $b * $c;

		$aIndex = 0;
		$bIndex = 0;
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

			$sheet->setCellValue('B' . (3 + $i), $aOut);
			$sheet->setCellValue('C' . (3 + $i), $bOut);
			$sheet->setCellValue('D' . (3 + $i), $cOut);
		}

		$writer = new Xlsx($spreadsheet);
		$writer->save('generate.xlsx');

		return $this->respond()->download('generate.xlsx', null);
	}
}
