export default function DaySelect({ day, onChange }: { day: number, onChange: Function }) {
    return <select onChange={(e) => onChange(e.target.value)} value={day} className="select select-info w-full max-w-xs">
        <option value="0">Lundi</option>
        <option value="1">Mardi</option>
        <option value="2">Mercredi</option>
        <option value="3">Jeudi</option>
        <option value="4">Vendredi</option>
        <option value="5">Samedi</option>
    </select>
}
