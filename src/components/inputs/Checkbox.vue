<template>
  <div class="q-gutter-md" v-if="rest.visible">
    <q-field
      ref="input"
      :value="localVal"
      :rules="rules"
      :hint="rest.hint"
      name="checkboxInput"
      class="fb-field-label"
      borderless
      dense
    >
      <template v-slot:control>
        <q-checkbox
          v-bind="rest"
          @focus="onFocus"
          @blur="onBlur"
          @input="onInputLocal"
          :rules="rules"
          class="fb-field-content"
        />
      </template>
    </q-field>
  </div>
</template>

<script>
import { checkRulesBool, commonMethods, onMountCommon, strMethods } from "./common";

export default {
  name: "CheckboxInput",
  props: {
    keyName: {
      type: String,
      required: true,
    },
    rest: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rules: checkRulesBool(
        this.rest.rules,
        this.rest.required,
        this.rest.requiredMessage
      ),
      localVal: false,
    };
  },
  computed: {},
  methods: {
    ...commonMethods,
    ...strMethods,

    async onInputLocal(val) {
      this.localVal = val;
      this.$refs.input.validate();
      await this.onInput(val);
    },
  },
  beforeMount() {
    this.localVal = this.rest.value;
  },
  
  mounted(){
    onMountCommon(this, this.rest)
  },
};
</script>

<style>
</style>
