'use client'

import { FC, useState, ChangeEvent } from 'react'
import { CiSearch } from 'react-icons/ci'

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    }

    return (
        <div className='group'>
            <label className='input rounded-lg flex items-center gap-x-2 bg-secondary/30 focus-within:border-primary focus:outline-none border border-primary'>
                <input
                    type='text'
                    value={searchQuery}
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

type SearchBarProps = {
    onSearch: (query: string) => void;
}