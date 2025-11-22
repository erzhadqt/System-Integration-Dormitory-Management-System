import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

export function GenderRadioBtn({ value, onChange }) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="flex gap-6"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="Male" id="male" />
        <Label htmlFor="male">Male</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem value="Female" id="female" />
        <Label htmlFor="female">Female</Label>
      </div>
    </RadioGroup>
  )
}
