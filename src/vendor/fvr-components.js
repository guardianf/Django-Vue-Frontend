/**
 * @file    this is a components defination file for flexiv front-end webpage
 * @author  yubin.fu <yubin.fu@flexiv.com>
 */

/**
 * component container
 * @type { object }
 */
 export const fvrContainer = {
  render(h) {
    return h("el-container", {
      class: "fvr-container",
    }, this.$slots.default);
  },
}


/**
 * define font-size
 * @type { array }
 */
const FontSize = ['xl', 'l', 'm', 'b', 's', 'xs']

/**
 * define font component
 * @type { object }
 */
export const fvrFont = {
  template: `<span :class="['fvr-font-'+ size, 'fvr-font-color-' + type]"><slot /></span>`,
  props: {
    size: {
      type: String,
      default: 'b',
      validator(value) {
        return FontSize.indexOf(value.toLowerCase()) !== -1
      }
    },
    type: {
      default: 'default',
      validator(value) {
        return ['error', 'default'].indexOf(value.toLowerCase()) !== -1
      }
    }
  },
  created() {}
}

/**
 * component banner
 * @type { object }
 */
export const fvrBanner = {
  template: `<el-header class='fvr-banner'>
                  <el-row type='flex' style='width: 100%' align='middle'>
                          <i class='fvr-logo'></i>
                          <fvr-font size='xl' class='fvr-fullfill'>Management System</fvr-font>
                          <slot />
                  </el-row>
              </el-header>`,
  components: {
    'fvr-font': fvrFont,
  }
}

/**
 * define input component
 */
export const fvrInput = {
  // render(h) {
  //   return h()
  // },
}

/**
 * define username input component
 * @type { object }
 */
export const fvrUserNameInput = {
  render(h) {
    return h("div", {
      class: [
        "fvr-input-outside",
        `fvr-input-${ this.fontType }`,
        this.isFocus ? `fvr-input-focus` : "",
      ].filter(item => item),
    }, [
      h("el-row", {
        class: "fvr-input-underline",
        props: {
          type: "flex",
          align: "middle",
        },
      }, [
        h("i", {
          class: "el-icon-user",
        }),
        h("input", {
          class: "fvr-input-inside fvr-font-color-default fvr-font-s",
          ref: "input",
          domProps: {
            placeholder: this.placeholder,
            name: this.newName,
            value: this.newValue,
            required: this.required,
            autocomplete: "off",
          },
          on: {
            focus: this.focus,
            blur: this.blur,
            input:  event => {
              this.$emit('input', event.target.value);
            }
          },
        })
      ])
    ])
  },
  props: {
    value: {},
    name: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    error: {
      type: String,
    },
    width: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    'fvr-font': fvrFont,
  },
  computed: {
    fontType() {
      return this.error !== '' ? 'error' : 'default'
    },
    newName() {
      return this.name;
    },
    newValue() {
      return this.value;
    },
  },
  data() {
    return {
      isFocus: false,
    }
  },
  methods: {
    submit(val) {
      this.$emit('input', val)
    },
    focus() {
      this.$refs.input.focus();
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    }
  }
}

/**
 * define password input component
 * @type { object }
 */
export const fvrPasswordInput = {
  template: `
    <div class='fvr-input-outside' :class="['fvr-input-' + fontType, isFocus? 'fvr-input-focus' : '']">
      <el-row type='flex' align='middle' class='fvr-input-underline'>
        <i class='el-icon-lock'></i>
        <input
          class='fvr-input-inside fvr-font-color-default fvr-font-s'
          :placeholder='newPlaceholder'
          :name='newName'
          :type='type'
          :value='newValue'
          :required='required'
          @input='submit'
          @focus='focus'
          @blur='blur'
          ref='input'
          autocomplete='off' />
        <i :class="['fa', type == 'password' ? 'fa-eye': 'fa-eye-slash' ]" @click='toggleInput'></i>
      </el-row>
    </div>
  `,
  props: ['name', 'placeholder', 'value', 'error', 'required'],
  components: {
    'fvr-font': fvrFont,
  },
  data() {
    return {
      type: this.name == 'password' ? 'password' : '',
      isFocus: false,
    }
  },
  computed: {
    fontType() {
      return this.error !== '' ? 'error' : 'default'
    },
    newPlaceholder() {
      return this.placeholder;
    },
    newName() {
      return this.name;
    },
    newValue() {
      return this.value;
    },
  },
  methods: {
    toggleInput() {
      this.type = this.type === 'password' ? '' : 'password'
    },
    submit(e) {
      this.$emit('input', e.target.value)
    },
    focus() {
      this.$refs.input.focus();
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    }
  }
}

/**
 * define captcha input component
 * @type { object }
 */
export const fvrCaptcha = {
  template: `
    <div class='fvr-input-outside' :class="['fvr-input-' + type, isFocus? 'fvr-input-focus' : '']">
      <el-row type='flex' align='middle'>
        <el-col :span='15'>
          <el-row type='flex' justify='start' align='middle' class='fvr-input-underline'>
            <input
              class='fvr-input-inside fvr-font-color-default fvr-font-s'
              ref='input'
              :placeholder='placeholder'
              :name='name'
              :value='newValue'
              :required='required'
              @input='submit'
              @focus='focus'
              @blur='blur' />
          </el-row>
        </el-col>
        <el-col :span='8' :offset='1'>
          <el-row type='flex' justify='end' align='middle'>
            <img :src="src" @click='refresh' />
          </el-row>
        </el-col>
      </el-row>
    </div>
  `,
  props: ['value', 'placeholder', 'error', 'name', 'required'],
  components: {
    'fvr-font': fvrFont,
  },
  data() {
    return {
      src: '/api/v1/captcha/',
      isFocus: false,
    }
  },
  computed: {
    type() {
      return this.error !== '' ? 'error' : 'default'
    },
    newValue() {
      return this.value;
    },
  },
  methods: {
    submit(e) {
      this.$emit('input', e.target.value);
    },
    refresh() {
      this.src = "/api/v1/captcha/?t=" + Math.random()
    },
    focus() {
      this.$refs.input.focus();
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    }
  }
}

export const fvrButton = {
  template: `
    <el-tooltip popper-class="fvr-tooltip" v-if="newContent" :content="newContent" :hide-after="1000">
        <el-button :class="['fvr-button', newType ? 'fvr-button--' + newType : '']" :circle="isCircle" :icon="newIcon" :size="newSize" :type="newType" :disabled="disabled"><slot></slot></el-button>
    </el-tooltip>
    <el-button v-else :class="['fvr-button', newType ? 'fvr-button--' + newType : '']" :circle="isCircle" :icon="newIcon" :size="newSize" :type="newType" :disabled="disabled"><slot></slot></el-button>
  `,
  props: {
    circle: Boolean,
    icon: [String, Array, ],
    size: String,
    type: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isCircle: this.circle,
      newIcon: this.icon,
      newSize: this.size,
      newType: this.type,
      newContent: this.content,
    }
  },
}

/**
 * define checkbox component
 * @type { object }
 */
export const fvrCheckbox = {
  template: `
    <div class="fvr-checkbox">
        <el-checkbox class="fvr-font-s" :value="value" true-label='yes' false-label='no' @input='submit'>{{ label }}</el-checkbox>
    </div>
  `,
  props: {
    value: { },
    label: {
      type: String,
    },
    "true-label": {
      type: String,
    },
    "false-label": {
      type: String,
    },
  },
  computed: {
    newValue() {
      return this.value;
    },
  },
  methods: {
    submit(val) {
      this.$emit("input", val);
    },
  },
}

/**
 * define row component
 * @type { object }
 */
export const fvrRow = {
  template: `
    <el-row type='flex' class='fvr-row' :justify='newJustify' :align='newAlign'>
      <slot />
    </el-row>
  `,
  props: ['justify', 'align'],
  computed: {
    newJustify() {
      return this.justify;
    },
    newAlign() {
      return this.align;
    },
  },
}

/**
 * define avatar component
 */
export const fvrAvatar = {
  template: `
    <el-avatar :src='newSrc'></el-avatar>
  `,
  props: ['src'],
  computed: {
    newSrc() {
      return this.src;
    },
  },
}

/**
 * define dropdown item component
 */
export const fvrDropdownItem = {
  template: `<el-dropdown-item :index="newIndex" :command="newCommand"><slot /></el-dropdown-item>`,
  props: ['command', 'index', ],
  computed: {
    newCommand() {
      return this.command;
    },
    newIndex() {
      return this.index
    },
  },
}

/**
 * define dropdown menu component
 */
export const fvrDropdownMenu = {
  template: `<el-dropdown-menu :slotblock="newSlot" class="fvr-dropdown-menu"><slot /></el-dropdown-menu>`,
  props: ["slotblock"],
  computed: {
    newSlot() {
      return this.slot;
    }
  },
}

/**
 * define dropdown component
 */
export const fvrDropdown = {
  template: `
    <el-dropdown
      :class="['fvr-dropdown', isHover ? 'fvr-dropdown-hover' : '']"
      @command="handleCommand"
      @visible-change="hover">
      <span class="el-dropdown-link" style="height: 100%; display: flex; align-items: center;">
        <slot></slot>
        <i class="el-icon--right el-icon-arrow-down"></i>
      </span>
      <fvr-dropdown-menu name="dropdown">
        <fvr-dropdown-item
          v-for="(list, index) in lists"
          :command="list.command"
          :key="index"
        >{{ list.name }}</fvr-dropdown-item>
      </fvr-dropdown-menu>
  </el-dropdown>
  `,
  props: ["lists", ],
  components: {
    "fvr-dropdown-item": fvrDropdownItem,
    "fvr-dropdown-menu": fvrDropdownMenu,
  },
  data() {
    return {
      isHover: false,
    }
  },
  methods: {
    handleCommand(str) {
      this.$emit("command", str);
    },
    hover(res) {
      this.isHover = res;
    },
  },
}

/**
 * define aside bar component
 * @type {Object}
 */
export const fvrAside = {
  template: `<el-aside class='fvr-aside'><slot /></el-aside>`,
}

/**
 * define main frame component
 * @type {Object}
 */
export const fvrMain = {
  template: `<el-main class='fvr-main'><slot /></el-main>`,
}

/**
 * define a menu component
 * @type {Object}
 */
export const fvrMenu = {
  template: `
    <el-menu
      class="fvr-menu"
      unique-opened
      :collapse="collapse"
      :default-active="active"
      @select="handler">
      <slot></slot>
      <div class="fvr-menu--span"></div>
      <fvr-menu-item
        topline
        index="collapse"
        :icon="[collapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"
        @click.native.stop.capture="triggerCollapse">
        Collapse sidebar
      </fvr-menu-item>
    </el-menu>
  `,
  props: {
    active: {
      type: String,
    },
  },
  data() {
    return {
      collapse: false,
    }
  },
  methods: {
    handler(key) {
      this.$emit("handler", key);
    },
    triggerCollapse() {
      this.collapse = !this.collapse;
    },
  },
}

/**
 * define a submenu component
 * @type {Object}
 */
 export const fvrSubmenu = {
  template: `<div>
    <el-submenu :index="newIndex" class="fvr-submenu" :key="newIndex">
      <template slot="title" class="fvr-submenu--title">
        <embed v-if="isFvrIcon":src="newIcon" class="fvr-menu-item--icon" type="image/svg+xml" width="20" height="20">
        <i v-else :class="[icon, 'fvr-menu-item--icon']"></i>
        <span slot="title" class="fvr-menu-item--label fvr-font-s">{{ label }}</span>
      </template>
      <slot></slot>
    </el-submenu>
  </div>`,
  props: {
    index: {
      type: [String, Number],
    },
    icon: {
      type: [String, Array, ],
    },
    label: {
      type: String,
    },
  },
  computed: {
    newIndex() {
      return this.index;
    },
    isFvrIcon() {
      return /^fvr-icon-/g.test(this.icon);
    },
    newIcon() {
      if(this.isFvrIcon) {
        const imgPath = [
          `/static/img/icons`,
        ];
        const strToPath = this.icon.replace(/^fvr-icon-/g, "").split("-");
        return imgPath.concat(strToPath).join("/") + ".svg";
      } else {
        return this.icon;
      }
    },
  },
}

/**
 * define a menu item group component
 * @type {Object}
 */
export const fvrMenuItemGroup = {
  template: `
    <el-menu-item-group class="fvr-menu-item-group">
      <span slot="title" class="fvr-font-s">{{ label }}</span>
      <slot></slot>
    </el-menu-item-group>
  `,
  props: ["icon", "label", ],
}

/**
 * define menu item component
 */
export const fvrMenuItem = {
  template: `
    <el-menu-item :class="['fvr-menu-item', topline ? 'fvr-menu-item--topline': '']" :index="newIndex" :key="newIndex">
      <embed v-if="isFvrIcon":src="newIcon" class="fvr-menu-item--icon" type="image/svg+xml" width="20" height="20">
      <i v-else :class="[icon, 'fvr-menu-item--icon']"></i>
      <span slot="title" class="fvr-menu-item--label fvr-font-s">
        <slot></slot>
      </span>
    </el-menu-item>
  `,
  props: {
    icon: [String, Array, ],
    index: [String, Number, ],
    topline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    newIndex() {
      return this.index;
    },
    isFvrIcon() {
      return /^fvr-icon-/g.test(this.icon);
    },
    newIcon() {
      if(this.isFvrIcon) {
        const imgPath = [
          `/static/img/icons`,
        ];
        const strToPath = this.icon.replace(/^fvr-icon-/g, "").split("-");
        return imgPath.concat(strToPath).join("/") + ".svg";
      } else {
        return this.icon;
      }
    },
  },
};

/**
 * define a table component
 */
export const fvrTable = {
  template: `
    <el-table
      :empty-text="emptyInfo"
      class="fvr-table"
      :data="tableData"
      @selection-change="handleSelectionChange">
      <slot></slot>
    </el-table>
  `,
  props: {
    data: {
      type: Array,
      default: [],
    },
    "empty-text": {
      type: String,
      default: "No Data",
    },
  },
  computed: {
    tableData() {
      return this.data;
    },
    emptyInfo() {
      return this.emptyText;
    },
  },
  methods: {
    handleSelectionChange() {
      this.$emit("selection");
    },
  },
};

/**
 * define a table column component
 */
 export const fvrTableColumn = {
  template: `
    <el-table-column
      :prop="newProp"
      :label="newLabel"
      :index="newIndex"
      :type="newType"
      :width="width"
      :formatter="formatter">
        <template v-for="(index, name) in $slots" :slot="name">
          <slot :name="name"></slot>
        </template>
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="slotProps">
          <slot :name="name" v-bind="slotProps"></slot>
        </template>
    </el-table-column>
  `,
  props: {
    prop: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    index: {
      type: [Number, Function],
    },
    width: {
      type: String,
    },
    formatter: {
      type: Function,
      default: (row, column, cellValue, index, ) => {
        return cellValue;
      },
    },
  },
  data() {
    return {
      newProp: this.prop,
      newLabel: this.label,
      newType: this.type,
      newIndex: this.index,
    }
  },
}

/**
 * breadcrumb component
 */
 const fvrBreadcrumb = {
  template: `
    <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item
        v-for="(item, index) in path"
        :to="{path: item.path}"
        :key="index"
        @click.native="handleClick(item)">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    `,
  props: ["path", ],
  methods: {
    handleClick(item) {
      this.$emit("click", item.path);
    },
  },
}

const Components = {
  install(Vue) {
    Vue.component('fvr-container', fvrContainer);
    Vue.component('fvr-banner', fvrBanner);
    Vue.component('fvr-font', fvrFont);
    Vue.component('fvr-username-input', fvrUserNameInput);
    Vue.component('fvr-password-input', fvrPasswordInput);
    Vue.component('fvr-captcha', fvrCaptcha);
    Vue.component('fvr-checkbox', fvrCheckbox);
    Vue.component('fvr-row', fvrRow);
    Vue.component('fvr-avatar', fvrAvatar);
    Vue.component('fvr-dropdown', fvrDropdown);
    Vue.component('fvr-aside', fvrAside);
    Vue.component('fvr-main', fvrMain);
    Vue.component('fvr-menu', fvrMenu);
    Vue.component('fvr-submenu', fvrSubmenu);
    Vue.component('fvr-menu-item-group', fvrMenuItemGroup);
    Vue.component('fvr-menu-item', fvrMenuItem);
    Vue.component("fvr-breadcrumb", fvrBreadcrumb);
    Vue.component('fvr-button', fvrButton);
    Vue.component("fvr-table", fvrTable);
    Vue.component("fvr-table-column", fvrTableColumn);
  },
};
export default Components;
