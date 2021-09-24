
const def = () => {
  let month = new Date().getMonth() + 1;
  return new Date().getFullYear().toString() + "/" + (month < 10 ? 0 : "") + month
}
export const formConfig = {
  fields: {
  },


  methods: {
    onSubmit(fb, formComp, values) {
      console.log(values);
    }
  },
}

export const values = {}