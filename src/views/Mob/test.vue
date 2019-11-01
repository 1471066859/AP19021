

<template >
  <div>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
  </div>
</template>
<script>

export default {
  methods: {
    onValuesChange(picker, values) {
      console.log(values)
      if (values[0] == '大') {
        picker.setSlotValues(1, [1, 2])
      }
      if (values[0] == '小') {
        picker.setSlotValues(1, [1, 2, 3, 4])

      }
    }
  },
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: ['大', '小'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 2,
          values: [1, 2],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    };
  }
};
</script>