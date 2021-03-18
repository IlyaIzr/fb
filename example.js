const formBuilder = {
  form
}

const form = {
  element: 'form html node',
  component: 'vue vNode element',
  vue: 'gloabal vue reference',
  title: 'Form title',
  methods: {
    onSubmit() { },
    onError() { },
    onMount() { },
  },
  fields,
  modal,
  tabs,
  values: {},
  global,
}

const fields = {
  'fieldKey-15': {
    value: 'some val',
    config: {
      // field config
    },
    element: 'field html element',
    component: 'vue vNode element'
  }
}



const alternateFieldsConfig = {
  fieldKey: {
    value: 'some',
    label: 'First in the row',
    row: 1,
    order: 1,
  },
  fieldKey2: {
    value: 'some again',
    label: 'First in the row',
    row: 1,
    order: 2,
    type: 'number'
  }
}