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
