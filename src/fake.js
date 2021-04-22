export const formConfig = {

  fields: {
    triggerButton: {
      type: 'button',
      label: 'custom button',
      color: 'primary',
      size: 'sm',
      onClick(fb, component){
        fb.fields.targetField.visible = true
      }
    },
    targetField: {
      value: 'hidden field',
      visible: false
    }
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },
  

  title: 'Dev title'
}


export const values = {
  secondGuy: 'Annan'
}