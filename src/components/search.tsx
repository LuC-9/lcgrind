"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

export const CompanySearch = ({ query }: { query?: string }) => {
    const [company, setCompany] = useState<string>(query ?? "");
    const router = useRouter();
    const currentSearchParams = useSearchParams();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCompany(event.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams(currentSearchParams.toString());

            if (company && company.trim() !== '') {
                params.set('search', company);
                params.set('page', '1');
            } else {
                params.delete('search');
            }

            const newQueryString = params.toString();

            const basePath = '/companies';
            const targetPath = `${basePath}${newQueryString ? `?${newQueryString}` : ''}`;

            router.replace(targetPath);

        }, 300);

        return () => clearTimeout(timeoutId);

    }, [company, currentSearchParams]);

    return (
        <div className="pb-6 px-3 w-full max-w-xl flex items-center gap-2">
            <SearchIcon className='text-muted-foreground/50' />
            <Input
                placeholder="Search company..."
                value={company}
                onChange={handleInputChange}
                className="placeholder:text-2xl md:text-2xl h-12 placeholder:text-muted-foreground/50 bg-card"

            />
        </div>
    );
};