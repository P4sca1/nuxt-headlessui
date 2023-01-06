import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'
import { join } from 'pathe'

export interface ModuleOptions {
  prefix: string
}

interface ComponentGroup {
  relativePath: string
  chunkName: string
  exports: string[]
  mode: 'client' | 'server' | 'all'
}

const headlessComponents: ComponentGroup[] = [
  {
    relativePath: 'combobox/combobox.js',
    chunkName: 'headlessui/combobox',
    exports: [
      'Combobox',
      'ComboboxLabel',
      'ComboboxButton',
      'ComboboxInput',
      'ComboboxOptions',
      'ComboboxOption'
    ],
    mode: 'all'
  },
  {
    relativePath: 'dialog/dialog.js',
    chunkName: 'headlessui/dialog',
    exports: [
      'Dialog',
      'DialogOverlay',
      'DialogBackdrop',
      'DialogPanel',
      'DialogTitle',
      'DialogDescription'
    ],
    mode: 'client'
  },
  {
    relativePath: 'disclosure/disclosure.js',
    chunkName: 'headlessui/disclosure',
    exports: ['Disclosure', 'DisclosureButton', 'DisclosurePanel'],
    mode: 'all'
  },
  {
    relativePath: 'focus-trap/focus-trap.js',
    chunkName: 'headlessui/focus-trap',
    exports: ['FocusTrap'],
    mode: 'all'
  },
  {
    relativePath: 'listbox/listbox.js',
    chunkName: 'headlessui/listbox',
    exports: [
      'Listbox',
      'ListboxLabel',
      'ListboxButton',
      'ListboxOptions',
      'ListboxOption'
    ],
    mode: 'all'
  },
  {
    relativePath: 'menu/menu.js',
    chunkName: 'headlessui/menu',
    exports: ['Menu', 'MenuButton', 'MenuItems', 'MenuItem'],
    mode: 'all'
  },
  {
    relativePath: 'popover/popover.js',
    chunkName: 'headlessui/popover',
    exports: [
      'Popover',
      'PopoverButton',
      'PopoverOverlay',
      'PopoverPanel',
      'PopoverGroup'
    ],
    mode: 'client'
  },
  {
    relativePath: 'portal/portal.js',
    chunkName: 'headlessui/portal',
    exports: ['Portal', 'PortalGroup'],
    mode: 'client'
  },
  {
    relativePath: 'radio-group/radio-group.js',
    chunkName: 'headlessui/radio-group',
    exports: [
      'RadioGroup',
      'RadioGroupOption',
      'RadioGroupLabel',
      'RadioGroupDescription'
    ],
    mode: 'all'
  },
  {
    relativePath: 'switch/switch.js',
    chunkName: 'headlessui/switch',
    exports: ['SwitchGroup', 'Switch', 'SwitchLabel', 'SwitchDescription'],
    mode: 'all'
  },
  {
    relativePath: 'tabs/tabs.js',
    chunkName: 'headlessui/tabs',
    exports: ['TabGroup', 'TabList', 'Tab', 'TabPanels', 'TabPanel'],
    mode: 'all'
  },
  {
    relativePath: 'transitions/transition.js',
    chunkName: 'headlessui/transition',
    exports: ['TransitionChild', 'TransitionRoot'],
    mode: 'all'
  }
]

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-headlessui',
    configKey: 'headlessui',
    compatibility: {
      nuxt: '^3.0.0',
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
            mode: group.mode
          }
        )
      }
    }
  }
})
