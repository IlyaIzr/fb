const formConfig = {
  title: 'Date input usage examples',

  fields: {
    calendarDate: {
      type: 'date',
      // shows calendar interface only
      withInput: false,
      value: '12.12.2012',
      // More properties here: https://quasar.dev/vue-components/date#qdate-api
    },
    inputDate: {
      type: 'date',
      // input proveded by default
      // withInput: true,

      // Default mask is '##.##.####'
    },
    rangeInput: {
      type: 'date',
      range: true,
      value: { from: '12.12.2012', to: '15.12.2012' },
    },
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },

}