# Nuxt Headless UI ![CircleCI](https://circleci.com/gh/P4sca1/nuxt-headlessui.svg?style=svg)

[Headless UI](https://headlessui.com) integration for Nuxt.
Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.

Headless UI documentation for Vue: https://headlessui.com/vue/menu

## Features
- Automatic dynamic imports (no global components)
- Fully type safe
- Configurable component prefix (defults to `Headless`)

## Setup
1. Add `nuxt-headlessui` dependency to your project

`yarn add --dev nuxt-headlessui # or npm install --save-dev nuxt-headlessui`

2. Add `nuxt-headlessui` to the `modules` section of `nuxt.config.ts`

```ts
{
    modules: [
        'nuxt-headlessui'
    ],

    // Optionally change the default prefix.
    headlessui: {
        prefix: 'Headless'
    }
}
```

## Usage
After completing setup, simply use the headless components in your components and pages and style them with your favourite CSS framework.
You don't have to import the components.
Here is an example of a Listbox (Select), which uses heroicons and Tailwind CSS:

```vue
<template>
  <div class="container mx-auto">
    <div class="w-72">
      <HeadlessListbox v-model="selectedPerson">
        <div class="relative mt-1">
          <HeadlessListboxButton
            class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span class="block truncate">{{ selectedPerson.name }}</span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </HeadlessListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <HeadlessListboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <HeadlessListboxOption
                v-for="person in people"
                v-slot="{ active, selected }"
                :key="person.name"
                :value="person"
                as="template"
              >
                <li
                  :class="[
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]"
                  >{{ person.name }}</span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </HeadlessListboxOption>
            </HeadlessListboxOptions>
          </transition>
        </div>
      </HeadlessListbox>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' }
]
const selectedPerson = ref(people[0])
</script>
```

If you are using [Tailwind CSS](https://tailwindcss.com/), you can use the [@headlessui/tailwindcss](https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-tailwindcss) plugin to get modifiers like `ui-open:*` and `ui-active:*`.

## Note about client-only components
Some headless components, such as `Portal`, `Popover`, or `Dialog` are client-only components. They will lead to errors when rendered on the server. You need to wrap them with [ClientOnly](https://nuxt.com/docs/api/components/client-only#clientonly).
See https://github.com/tailwindlabs/headlessui/issues/1496.


## Development

- Run `yarn` to install dependencies
- Run `yarn dev:prepare` to generate type stubs.
- Use `yarn dev` to start [playground](./playground) in development mode.
