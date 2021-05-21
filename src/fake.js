export const formConfig = {


  fields: {
    bio: {
      type: 'select',
      name: 'login',
      options: ['aboba', 'abeba', 'bab'],
      onInput(fb, _, val) {
        console.log(val);
      }
    },
    react: {
      onFocus(fb) {
        fb.fields.bio = {
          visible: false,
          service: true
        }
        // fb.fields.bio.visible = false
        // fb.fields.bio.service = false
        // fb.fields.bio.label = 'bebs'
      }
    },    
    react2: {
      onFocus(fb) {
        // console.log(fb.fields.bio);
        fb.fields.bio = {
          visible: true,
          service: false,
          value: 'abeba',
          hint: 'beobob'
        }
        
        // fb.fields.bio.visible = true
        // fb.fields.bio.service = true
      }
    }
  },




  methods: {
    onSubmit(fb, _, res) { console.dir(res) }
  },

  title: 'Dev title',
}


export const values = {
  bio: 'bab'
}