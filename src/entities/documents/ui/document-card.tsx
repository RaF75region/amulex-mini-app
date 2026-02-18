import React from 'react';
import Image from 'next/image';
import { ArrowIcon } from '@/shared/ui/arrow-icon';
import { cn } from '@/lib/utils';
import styles from './document-card.module.css';

interface DocumentCardProps {
    title: string;
    description: string;
    onClick?: () => void;
    showIllustration?: boolean;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
    title,
    description,
    onClick,
    showIllustration = false,
}) => {
    return (
        <button
            onClick={onClick}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-200 text-left w-full h-full relative overflow-visible cursor-pointer"
        >
            <div className="flex items-start justify-between w-full h-full relative">
                <div className={cn("flex flex-col gap-4 flex-1 h-full", showIllustration && "max-w-[calc(100%-130px)]")}>
                    <div className="w-12 h-12 bg-[#8AA6F4] rounded-full flex items-center justify-center text-white">
                        <ArrowIcon className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h3>
                        <p className="text-[10px] font-normal leading-[130%] text-gray-500">
                            {description}
                        </p>
                    </div>
                </div>

                {showIllustration && (
                    <div className="absolute -bottom-4 right-0">
                        <Image
                            className='svg-document'
                            src="/document.svg"
                            alt="Document"
                            width={119}
                            height={186}
                        />
                    </div>
                )}
            </div>
        </button>
    );
};
