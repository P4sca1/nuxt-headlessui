import { provideUseId } from '@headlessui/vue'
import { addComponent, addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { join } from 'pathe'

export interface ModuleOptions {
  prefix: string
}

interface ComponentGroup {
  relativePath: string
  chunkName: string
  exports: string[]
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
    ]
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
    ]
  },
  {
    relativePath: 'disclosure/disclosure.js',
    chunkName: 'headlessui/disclosure',
    exports: ['Disclosure', 'DisclosureButton', 'DisclosurePanel']

  },
  {
    relativePath: 'focus-trap/focus-trap.js',
    chunkName: 'headlessui/focus-trap',
    exports: ['FocusTrap']
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
    ]
  },
  {
    relativePath: 'menu/menu.js',
    chunkName: 'headlessui/menu',
    exports: ['Menu', 'MenuButton', 'MenuItems', 'MenuItem']

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
    ]
  },
  {
    relativePath: 'portal/portal.js',
    chunkName: 'headlessui/portal',
    exports: ['Portal', 'PortalGroup']
  },
  {
    relativePath: 'radio-group/radio-group.js',
    chunkName: 'headlessui/radio-group',
    exports: [
      'RadioGroup',
      'RadioGroupOption',
      'RadioGroupLabel',
      'RadioGroupDescription'
    ]
  },
  {
    relativePath: 'switch/switch.js',
    chunkName: 'headlessui/switch',
    exports: ['SwitchGroup', 'Switch', 'SwitchLabel', 'SwitchDescription']
  },
  {
    relativePath: 'tabs/tabs.js',
    chunkName: 'headlessui/tabs',
    exports: ['TabGroup', 'TabList', 'Tab', 'TabPanels', 'TabPanel']
  },
  {
    relativePath: 'transitions/transition.js',
    chunkName: 'headlessui/transition',
    exports: ['TransitionChild', 'TransitionRoot']
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
  async setup(options) {
    // Resolve path to node_modules/@headlessui/vue/dist/components.
    // The dependency is resolved relative to the location of this file, so that package managers like pnpm
    // without shamefully hoisting, or yarn with Plug'n'play enabled, also work.
    const { resolvePath } = createResolver(import.meta.url)
    const entrypoint = await resolvePath('@headlessui/vue') // node_modules/@headlessui/vue/dist/index.cjs
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

    addImports({
      name: "provideUseId",
      from: entrypoint,
      as: "provideHeadlessUseId",
    })
  }
})

