
const def = () => {
  let month = new Date().getMonth() + 1;
  return new Date().getFullYear().toString() + "/" + (month < 10 ? 0 : "") + month
}
export const formConfig = {
  fields: {
    from: {
      label: "@(Начало периода)",
      type: "date",
      inputMask: "##.##.####",
      defaultYearMonth: def(),
      navigationMinYearMonth: "2020/01",
    },
    ctrl: {
      onInput(fb, field, val) {
        console.log('%c⧭', 'color: #514080', fb.fields.from.value);
        fb.fields.from.value = '12.12.2012'
        // fb.fields.from.label = '12.12.2012'
        // console.log('%c⧭ new value', 'color: #514080', fb.fields.from.value);
      }
    },
  },


  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },
}

export const values = {}