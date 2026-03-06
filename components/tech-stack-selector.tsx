"use client"

import { useState, useCallback } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { TECH_STACKS, type TechCategory, type TechOption } from "@/lib/tech-stacks"
import { cn } from "@/lib/utils"

export type SelectedStack = Record<string, string>

interface TechStackSelectorProps {
  onChange: (selected: SelectedStack) => void
}

function CategoryCard({
  category,
  selected,
  onSelect,
}: {
  category: TechCategory
  selected: string | undefined
  onSelect: (categoryId: string, optionId: string) => void
}) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="rounded-xl border border-border bg-card">
      <button
        className="flex w-full items-center justify-between px-4 py-3"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              selected ? "bg-primary" : "bg-muted-foreground/40"
            )}
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">{category.name}</p>
            <p className="text-xs text-muted-foreground">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selected && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              {category.options.find((o) => o.id === selected)?.name}
            </span>
          )}
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="grid grid-cols-2 gap-2 border-t border-border px-4 pb-4 pt-3 sm:grid-cols-4">
          {category.options.map((option) => (
            <OptionButton
              key={option.id}
              option={option}
              isSelected={selected === option.id}
              onSelect={() => onSelect(category.id, option.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function OptionButton({
  option,
  isSelected,
  onSelect,
}: {
  option: TechOption
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-start rounded-lg border p-3 text-left transition-all duration-200",
        isSelected
          ? "border-primary bg-primary/10 text-foreground shadow-md shadow-primary/10"
          : "border-border bg-secondary/30 text-muted-foreground hover:border-border/80 hover:bg-secondary/60 hover:text-foreground"
      )}
    >
      {isSelected && (
        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
          <Check className="h-2.5 w-2.5 text-primary-foreground" />
        </span>
      )}
      <p className="text-xs font-semibold">{option.name}</p>
      <p className="mt-0.5 text-xs leading-relaxed opacity-70">{option.description}</p>
    </button>
  )
}

export function TechStackSelector({ onChange }: TechStackSelectorProps) {
  const [selected, setSelected] = useState<SelectedStack>({})

  const handleSelect = useCallback(
    (categoryId: string, optionId: string) => {
      setSelected((prev) => {
        const next = { ...prev }
        if (next[categoryId] === optionId) {
          delete next[categoryId]
        } else {
          next[categoryId] = optionId
        }
        onChange(next)
        return next
      })
    },
    [onChange]
  )

  const selectedCount = Object.keys(selected).length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          已选择{" "}
          <span className="font-semibold text-foreground">{selectedCount}</span>{" "}
          项技术
        </p>
        {selectedCount > 0 && (
          <button
            onClick={() => {
              setSelected({})
              onChange({})
            }}
            className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            清空选择
          </button>
        )}
      </div>

      <div className="space-y-2">
        {TECH_STACKS.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            selected={selected[category.id]}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
}
