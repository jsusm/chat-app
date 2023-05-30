import { IconLoader2 } from "@tabler/icons-solidjs"
import { Component, ComponentProps, ParentProps, Show } from "solid-js"
import { twMerge } from 'tailwind-merge'

export type ButtonProps = {
  loading?: boolean,
} & ComponentProps<'button'> & ParentProps

export const Button: Component<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      disabled={props.loading}
      class={twMerge(`
      rounded-md bg-blue-600 px-6 py-1.5 font-medium text-white drop-shadow
      flex justify-center items-center
      hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500
      `, props.class)}
    >
      <span class="transition-all" classList={{ "text-transparent": props.loading }}>
        {props.children}
      </span>
      <Show when={props.loading}>
        <span class="absolute m-auto animate-spin">
          {<IconLoader2 size={16} stroke-width={3} />}
        </span>
      </Show>
    </button>
  )
}
