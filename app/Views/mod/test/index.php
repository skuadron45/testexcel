<?php
$this->extend('layouts/test');
?>

<?= $this->section('content-header') ?>
<div class="container-fluid">
    <div class="row mb-2">
        <div class="col-sm-6">
            <h1 class="m-0">Test</h1>

        </div><!-- /.col -->
        <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="<?= route_to('admin.dashboard') ?>"><i class="nav-icon fas fa-tachometer-alt"></i></a></li>
                <li class="breadcrumb-item active">Test</li>
            </ol>
        </div><!-- /.col -->
    </div><!-- /.row -->
</div><!-- /.container-fluid -->
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<div class="container-fluid">

    <div class="d-flex pb-2 justify-content-end">
        <button id="button-generate" class="btn btn-primary" type="button"><i class="fas fa-save"></i>&nbsp;Generate</button>
    </div>    

    <div class="row">
        <div class="col-12">
            <div class="card card-default">

                <div class="card-body">

                    <?php
                    $opt['id'] = "main-form";
                    $url = route_to('admin.test.generate');
                    echo form_open($url, $opt);
                    ?>

                    <!-- <?= csrf_field() ?> -->

                    <div class="row">
                        <div class="col">
                            <div class="row">

                                <div class="col">
                                    <div class="form-group">
                                        <label>Nilai A <span class="text-danger">*</span></label>
                                        <input type="text" name="nilaia" class="form-control" placeholder="Nilai A">
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="form-group">
                                        <label>Nilai B <span class="text-danger">*</span></label>
                                        <input type="text" name="nilaib" class="form-control" placeholder="Nilai B">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label>Nilai C <span class="text-danger">*</span></label>
                                        <input type="text" name="nilaic" class="form-control" placeholder="Nilai C">
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <?= form_close() ?>
                </div>

            </div>
        </div>
    </div>

    <div class="d-flex pb-2 justify-content-end">
        <button id="button-submit" class="btn btn-success" type="submit" form="main-form"><i class="fas fa-file-excel"></i>&nbsp;Excel</button>
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