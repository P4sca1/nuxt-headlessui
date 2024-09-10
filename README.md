# Nuxt Headless UI ![CircleCI](https://circleci.com/gh/P4sca1/nuxt-headlessui.svg?style=svg)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[Headless UI](https://headlessui.com) integration for Nuxt.
Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.

Headless UI documentation for Vue: https://headlessui.com/vue/menu

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/P4sca1/nuxt-headlessui?file=playground%2Fapp.vue)

## Features
- Automatic dynamic imports (no global components)
- Fully type safe
- Configurable component prefix (defaults to `Headless`)

## Quick Setup
1. Add `nuxt-headlessui` dependency to your project

```bash
npx nuxi@latest module add headlessui
```

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

3. Add the following lines to your `app.vue` file inside `<script setup>`:

> [!NOTE]  
> This is only needed if you use versions prior to `vue@3.5.0` or `@headlessui/vue@1.7.23`. More recent versions use the native `useId` composable provided by Vue.

```ts
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId())
```
This is required to avoid hydration issues, because of id mismatches. Both composables will be auto-imported by nuxt. The `provideHeadlessUseId` composable is an alias for the `provideUseId` composable from `@headlessui/vue`. `import { provideUseId } from '@headlessui/vue'` directly [won't work out of the box](https://github.com/P4sca1/nuxt-headlessui/issues/41).

That's it! You can now use Headless UI in your Nuxt app ✨

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
There is a [unocss primitives preset]https://github.com/zirbest/unocss-preset-primitives/tree/main)  which does this in case if you are using UnoCss.

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-headlessui/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-headlessui

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-headlessui.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-headlessui

[license-src]: https://img.shields.io/npm/l/nuxt-headlessui.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-headlessui

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
