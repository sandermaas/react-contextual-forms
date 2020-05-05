React Contextual Forms
=========================

[![version](https://img.shields.io/github/package-json/v/sandermaas/react-contextual-forms?style=flat-square)](https://github.com/sandermaas/react-contextual-form)

Simple forms for React using context.

## Features

- Easy to use
- Bring your own components
- Made with TypeScript (available types)

## Installation

This package uses hooks so it requires at least version **16.8** of React. 

```bash
npm install react-contextual-forms
```

## Usage

After installing the package from NPM you can start using the 3 available components (Form, Field and Interaction) to build your forms. The 'Form' component is the one that will provide the context for the other ones, you can place 'Field' and 'Interaction' components within it. There is no restriction on the number of forms you can use next to each other, how many you use or where you place the fields/interactions in the form.

### Components

#### Form

| Prop     | Type     | Required | Description                               |
| -------- | -------- | -------- | ----------------------------------------- |
| onChange | function | no       | Event that triggers when the form changes |
| onSubmit | function | yes      | Submit event for the form                 |

#### Field

| Prop          | Type              | Required | Description                           |
| ------------- | ----------------- | -------- | ------------------------------------- |
| Component     | FunctionComponent | yes      | The component to render as the field  |
| defaultValue  | string            | no       | The default value of the field        |
| id            | string            | yes      | ID of this field                      |
| validators    | Array             | no       | Collection of all validator functions |

#### Interaction

| Prop      | Type              | Required | Description                                |
| --------- | ----------------- | -------- | ------------------------------------------ |
| Component | FunctionComponent | yes      | The component to render as the interaction |

### Example

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

## License

[MIT](LICENSE)