import { Component } from "solid-js"

type AvatarProps = {
  name: string
}
export const Avatar: Component<AvatarProps> = (props) => (
  <div class="w-9 aspect-square rounded-full overflow-hidden" >
    <img src={`https://api.dicebear.com/6.x/micah/svg?seed=${props.name}`} />
  </div>
)
