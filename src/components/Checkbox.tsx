import { ChangeEventHandler, LegacyRef } from 'react'

interface CheckboxProps {
    cbRef?: LegacyRef<HTMLInputElement>
    checked: boolean
    onChange?: ChangeEventHandler<HTMLInputElement>
}
const Checkbox = ({ cbRef, checked, onChange }: CheckboxProps) => (
    <input
        ref={cbRef}
        checked={checked}
        onChange={onChange}
        type='checkbox'
        className='disabled:cursor-not-allowed cursor-pointer'
    />
)

export default Checkbox
