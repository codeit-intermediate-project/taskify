'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';

import searchIcon from '@/public/icons/search.png';
import useDevice from '@lib/hooks/useDevice';

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const deviceType = useDevice();

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="relative mt-0 w-full md:mt-[1px] xl:mx-auto xl:mt-8">
      <Image
        src={searchIcon}
        alt="돋보기 아이콘"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer"
        onClick={handleSearch}
        width={16}
        height={16}
      />
      <motion.input
        animate={{
          boxShadow: isFocused
            ? '0 0 12px rgba(0, 0, 0, 0.15)'
            : '0 0 1px rgba(0, 0, 0, 0.1)',
        }}
        transition={{
          duration: 0.1,
          type: 'spring',
          stiffness: 100,
          damping: 10,
        }}
        className={`flex h-full w-full rounded-md bg-white px-4 py-[6px] pl-9 text-gray-300 outline-none outline-1 outline-gray-200 font-md-14px-regular md:font-lg-16px-regular ${isFocused ? 'placeholder:opacity-0' : ''}`}
        placeholder={
          deviceType === 'mobile' ? '검색' : '대시보드 이름을 검색해보세요'
        }
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyPress={e => e.key === 'Enter' && handleSearch()}
      />
    </div>
  );
}

export default SearchForm;
