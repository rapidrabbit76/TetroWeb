/**
 * UTC 시간을 사용자의 로컬 시간대로 변환하는 유틸리티 함수들
 */

/**
 * UTC 시간을 사용자의 로컬 시간대로 변환
 */
export const formatToLocalTime = (utcTimeString: string): string => {
    const utcDate = new Date(utcTimeString);
    return utcDate.toLocaleString();
};

/**
 * UTC 시간을 특정 형식으로 변환
 */
export const formatToLocalTimeWithFormat = (
    utcTimeString: string,
    options?: Intl.DateTimeFormatOptions
): string => {
    const utcDate = new Date(utcTimeString);
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    return utcDate.toLocaleString('ko-KR', options || defaultOptions);
};

/**
 * 상대적 시간 표시 (예: "2분 전", "1시간 전")
 */
export const formatRelativeTime = (utcTimeString: string): string => {
    const utcDate = new Date(utcTimeString);
    const now = new Date();
    const diffMs = now.getTime() - utcDate.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return '방금 전';
    if (diffMinutes < 60) return `${diffMinutes}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;

    return formatToLocalTimeWithFormat(utcTimeString, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * 사용자의 시간대를 자동으로 감지하여 변환
 */
export const formatToUserTimezone = (utcTimeString: number | string): string => {
    const date = new Date(utcTimeString);
    const localDateTime = date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // 24시간 형식
    });
    return localDateTime;

}