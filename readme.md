# form-payload

[![Continuous Integration](https://github.com/what1s1ove/whatislove.dev/actions/workflows/ci.yml/badge.svg)](https://github.com/what1s1ove/whatislove.dev/actions/workflows/ci.yml)
[![Continuous Delivery](https://github.com/what1s1ove/whatislove.dev/actions/workflows/cd.yml/badge.svg)](https://github.com/what1s1ove/whatislove.dev/actions/workflows/cd.yml)

Gets _proper_ form payload – via `form.elements`.

## Install

```
npm install form-payload
```

## Usage

```html
<form name="general">
  <label>
    Name
    <input type="text" name="name" value="John" />
  </label>
  <label>
    Birthday
    <input type="date" name="birthday" value="2021-03-27" />
  </label>
  <button type="submit">Submit</button>
</form>

<form name="mailing">
  <label>
    Mailing
    <input type="email" name="mail" name="example@mail.com" />
  </label>
</form>

<script>
  import { getFormPayload, getFormControlPayload } from 'form-payload';

  const generalFormNode = document.querySelector('form[name="general"]');
  const mailingFormNode = document.querySelector('form[name="mailing"]');

  generalFormNode.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formPayload = getFormPayload(generalFormNode);
    // => { name: 'John', birthday: 'Sat Mar 27 2021 02:00:00 GMT+0200' }
  });

  mailingFormNode.addEventListener('change', (evt) => {
    const formControlPayload = getFormControlPayload(evt.target);
    // => 'example@mail.com'
  });
</script>
```

PS. _The library works perfectly with any framework. It doesn't matter which framework is used; Just use a valid [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)._

## Value Correspondence Table

| HTMLElement                                                                                 | Attributes                   | Included | Value                                                                                           |
| ------------------------------------------------------------------------------------------- | ---------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="text"`                | ✅       | `string`                                                                                        |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="password"`            | ✅       | `string`                                                                                        |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="email"`               | ✅       | `string`                                                                                        |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="search"`              | ✅       | `string`                                                                                        |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="url"`                 | ✅       | `string`                                                                                        |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="tel"`                 | ✅       | `string`                                                                                        |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="color"`               | ✅       | `string`                                                                                        |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="radio"`               | ✅       | `string`                                                                                        |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="hidden"`              | ✅       | `string`                                                                                        |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="number"`              | ✅       | `number`                                                                                        |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="range"`               | ✅       | `number`                                                                                        |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="checkbox"`            | ✅       | `boolean`                                                                                       |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="date"`                | ✅       | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="time"`                | ✅       | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="datetime-local"`      | ✅       | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="month"`               | ✅       | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="week"`                | ✅       | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="file"`                | ✅       | [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) or `null`                       |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="file"` and `multiple` | ✅       | Array<[`File`](https://developer.mozilla.org/en-US/docs/Web/API/File)>                          |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="button"`              | ❌       | –                                                                                               |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="submit"`              | ❌       | –                                                                                               |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="reset"`               | ❌       | –                                                                                               |
| [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)       | `type="image"`               | ❌       | –                                                                                               |
| [HTMLTextAreaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextareaElement) | –                            | ✅       | `string`                                                                                        |
| [HTMLSelectElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement)     | –                            | ✅       | `string`                                                                                        |
| [HTMLSelectElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement)     | `multiple`                   | ✅       | Array<`string`>                                                                                 |
| [HTMLOutputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOutputElement)     | –                            | ✅       | `string`                                                                                        |
| [HTMLFieldsetElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFieldsetElement) | –                            | ✅       | `Object<name: string, value: unknown>` (recursive values of nested elements)                    |
| [HTMLButtonElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement)     | `type="button"`              | ❌       | –                                                                                               |
| [HTMLButtonElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement)     | `type="submit"`              | ❌       | –                                                                                               |
| [HTMLButtonElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement)     | `type="reset"`               | ❌       | –                                                                                               |
| [HTMLObjectElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement)     | –                            | ❌       | –                                                                                               |
