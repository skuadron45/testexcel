<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Panel</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="<?= adminAsset() ?>/plugins/fontawesome-free/css/all.min.css">

    <!-- SweetAlert2 -->
    <link rel="stylesheet" href="<?= adminAsset() ?>/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css">
    <!-- Toastr -->
    <link rel="stylesheet" href="<?= adminAsset() ?>/plugins/toastr/toastr.min.css">    

    <!-- Tempusdominus Bootstrap 4 -->
    <link rel="stylesheet" href="<?= adminAsset() ?>/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">    

    <!-- Theme style -->
    <link rel="stylesheet" href="<?= adminAsset() ?>/dist/css/adminlte.min.css">

    <link rel="stylesheet" href="<?= adminAsset() ?>/custom.css">

    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="<?= adminAsset() ?>/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
    

    <!-- page-css -->
    <?= $this->renderSection('page-css') ?>

    <!-- DEFINE GLOBAL VARIABLE FOR JS -->
    <script>        
        const ADMIN_ASSETS = "<?= adminAsset(); ?>";
        const _TOKEN_NAME = '<?= csrf_token(); ?>';
    </script>

</head>

<body class="hold-transition sidebar-mini layout-fixed">

    <div id="spinner-front">
        <img src="<?= adminAsset() ?>/img/loader.gif" /><br>
        Loading !
    </div>
    <div id="spinner-back"></div>

    <div class="wrapper">
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                
            </ul>
        </nav>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-info elevation-4">
            <!-- Brand Logo -->
            <a href="<?= site_url('admin') ?>" class="brand-link navbar-cyan">
                <img src="<?= adminAsset() ?>/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
                <span class="brand-text font-weight-light">Admin Module</span>
            </a>

            <!-- Sidebar -->
            <div class="sidebar">

                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <img src="<?= adminAsset() ?>/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
                    </div>
                    <div class="info">
                        <a href="#" class="d-block">Nama Admin</a>
                    </div>
                </div>

                <!-- Sidebar Menu -->
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar text-sm flex-column nav-flat" data-widget="treeview" role="menu" data-accordion="false">

                        <li class="nav-item">
                            <a href="<?= route_to('admin.test.index') ?>" class="nav-link <?= htmlActiveClass($module == 'dashboard') ?>">
                                <i class="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Test
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>
                <!-- /.sidebar-menu -->
            </div>
            <!-- /.sidebar -->
        </aside>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <?php
            $debugVar = $debugVar ?? false;
            if ($debugVar) {
                var_dump($this->data);
            }
            ?>
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <?= $this->renderSection('content-header') ?>
            </div>
            <!-- /.content-header -->
            <!-- Main content -->
            <div class="content">
                <?= $this->renderSection('content') ?>
            </div>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->

        <!-- Main Footer -->
        <footer class="main-footer">
            <!-- To the right -->
            <div class="float-right d-none d-sm-inline">

            </div>
            <!-- Default to the left -->
            <strong>Copyright &copy; 2020-<?= date('Y') ?> <a target="_blank" href="<?= site_url() ?>">Test Bro</a>.</strong>
        </footer>
    </div>
    <!-- ./wrapper -->

    <!-- REQUIRED SCRIPTS -->

    <!-- jQuery -->
    <script src="<?= adminAsset() ?>/plugins/jquery/jquery.js"></script>    

    <!-- Bootstrap 4 -->
    <script src="<?= adminAsset() ?>/plugins/bootstrap/js/bootstrap.bundle.js"></script>

    <!-- Moment -->
    <script src="<?= adminAsset() ?>/plugins/moment/moment-with-locales.min.js"></script>    

    <!-- Tempusdominus Bootstrap 4 -->
    <script src="<?= adminAsset() ?>/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>    

    <!-- SweetAlert2 -->
    <script src="<?= adminAsset() ?>/plugins/sweetalert2/sweetalert2.min.js"></script>
    <!-- Toastr -->
    <script src="<?= adminAsset() ?>/plugins/toastr/toastr.min.js"></script>    

    <!-- AdminLTE App -->
    <script src="<?= adminAsset() ?>/dist/js/adminlte.js"></script>

    <script src="<?= adminAsset() ?>/custom.js"></script>

    <!-- overlayScrollbars -->
    <script src="<?= adminAsset() ?>/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>

    <!-- Page-JS -->
    <?= $this->renderSection('page-js') ?>

</body>

</html>