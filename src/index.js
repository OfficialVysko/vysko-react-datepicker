import React, { useEffect, useMemo, useRef, useState } from "react";
import "./style.css"

const DatePicker = ({
    value, onChange,
    theme,
    color = theme == "dark" ? "#6988d6" : "#284387",
    placeholder,
    required,
    disabled,
    minDate,
    maxDate,
    dateFormat,
    inputName,
    locale = "en",
    customLocale,

    onClose, onOpen,
    onYearChange, onMonthChange,
    highlightToday = true,

    className,
    inputClassName,
    pickerClassName,

    isOpen,
    disabledDates = []
}) => {

    const today = new Date();

    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    const [monthsModal, setMonthsModal] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(isOpen || null);

    const [dates, setDates] = useState([]);
    const [currentDate, setCurrentDate] = useState(value || null);

    /*

        LIST OF DAYS

    */

    useEffect(() => {

        if (year == "") {
            return;
        }

        const dateList = [];

        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const firstDay = new Date(year, month, 1).getDay()

        for (let i = 1; i < firstDay; i++) {
            dateList.push("");
        }

        if (firstDay == 0) {
            dateList.push("", "", "", "", "", "")
        }

        for (let i = 1; i < daysInMonth + 1; i++) {
            dateList.push(`${i}`)
        }

        const lastDay = new Date(year, month + 1, 0).getDay()
        const daysUntilEnd = 7 - lastDay;

        if (daysUntilEnd != 7) {
            for (let i = 0; i < daysUntilEnd; i++) {
                dateList.push("")
            }
        }

        setDates(dateList);


    }, [year, month])

    useEffect(() => {
        onYearChange && onYearChange();
    }, [year])

    useEffect(() => {
        onMonthChange && onMonthChange();
    }, [month])

    /*

        CLOSE ON CLICK OUTSIDE

    */

    const buttonRef = useRef();
    const pickerRef = useRef();

    useEffect(() => {
        const onClickOutside = (event) => {
            if (buttonRef.current && buttonRef.current.contains(event.target)) return;
            if (pickerRef.current && pickerRef.current.contains(event.target)) return;
            setPickerVisible(false);
        };

        document.addEventListener("click", onClickOutside);
        return () => {
            document.removeEventListener("click", onClickOutside);
        };
    }, []);

    const adjustModal = () => {
        if (pickerRef.current) {

            pickerRef.current.style.width = "auto";
            pickerRef.current.style.left = "0";
            pickerRef.current.style.right = "unset";
            pickerRef.current.style.transform = "translate(0, 100%)";

            const buttonRect = buttonRef.current.getBoundingClientRect();
            const modalRect = pickerRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;

            const spaceToRight = windowWidth - buttonRect.left - 10;
            const spaceToLeft = buttonRect.right - 10;

            if (modalRect.width > spaceToRight && modalRect.width > spaceToLeft) {
                console.log("debug")
                pickerRef.current.style.width = `${windowWidth - 10}px`;
                pickerRef.current.style.overflow = "hidden";
                pickerRef.current.style.left = "50%";
                pickerRef.current.style.transform = "translate(-50%, 100%)";
            } else if (modalRect.width > spaceToRight) {
                console.log("debug 2")
                pickerRef.current.style.right = "0";
                pickerRef.current.style.left = "unset";
            } else {
                console.log("debug 3");
                pickerRef.current.style.width = "auto";
                pickerRef.current.style.left = "0";
                pickerRef.current.style.right = "unset";
            }
        }
    }

    useEffect(() => {
        window.addEventListener("resize", adjustModal);
        return () => window.removeEventListener("resize", adjustModal)
    }, [])

    useEffect(() => {
        setMonthsModal(false);
        if (pickerVisible) {
            onOpen && onOpen()

            adjustModal();
        } else {
            onClose && onClose()
        }
    }, [pickerVisible])

    /*

        NEXT (PREV) MONTH

    */

    const nextMonth = (direction) => {
        setMonth(prevMonth => {
            let newMonth = prevMonth + direction;

            if (newMonth > 11) {
                newMonth = 0; // Reset to January
                setYear(prevYear => prevYear + 1); // Increase year
            } else if (newMonth < 0) {
                newMonth = 11; // Reset to December
                setYear(prevYear => prevYear - 1); // Decrease year
            }

            return newMonth;
        });
    }

    /*  

        CHANGE DATE

    */

    const handleDateClick = (day) => {
        if (day) {
            const selected = new Date(year, month, day);
            if ((minDate && selected < minDate) || (maxDate && selected > maxDate)) {
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

    useEffect(() => {
        if (value) setCurrentDate(value);
    }, [value]);


    /*

        LOCALIZATION

    */

    const monthTranslations = useMemo(() => {
        const translations = {
            en: [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            sk: [
                "Január", "Február", "Marec", "Apríl", "Máj", "Jún",
                "Júl", "August", "September", "Október", "November", "December"
            ],
            de: [
                "Januar", "Februar", "März", "April", "Mai", "Juni",
                "Juli", "August", "September", "Oktober", "November", "Dezember"
            ],
            es: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ],
            fr: [
                "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
            ],
            cs: [
                "Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
            ]
            // Add more locales as needed
        };
        return customLocale && Array.isArray(customLocale.months) && customLocale.months.length >= 12
            ? customLocale.months.slice(0, 12)
            : translations[locale] || translations.en; // Fallback to English
    }, [locale, customLocale]);

    const dayTranslations = useMemo(() => {
        const translations = {
            en: ["M", "T", "W", "T", "F", "S", "S"],
            sk: ["P", "Ú", "S", "Č", "P", "S", "N"],
            de: ["M", "D", "M", "D", "F", "S", "S"],
            es: ["L", "M", "M", "J", "V", "S", "D"],
            fr: ["L", "M", "M", "J", "V", "S", "D"],
            cs: ["P", "Ú", "S", "Č", "P", "S", "N"],
        };
        return customLocale && Array.isArray(customLocale.days) && customLocale.days.length >= 7
            ? customLocale.days.slice(0, 7).map(day => day.charAt(0))
            : translations[locale] || translations.en; // Fallback to English
    }, [locale, customLocale]);


    /*

        COLORS

    */

    const getDarkerColor = (color, factor = 0.8) => {
        let r = parseInt(color.slice(1, 3), 16);
        let g = parseInt(color.slice(3, 5), 16);
        let b = parseInt(color.slice(5, 7), 16);

        r = Math.floor(r * factor);
        g = Math.floor(g * factor);
        b = Math.floor(b * factor);

        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    const darkColor = getDarkerColor(color);

    const getColorWithOpacity = (color, opacity) => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const lightColor = getColorWithOpacity(color, 0.05);


    return (

        <div className={"vysko-datepicker-wrapper " + (theme == "dark" ? "vysko-datepicker-dark-theme" : "") + (disabled ? " vysko-datepicker-disabled" : "") + " " + (className || "")}
            style={{
                "--vysko-datepicker-primary-color": color,
                "--vysko-datepicker-primary-color-dark": darkColor,
                "--vysko-datepicker-primary-color-light": lightColor
            }}>
            <button ref={buttonRef} type="button" className={`vysko-dateinput ${inputClassName || ""}`} onClick={() => { setPickerVisible(!pickerVisible) }}>
                <input required={required} type="date" value={currentDate ? currentDate.toISOString().split('T')[0] : ''} onChange={() => { }} />
                <p>{currentDate == null ? (placeholder || "Zvolte datum") : (dateFormat != undefined ? dateFormat.replace("DD", currentDate.getDate().toString()).replace("MM", (currentDate.getMonth() + 1).toString()).replace("YYYY", currentDate.getFullYear().toString())
                    : currentDate.toLocaleDateString())}</p>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5V4.07926C4.81067 4.19451 3.86577 4.47737 3.17157 5.17157C2.47737 5.86577 2.19451 6.81067 2.07926 8.25H21.9207C21.8055 6.81067 21.5226 5.86577 20.8284 5.17157C20.1342 4.47737 19.1893 4.19451 17.75 4.07926V2.5C17.75 2.08579 17.4142 1.75 17 1.75C16.5858 1.75 16.25 2.08579 16.25 2.5V4.0129C15.5847 4 14.839 4 14 4H10C9.16097 4 8.41527 4 7.75 4.0129V2.5Z" fill="#1C274C" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 11.161 2 10.4153 2.0129 9.75H21.9871C22 10.4153 22 11.161 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12ZM17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14ZM17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17ZM7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14ZM7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z" fill="#1C274C" />
                </svg>
            </button>

            <div ref={pickerRef} className={`vysko-datepicker ${pickerClassName || ""}`} style={{
                visibility: pickerVisible ? 'visible' : 'hidden',
                opacity: pickerVisible ? '1' : '0',
            }}>

                <div className="vysko-datepicker-header">
                    <div className="vysko-datepicker-header-main">
                        <button type="button" onClick={() => { nextMonth(-1) }}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000" />
                            </svg>
                        </button>
                        <div>
                            <button type="button" className="datepicker-month" onClick={() => { setMonthsModal(!monthsModal) }}>{monthTranslations[month]}</button>
                            <div className="datepicker-year">
                                <input type="number" name={inputName || ""} value={year}
                                    min={1000}
                                    max={9999}
                                    onChange={(e) => {
                                        if (e.target.value < 9999) {
                                            if (e.target.value == "") {
                                                setYear("");
                                            } else {
                                                setYear(Number(e.target.value));
                                            }
                                        }
                                    }} />
                            </div>
                        </div>
                        <button type="button" onClick={() => { nextMonth(+1) }}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="#000000" />
                            </svg>
                        </button>
                    </div>
                    <div className="vysko-datepicker-header-days">
                        <p>{dayTranslations[0]}</p>
                        <p>{dayTranslations[1]}</p>
                        <p>{dayTranslations[2]}</p>
                        <p>{dayTranslations[3]}</p>
                        <p>{dayTranslations[4]}</p>
                        <p>{dayTranslations[5]}</p>
                        <p>{dayTranslations[6]}</p>
                    </div>
                </div>
                <div className={"vysko-datepicker-grid " + (year == "" && "vysko-datepicker-grid-disabled")}>

                    <div className="vysko-datepicker-months" style={{
                        visibility: monthsModal ? 'visible' : 'hidden',
                        opacity: monthsModal ? '1' : '0',
                    }}>
                        <button type="button" onClick={() => { setMonth(0); setMonthsModal(false) }}>{monthTranslations[0]}</button>
                        <button type="button" onClick={() => { setMonth(1); setMonthsModal(false) }}>{monthTranslations[1]}</button>
                        <button type="button" onClick={() => { setMonth(2); setMonthsModal(false) }}>{monthTranslations[2]}</button>
                        <button type="button" onClick={() => { setMonth(3); setMonthsModal(false) }}>{monthTranslations[3]}</button>
                        <button type="button" onClick={() => { setMonth(4); setMonthsModal(false) }}>{monthTranslations[4]}</button>
                        <button type="button" onClick={() => { setMonth(5); setMonthsModal(false) }}>{monthTranslations[5]}</button>
                        <button type="button" onClick={() => { setMonth(6); setMonthsModal(false) }}>{monthTranslations[6]}</button>
                        <button type="button" onClick={() => { setMonth(7); setMonthsModal(false) }}>{monthTranslations[7]}</button>
                        <button type="button" onClick={() => { setMonth(8); setMonthsModal(false) }}>{monthTranslations[8]}</button>
                        <button type="button" onClick={() => { setMonth(9); setMonthsModal(false) }}>{monthTranslations[9]}</button>
                        <button type="button" onClick={() => { setMonth(10); setMonthsModal(false) }}>{monthTranslations[10]}</button>
                        <button type="button" onClick={() => { setMonth(11); setMonthsModal(false) }}>{monthTranslations[11]}</button>
                    </div>

                    <div className="vysko-datepicker-grid-dates">
                        {
                            dates.map((item, index) => {

                                const isCurrentDate =
                                    item !== "" &&
                                    currentDate &&
                                    currentDate.getDate() === Number(item) &&
                                    currentDate.getMonth() === month &&
                                    currentDate.getFullYear() === year;

                                const isToday =
                                    item !== "" &&
                                    highlightToday == true &&
                                    today.getDate() === Number(item) &&
                                    today.getMonth() === month &&
                                    today.getFullYear() === year;

                                const isDisabled = item !== "" && disabledDates.some(disabledDate => {
                                    const dateToCheck = new Date(year, month, item);
                                    return (
                                        dateToCheck.getFullYear() === disabledDate.getFullYear() &&
                                        dateToCheck.getMonth() === disabledDate.getMonth() &&
                                        dateToCheck.getDate() === disabledDate.getDate()
                                    );
                                });

                                return (
                                    <button type="button" onClick={() => { handleDateClick(item) }}
                                        className={`${item == "" && "vysko-datepicker-grid-disabled"}
                                        ${isDisabled && "vysko-datepicker-grid-disabled"}
                                        ${isCurrentDate ? "datepicker-date-current" : ""}
                                        ${isToday ? "datepicker-date-highlight" : ""}
                                        ${((minDate && new Date(year, month, item) < minDate) || (maxDate && new Date(year, month, item) > maxDate)) ? "vysko-datepicker-grid-disabled" : ""}
                                        `} key={index}>
                                        {item}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DatePicker;