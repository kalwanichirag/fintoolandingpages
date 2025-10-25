import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import commonEncode from "./commonEncode";
import Swal from "sweetalert2";
import axios from "axios";
import * as constClass from "./constants";
import { Buffer } from "buffer";
import { validate } from "react-email-validator";
import moment from "moment/moment";
import * as toastr from "toastr";
import "toastr/build/toastr.css";

export const base64ToBlob = (base64, mimeType) => {
  let byteCharacters = atob(base64.split(",")[1]);
  let byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    let slice = byteCharacters.slice(offset, offset + 1024);
    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: mimeType });
}

export const getDownActivityStateFromLS = (type) => {
  try {
    var r = localStorage.getItem("down-activity");
    if (r != null) {
      r = JSON.parse(r);
      return r.filter((v) => v.key == type)[0] ?? {};
    }
  } catch (e) {
    return {};
  }
};

export const issUnderMaintenance = async () => {
  try {
    let data = {

    };
    if (getUserId()) {
      data.user = '' + getUserId();
    }
    const r = await fetchData({
      data,
      method: 'post',
      url: constClass.DMF_DOWN_API_URL
    });
    // console.log('hello999---->', r.data);
    return r.data.filter((v) => Boolean(Number(v.active)));
  } catch (e) {
    throw e.toString();
  }
};

export const isFamilySelected = () => {
  return Boolean(localStorage.getItem("family"));
};
export const fetchMembers = async () => {
  try {
    const r = await fetchData({
      url: constClass.GET_MEMBER_LIST,
      data: {
        user_id: getParentUserId(),
        // is_direct:IS_DIRECT,// "0",
        is_direct: "1",
      },
      method: "post",
    });
    console.log('fetchMembers', r.data);
    return r.data;
  } catch (e) {
    Promise.reject(e);
  }
};

export const getPublicMediaURL = (path) => {
  const hosts = ['fintoo.in', 'fintoo.ae', 'fintoo.ai'];
  const isSpecificHost = hosts.some(host => window.location.host.includes(host));
  const baseURL = isSpecificHost ? process.env.NEXT_PUBLIC_STATIC_URL : process.env.PUBLIC_URL;
  const cleanedPath = path.split("/").filter(Boolean).join("/");
  return `${baseURL}/${cleanedPath}`;
};


export const getSchemeDataStorage = async () => {
  try {
    if (localStorage.getItem("getschemeData") == null) {
      let url = constClass.ADVISORY_GET_SCHEME_DATA;
      let getschemeData = await apiCall(url, "", true, false);
      if (getschemeData["error_code"] == "100") {
        console.log("getschemeData", getschemeData);
        localStorage.setItem('getschemeData', JSON.stringify(getschemeData));
        return getschemeData;
      } else {
        console.error(err);
      }
    } else {
      return JSON.parse(localStorage.getItem("getschemeData"));
    }
  } catch (err) {
    console.error(err);
  }
};

export const isUnderMaintenance = (details) => {
  let from = moment('10/14/2023 03:00'); // mm/dd/yyyy H:M 24hrs format
  let to = moment('10/15/2023 10:00');
  console.log('hehe', from.format('LLL'));
  if (details)
    return {
      isActive: moment().isBetween(from, to),
      from: from.format("LLLL"),
      to: to.format("LLLL"),
      html: (
        <p className="mb-0">
          Due to the scheduled maintenance activities on the BSE StAR MF
          Platform, you will not be able to perform any activity related to your
          MF investments on <strong>{from.format("Do MMMM YYYY, dddd")}</strong>{" "}
          from <strong>{from.format("h:mm a").toUpperCase()}</strong> to{" "}
          <strong>{to.format("h:mm a").toUpperCase()}.</strong>
        </p>
      ),
      string: `<p class="mb-0">Due to the scheduled maintenance activities on the BSE StAR MF Platform, you will not be able to perform any activity related to your MF investments on <strong>${from.format(
        "Do MMMM YYYY, dddd"
      )}</strong> from <strong>${from
        .format("h:mm a")
        .toUpperCase()}</strong> to <strong>${to
          .format("h:mm a")
          .toUpperCase()}.</strong></p>`,
    };
  else return moment().isBetween(from, to);
};
export const isValidEmail = (str) => {
  return validate(str);
};

export const apiCall = async (url, data = "", enc = true, checkSession = true) => {
  try {
    console.log("🌐 API CALL:", url);
    console.log("📦 Request Data:", data);

    let reqData = "";
    let respData = "";

    if (enc && data !== "") {
      try {
        reqData = commonEncode.encrypt(JSON.stringify(data));
      } catch (encErr) {
        console.warn("⚠️ Encryption failed, sending plain data:", encErr);
        reqData = data;
      }
    } else {
      reqData = data;
    }

    const req = {
      method: data !== "" ? "post" : "get",
      url: url,
      data: data !== "" ? reqData : undefined,
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios(req);

    console.log("✅ Raw Response:", response);

    if (enc === true && response?.data) {
      try {
        const decRespData = commonEncode.decrypt(response.data);
        respData = JSON.parse(decRespData);
      } catch (decErr) {
        console.warn("⚠️ Decryption failed, using raw data:", decErr);
        respData = response.data;
      }
    } else {
      respData = response.data;
    }

    console.log("✅ Final Response Data:", respData);
    return respData;
  } catch (err) {
    console.error("❌ API Error:", {
      message: err.message,
      url,
      data,
      response: err.response?.data,
      status: err.response?.status,
    });
    throw err; // critical: rethrow so outer catch gets it
  }
};
// export const apiCall = async (
//   url,
//   data = "",
//   enc = true,
//   checkSession = true
// ) => {
//   try {
//      console.log("API CALL:", url);
//     console.log(" Request Data:", data);
//     let reqData = "";
//     let respData = "";
//     let req = "";

//     // if (checkSession) {
//     //   if (!(await CheckSession())) {
//     //     return false;
//     //   }
//     // }

//     if (enc && data != "") {
//       reqData = commonEncode.encrypt(JSON.stringify(data));
//     } else {
//       reqData = data;
//     }
//     if (data != "") {
//       req = { method: "post", url: url, data: reqData };
//     } else {
//       req = { method: "get", url: url };
//     }

//     return new Promise(function (resolve, reject) {
//       axios(req)
//         .then((data) => {
//           if (enc == true) {
//             let decRespData = commonEncode.decrypt(data.data);
//             respData = JSON.parse(decRespData);
//           } else {
//             respData = data.data;
//           }
//           resolve(respData);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   } catch (err) {
//      console.error("❌ API Error:", err.response?.data || err.message || err);
//     return err;
//   }
// };

export const restApiCall = async (url, data = "", headers = "") => {
  try {
    let respData = "";
    let req = "";

    // let headers = Object.assign({}, headersList, {
    //   "Accept" : "*/*",
    //   "Content-Type" : "text/plain",
    // });

    if (data != "") {
      req = {
        method: "post",
        url: url,
        data: commonEncode.encrypt(JSON.stringify(data)),
      };
    } else {
      req = { method: "get", url: url };
    }

    return new Promise(function (resolve, reject) {
      axios(req)
        .then((data) => {
          let respData;
          try {
            respData = JSON.parse(commonEncode.decrypt(data.data));
            if (!respData) throw true;
          } catch (e) {
            try {
              respData = Object.assign({}, data.data);
              if (respData.data != "") {
                let decRespData = commonEncode.decrypt(respData.data);
                respData["data"] = JSON.parse(decRespData);
              }
            } catch (e) {
              respData = Object.assign({}, data.data);
            }
          }
          resolve(respData);
        })
        .catch((err) => {
          reject(err);
        });
    });
  } catch (err) {
    return err;
  }
};

export const getRestApiHeaders = async (
  gatewayName = "https://stg.minty.co.in"
) => {
  try {
    let encGateWayName = btoa(gatewayName);
    let url =
      constClass.GET_ACCESSTOKEN_API_URL + "?gatewayname=" + encGateWayName;
    let data = await apiCall(url);
    if (data["error_code"] == "100") {
      let ret_data = {
        gatewayname: gatewayName,
        gatewayauthtoken: data["data"]["token"],
      };
      return ret_data;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const VerifyToken = async () => {
  if (getParentUserId()) {
    let url = constClass.CHECK_SESSION;
    let data = { user_id: getParentUserId(), sky: getItemLocal("sky") };
    let respData = await apiCall(url, data, true, false);
    if (respData["error_code"] != "100") {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const CheckSession = async () => {
  if (getParentUserId()) {
    let url = constClass.CHECK_SESSION;
    let data = { user_id: getParentUserId(), sky: getItemLocal("sky") };
    let respData = await apiCall(url, data, true, false);
    if (respData["error_code"] != "100") {
      // loginRedirect();
      // // loginRedirectGuest();
      removeMemberId();
      removeUserId();
      localStorage.removeItem('sky');
      localStorage.setItem('redirectToThis', window.location.href);
      window.location.href = process.env.PUBLIC_URL + '/session-expired';
    }
  } else {
    removeMemberId();
    removeUserId();
    localStorage.removeItem("sky");
    localStorage.setItem("redirectToThis", window.location.href);
    loginRedirectGuest();
  }
  return <></>;
};

export const loginRedirect = () => {
  let tempParamItrPage = localStorage.getItem("itr-page");
  localStorage.clear();
  if (tempParamItrPage) {
    localStorage.setItem("itr-page", tempParamItrPage);
  }
  let curr_url = window.location.href.split("?");
  let redirect_uri = curr_url[0];
  let redirect_params = "";
  if (curr_url.length > 1) {
    redirect_params = curr_url[1];
  }
  let red_uri =
    constClass.LOGIN_PAGE +
    "?src=" +
    Buffer.from(commonEncode.encrypt("dmf")).toString("base64") +
    "&redirect_uri=" +
    Buffer.from(commonEncode.encrypt(redirect_uri)).toString("base64");
  if (curr_url.length > 1) {
    red_uri =
      red_uri +
      "&redirect_params=" +
      Buffer.from(commonEncode.encrypt(redirect_params)).toString("base64");
  }

  let redirectToThis = window.location.href;
  let checkAuth = window.location.href.split("auth");
  if (checkAuth.length > 1) {
    redirectToThis = checkAuth[0].substring(0, checkAuth[0].length - 1);
  }
  localStorage.setItem("redirectToThis", redirectToThis);

  window.location.replace(red_uri);
  return;
};

// export const loginRedirectGuest = (src = "dmf", url = "") => {
//   localStorage.removeItem("userid");
//   console.log("lastVisited: ", localStorage.getItem("lastVisited"));
//   let lastVisitedUrl = localStorage.getItem("lastVisited");
//   let t = url ? url : (lastVisitedUrl ? lastVisitedUrl : window.location.href);
//   if (window.location.pathname == "/") {
//     t = t + "web/commondashboard";
//   }
//   localStorage.setItem("redirectToThis", encodeURIComponent(t));

//   // var redirectURL =
//   //   window.location.origin +
//   //   process.env.PUBLIC_URL +
//   //   "/checkredirect";
//   var loginRegisterUrl = getLoginRegisterUrl();
//   var goTo =
//     loginRegisterUrl +
//     "?src=" +
//     Buffer.from(commonEncode.encrypt(src)).toString("base64");
//   // "&redirect_uri=" +
//   // Buffer.from(commonEncode.encrypt(redirectURL)).toString("base64");

//   let mainUrl = new URL(t);
//   console.log(mainUrl.searchParams.get("utm_source"));
//   if (mainUrl.searchParams.get("utm_source")) {
//     goTo = goTo + "&utm_source=" + mainUrl.searchParams.get("utm_source");
//   }
//   if (mainUrl.searchParams.get("utm_medium")) {
//     goTo = goTo + "&utm_medium=" + mainUrl.searchParams.get("utm_medium");
//   }
//   if (mainUrl.searchParams.get("utm_campaign")) {
//     goTo = goTo + "&utm_campaign=" + mainUrl.searchParams.get("utm_campaign");
//   }
//   if (mainUrl.searchParams.get("utm_campaign")) {
//     goTo = goTo + "&utm_campaign=" + mainUrl.searchParams.get("utm_campaign");
//   }
//   if (mainUrl.searchParams.get("tags")) {
//     goTo = goTo + "&tags=" + mainUrl.searchParams.get("tags");
//   }
//   if (mainUrl.searchParams.get("rm_id")) {
//     goTo = goTo + "&rm_id=" + mainUrl.searchParams.get("rm_id");
//   }
//   if (mainUrl.searchParams.get("utm_service")) {
//     goTo = goTo + "&utm_service=" + mainUrl.searchParams.get("utm_service");
//   }
//   // return;
//   // let redirectToThis = window.location.href;
//   // let checkAuth = window.location.href.split("auth");
//   // if (checkAuth.length > 1) {
//   //   redirectToThis = checkAuth[0].substring(0, checkAuth[0].length - 1).replace(/\/+$/, '');
//   // }
//   // localStorage.setItem("redirectToThis", redirectToThis);
//   window.location = goTo;
//   // return;
// };


export const loginRedirectGuest = (src = "dmf", url = "") => {

  localStorage.removeItem("userid");
  let t = url ? url : window.location.href;
  if (window.location.pathname == "/") {
    t = t + "web/commondashboard";
  }
  localStorage.setItem("redirectToThis", encodeURIComponent(t));

  // var redirectURL =
  //   window.location.origin +
  //   process.env.PUBLIC_URL +
  //   "/checkredirect";
  var loginRegisterUrl = getLoginRegisterUrl();
  var goTo =
    loginRegisterUrl +
    "?src=" +
    Buffer.from(commonEncode.encrypt(src)).toString("base64");
  // "&redirect_uri=" +
  // Buffer.from(commonEncode.encrypt(redirectURL)).toString("base64");

  let mainUrl = new URL(window.location.href);

  if (mainUrl.searchParams.get("utm_source")) {
    goTo = goTo + "&utm_source=" + mainUrl.searchParams.get("utm_source");
  }
  if (mainUrl.searchParams.get("utm_medium")) {
    goTo = goTo + "&utm_medium=" + mainUrl.searchParams.get("utm_medium");
  }
  if (mainUrl.searchParams.get("utm_campaign")) {
    goTo = goTo + "&utm_campaign=" + mainUrl.searchParams.get("utm_campaign");
  }
  if (mainUrl.searchParams.get("utm_campaign")) {
    goTo = goTo + "&utm_campaign=" + mainUrl.searchParams.get("utm_campaign");
  }
  if (mainUrl.searchParams.get("tags")) {
    goTo = goTo + "&tags=" + mainUrl.searchParams.get("tags");
  }
  if (mainUrl.searchParams.get("rm_id")) {
    goTo = goTo + "&rm_id=" + mainUrl.searchParams.get("rm_id");
  }
  if (mainUrl.searchParams.get("utm_service")) {
    goTo = goTo + "&utm_service=" + mainUrl.searchParams.get("utm_service");
  }
  // console.log('goto---->', goTo);
  // return;
  // let redirectToThis = window.location.href;
  // let checkAuth = window.location.href.split("auth");
  // if (checkAuth.length > 1) {
  //   redirectToThis = checkAuth[0].substring(0, checkAuth[0].length - 1).replace(/\/+$/, '');
  // }
  // localStorage.setItem("redirectToThis", redirectToThis);
  window.location = goTo;
  // return;
};

export const getLoginRegisterUrl = () => {
  let curUrl = window.location.href;
  if (curUrl.includes("income-tax-filing") || curUrl.includes("/itr-file") || curUrl.includes("/itr_2024")) {
    return constClass.REGISTER_PAGE;
  }
  return constClass.LOGIN_PAGE;
};

export const successAlert = (msg) => {
  Swal.fire({
    title: "",
    html: msg,
    icon: "success",
  });
};

export const errorAlert = (msg = "Something went wrong") => {
  Swal.fire({
    title: "",
    html: msg,
    icon: "error",
  });
};

export const formatPrice = (v) => {
  if (v < 0) {
    let val = Math.abs(v)
    switch (true) {
      case val / 10000000 >= 1:
        return "(" + indianRupeeFormat((val / 10000000).toFixed(2) * 1) + " Cr.)";
      case val / 100000 >= 1:
        return "(" + indianRupeeFormat((val / 100000).toFixed(2) * 1) + " L)";
      case val / 1000 >= 1:
        return "(" + indianRupeeFormat((val / 1000).toFixed(2) * 1) + " K)";
      default:
        return "(" + indianRupeeFormat(val) + ")";
    }
  }
  switch (true) {
    case v / 10000000 >= 1:
      return indianRupeeFormat((v / 10000000).toFixed(2) * 1) + " Cr.";
    case v / 100000 >= 1:
      return indianRupeeFormat((v / 100000).toFixed(2) * 1) + " L";
    case v / 1000 >= 1:
      return indianRupeeFormat((v / 1000).toFixed(2) * 1) + " K";
    default:
      return indianRupeeFormat(v);
  }
};

export const formatNegative = (v) => {
  v = v.replace("₹ ", "₹ (");
  switch (true) {
    case v.indexOf("Cr.") > -1:
      return v.replace("Cr.", ")Cr.");
    case v.indexOf("L") > -1:
      return v.replace("L", ")L");
    case v.indexOf("K") > -1:
      return v.replace("K", ")K");
    default:
      return v + ")";
  }
};

export const indianRupeeFormat = (v, decimal = null) => {
  const amount = typeof v === "string" ? parseFloat(v.replace(/,/g, "")) : v;
  var options = {
    style: "currency",
    currency: "INR",
  };
  if (decimal != null) {
    options.maximumFractionDigits = decimal;
  }
  var s = amount.toLocaleString("en-IN", options);
  return s.replace("₹", "₹ ");
};

export const numberFormat = (v, decimal = null) => {
  var options = {
    style: "currency",
    currency: "INR",
  };
  if (decimal != null) {
    options.maximumFractionDigits = decimal;
  }
  var s = Number(v).toLocaleString("en-IN", options);
  return s.replace("₹", "");
};

export const getNumberWithOrdinal = (n) => {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const getCartDetails = async () => {
  try {
    let payload = {
      data: { user_id: getUserId() },
      method: "post",
      url: constClass.GET_CART_DETAILS,
    };
    //
    let r = await fetchEncryptData(payload);
    return r.data;
  } catch (err) {
    throw err;
  }
};
export const updateCartCount = async () => {
  try {
    if (getItemLocal("family")) {
      var new_array = [];
      var new_data = getItemLocal("member");
      new_data.forEach((element) => {
        new_array.push(element.id);
      });
    }
    var user = getUserId();
    if (user == null) return;

    var data = commonEncode.encrypt(
      JSON.stringify({
        user_id: getItemLocal("family") ? new_array : getUserId(),
      })
    );

    var config = {
      method: "post",
      url: constClass.DMF_BASE_URL + "api/cart/getcartfunds",
      data: data,
    };
    console.log(config, "mapdata");
    var res = await axios(config);
    var response = commonEncode.decrypt(res.data);
    const cartdStr = JSON.parse(response)["data"];
    // dispatch({ type: "UPDATE_CART_COUNT", payload:  });
    return cartdStr.length;
  } catch (e) {
    return 0;
  }
};

export const fetchEncryptData = async (req) => {
  req.data = commonEncode.encrypt(JSON.stringify(req.data));
  try {
    const data = await axios(req);
    var dr = commonEncode.decrypt(data.data);
    var res = JSON.parse(dr);
    return res;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

export const fetchData = async (req) => {
  try {
    const data = await axios(req);
    return data.data;
  } catch (err) {
    throw err;
  }
};

export const FV = (rate, nper, pmt, pv, type) => {
  var pow = Math.pow(1 + rate, nper),
    fv;
  if (rate) {
    fv = (pmt * (1 + rate * type) * (1 - pow)) / rate - pv * pow;
  } else {
    fv = -1 * (pv + pmt * nper);
  }
  return fv.toFixed(2);
};

export const getSumOfProperty = (Arr, property) => {
  let sum = 0;
  for (let i of Arr) {
    sum += 1 * i[property];
  }
  return sum;
};

export const memberId = () => {
  if (localStorage.getItem("newmember") == null) {
    return getUserId();
  } else {
    return localStorage.getItem("newmember");
  }
};

export const setItemLocal = (property, value, enc = true) => {
  try {
    if (enc) {
      localStorage.setItem(
        property,
        commonEncode.encrypt(JSON.stringify(value))
      );
    } else {
      localStorage.setItem(property, JSON.stringify(value));
    }
  } catch (err) {
    return false;
  }
};

export const getItemLocal = (property) => {
  let val;
  try {
    try {
      val = JSON.parse(commonEncode.decrypt(localStorage.getItem(property)));
    } catch {
      val = commonEncode.decrypt(localStorage.getItem(property));
    }
  } catch {
    val = JSON.parse(localStorage.getItem(property));
  }

  if (typeof val == "number") {
    val = String(val);
  }

  return val;
};

export const getUserId = () => {
  if (getMemberId() == null) {
    return getParentUserId();
  } else {
    return getMemberId();
  }
};

export const getMinorUserId = () => {
  if (localStorage.getItem("klmclNXd") == null) {
    return null;
  } else {
    return commonEncode.decrypt(localStorage.getItem("klmclNXd"));
  }
};

export const setMinorUserId = (v) => {
  localStorage.setItem("klmclNXd", commonEncode.encrypt("" + v));
};


export const setUserId = (v) => {
  localStorage.setItem("dXNlcmlk", commonEncode.encrypt("" + v));
};
export const removeUserId = (v) => {
  localStorage.removeItem("dXNlcmlk");
};
export const getParentUserId = () => {
  if (localStorage.getItem("dXNlcmlk") == null) {
    return null;
  } else {
    return commonEncode.decrypt(localStorage.getItem("dXNlcmlk"));
  }
};

export const getParentUserDetails = () => {
  let allmember = JSON.parse(commonEncode.decrypt(localStorage.getItem("member")));
  const parent = allmember.filter((v) => v.id == getParentUserId());
  return parent[0];
};

export const getFpLogId = async () => {
  var data = commonEncode.encrypt(JSON.stringify({ user_id: getParentUserId() }));
  var config = {
    method: "post",
    url: constClass.ADVISORY_GET_FP_LOG,
    data: data,
  };
  var res = await axios(config);
  if (res.data["error_code"] == "100") {
    return res?.data?.data?.fp_log_id ? res.data.data.fp_log_id : "";
  } else {
    return "";
  }
};

export const getParentFpLogId = () => {
  if (localStorage.getItem("ZnBsb2dpZA==") == null) {
    return null;
  } else {
    return commonEncode.decrypt(localStorage.getItem("ZnBsb2dpZA=="));
  }
};

export const setFplogid = (v) => {
  localStorage.setItem("ZnBsb2dpZA==", commonEncode.encrypt("" + v));
};

export const setMemberId = (v) => {
  localStorage.setItem("bWVtYmVySWQ=", commonEncode.encrypt("" + v));
};
export const getMemberId = () => {
  if (localStorage.getItem("bWVtYmVySWQ=") == null) {
    return null;
  } else {
    return commonEncode.decrypt(localStorage.getItem("bWVtYmVySWQ="));
  }
};
export const removeMemberId = (v) => {
  localStorage.removeItem("bWVtYmVySWQ=");
};

export const getFpUserDetailId = () => {
  if (localStorage.getItem("ZnBfdXNlcl9kZXRhaWxzX2lk=") == null) {
    return null;
  } else {
    return commonEncode.decrypt(
      localStorage.getItem("ZnBfdXNlcl9kZXRhaWxzX2lk=")
    );
  }
};

export const setFpUserDetailsId = (v) => {
  localStorage.setItem(
    "ZnBfdXNlcl9kZXRhaWxzX2lk=",
    commonEncode.encrypt("" + v)
  );
};
export const getFpUserDetailsId = () => {
  if (localStorage.getItem("ZnBfdXNlcl9kZXRhaWxzX2lk=") == null) {
    return null;
  } else {
    return commonEncode.decrypt(
      localStorage.getItem("ZnBfdXNlcl9kZXRhaWxzX2lk=")
    );
  }
};
export const removeFpUserDetailsId = (v) => {
  localStorage.removeItem("ZnBfdXNlcl9kZXRhaWxzX2lk=");
};

export const fetchUserData = async (alldata = false) => {
  try {
    var user = getUserId();
    if (user == null) return;

    var data = commonEncode.encrypt(JSON.stringify({ user_id: getUserId() }));
    var config = {
      method: "post",
      url: constClass.DMF_DATAGATHERING_API_URL,
      data: data,
    };
    var res = await axios(config);
    var response = commonEncode.decrypt(res.data);

    const mainData = JSON.parse(response)["data"];
    return alldata ? mainData : mainData.pan;
    // dispatch({ type: "UPDATE_CART_COUNT", payload:  });
  } catch (e) {
    return e;
  }
};

export const addSuffix = (i) => {
  var a = i % 10,
    b = i % 100;

  if (a == 1 && b != 11) {
    return "st";
  } else if (a == 2 && b != 12) {
    return "nd";
  } else if (a == 3 && b != 13) {
    return "rd";
  } else {
    return "th";
  }
};

export const defaultamclogo = () => {
  return `${process.env.PUBLIC_URL}/static/media/companyicons/amc_icon.png`;
};

export const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

export const getProfilePercentage = async (v) => {
  if (!v.pan && (v.is_minor === undefined || v.is_minor === 'N')) {
    return 0;
  }
  try {
    const payload = {
      method: "post",
      data: {
        pan: v.pan,
        user_id: getUserId(),
        is_minor:v.is_minor
        
      },
      url: constClass.DMF_GET_USER_PROFILE_STATE_URL,
    };
    const r = await fetchEncryptData(payload);
    console.log("sssss9999", r);
    setItemLocal("profile", r);
    if (r.error_code == 100) {
      return Number(r.data.profile_status);
    } else {
      return 0;
    }
  } catch (e) {
    throw "Something went wrong";
  }
};

export const getProfileStatusData = async (v) => {
  if (Boolean(v.pan) == false) {
    return 0;
  }
  try {
    const payload = {
      method: "post",
      data: {
        pan: v.pan,
        user_id: getUserId(),
        is_minor:v.is_minor
      },
      url: constClass.DMF_GET_USER_PROFILE_STATE_URL,
    };
    const r = await fetchEncryptData(payload);
    setItemLocal("profile", r);
    if (Number(r.error_code) === 100) {
      return r.data;
    }
  } catch (e) {
    throw "Something went wrong";
  }
};

export const getCurrentUserDetails = async () => {
  try {
    const payload = {
      url: constClass.DMF_GETUSERDETAILS_API_URL,
      data: {
        user_id: getUserId(),
      },
      method: "post",
    };
    const r = await fetchData(payload);
    return r.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const removeSlash = (str) => {
  while (str.substr(-1) === "/") {
    str = str.substr(0, str.length - 1);
  }
  return str;
};

export const rsFilter = (input) => {
  if (!isNaN(input)) {
    var is_negative = false;
    var result = 0;

    var result = Math.floor(input).toString();

    if (result.indexOf("-") !== -1) {
      result = result.replace("-", "");
      is_negative = true;
    }
    var lastThree = result.substring(result.length - 3);

    var otherNumbers = result.substring(0, result.length - 3);

    if (otherNumbers != "") lastThree = "," + lastThree;
    var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    if (is_negative == true) {
      output = "-" + output;
    }

    return output;
  }
};

export const makePositive = (input) => {
  return Math.abs(input);
};

export const getSubtracion = (val1, val2) => {
  var total = 0;
  total = parseFloat(val1 - val2);
  return total;
};

export const toPascalCase = (str) => {
  return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

export const toTitleCase = (str) => {
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export const generateSortFn = (props) => {
  return function (a, b) {
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      var name = prop.name;
      var reverse = prop.reverse;
      if (a[name] < b[name]) return reverse ? 1 : -1;
      if (a[name] > b[name]) return reverse ? -1 : 1;
    }
    return 0;
  };
};

export const bytesToMegabytes = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(2);
};

export const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const fv = (rate, nper, pmt, pv) => {
  nper = parseFloat(nper);
  pmt = parseFloat(-pmt);
  pv = parseFloat(-pv);
  rate = parseFloat(rate) / 100;
  if (rate == 0) {
    // Interest rate is 0
    var fv_value = -(pv + pmt * nper);
  } else {
    var x = Math.pow(1 + rate, nper);
    var fv_value = -(-pmt + x * pmt + rate * x * pv) / rate;
  }
  return fv_value;
};

export const dateDiff = (date) => {
  date = date.split("/");
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const yy = parseInt(date[2]);
  const mm = parseInt(date[1]);
  const dd = parseInt(date[0]);

  let years, months, days;

  // months
  months = mm - month;
  if (day > dd) {
    months = months - 1;
  }

  // years
  years = yy - year;
  if (mm * 100 + dd < month * 100 + day) {
    years = years - 1;
    months = months + 12;
  }

  // days
  days = Math.floor(
    new Date(year + years, month + months - 1, day).getTime() /
    (24 * 60 * 60 * 1000) -
    today.getTime()
  );

  months = months + years * 12;

  return months;
};

export const PMT = (ir, np, pv, fv, type) => {
  if (np != "") {
    np = dateDiff(np);
    np = np + 1;
    if (np == 1) {
      np = 2;
    }
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0) return (pv + fv) / np;

    pvif = Math.pow(1 + ir, np);
    pmt = (-ir * pv * (pvif + fv)) / (pvif - 1);

    if (type === 1) pmt /= 1 + ir;

    return parseFloat(-pmt.toFixed(2)) == Infinity
      ? 0
      : parseFloat(-pmt.toFixed(2));
  }
};

export const calculateEMI = (principal, interestRate, loanTenureInMonths) => {
  const monthlyInterestRate = interestRate / (12 * 100);
  const emi =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, loanTenureInMonths)) /
    (Math.pow(1 + monthlyInterestRate, loanTenureInMonths) - 1);
  return emi;
};

export const setBackgroundDivImage = () => {
  var background_div = document.getElementsByClassName("background-div")[0];
  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  let imageUrl = `${baseUrl}web/static/media/Report/back.svg`;

  if (window.location.hostname === "localhost") {  
    // background_div.style.background =
    //   'url("https://www.fintoo.in/image/?frontend=1&file=https://www.fintoo.in/web/static/media/Report/back.svg")' +
    //   "no-repeat left bottom";

    background_div.style.background = `url("https://www.fintoo.in/image/?frontend=1&file=${imageUrl}") no-repeat left bottom`;
  } else {

    background_div.style.background = `url("/image/?frontend=1&file=${imageUrl}") no-repeat left bottom`;
    // background_div.style.background =
    //   'url("/image/?frontend=1&file=https://stg.minty.co.in/web/static/media/Report/back.svg")  no-repeat left bottom';

  }
  background_div.style.backgroundSize = "cover";
};

// export const setBackgroundDivImage = () => {
//   var background_div = document.getElementsByClassName("background-div")[0];
//   console.log("Background divs: ", background_div);

//   if (window.location.hostname === "localhost"){
//       console.log("local:");
//       background_div.style.background =
//        'url("http://127.0.0.1:8000/image/?frontend=1&file=http://localhost:3001/web/static/media/Report/back.svg")' +
//        "no-repeat left bottom";
//   }else{
//       background_div.style.background =
//        'url("/image/?frontend=1&file=https://stg.minty.co.in/web/static/media/Report/back.svg")  no-repeat left bottom';

//   }
//   background_div.style.backgroundSize = 'cover';
// }

export const goalFilter = (goals, maturityDate) => {
  const parseDate = (str) => {
    if (str) {
      var d = new Date(str.split("/").reverse().join("/"));

      return d;
    }
  };
  const datediff = (first, second) => {
    if (first && second) {
      return Math.ceil(
        (second.getTime() - first.getTime()) / 1000 / 60 / 60 / 24
      );
    }
  };

  var filteredGoals = goals.filter((goal) => {
    if (goal.goal_isRecurring == "0") {
      if (maturityDate) {
        if (datediff(parseDate(maturityDate), parseDate(goal.goal_end_date)) >= 0) {
          return true;
        }
      }
    } else {
      if (maturityDate) {
        if (datediff(parseDate(maturityDate), parseDate(goal.goal_start_date)) >= 0) {
          return true;
        }
      }
    }
  });
  return filteredGoals;
};

export const insuranceGoalFilter = (goals, c_years, payment_start_date) => {
  console.log("goals,c_years, payment_start_date", goals, payment_start_date);
  const parseDate = (str) => {
    if (str) {
      var d = new Date(str.split("/").reverse().join("/"));
      return d;
    }
  };

  const datediff = (first, second) => {
    if (first && second) {
      return Math.ceil(
        (second.getTime() - first.getTime()) / 1000 / 60 / 60 / 24
      );
    }
  };
  if (c_years != undefined && c_years != "") {
    var dateStr = payment_start_date;
    var parts = dateStr.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;
    var year = parseInt(parts[2], 10);
    var date = new Date(year, month, day);
    date.setFullYear(date.getFullYear() + parseInt(c_years));
    var c_date =
      date.getDate() +
      1 +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear();
    if (c_date != undefined) {
      var filteredGoals = goals.filter((goal) => {
        if (datediff(parseDate(c_date), parseDate(goal.goal_end_date)) >= 0) {
          return true;
        }
      });
    }
    return filteredGoals;
  }
};
export const maskBankAccNo = (str, mask = "X", n = 4) => {
  return ("" + str).slice(0, -n).replace(/./g, mask) + ("" + str).slice(-n);
};

export const getprofilestatus = async (session_data) => {
  try {
    let api_data = {
      user_id: session_data["data"]["id"],
      fp_log_id: session_data["data"]["fp_log_id"],
      web: 1,
    };
    var payload_data = commonEncode.encrypt(JSON.stringify(api_data));
    var res = await apiCall(
      constClass.ADVISORY_CHECK_PROFILE_STATUS_API_URL,
      payload_data,
      false,
      false
    );
    let decoded_res = JSON.parse(commonEncode.decrypt(res));
    if (decoded_res["error_code"] == "100") {
      const profile_completed_mapping = {
        17: 117.496,
        50: 70.4973,
        67: 46.9982,
        83: 23.4991,
        100: 0,
      };

      const profile_completed =
        decoded_res["data"][13]["profile_completed"] === 66
          ? 67
          : decoded_res["data"][13]["profile_completed"];
      const sectionIdsToCheck = [1, 3, 5, 6, 7, 8];
      const allConditionsMet = sectionIdsToCheck.every((sectionId) => {
        const matchingEntry = decoded_res["data"].find(
          (entry) => entry.section_id === sectionId
        );
        return matchingEntry && matchingEntry.total > 0;
      });

      const sectionIdsToCheckk = [1, 3];
      const allConditionsMett = sectionIdsToCheckk.every((sectionId) => {
        const matchingEntryy = decoded_res["data"].find(
          (entry) => entry.section_id === sectionId
        );
        return matchingEntryy && matchingEntryy.total > 0;
      });

      let newNumber;
      if (allConditionsMet) {
        newNumber = "1";
      } else {
        newNumber = "0";
      }

      let newNumberr;
      if (allConditionsMett) {
        newNumberr = "1";
      } else {
        newNumberr = "0";
      }
      const sectionTextMap = {
        1: "About You",
        3: "About You",
        5: "Goals",
        6: "Income & Expenses",
        7: "Income & Expenses",
        8: "Assets & Liabilities",
      };

      const filteredData = decoded_res["data"].filter((item) =>
        [1, 3, 5, 6, 7, 8].includes(item.section_id)
      );

      const sectionsWithTotalZeroTextArray = filteredData
        .filter((item) => item.total === 0)
        .map((item) => sectionTextMap[item.section_id]);

      const uniqueSectionsWithTotalZeroTextArray = [
        ...new Set(sectionsWithTotalZeroTextArray),
      ];
      const sectionsWithTotalZeroText =
        uniqueSectionsWithTotalZeroTextArray.join(", ");

      if (
        uniqueSectionsWithTotalZeroTextArray.includes("About You") &&
        uniqueSectionsWithTotalZeroTextArray.includes("Income & Expenses") &&
        uniqueSectionsWithTotalZeroTextArray.includes("Assets & Liabilities")
      ) {
        toastr.options.positionClass = 'toast-bottom-left';
        toastr.error('In About You section "Your Info" is Mandatory');

        // window.location.href=process.env.PUBLIC_URL + "/datagathering/about-you?"
      } else if (
        uniqueSectionsWithTotalZeroTextArray.includes("Income & Expenses") &&
        uniqueSectionsWithTotalZeroTextArray.includes("Assets & Liabilities")
      ) {
        window.location.href =
          process.env.PUBLIC_URL + "/datagathering/income-expenses";
      } else if (
        uniqueSectionsWithTotalZeroTextArray.includes("Income & Expenses")
      ) {
        window.location.href =
          process.env.PUBLIC_URL + "/datagathering/income-expenses";
      } else if (
        uniqueSectionsWithTotalZeroTextArray.includes("Assets & Liabilities")
      ) {
        toastr.options.positionClass = "toast-bottom-left";
        toastr.error("In Assets & Liabilities section Assets is incomplete");
      } else if (uniqueSectionsWithTotalZeroTextArray.includes("About You")) {
        toastr.options.positionClass = "toast-bottom-left";
        toastr.error('In About You section "Your Info" is Mandatory');
      }
    }
  } catch (e) {
    console.error("eeee---->", e);
  }
};

export const alphanumeric_custom = (val) => {
  // "Special characters not allowed"
  if (/^[^-\s][a-zA-Z0-9_\s-&+-\[\]$%]+$/.test(val)) {
    return true;
  }
  return false;
};

export const customspacing = (val) => {
  // "No white spaces are allowed at beginning/end"
  if (/^[a-zA-Z0-9_()_&.\/,-]+( +[a-zA-Z0-9_()_.&\/,-]+)*$/.test(val)) {
    return true;
  }
  return false;
};

export const special_start = (val) => {
  // "Special characters not allowed"
  if (/^[a-zA-Z0-9\s]+(?:[-:%#&@/\\()\u2122.+][a-zA-Z0-9\s]+)*$/.test(val)) {
    return true;
  }
  return false;
};

export const createCookie = (name, value, minutes) => {
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else {
    var expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
};

export const getCookieData = (name) => {
  var pairs = document.cookie.split("; "),
    count = pairs.length,
    parts;
  while (count--) {
    parts = pairs[count].split("=");
    if (parts[0] === name) return parts[1];
  }
  return false;
};

export const deleteCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const getStarRatingValue = (rating, position) => {
  return Number(rating) >= position ?
    'FULL' :
    Number(rating) >= (position - 0.5)
      ? 'HALF'
      : null
}
