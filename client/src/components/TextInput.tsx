import { Component, ComponentProps, Show, splitProps } from "solid-js";

export type TextInputProps = {
  label: string,
  error?: string;
  desc?: string,
} & ComponentProps<'input'>

export const TextInput: Component<TextInputProps> = (props) => {
  const [local, inputProps] = splitProps(props, ['desc', 'label', 'error'])
  return (
    <div>
      <label for={props.id} class="block text-sm font-medium text-gray-700">
        {local.label}
      </label>
      <Show when={local.desc !== undefined}>
        <p class="text-xs text-gray-600">{local.desc}</p>
      </Show>
      <input {...inputProps}
        class={`mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm focus:ring-blue-500 ${inputProps.class}`}
      />
      <Show when={local.error !== undefined}>
        <p class="text-xs text-red-600 pt-1">{local.error}</p>
      </Show>
    </div>
  )
}

