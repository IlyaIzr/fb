export const formConfig = {


  fields: {
    bio: {
      type: 'select',
      name: 'login',
      options: ['aboba', 'abeba', 'bab'],
      onInput(fb, _, val) {
        console.log(val);
      },
      clearable: false,
      row: 1,
      group: 3,
      groupLabel: 'first'
    },
    pops: {
      row: 1,
      group: 2,
      groupLabel: 'New group lorem sebob sebob banchmarkers'
    },
    peps: {
      group: 2
    },
    simpleMultiple: {
      type: 'multiple',
      label: "Multiple with simpleinputs",
      value: [
        { firstName: 'Peter', lastName: '' },
        { firstName: 'Lois', lastName: 'Puttershmidt' }
      ],
      settings: {
        firstName: {
          label: 'First name',
        },
        lastName: {
          label: 'Last name'
        },
      },
    },
  },



  methods: {
    onSubmit(fb, _, res) { console.dir({...res}) }
  },

  title: 'Dev title',
}


export const values = {
  bio: 'bab'
}