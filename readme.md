# form-payload

[![Continuous Integration](https://github.com/what1s1ove/whatislove.dev/actions/workflows/ci.yml/badge.svg)](https://github.com/what1s1ove/whatislove.dev/actions/workflows/ci.yml)
[![Continuous Delivery](https://github.com/what1s1ove/whatislove.dev/actions/workflows/cd.yml/badge.svg)](https://github.com/what1s1ove/whatislove.dev/actions/workflows/cd.yml)

Gets _proper_ form payload – via `form.elements`.

## Install

```
npm install form-payload
```

## Demo

The library works perfectly with any framework. Just use a valid [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement) and [form elements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements). If you want to add validation or any other functionality, create wrappers on top of the exported functions from the **form-payload** library.

- [Pure JavaScript](https://stackblitz.com/edit/form-payload-javascript?file=index.js)
- [TypeScript + Validation](https://stackblitz.com/edit/form-payload-typescript?file=index.ts,get-form-payload.ts)
- [React + TypeScript](https://stackblitz.com/edit/form-payload-react?file=src%2FApp.tsx)

## Usage

<!-- prettier-ignore-start -->
```html
<form name="resume">
  <label>CV: <input type="file" name="resume"></label>
</form>

<form name="mailing">
  <label>Email: <input type="email" name="mail" value="e@mail.com"></label>
</form>

<form name="general">
  <label>Name: <input type="text" name="name" value="John"></label>
  <label>DOB: <input type="date" name="dob" value="2021-03-27"></label>
  <button type="submit">Submit</button>
</form>

<script>
  import { getFormPayload, getFormControlPayload } from 'form-payload';

  const {
    resume: resumeFormNode,
    mailing: mailingFormNode,
    general: generalFormNode,
  } = document.forms;

  resumeFormNode.addEventListener('change', (evt) => {
    // ❌ bad (hard to read, magic numbers, bulky, outdated approach)
    const file = evt.target.files?.[0] || null;

    // 🟡 better (modern, clear, but repetitive approach – violates DRY)
    const [file = null] = env.target.files ?? [];

    // ✅ ideal
    const file = getFormControlPayload(evt.target);
    // => File or null
  });

  mailingFormNode.addEventListener('input', (evt) => {
    const formControlPayload = getFormControlPayload(evt.target);
    // => 'e@mail.com'
  });

  generalFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formPayload = getFormPayload(generalFormNode);
    // => { name: 'John', dob: 'Sat Mar 27 2021 02:00:00 GMT+0200' }
  });
</script>
```
<!-- prettier-ignore-end -->

## Value Correspondence Table

| HTMLElement                                                                                 | Attributes                                                                                                                                                                                                                                                                                                                                                                   | Included | Return Value                                                                                        |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="text"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text)                                                                                                                                                                                                                                                                                        | ✅       | `string`                                                                                            |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="password"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password)                                                                                                                                                                                                                                                                                | ✅       | `string`                                                                                            |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="search"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search)                                                                                                                                                                                                                                                                                    | ✅       | `string`                                                                                            |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="url"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url)                                                                                                                                                                                                                                                                                          | ✅       | `string`                                                                                            |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="tel"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel)                                                                                                                                                                                                                                                                                          | ✅       | `string`                                                                                            |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="color"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color)                                                                                                                                                                                                                                                                                      | ✅       | `string`                                                                                            |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="radio"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)                                                                                                                                                                                                                                                                                      | ✅       | `string`                                                                                            |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="hidden"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/hidden)                                                                                                                                                                                                                                                                                    | ✅       | `string`                                                                                            |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="email"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email)                                                                                                                                                                                                                                                                                      | ✅       | `string`                                                                                            |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="email"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email) and [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple)                                                                                                                                                                                              | ✅       | `Array<string>`                                                                                     |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="number"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number)                                                                                                                                                                                                                                                                                    | ✅       | `number`                                                                                            |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="range"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)                                                                                                                                                                                                                                                                                      | ✅       | `number`                                                                                            |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="checkbox"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)                                                                                                                                                                                                                                                                                | ✅       | `boolean`                                                                                           |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="checkbox"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) and with `[]` in [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)                                                                                                                                                                                | ✅       | `Array<string>` (See [advanced usage](#htmlinputelement-with-typecheckbox-as-array))                |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="date"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)                                                                                                                                                                                                                                                                                        | ✅       | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)     |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="time"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time)                                                                                                                                                                                                                                                                                        | ✅       | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)     |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="month"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month)                                                                                                                                                                                                                                                                                      | ✅       | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)     |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="week"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week)                                                                                                                                                                                                                                                                                        | ✅       | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)     |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="datetime-local"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local)                                                                                                                                                                                                                                                                    | ✅       | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)     |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="file"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)                                                                                                                                                                                                                                                                                        | ✅       | [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) or `null`                           |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="file"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file) and [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple)                                                                                                                                                                                                | ✅       | <code>Array<[File](https://developer.mozilla.org/en-US/docs/Web/API/File)></code>                   |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | [`type="button"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button) or [`type="submit"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit) or [`type="reset"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/reset) or [`type="image"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image) | ❌       | –                                                                                                   |
| [HTMLTextAreaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextareaElement) | –                                                                                                                                                                                                                                                                                                                                                                            | ✅       | `string`                                                                                            |
| [HTMLSelectElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement)     | –                                                                                                                                                                                                                                                                                                                                                                            | ✅       | `string`                                                                                            |
| [HTMLSelectElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement)     | [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple)                                                                                                                                                                                                                                                                                          | ✅       | `Array<string>`                                                                                     |
| [HTMLOutputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOutputElement)     | –                                                                                                                                                                                                                                                                                                                                                                            | ✅       | `string`                                                                                            |
| [HTMLFieldsetElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFieldsetElement) | –                                                                                                                                                                                                                                                                                                                                                                            | ✅       | `Object<name: string, value: unknown>` (See [advanced usage](#htmlfieldsetelement-as-object))       |
| [HTMLFieldsetElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFieldsetElement) | with `[]` in [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset#name)                                                                                                                                                                                                                                                                               | ✅       | `Array<Object<name: string, value: unknown>>` (See [advanced usage](#htmlfieldsetelement-as-array)) |
| [HTMLButtonElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement)     | –                                                                                                                                                                                                                                                                                                                                                                            | ❌       | –                                                                                                   |
| [HTMLObjectElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement)     | –                                                                                                                                                                                                                                                                                                                                                                            | ❌       | –                                                                                                   |

## Advanced Usage

### HTMLInputElement with type="checkbox" as array

`getFormPayload` returns an array of values for checked elements when using `<input>` with `type="checkbox"` and the `[]` symbol at the end of the `name` attribute of the `<input>` element itself.

<!-- prettier-ignore-start -->
```html
<form name="shop">
  <label>Shop name: <input name="name" type="text" value="Shop #1"></label>
  <label>Apple <input name="fruits[]" type="checkbox" value="apple" checked></label>
  <label>Orange <input name="fruits[]" type="checkbox" value="orange"></label>
  <label>Banana <input name="fruits[]" type="checkbox" value="banana" checked></label>
  <button type="submit">Submit</button>
</form>

<script>
  import { getFormPayload } from 'form-payload';

  const { shop: shopFormNode } = document.forms;

  shopFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formPayload = getFormPayload(shopFormNode);
    // =>
    // {
    //   name: 'Shop #1',
    //   fruits: ['apple', 'banana'],
    // }
  })
</script>
```
<!-- prettier-ignore-end -->

### HTMLFieldsetElement as object

`getFormPayload`/`getFormControlPayload` returns a nested objects when using the `<fieldset>` element. The key name will be based on the `name` attribute of the `<fieldset>` element itself. Nesting of `<fieldset>` elements within each other can be infinite. `getFormPayload`/`getFormControlPayload` collects all values recursively.

<!-- prettier-ignore-start -->
```html
<form name="company">
  <label>Company name: <input name="name" type="text" value="FreshHarvest Hub"></label>
  <fieldset name="shop">
    <label>Shop name: <input name="name" type="text" value="Shop #1"></label>
    <label>Open: <input name="isOpen" type="checkbox" checked></label>
  </fieldset>
  <button type="submit">Submit</button>
</form>

<script>
  import { getFormPayload } from 'form-payload';

  const { company: companyFormNode } = document.forms;

  companyFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formPayload = getFormPayload(companyFormNode);
    // =>
    // {
    //   name: 'FreshHarvest Hub',
    //   shop: {
    //     name: 'Shop #1',
    //     isOpen: true,
    //   },
    // }
  })
</script>
```
<!-- prettier-ignore-end -->

### HTMLFieldsetElement as array

`getFormPayload`/`getFormControlPayload` returns an array of objects when using the `<fieldset>` element and the `[]` symbol at the end of the `name` attribute of the `<fieldset>` elements. The functionality of recursively collecting values from nested `<fieldset>` elements is preserved.

<!-- prettier-ignore-start -->
```html
<form name="company">
  <label>Company name: <input name="name" type="text" value="FreshHarvest Hub"></label>
  <fieldset name="shops[]">
    <label>Shop name: <input name="name" type="text" value="Shop #1"></label>
    <label>Open: <input name="isOpen" type="checkbox" checked></label>
  </fieldset>
  <fieldset name="shops[]">
    <label>Shop name: <input name="name" type="text" value="Shop #2"></label>
    <label>Open: <input name="isOpen" type="checkbox"></label>
  </fieldset>
  <button type="submit">Submit</button>
</form>

<script>
  import { getFormPayload } from 'form-payload';

  const { company: companyFormNode } = document.forms;

  companyFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formPayload = getFormPayload(companyFormNode);
    // =>
    // {
    //   name: 'FreshHarvest Hub',
    //   shops: [
    //     {
    //       name: 'Shop #1',
    //       isOpen: true,
    //     },
    //     {
    //       name: 'Shop #2',
    //       isOpen: false,
    //     },
    //   ],
    // }
  })
</script>
```
<!-- prettier-ignore-end -->

---

Inspired by [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and Web-platform in general ♡.
