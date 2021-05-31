export const formConfig = {


  fields: {
    f: {
      type: 'file',
      // multiple: true,
      rawData: false,
      // onInput(f,c,val){
      //   console.log(val);
      // }
    }
  },




  methods: {
    onSubmit(fb, _, res) { console.log({...res}) }
  },

  title: 'Dev title',
}

export const values = {}