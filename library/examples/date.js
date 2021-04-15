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

      // You can slightly change input's mask. 
      // Default mask is '##.##.####'
      // WARNING: mask should correspond to calendars mask, DD-MM-YYYY by dafault
      inputMask: '##-##-####',
    },
    rangeInput: {
      type: 'date',
      value: '12.12.2012 - 15.12.2012',
      // Default masks
      // inputMask: '##.##.#### - ##.##.####',
      // calendarMask: 'DD.MM.YYYY',
    },

    remaskedRange: {      
      type: 'date',
      // WaRNING ' - ' is a required delimeter, inputMask.length should be === 23
      inputMask: '##-##-#### - ##-##-####',
      calendarMask: 'DD-MM-YYYY',
      value: '06-04-2021 - 13-04-2021',      
    }
  },

  methods: {
    onSubmit(formGlobal, component, values) {
      console.log(values);
    }
  },

}