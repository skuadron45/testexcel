<?php
$this->extend('layouts/test');
?>

<?= $this->section('content-header') ?>
<div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
            <h1 class="m-0">Preview</h1>

        </div><!-- /.col -->
        <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="<?= route_to('admin.dashboard') ?>"><i class="nav-icon fas fa-tachometer-alt"></i></a></li>
                <li class="breadcrumb-item active">Preview</li>
            </ol>
        </div><!-- /.col -->
    </div><!-- /.row -->
</div><!-- /.container-fluid -->
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<div class="container-fluid">

    <div class="d-flex pb-2 justify-content-end">
        <!-- <a class="btn btn-success mr-1"><i class="fas fa-save"></i>&nbsp;Simpan</a> -->
        <button id="button-submit" class="btn btn-success mr-1" type="submit" form="main-form"><i class="fas fa-file-excel"></i>&nbsp;Excel</button>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="card card-default">

                <div class="card-body">

                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr class="font-weight-bold">
                                <td class="text-center">
                                    Nilai A
                                </td>
                                <td class="text-center">
                                    Nilai B
                                </td>
                                <td class="text-center">
                                    Nilai C
                                </td>
                                <td class="text-center">
                                    Nilai D
                                </td>
                            </tr>
                        </thead>
                        <tbody>

                            <?php
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

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>

    <!-- /.card -->
</div>

<?= $this->endSection() ?>

<?= $this->section('page-css') ?>


<?= $this->endSection() ?>

<?= $this->section('page-js') ?>


<script>
    $(function() {





    });
</script>

<?= $this->endSection() ?>