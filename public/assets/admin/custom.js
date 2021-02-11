function initTinymce(selector, height) {
  var defaultHeight = height || 400;

  function elfinderDialog(cb, value, meta) {
    function closeModal(modal) {
      modal.modal("hide");
      modal.remove();
    }

    var modal = $("<div/>");
    var dialog = $("<div/>");
    modal.append(dialog);
    modal.modal();

    var dfinder = dialog.dialogelfinder({
      url: ELFINDER_URL,
      soundPath: ADMIN_ASSETS + "/elfinder/sounds/",
      width: 840,
      height: 450,
      destroyOnClose: true,
      getFileCallback: function (file, fm) {
        //context.invoke("editor.insertImage", fm.convAbsUrl(file.url));

        cb(fm.convAbsUrl(file.url), { alt: file.name });
        closeModal(modal);
      },
      commandsOptions: {
        getfile: {
          oncomplete: "close",
          folders: false,
        },
      },
    });
    dfinder.dialogelfinder("instance").one("destroy", function () {
      closeModal(modal);
    });
  }

  tinymce.init({
    selector: selector,
    setup: function (editor) {
      editor.on("change", function () {
        editor.save();
      });
    },
    height: defaultHeight,
    plugins:
      "codemirror preview paste importcss searchreplace  directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools charmap",
    //extended_valid_elements: "+iframe[src|width|height|name|align|class]",
    toolbar1:
      "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap | fullscreen  preview code",
    toolbar2: "table | insertfile image media link codesample | ltr rtl",

    media_poster: false,
    media_alt_source: false,

    force_br_newlines: false,
    force_p_newlines: false,
    forced_root_block: "",
    visualblocks_default_state: true,
    contextmenu: 'image table',

    imagetools_toolbar: "rotateleft rotateright | flipv fliph | imageoptions",
    content_css: ADMIN_ASSETS + "/tinymce/plugins/bootstrap/css/bootstrap.css",

    codemirror: {
      path: ADMIN_ASSETS + "/tinymce/plugins/codemirror/codemirror-4.8",
      config: {
        indentOnInit: true,
        theme: "tomorrow-night-eighties",
        lineWrapping: false,
      },
      cssFiles: ["theme/tomorrow-night-eighties.css"],
      jsFiles: [],
    },

    file_picker_types: "image",
    relative_urls: false,
    remove_script_host: false,
    convert_urls: true,
    file_picker_callback: function (cb, value, meta) {
      elfinderDialog(cb, value, meta);
    },
  });
}

function initSummerNote(selector, height) {
  var defaultHeight = height || 400;

  return $(selector).summernote({
    height: defaultHeight,
    tooltip: false,
    disableDragAndDrop: true,
    codeviewFilter: false,
    codeviewIframeFilter: true,
    codemirror: {
      theme: "monokai",
    },
    callbacks: {
      onImageUpload: function (files) {},
    },
    toolbar: [
      ["style", ["style"]],
      ["font", ["bold", "underline", "clear"]],
      ["fontname", ["fontname"]],
      ["color", ["color"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["table", ["table"]],
      ["insert", ["link", "elfinder", "video"]],
      ["view", ["fullscreen", "codeview"]],
    ],
  });
}

var ELFINDER = (function ($) {
  if (typeof $ === "undefined") {
    throw new TypeError("SERVER's JavaScript requires jQuery!");
  }

  var Elfinder = {};

  Elfinder.openElfinderDialog = function (callback) {
    var modal = $("<div/>");
    var dialog = $("<div/>");
    modal.append(dialog);
    modal.modal();
    var fm = dialog.dialogelfinder({
      url: ELFINDER_URL,
      soundPath: ADMIN_ASSETS + "/elfinder/sounds/",
      destroyOnClose: true,
      getFileCallback: function (file, fm) {
        callback(file, fm);

        modal.modal("hide");
        modal.remove();
      },
      commandsOptions: {
        getfile: {
          oncomplete: "close",
          folders: false,
        },
      },
    });
    fm.dialogelfinder("instance").one("destroy", function () {
      modal.modal("hide");
      modal.remove();
    });
  };

  return Elfinder;
})($);

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  showDuration: "200",
  hideDuration: "1000",
  timeOut: "1000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

var HELPER = (function ($) {
  if (typeof $ === "undefined") {
    throw new TypeError("HELPER's JavaScript requires jQuery !");
  }

  var helper = {};

  var Confirm = (function () {
    var confirm = {};

    var swalConfirm = function (config, callback) {
      var optDefault = {
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        buttonsStyling: true,
        showCloseButton: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: function () {
          var promise = new Promise(function (myResolve, myReject) {
            callback();
          });
          return promise;
        },
      };

      let option = $.extend(optDefault, config);
      Swal.fire(option);
    };

    confirm.deletePost = function (url, params, callback) {
      var optDefault = {
        title: "Hapus Data",
        text: "Anda yakin ingin menghapus data ini ?",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        customClass: {
          confirmButton: "bg-danger",
          cancelButton: "bg-secondary",
        },
      };

      swalConfirm(optDefault, function () {
        var doneCb = function (data, textStatus, jqXHR) {
          var response = jqXHR.responseJSON || {};
          HELPER.Notify.success(response.message, callback);
        };

        var failCb = function (jqXHR, textStatus, errorThrown) {
          HELPER.Notify.fail(jqXHR, callback);
        };
        SERVER.post(url, params, "json", doneCb, failCb);
      });
    };

    confirm.swalPostYesNo = function (url, params, callback, config) {
      let configParam = config || {};
      var optDefault = {
        title: "Konfirmasi",
        text: "Anda yakin melakukan ini ?",
        confirmButtonText: "Iya",
        cancelButtonText: "Tidak",
        customClass: {
          confirmButton: "bg-primary",
          cancelButton: "bg-secondary",
        },
      };
      let option = $.extend(optDefault, configParam);

      swalConfirm(option, function () {
        var doneCb = function (data, textStatus, jqXHR) {
          var response = jqXHR.responseJSON || {};
          HELPER.Notify.success(response.message, callback);
        };

        var failCb = function (jqXHR, textStatus, errorThrown) {
          HELPER.Notify.fail(jqXHR, callback);
        };
        SERVER.post(url, params, "json", doneCb, failCb);
      });
    };

    return confirm;
  })();

  var Notify = (function () {
    var notify = {};

    function notif(type, message, callback, title) {
      var callbackDefault = function () {
        console.log("notify callback!");
      };

      if (helper.isset(callback)) {
        callbackDefault = callback;
      }

      var swal = null;
      switch (type) {
        case "info":
          toastr.info(message, "Info");
          break;

        case "warning":
          toastr.warning(message, "Peringatan");
          break;

        case "success":
          swal = Swal.fire({
            icon: "success",
            title: title || "Success",
            html: message,
            allowOutsideClick: false,
            customClass: {
              content: "text-success",
            },
          });
          break;

        case "error":
          swal = Swal.fire({
            icon: "error",
            title: title || "Error",
            html: message,
            allowOutsideClick: false,
            customClass: {
              content: "text-danger",
            },
          });
          break;

        default:
          swal = Swal.fire({
            icon: "error",
            title: "Undefined",
            html: "Error tidak diketahui!",
            allowOutsideClick: false,
            customClass: {
              content: "text-danger",
            },
          });
      }

      if (HELPER.isset(swal)) {
        swal.then(function (result) {
          callbackDefault();
        });
      }

      toastr.subscribe(function () {
        callbackDefault();
      });
    }

    notify.success = function (message, callback, title) {
      notif("success", message, callback, title);
    };

    notify.error = function (message, callback, title) {
      notif("error", message, callback, title);
    };

    notify.warning = function (message, callback) {
      notif("warning", message, callback);
    };

    notify.info = function (message, callback) {
      notif("info", message, callback);
    };

    notify.fail = function notifFail(jqXHR, callback) {
      var response = jqXHR.responseJSON || {};

      var titleMessage = HELPER.isset(response.message)
        ? response.message
        : jqXHR.status;
      var content = "";
      if (HELPER.isset(response.data)) {
        var data = HELPER.isset(response.data) ? response.data : null;
        if (HELPER.isset(data)) {
          var errors = HELPER.isset(data.errors) ? data.errors : [];
          for (const prop in errors) {
            var value = errors[prop];
            content += "<div> -" + value + "</div>";
          }
        }
      } else {
        content = jqXHR.status + " - " + jqXHR.statusText;
      }

      notify.error(content, callback, titleMessage);
    };

    return notify;
  })();

  var Html = (function () {
    var html = {};

    html.loading = function (state) {
      if (state === null || state === undefined || state === true) {
        $("#spinner-front, #spinner-back").addClass("show");
      } else {
        $("#spinner-front, #spinner-back").removeClass("show");
      }
    };

    return html;
  })();

  helper.isset = function (param) {
    return !(param === null || param === undefined);
  };

  helper.Notify = Notify;
  helper.Confirm = Confirm;
  helper.Html = Html;
  return helper;
})($);

var SERVER = (function ($) {
  if (typeof $ === "undefined") {
    throw new TypeError("SERVER's JavaScript requires jQuery!");
  }

  var server = {};

  var ajax = function (method, url, params, dataType, doneCb, failCb) {
    var defaultDataType = "json";

    if (HELPER.isset(dataType)) {
      defaultDataType = dataType;
    }

    var jqHr = $.ajax({
      url: url,
      type: method,
      data: params,
      dataType: defaultDataType,
      cache: false,
      contentType: false,
      processData: false,
    });
    jqHr.done(doneCb);
    jqHr.fail(failCb);
  };

  var renewCsrfForm = function (response) {
    var token = response.token || {};

    var tokenName = token.name;
    var tokenKey = token.key;
    $("input[name=" + tokenName + "]").val(tokenKey);

    console.log("Renew token key: " + tokenKey);
  };

  server.post = function (url, params, dataType, doneCb, failCb) {
    var defaultDone = function (data, textStatus, jqXHR) {
      HELPER.Html.loading(false);

      var response = jqXHR.responseJSON || {};
      renewCsrfForm(response);

      console.log("Done: ");
      console.log(response);

      if (HELPER.isset(doneCb)) {
        doneCb(data, textStatus, jqXHR);
      } else {
        HELPER.Notify.success(response.message);
      }
    };

    var defaultFail = function (jqXHR, textStatus, errorThrown) {
      HELPER.Html.loading(false);

      var response = jqXHR.responseJSON || {};
      console.log("Fail: ");
      console.log(response);

      renewCsrfForm(response);

      if (HELPER.isset(failCb)) {
        failCb(jqXHR, textStatus, errorThrown);
      } else {
        HELPER.Notify.fail(jqXHR);
      }
    };

    var defaultDataType = "json";

    if (HELPER.isset(dataType)) {
      defaultDataType = dataType;
    }

    var jqHr = $.ajax({
      url: url,
      type: "POST",
      data: params,
      dataType: defaultDataType,
      cache: false,
      contentType: false,
      processData: false,
    });
    jqHr.done(defaultDone);
    jqHr.fail(defaultFail);
  };

  server.get = function (url, params, dataType, doneCb, failCb) {
    var defaultDone = function (data, textStatus, jqXHR) {
      HELPER.Html.loading(false);

      var response = jqXHR.responseJSON || {};
      if (HELPER.isset(doneCb)) {
        doneCb(data, textStatus, jqXHR);
      } else {
        HELPER.Notify.success(response.message);
      }
    };

    var defaultFail = function (jqXHR, textStatus, errorThrown) {
      HELPER.Html.loading(false);

      var response = jqXHR.responseJSON || {};
      console.log("Fail: ");
      console.log(response);

      if (HELPER.isset(failCb)) {
        failCb(jqXHR, textStatus, errorThrown);
      } else {
        HELPER.Notify.fail(jqXHR);
      }
    };

    var defaultDataType = "json";

    if (HELPER.isset(dataType)) {
      defaultDataType = dataType;
    }

    var jqHr = $.ajax({
      url: url,
      type: "GET",
      data: params,
      dataType: defaultDataType,
      cache: false,
    });
    jqHr.done(defaultDone);
    jqHr.fail(defaultFail);
  };

  return server;
})($);
