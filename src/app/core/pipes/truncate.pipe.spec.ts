import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
    let pipe: TruncatePipe;

    beforeEach(() => {
        pipe = new TruncatePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return empty string if value is empty', () => {
        expect(pipe.transform('')).toBe('');
    });

    it('should return original string if length is less than limit', () => {
        const text = 'Short text';
        expect(pipe.transform(text, 20)).toBe('Short text');
    });

    it('should truncate string and add ellipsis if length exceeds limit', () => {
        const text = 'Hello World';
        // limit 5 -> "Hello..."
        expect(pipe.transform(text, 5)).toBe('Hello...');
    });

    it('should use default limit (50) if not provided', () => {
        const longText = 'a'.repeat(60);
        const result = pipe.transform(longText);
        expect(result.length).toBe(53); // 50 chars + 3 dots
        expect(result.endsWith('...')).toBeTrue();
    });
});