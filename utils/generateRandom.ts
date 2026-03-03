export class DataGenerator{
    static generateRandomString(length: number = 10): string{
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({length} , () => 
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('');
    }

    static generateRandomNumber(min: number = 0, max: number = 1000): any{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static generateRandomAlphaNumberic(length: number= 10): string{
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({length}, () => 
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('');
    }

    static generateRandomEmail(): string{
        return `test_${this.generateRandomAlphaNumberic(8)}@example.com`;
    }

    static generateRandomPhone(): string{
        return `9${this.generateRandomNumber(100000000, 999999999)}`;
    }

}
