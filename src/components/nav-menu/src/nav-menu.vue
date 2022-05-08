<template>
  <div class="nav-menu">
    <!-- 菜单logo -->
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="">
      <span class="title" v-if="!props.collapse">management system</span>
    </div>
    <!-- 菜单主体 -->
    <el-menu
      :default-active=defaultValue
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#fff"
      active-text-color="#0a60bd"
      :collapse="props.collapse">
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <img class="img-icon" src="~@/assets/img/menu-icon.svg" alt="">
              <!-- <el-icon v-if="item.icon">
                 <component :is="item.icon"></component>
              </el-icon> -->
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">{{ subitem.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router';
import { pathMapToMenu } from '@/utils/map-menus';
const props = defineProps({
  collapse: {
    type: Boolean,
  }
})

// store
const store = useStore()
const userMenus = computed(() => store.state.login.userMenu)

// router
const router = useRouter()
const route = useRoute()
const currentPath = route.path

// data
const menu = pathMapToMenu(userMenus.value, currentPath)
const defaultValue = ref(menu.id + '')

// 处理菜单栏点击事件
const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? '/not-found'
  })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 35px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 18px;
      font-weight: 700;
      color: white;
      display: inline-block;
    }
  }


  .el-menu {
    border-right: none;

    .img-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;

    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #3084de !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 55px);
}
</style>