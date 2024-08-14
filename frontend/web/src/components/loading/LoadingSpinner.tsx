import { FC } from 'react';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    color: string;
}

const LoadingSpinner: FC<Props> = ({ color }) => {
    return (
        <div className="flex items-center gap-3">
            <Spinner className={`text-${color}`}>Loading...</Spinner>
        </div>
    );
};

export default LoadingSpinner;