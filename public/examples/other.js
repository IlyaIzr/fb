const formConfig = {
  title: 'Other type of inputs',

  fields: {
    // Checkbox
    
    checkbox: {
      type: 'checkbox',
      value: true,
      onInput(formGlobal, component, value){
        if (value) console.log('Agreed');
      }
    },

    // Html injector
    
    html: {
      type: 'html',
      value: 'some <br> html',
      // no Event handler functions
    },

    // Text editor
    
    editor: {
      type: 'editor',
      onInput(formGlobal, component, value){
        // value is a String of html content
      },
      disable: false
    },


  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },

}