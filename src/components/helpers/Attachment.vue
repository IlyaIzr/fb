<template>
  <div v-if="config" class="fb-attachment col-grow q-pt-md q-mx-sm">
    <q-icon v-if="config.type === 'icon'" v-bind="config" />
    <q-avatar v-else-if="config.type === 'img'">
      <img v-bind="config" />
    </q-avatar>
    <q-btn
      v-else-if="config.type === 'button'"
      round
      dense
      flat
      v-bind="config"
      @click="f"
    />
    <q-card-section
      v-else-if="config.type === 'html'"
      v-html="config.value"
    ></q-card-section>
  </div>
</template>

<script>
export default {
  name: "Attachment",
  props: {
    config: {
      required: false,
    },
    f: Function,
  },
};
</script>

<style>
</style>