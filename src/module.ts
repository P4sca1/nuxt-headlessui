import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'
import { join } from 'pathe'

export interface ModuleOptions {
  prefix: string
}

const headlessComponents = [
  {
    relativePath: 'combobox/combobox.js',
    chunkName: 'headless-ui/combobox',
    exports: [
      'Combobox',
      'ComboboxLabel',
      'ComboboxButton',
      'ComboboxInput',
      'ComboboxOptions',
      'ComboboxOption'
    ]
  },
  {
    relativePath: 'dialog/dialog.js',
    chunkName: 'headless-ui/dialog',
    exports: [
      'Dialog',
      'DialogOverlay',
      'DialogBackdrop',
      'DialogPanel',
      'DialogTitle',
      'DialogDescription'
    ]
  },
  {
    relativePath: 'disclosure/disclosure.js',
    chunkName: 'headless-ui/disclosure',
    exports: ['Disclosure', 'DisclosureButton', 'DisclosurePanel']
  },
  {
    relativePath: 'focus-trap/focus-trap.js',
    chunkName: 'headless-ui/focus-trap',
    exports: ['FocusTrap']
  },
  {
    relativePath: 'listbox/listbox.js',
    chunkName: 'headless-ui/listbox',
    exports: [
      'Listbox',
      'ListboxLabel',
      'ListboxButton',
      'ListboxOptions',
      'ListboxOption'
    ]
  },
  {
    relativePath: 'menu/menu.js',
    chunkName: 'headless-ui/menu',
    exports: ['Menu', 'MenuButton', 'MenuItems', 'MenuItem']
  },
  {
    relativePath: 'popover/popover.js',
    chunkName: 'headless-ui/popover',
    exports: [
      'Popover',
      'PopoverButton',
      'PopoverOverlay',
      'PopoverPanel',
      'PopoverGroup'
    ]
  },
  {
    relativePath: 'portal/portal.js',
    chunkName: 'headless-ui/portal',
    exports: ['Portal', 'PortalGroup']
  },
  {
    relativePath: 'radio-group/radio-group.js',
    chunkName: 'headless-ui/radio-group',
    exports: [
      'RadioGroup',
      'RadioGroupOption',
      'RadioGroupLabel',
      'RadioGroupDescription'
    ]
  },
  {
    relativePath: 'switch/switch.js',
    chunkName: 'headless-ui/switch',
    exports: ['SwitchGroup', 'Switch', 'SwitchLabel', 'SwitchDescription']
  },
  {
    relativePath: 'tabs/tabs.js',
    chunkName: 'headless-ui/tabs',
    exports: ['TabGroup', 'TabList', 'Tab', 'TabPanels', 'TabPanel']
  },
  {
    relativePath: 'transitions/transition.js',
    chunkName: 'headless-ui/transition',
    exports: ['TransitionChild', 'TransitionRoot']
  }
]

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-headlessui',
    configKey: 'headlessui',
    compatibility: {
      nuxt: '^3.0.0-rc.12',
      bridge: true
    }
  },
  defaults: {
    prefix: 'Headless'
  },
  async setup (options, nuxt) {
    // Resolve path to node_modules/@headlessui/vue/dist/components.
    // The dependency is resolved relative to the location of this file, so that package managers like pnpm
    // without shamefully hoisting, or yarn with Plug'n'play enabled, also work.
    const { resolvePath } = createResolver(import.meta.url)
    const entrypoint = await resolvePath('@headlessui/vue') // node_modules/@headlessui/vue/dist/headlessui.esm.js
    const root = join(entrypoint, '../components') // node_modules/@headlessui/vue/dist/components

    for (const group of headlessComponents) {
      for (const e of group.exports) {
        addComponent(
          {
            name: `${options.prefix}${e}`,
            export: e,
            filePath: join(root, group.relativePath),
            chunkName: group.chunkName,
            mode: 'all'
          }
        )
      }
    }
  }
})
