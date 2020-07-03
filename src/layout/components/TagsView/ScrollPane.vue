<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script>
const tagAndTagSpacing = 4; // tagAndTagSpacing

export default {
  name: "ScrollPane",
  data() {
    return {
      left: 0
    };
  },
  computed: {
    scrollWrapper() {
      //el-scrollbar__wrap
      return this.$refs.scrollContainer.$refs.wrap;
    }
  },
  methods: {
    handleScroll(e) {
      //处理鼠标滚轮事件
      const eventDelta = e.wheelDelta || -e.deltaY * 40; //wheelDelta判断鼠标滚轮方向 正为上 负为下
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    },
    moveToTarget(currentTag) {
      const $container = this.$refs.scrollContainer.$el; //组件最外层
      const $containerWidth = $container.offsetWidth; //container的宽度
      const $scrollWrapper = this.scrollWrapper; //container下的wrap元素
      const tagList = this.$parent.$refs.tag; //父元素中的的tagList

      let firstTag = null;
      let lastTag = null;

      // 找到第一个tag和最后一个tag
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft =
          $scrollWrapper.scrollWidth - $containerWidth; //滚到最后
      } else {
        // 找到前一个和后一个tag
        const currentIndex = tagList.findIndex(item => item === currentTag);
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];

        //下一个tag的offsetLeft
        const afterNextTagOffsetLeft =
          nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;
        //上一个tag的offsetLeft
        const beforePrevTagOffsetLeft =
          prevTag.$el.offsetLeft - tagAndTagSpacing;

        //判断当前tag的前一个或者后一个的位置是否被遮住，滚动条移动到相应位置
        if (
          afterNextTagOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  &/deep/ {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
// .scroll-container /deep/ .el-scrollbar__bar {
//   bottom: 0px;
// }
// .scroll-container /deep/  .el-scrollbar__wrap {
//       height: 49px;
//     }
</style>
