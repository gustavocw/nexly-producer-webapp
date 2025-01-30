"use client"

import { For, SegmentGroup } from "@chakra-ui/react"
import * as React from "react"

interface Item {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps extends SegmentGroup.RootProps {
  items: Array<string | Item>
}

function normalize(items: Array<string | Item>): Item[] {
  return items.map((item) => {
    if (typeof item === "string") return { value: item, label: item }
    return item
  })
}

export const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(function SegmentedControl(props, ref) {
  const { items, ...rest } = props
  const data = React.useMemo(() => normalize(items), [items])

  return (
    <SegmentGroup.Root ref={ref} {...rest}>
      <SegmentGroup.Indicator />
      <For each={data}>
        {(item) => (
          <SegmentGroup.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            _hover={{ bg: "neutral.60" }}
            px={2}
            _active={{ transform: "scale(0.95)", transition: "transform 0.2s" }}
          >
            <SegmentGroup.ItemText color="neutral">{item.label}</SegmentGroup.ItemText>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        )}
      </For>
    </SegmentGroup.Root>
  )
})
