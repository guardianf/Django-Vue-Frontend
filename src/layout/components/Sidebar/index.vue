<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-menu
      class="fvr-menu"
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <el-scrollbar wrap-class="scrollbar-wrapper" class="span">
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-scrollbar>
      <el-menu-item path="/collapse" @click="toggleSideBar">
        <i :class="collapseIcon" />
        <span slot="title">Collapse Sidebar</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo, },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
    ],),
    activeMenu() {
      const route = this.$route
      const { meta, path, } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    collapseIcon() {
      return this.isCollapse ? 'el-icon-d-arrow-right': 'el-icon-d-arrow-left'
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar', { withoutAnimation: false })
    },
  },
}
</script>

<style lang="scss" scoped>
.fvr-menu {
  display: flex;
  flex-flow: column;
  .span {
    flex: 1;
  }
}
</style>
