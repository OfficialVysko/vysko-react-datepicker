# 📅✨ vysko-react-datepicker

Are you looking for a modern datepicker solution without installing unnecessary ui libraries and a bunch of their dependencies?

In that case, this simple customizable datepicker is for you!

Developed and maintained by [Jan Vyskočil](https://github.com/OfficialVysko) (aka. Vysko).


## Features

- 🎨 **Theming**: Choose between light and dark themes and specify your own primary color for the text and icons.
- 💬 **Localization**: Either use one of the predefined languages or simply provide your own translations. You can also change the date format shown in the input!
- ⚙️ **Control**: You can control the value, listen for changes. Also you can disable specific dates or set a minDate / maxDate and much more!
- ✅ **Works with forms**: If the datepicker is inside a form, formData will contain it's value if you specify inputName.

And much more! 

[img]

## Requirement

To use `vysko-react-datepicker`, you must use `react@16.8.0` or greater which includes hooks.

## **Instalation**

```bash 
$ npm install vysko-react-datepicker
# or
$ yarn add vysko-react-datepicker
```

## 📘 Basic example

```js
import DatePicker from "vysko-react-datepicker"

const App = () => {
    return <DatePicker />
}
```

## 📚 Props


| Key               | Type                     | Default                              | Description                                                                                 |
| :---------------- | :----------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------ |
| `className`       | `string`                 |                                      | Specify a className for the whole DatePicker component.                                     |
| `color`           | `string`                 | `#284387` (dark theme: `#6988d6`)   | Set the primary UI color.                                                                   |
| `customLocale`    | `Object`                 | `null`                               | Set your own translations. [Example](#-localization) |
| `dateFormat`      | `string`                 | Based on browser locale             | Format the selected date shown in the input. Example: `"DD. MM. YYYY"`. **DD** - day, **MM** - month, **YYYY** - year |
| `disabled`        | `boolean`                | `false`                              | Disables the functionality.                                                                 |
| `disabledDates`   | `array[date Object, ...]`|                                      | Specify dates that the user can't select.                                                   |
| `highlightToday`  | `boolean`                | `true`                               | Highlight today's date in the calendar picker.                                              |
| `inputClassName`  | `string`                 |                                      | Specify a className for the input.                                                          |
| `inputName`       | `string`                 |                                      | Input's name - accessible in `formData` or `input[name=""]` selector etc.                                                 |
| `isOpen`          | `boolean`                |                                      | Control if the datepicker calendar is open.                                                 |
| `locale`          | `string`                 | `en`                                 | Available locales = `cs`, `sk`, `de`, `fr`, `es`.                                           |
| `maxDate`         | `date Object`            |                                      | A maximum date a user can select. (Can't select any dates after)                            |
| `minDate`         | `date Object`            |                                      | A minimum date a user can select. (Can't select any dates before)                           |
| `onChange`        | `function`               |                                      | Function that is called when the value changes.                                             |
| `onClose`         | `function`               |                                      | Function that is called when the datepicker closes.                                         |
| `onMonthChange`   | `function`               |                                      | Function that is called when the month changes.                                             |
| `onOpen`          | `function`               |                                      | Function that is called when the datepicker opens.                                          |
| `onYearChange`    | `function`               |                                      | Function that is called when the year changes.                                              |
| `pickerClassName` | `string`                 |                                      | Specify a className for the datepicker calendar.                                            |
| `placeholder`     | `string`                 | `Select a date`                      | Specify the input's placeholder.                                                            |
| `required`        | `boolean`                | `false`                              | Set if input is required to submit a form.                                                  |
| `theme`           | `string`                 | `light`                              | Switch between `light` and `dark` theme.                                                    |
| `value`           | `date Object`            |                                      | The current selected date.                                                                  |


## Practical examples

### 💬 Localization

#### **Example 1**: Pick between available locales
> Available locales: English `en`, Czech `cs`, Slovak `sk`, German `de`, Spanish `es`, French `fr`

```js
<DatePicker locale={"de"} />
// Uses German translations for days, months, placeholder...
```

#### **Example 2:** Custom translations

Didn't find your language in the available languages or want to specify your own translations?

```js
<DatePicker
    customLocale={{
        months: ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"],
        days: ["M", "T", "W", "T", "F", "S", "S"]
    }}
    placeholder={"Select a date"}
/>
```

#### **Example 3:** Custom date format
Provide a string. **MM**, **DD** and **YYYY** symbols will be replaced with the selected date. The rest of the string will remain.
> **DD** - day, **MM** - month, **YYYY** - year
```js
    <DatePicker dateFormat={"DD/MM/YYYY"} />
    // or
    <DatePicker dateFormat={"DD. MM. YYYY"} />
    // or
    <DatePicker dateFormat={"MM-DD-YYYY"} />
```

### 🎨 Customize theme

#### **Example 1:** Dark theme
```js
<DatePicker theme={"dark"} />
```

#### **Example 2:** Custom primary color
Specify custom primary color that is used for the calendar icon, hover effects etc..
```js
<DatePicker color={"#6988d6"}>
```

You can also use `className`, `inputClassName` or `pickerClassName` 😉

Check out all the [props](#-props)

### ⚙️ Usage within a \<form>

| Prop        | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `inputName` | `string` | Input's name - accessible in `formData` or `input[name=""]` selector etc. |
| `required`  | `boolean`| Set if input is required to submit a form. |

```js
    const submitForm = (formData) => {
        var selectedDate = formData.get("date")
    }

    <form action={submitForm}>

        <DatePicker
            inputName={"date"}
            required={true}
        />
        <button type="submit">Submit form</button>

    </form>
```

### 📅 Limit date selection

| Prop              | Type                     | Description                |
| :--------         | :-------                 | :------------------------- |
| `maxDate`         | `date Object`            | A maximum date a user can select. (Can't select any dates after)  |
| `minDate`         | `date Object`            | A minimum date a user can select. (Can't select any dates before) |
| `disabledDates`   | `array[date Object, ...]`| Specify dates that the user can't select.

```js
    <DatePicker
        minDate={new Date("2024-10-15")}
        maxDate={new Date("2024-12-20")}
        disabledDates={[
            new Date("2024-11-05"),
            new Date("2024-11-06")
        ]}
    />
```

### ⚙️ Event handlers

| Prop              | Type       | Description                                          |
| :--------         | :--------- | :--------------------------------------------------- |
| `onChange`        | `function` | Function that is called when the value.              |
| `onClose`         | `function` | Function that is called when the datepicker  closes. |
| `onMonthChange`   | `function` | Function that is called when the month changes.      |
| `onOpen`          | `function` | Function that is called when the datepicker opens.   |
| `onYearChange`    | `function` | Function that is called when the year changes.       |

```js
    import { useState } from "react";
    
    const [value, setValue] = useState();

    function onChange(date) { setValue(date) }
    function onClose() { ... }
    function onOpen() { ... }
    function onMonthChange() { ... }
    function onYearChange() { ... }

    <DatePicker    
        value={value}

        onChange={(date) => {onChange(date)}}
        onClose={() => {onClose}}
        onOpen={() => {onOpen}}
        onMonthChange={() => {onMonthChange}}
        onYearhChange={() => {onYearChange}}
    />
```

