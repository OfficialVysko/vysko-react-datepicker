"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./style.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var DatePicker = function DatePicker(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    theme = _ref.theme,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? theme == "dark" ? "#6988d6" : "#284387" : _ref$color,
    placeholder = _ref.placeholder,
    required = _ref.required,
    disabled = _ref.disabled,
    minDate = _ref.minDate,
    maxDate = _ref.maxDate,
    dateFormat = _ref.dateFormat,
    inputName = _ref.inputName,
    _ref$locale = _ref.locale,
    locale = _ref$locale === void 0 ? "en" : _ref$locale,
    customLocale = _ref.customLocale,
    onClose = _ref.onClose,
    onOpen = _ref.onOpen,
    onYearChange = _ref.onYearChange,
    onMonthChange = _ref.onMonthChange,
    _ref$highlightToday = _ref.highlightToday,
    highlightToday = _ref$highlightToday === void 0 ? true : _ref$highlightToday,
    className = _ref.className,
    inputClassName = _ref.inputClassName,
    pickerClassName = _ref.pickerClassName,
    isOpen = _ref.isOpen,
    _ref$disabledDates = _ref.disabledDates,
    disabledDates = _ref$disabledDates === void 0 ? [] : _ref$disabledDates;
  var today = new Date();
  var _useState = (0, _react.useState)(today.getFullYear()),
    _useState2 = _slicedToArray(_useState, 2),
    year = _useState2[0],
    setYear = _useState2[1];
  var _useState3 = (0, _react.useState)(today.getMonth()),
    _useState4 = _slicedToArray(_useState3, 2),
    month = _useState4[0],
    setMonth = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    monthsModal = _useState6[0],
    setMonthsModal = _useState6[1];
  var _useState7 = (0, _react.useState)(isOpen || null),
    _useState8 = _slicedToArray(_useState7, 2),
    pickerVisible = _useState8[0],
    setPickerVisible = _useState8[1];
  var _useState9 = (0, _react.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    dates = _useState10[0],
    setDates = _useState10[1];
  var _useState11 = (0, _react.useState)(value || null),
    _useState12 = _slicedToArray(_useState11, 2),
    currentDate = _useState12[0],
    setCurrentDate = _useState12[1];

  /*
        LIST OF DAYS
    */

  (0, _react.useEffect)(function () {
    if (year == "") {
      return;
    }
    var dateList = [];
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var firstDay = new Date(year, month, 1).getDay();
    for (var i = 1; i < firstDay; i++) {
      dateList.push("");
    }
    if (firstDay == 0) {
      dateList.push("", "", "", "", "", "");
    }
    for (var _i = 1; _i < daysInMonth + 1; _i++) {
      dateList.push("".concat(_i));
    }
    var lastDay = new Date(year, month + 1, 0).getDay();
    var daysUntilEnd = 7 - lastDay;
    if (daysUntilEnd != 7) {
      for (var _i2 = 0; _i2 < daysUntilEnd; _i2++) {
        dateList.push("");
      }
    }
    setDates(dateList);
  }, [year, month]);
  (0, _react.useEffect)(function () {
    onYearChange && onYearChange();
  }, [year]);
  (0, _react.useEffect)(function () {
    onMonthChange && onMonthChange();
  }, [month]);

  /*
        CLOSE ON CLICK OUTSIDE
    */

  var buttonRef = (0, _react.useRef)();
  var pickerRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    var onClickOutside = function onClickOutside(event) {
      if (buttonRef.current && buttonRef.current.contains(event.target)) return;
      if (pickerRef.current && pickerRef.current.contains(event.target)) return;
      setPickerVisible(false);
    };
    document.addEventListener("click", onClickOutside);
    return function () {
      document.removeEventListener("click", onClickOutside);
    };
  }, []);
  var adjustModal = function adjustModal() {
    if (pickerRef.current) {
      pickerRef.current.style.width = "auto";
      pickerRef.current.style.left = "0";
      pickerRef.current.style.right = "unset";
      pickerRef.current.style.transform = "translate(0, 100%)";
      var buttonRect = buttonRef.current.getBoundingClientRect();
      var modalRect = pickerRef.current.getBoundingClientRect();
      var windowWidth = window.innerWidth;
      var spaceToRight = windowWidth - buttonRect.left - 10;
      var spaceToLeft = buttonRect.right - 10;
      if (modalRect.width > spaceToRight && modalRect.width > spaceToLeft) {
        console.log("debug");
        pickerRef.current.style.width = "".concat(windowWidth - 10, "px");
        pickerRef.current.style.overflow = "hidden";
        pickerRef.current.style.left = "50%";
        pickerRef.current.style.transform = "translate(-50%, 100%)";
      } else if (modalRect.width > spaceToRight) {
        console.log("debug 2");
        pickerRef.current.style.right = "0";
        pickerRef.current.style.left = "unset";
      } else {
        console.log("debug 3");
        pickerRef.current.style.width = "auto";
        pickerRef.current.style.left = "0";
        pickerRef.current.style.right = "unset";
      }
    }
  };
  (0, _react.useEffect)(function () {
    window.addEventListener("resize", adjustModal);
    return function () {
      return window.removeEventListener("resize", adjustModal);
    };
  }, []);
  (0, _react.useEffect)(function () {
    setMonthsModal(false);
    if (pickerVisible) {
      onOpen && onOpen();
      adjustModal();
    } else {
      onClose && onClose();
    }
  }, [pickerVisible]);

  /*
        NEXT (PREV) MONTH
    */

  var nextMonth = function nextMonth(direction) {
    setMonth(function (prevMonth) {
      var newMonth = prevMonth + direction;
      if (newMonth > 11) {
        newMonth = 0; // Reset to January
        setYear(function (prevYear) {
          return prevYear + 1;
        }); // Increase year
      } else if (newMonth < 0) {
        newMonth = 11; // Reset to December
        setYear(function (prevYear) {
          return prevYear - 1;
        }); // Decrease year
      }
      return newMonth;
    });
  };

  /*  
        CHANGE DATE
    */

  var handleDateClick = function handleDateClick(day) {
    if (day) {
      var selected = new Date(year, month, day);
      if (minDate && selected < minDate || maxDate && selected > maxDate) {
        return;
      }
      setCurrentDate(selected);
      onChange && onChange(selected);
    }
    setPickerVisible(false);
  };

  /*
        CUSTOM VALUE
    */

  (0, _react.useEffect)(function () {
    if (value) setCurrentDate(value);
  }, [value]);

  /*
        LOCALIZATION
    */

  var monthTranslations = (0, _react.useMemo)(function () {
    var translations = {
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      sk: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
      de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      cs: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"]
    };
    return customLocale && Array.isArray(customLocale.months) && customLocale.months.length >= 12 ? customLocale.months.slice(0, 12) : translations[locale] || translations.en; // Fallback to English
  }, [locale, customLocale]);
  var localizedPlaceholder = (0, _react.useMemo)(function () {
    var translations = {
      en: "Select a date",
      cs: "Zvolte datum",
      sk: "Zvoľte dátum",
      de: "Datum auswählen",
      es: "Seleccione una fecha",
      fr: "Sélectionnez une date"
    };
    return translations[locale] || translations.en;
  }, [locale, customLocale]);
  var dayTranslations = (0, _react.useMemo)(function () {
    var translations = {
      en: ["M", "T", "W", "T", "F", "S", "S"],
      sk: ["P", "Ú", "S", "Č", "P", "S", "N"],
      de: ["M", "D", "M", "D", "F", "S", "S"],
      es: ["L", "M", "M", "J", "V", "S", "D"],
      fr: ["L", "M", "M", "J", "V", "S", "D"],
      cs: ["P", "Ú", "S", "Č", "P", "S", "N"]
    };
    return customLocale && Array.isArray(customLocale.days) && customLocale.days.length >= 7 ? customLocale.days.slice(0, 7).map(function (day) {
      return day.charAt(0);
    }) : translations[locale] || translations.en; // Fallback to English
  }, [locale, customLocale]);

  /*
        COLORS
    */

  var getDarkerColor = function getDarkerColor(color) {
    var factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.8;
    var r = parseInt(color.slice(1, 3), 16);
    var g = parseInt(color.slice(3, 5), 16);
    var b = parseInt(color.slice(5, 7), 16);
    r = Math.floor(r * factor);
    g = Math.floor(g * factor);
    b = Math.floor(b * factor);
    return "#".concat(((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
  };
  var darkColor = getDarkerColor(color);
  var getColorWithOpacity = function getColorWithOpacity(color, opacity) {
    var r = parseInt(color.slice(1, 3), 16);
    var g = parseInt(color.slice(3, 5), 16);
    var b = parseInt(color.slice(5, 7), 16);
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity, ")");
  };
  var lightColor = getColorWithOpacity(color, 0.05);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "vysko-datepicker-wrapper " + (theme == "dark" ? "vysko-datepicker-dark-theme" : "") + (disabled ? " vysko-datepicker-disabled" : "") + " " + (className || ""),
    style: {
      "--vysko-datepicker-primary-color": color,
      "--vysko-datepicker-primary-color-dark": darkColor,
      "--vysko-datepicker-primary-color-light": lightColor
    }
  }, /*#__PURE__*/_react["default"].createElement("button", {
    ref: buttonRef,
    type: "button",
    className: "vysko-dateinput ".concat(inputClassName || ""),
    onClick: function onClick() {
      setPickerVisible(!pickerVisible);
    }
  }, /*#__PURE__*/_react["default"].createElement("input", {
    required: required,
    type: "date",
    value: currentDate ? currentDate.toISOString().split('T')[0] : '',
    onChange: function onChange() {}
  }), /*#__PURE__*/_react["default"].createElement("p", null, currentDate == null ? placeholder || localizedPlaceholder : dateFormat != undefined ? dateFormat.replace("DD", currentDate.getDate().toString()).replace("MM", (currentDate.getMonth() + 1).toString()).replace("YYYY", currentDate.getFullYear().toString()) : currentDate.toLocaleDateString()), /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5V4.07926C4.81067 4.19451 3.86577 4.47737 3.17157 5.17157C2.47737 5.86577 2.19451 6.81067 2.07926 8.25H21.9207C21.8055 6.81067 21.5226 5.86577 20.8284 5.17157C20.1342 4.47737 19.1893 4.19451 17.75 4.07926V2.5C17.75 2.08579 17.4142 1.75 17 1.75C16.5858 1.75 16.25 2.08579 16.25 2.5V4.0129C15.5847 4 14.839 4 14 4H10C9.16097 4 8.41527 4 7.75 4.0129V2.5Z",
    fill: "#1C274C"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2 12C2 11.161 2 10.4153 2.0129 9.75H21.9871C22 10.4153 22 11.161 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12ZM17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14ZM17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17ZM7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14ZM7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z",
    fill: "#1C274C"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    ref: pickerRef,
    className: "vysko-datepicker ".concat(pickerClassName || ""),
    style: {
      visibility: pickerVisible ? 'visible' : 'hidden',
      opacity: pickerVisible ? '1' : '0'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "vysko-datepicker-header"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "vysko-datepicker-header-main"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      nextMonth(-1);
    }
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z",
    fill: "#000000"
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "datepicker-month",
    onClick: function onClick() {
      setMonthsModal(!monthsModal);
    }
  }, monthTranslations[month]), /*#__PURE__*/_react["default"].createElement("div", {
    className: "datepicker-year"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "number",
    name: inputName || "",
    value: year,
    min: 1000,
    max: 9999,
    onChange: function onChange(e) {
      if (e.target.value < 9999) {
        if (e.target.value == "") {
          setYear("");
        } else {
          setYear(Number(e.target.value));
        }
      }
    }
  }))), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      nextMonth(+1);
    }
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z",
    fill: "#000000"
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "vysko-datepicker-header-days"
  }, /*#__PURE__*/_react["default"].createElement("p", null, dayTranslations[0]), /*#__PURE__*/_react["default"].createElement("p", null, dayTranslations[1]), /*#__PURE__*/_react["default"].createElement("p", null, dayTranslations[2]), /*#__PURE__*/_react["default"].createElement("p", null, dayTranslations[3]), /*#__PURE__*/_react["default"].createElement("p", null, dayTranslations[4]), /*#__PURE__*/_react["default"].createElement("p", null, dayTranslations[5]), /*#__PURE__*/_react["default"].createElement("p", null, dayTranslations[6]))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "vysko-datepicker-grid " + (year == "" && "vysko-datepicker-grid-disabled")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "vysko-datepicker-months",
    style: {
      visibility: monthsModal ? 'visible' : 'hidden',
      opacity: monthsModal ? '1' : '0'
    }
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(0);
      setMonthsModal(false);
    }
  }, monthTranslations[0]), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(1);
      setMonthsModal(false);
    }
  }, monthTranslations[1]), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(2);
      setMonthsModal(false);
    }
  }, monthTranslations[2]), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(3);
      setMonthsModal(false);
    }
  }, monthTranslations[3]), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(4);
      setMonthsModal(false);
    }
  }, monthTranslations[4]), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(5);
      setMonthsModal(false);
    }
  }, monthTranslations[5]), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(6);
      setMonthsModal(false);
    }
  }, monthTranslations[6]), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(7);
      setMonthsModal(false);
    }
  }, monthTranslations[7]), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(8);
      setMonthsModal(false);
    }
  }, monthTranslations[8]), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(9);
      setMonthsModal(false);
    }
  }, monthTranslations[9]), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(10);
      setMonthsModal(false);
    }
  }, monthTranslations[10]), /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    onClick: function onClick() {
      setMonth(11);
      setMonthsModal(false);
    }
  }, monthTranslations[11])), /*#__PURE__*/_react["default"].createElement("div", {
    className: "vysko-datepicker-grid-dates"
  }, dates.map(function (item, index) {
    var isCurrentDate = item !== "" && currentDate && currentDate.getDate() === Number(item) && currentDate.getMonth() === month && currentDate.getFullYear() === year;
    var isToday = item !== "" && highlightToday == true && today.getDate() === Number(item) && today.getMonth() === month && today.getFullYear() === year;
    var isDisabled = item !== "" && disabledDates.some(function (disabledDate) {
      var dateToCheck = new Date(year, month, item);
      return dateToCheck.getFullYear() === disabledDate.getFullYear() && dateToCheck.getMonth() === disabledDate.getMonth() && dateToCheck.getDate() === disabledDate.getDate();
    });
    return /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        handleDateClick(item);
      },
      className: "".concat(item == "" && "vysko-datepicker-grid-disabled", "\n                                        ").concat(isDisabled && "vysko-datepicker-grid-disabled", "\n                                        ").concat(isCurrentDate ? "datepicker-date-current" : "", "\n                                        ").concat(isToday ? "datepicker-date-highlight" : "", "\n                                        ").concat(minDate && new Date(year, month, item) < minDate || maxDate && new Date(year, month, item) > maxDate ? "vysko-datepicker-grid-disabled" : "", "\n                                        "),
      key: index
    }, item);
  })))));
};
var _default = exports["default"] = DatePicker;