import { Column } from "@tanstack/react-table";
import { DebouncedInput } from "./debounced-input";

type Props<T> = {
    column: Column<T, unknown>
    filteredRows: string[]
}

export default function Filter<T>({ column, filteredRows }: Props<T>) {
    const columnFilterValue = column.getFilterValue()

    // console.log('filteredRows', filteredRows);

    const uniqueFilteredValues = new Set(filteredRows)

    // console.log('uniqueFilteredValues', uniqueFilteredValues);

    const sortedUniqueValues = Array.from(uniqueFilteredValues).sort()

    return (
        <>
            <datalist id={column.id + 'list'}>
                {sortedUniqueValues.map((value, i) => (
                    <option value={value} key={`${i}-${column.id}`} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Search... (${uniqueFilteredValues.size})`}
                className="w-full border shadow rounded bg-card"
                list={column.id + 'list'}
            />
        </>
    )
}