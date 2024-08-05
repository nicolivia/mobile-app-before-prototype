'use client'

import { FC, useState, ChangeEvent } from 'react'
import { CiSearch } from 'react-icons/ci'

type SearchBarProps = {
    onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value
        setQuery(newQuery)
        onSearch(newQuery)
    }

    return (
        <div className='group'>
            <label className='input rounded-lg flex items-center gap-x-2 bg-secondary/30 focus-within:border-primary focus:outline-none border border-primary'>
                <input
                    type='text'
                    value={query}
                    onChange={handleInputChange}
                    className='text-sm py-2 px-3 focus:outline-none focus:border-none bg-transparent'
                    placeholder="Please enter keywords..."
                />
                <CiSearch className='size-4 group-focus-within:text-primary mr-4' />
            </label>
        </div>
    )
}

export default SearchBar