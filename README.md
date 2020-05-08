React Contextual Forms
=========================

[![version](https://img.shields.io/github/package-json/v/sandermaas/react-contextual-forms?style=flat-square)](https://github.com/sandermaas/react-contextual-form)

Simple forms for React using context.

## Features

- Easy to use
- Bring your own components
- Write your own validators
- Made with TypeScript (available types)

## Installation

This package uses hooks so it requires at least version **16.8** of React. 

```bash
npm install react-contextual-forms
```

## Usage

After installing the package from NPM you can start using the 3 available components (Form, Field and Interaction) to build your forms. 

### Components

#### Form

The 'Form' component is the one that will provide the context for the others, you can place 'Field' and 'Interaction' components within it. There is no restriction on the number of forms you can use next to each other, how many you use or where you place the fields/interactions in the form.

| Prop     | Type     | Required | Description                               |
| -------- | -------- | -------- | ----------------------------------------- |
| onChange | function | no       | Event that triggers when the form changes |
| onSubmit | function | yes      | Submit event for the form                 |

#### Field

A 'Field' component only serves as a wrapper for the actual component and provides it with a number of props, how you want to display the field is completely up to you.

| Prop          | Type                                      | Required | Description                                               |
| ------------- | ----------------------------------------- | -------- | --------------------------------------------------------- |
| component     | FunctionComponent< IFieldComponentProps > | yes      | The component to render as the field                      |
| defaultValue  | string                                    | no       | The default value of the field                            |
| id            | string                                    | yes      | ID of this field                                          |
| onChange      | function                                  | no       | Returns the value of the field when it changes            |
| props         | object                                    | no       | Props of the field which are passed down to the component |
| validators    | Array< IFieldValidator >                  | no       | Collection of all validator functions                     |

##### IFieldComponentProps

| Name      | Type          | Description                                                               |
| --------- | ------------- | ------------------------------------------------------------------------- |
| error     | string / null | The error message for the field if there is a validation error, else null | 
| isTouched | boolean       | Has the field been touched by the user or not                             |
| props     | object        | Passed down props from the field                                          |
| value     | string        | The current value of the field                                            |
| update    | function      | [(value: string) => void] Function to update the field value              |

##### IFieldValidator

| Name    | Type     | Description                                                                      |
| ------- | -------- | -------------------------------------------------------------------------------- |
| check   | function | [(value: string) => boolean] Function to validate the field, must return boolean |
| message | string   | The error message to show if the validation fails                                |

#### Interaction

If you find the need to update a form value directly, you can use an 'Interaction' component. Note that these **only** work when they are located **within** a Form component.

| Prop      | Type                                            | Required | Description                                                     |
| --------- | ----------------------------------------------- | -------- | --------------------------------------------------------------- |
| component | FunctionComponent< IInteractionComponentProps > | yes      | The component to render as the interaction                      |
| props     | object                                          | no       | Props of the interaction which are passed down to the component |

##### IInteractionComponentProps

| Name   | Type             | Description                                                            |
| ------ | ---------------- | ---------------------------------------------------------------------- |
| props  | object           | Passed down props from the intercaction                                |
| update | function         | [(id: string, value: string) => void] Function to update field's value |

### Examples

*Javascript*

```javascript
import React from 'react'
import { Form, Field, Interaction } from 'react-contextual-forms'

const formValidators = {
    required: {
        check: (value) => {  
            if (!value) return false
            return true
        },
        message: 'This field is required'
    }
}

const Input = ({ error, isTouched, value, update }) => {
    return (
        <span>
            <input type="text" value={value} onChange={(e) => update(e.target.value)} />
            <p>{(error && isTouched) && error}</p>
        </span>
    )
}

const Select = ({ error, isTouched, value, update }) => {
    return (
        <span>
            <select value={value} onChange={(e) => update(e.target.value)}>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </select>
            <p>{(error && isTouched) && error}</p>
        </span>
    )
}

const ChangeButton = ({ update }) => {
    return (
        <button 
            type="button" 
            onClick={() => { 
                update('lastname', 'Doe')
                update('firstname', 'John')
            }}
        >Change</button>
    )
}

function App() {
    return (
        <div className="App">
            <p>FORM</p>
            <Form onSubmit={(form) => console.log(form)}>
                <div>
                    <Field id="lastname" validators={[formValidators.required]} component={Input} />
                    <Field id="firstname" validators={[formValidators.required]} component={Input} />
                </div>
                <div>
                    <Field id="choice" defaultValue="B" component={Select} />
                </div>
                <Interaction component={ChangeButton} />
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}
```

*Typescript*

```javascript
import React from 'react'
import { Form, Field, Interaction, IFieldComponentProps } from 'react-contextual-forms'

const formValidators = {
    required: {
        check: (value) => {  
            if (!value) return false
            return true
        },
        message: 'This field is required'
    }
}

const Input: React.FunctionComponent<IFieldComponentProps> = ({ error, isTouched, props, value, update }) => {
    return (
        <span>
            <label>{props?.label}</label>
            <input type="text" value={value} onChange={(e) => update(e.target.value)} />
            <p>{(error && isTouched) && error}</p>
        </span>
    )
}

function App() {
    return (
        <div className="App">
            <p>FORM</p>
            <Form onChange={(form) => console.log('CHANGE', form)} onSubmit={(form) => console.log('SUBMIT', form)}>
                <div>
                    <Field id="lastname" validators={[formValidators.required]} component={Input} props={{ label: 'Last name' }} />
                    <Field id="firstname" validators={[formValidators.required]} component={Input} />
                </div>
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}
```

## License

[MIT](LICENSE)